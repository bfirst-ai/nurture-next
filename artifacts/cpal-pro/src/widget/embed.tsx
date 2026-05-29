/**
 * Embeddable Lead-Generation Widget entry point.
 *
 * Built as a single self-contained IIFE bundle (see vite.config.widget.ts) that
 * firms drop onto their own website with one <script> tag:
 *
 *   <script
 *     src="https://nurturenext.com/widget/nurture-widget.js"
 *     data-nn-widget
 *     data-tenant="acme-cpa"
 *     async></script>
 *
 * It mounts the AskfirmChatbot inside a Shadow DOM so the host page's CSS can
 * neither break the widget nor be broken by it. The tenant slug is forwarded to
 * the API as the `Tenant` header (configureAskfirm), since the widget runs on
 * arbitrary external origins where the tenant can't be inferred from the domain.
 */
import { createRoot } from "react-dom/client";
import AskfirmChatbot from "@/components/AskfirmChatbot";
import { configureAskfirm } from "@/lib/askfirm.service";
import widgetCss from "./widget.css?inline";

const HOST_ID = "nurture-next-lead-widget";

interface WidgetConfig {
  tenant?: string;
  apiBase?: string;
  accent?: string;
  accentDark?: string;
}

function readConfig(): WidgetConfig {
  const g = ((window as unknown as { NurtureNextWidget?: WidgetConfig })
    .NurtureNextWidget ?? {}) as WidgetConfig;
  // For an external classic <script src>, document.currentScript points at our
  // tag during synchronous execution (true even with async). Fall back to a
  // tagged / src-based lookup if it's not available.
  const script =
    (document.currentScript as HTMLScriptElement | null) ??
    document.querySelector<HTMLScriptElement>("script[data-nn-widget]") ??
    document.querySelector<HTMLScriptElement>('script[src*="nurture-widget"]');
  const ds = script?.dataset ?? {};
  return {
    tenant: g.tenant ?? ds.tenant ?? "",
    apiBase: g.apiBase ?? ds.api,
    accent: g.accent ?? ds.accent,
    accentDark: g.accentDark ?? ds.accentDark,
  };
}

/** Derive a darker hover shade from a #rrggbb accent so firms supply one colour. */
function darken(hex: string, amount = 0.14): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const ch = (shift: number) =>
    Math.max(0, Math.round(((n >> shift) & 255) * (1 - amount)));
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

function mount() {
  if (document.getElementById(HOST_ID)) return; // guard against double-include

  const cfg = readConfig();
  configureAskfirm({ tenant: cfg.tenant, apiBase: cfg.apiBase });

  const host = document.createElement("div");
  host.id = HOST_ID;
  document.body.appendChild(host);

  const shadow = host.attachShadow({ mode: "open" });

  // Inject the compiled, self-contained stylesheet. Tailwind emits its theme
  // variables on :root, which does not match inside a shadow tree, so remap to
  // :host where they resolve and inherit down to the widget.
  const style = document.createElement("style");
  style.textContent = String(widgetCss).replace(/:root\b/g, ":host");
  shadow.appendChild(style);

  // Optional brand accent override from the host site's config.
  if (cfg.accent) {
    const accentDark = cfg.accentDark ?? darken(cfg.accent);
    const accentStyle = document.createElement("style");
    accentStyle.textContent =
      `:host{--nn-accent:${cfg.accent};--nn-accent-dark:${accentDark};` +
      `--nn-accent-ring:${cfg.accent}2e;}`;
    shadow.appendChild(accentStyle);
  }

  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  createRoot(mountPoint).render(<AskfirmChatbot />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount, { once: true });
} else {
  mount();
}
