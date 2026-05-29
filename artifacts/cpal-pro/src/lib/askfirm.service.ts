let API_BASE: string = (() => {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return "https://accumax-api.azurewebsites.net/api/v1";
})();

// Tenant slug for the multi-tenant API. Sent as the `Tenant` header so the
// backend resolves the correct tenant DB (see accumax-api middlewares/tenant-db.js).
// On the marketing site this stays null and the tenant is resolved by domain;
// the embeddable widget sets it explicitly via configureAskfirm() since it runs
// on arbitrary external firm websites.
let TENANT: string | null = null;

/**
 * Configure the AskFirm API client at runtime. Used by the embeddable widget to
 * point requests at the right tenant (and optionally a custom API base). Safe to
 * call multiple times; only provided fields are applied.
 */
export function configureAskfirm(opts: { tenant?: string | null; apiBase?: string | null }) {
  if (opts.apiBase) API_BASE = opts.apiBase.replace(/\/+$/, "");
  if (opts.tenant) TENANT = opts.tenant.trim() || null;
}

function withTenant(headers: Record<string, string>): Record<string, string> {
  return TENANT ? { ...headers, Tenant: TENANT } : headers;
}

export type ChatRole = "user" | "assistant";

export interface ChatHistoryItem {
  role: ChatRole;
  content: string;
}

export interface ChatPayload {
  message: string;
  conversationHistory: ChatHistoryItem[];
  customerName?: string;
  chatbotName?: string;
  customerWebsite?: string;
}

export interface ChatResponse {
  success: boolean;
  response: string;
  followUpQuestions: string[];
}

export interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  conversationHistory: ChatHistoryItem[];
}

export interface ContactResponse {
  success: boolean;
  message: string;
  leadId: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: withTenant({ "Content-Type": "application/json" }),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.error || data?.message || "";
    } catch {
      // ignore
    }
    throw new Error(detail || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: withTenant({ Accept: "application/json", "Cache-Control": "no-cache" }),
  });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json() as Promise<T>;
}

export interface MultipleConfigResponse {
  status: boolean;
  configs: Record<string, unknown>;
}

export const askfirmService = {
  chat(data: ChatPayload) {
    return post<ChatResponse>("/askfirm/chat", data);
  },
  saveContact(data: ContactPayload) {
    return post<ContactResponse>("/askfirm/contact", data);
  },
  getMultipleConfig(keys: string[]) {
    const qs = encodeURIComponent(keys.join(","));
    return get<MultipleConfigResponse>(`/auth/multiple?keys=${qs}`);
  },
  // Dedicated public, CORS-open branding endpoint for the embeddable widget.
  // Returns the same shape as getMultipleConfig (chatbotName, chatbotLogo, …).
  getWidgetConfig() {
    return get<MultipleConfigResponse>("/askfirm/widget-config");
  },
};
