const API_BASE: string = (() => {
  const fromEnv = import.meta.env.VITE_API_URL as string | undefined;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  return "https://accumax-api.azurewebsites.net/api/v1";
})();

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
    headers: { "Content-Type": "application/json" },
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
    headers: { Accept: "application/json", "Cache-Control": "no-cache" },
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
};
