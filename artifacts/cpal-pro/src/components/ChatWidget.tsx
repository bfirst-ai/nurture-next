import { useEffect, useMemo, useState } from "react";
import { MessageSquareText, X, Maximize2 } from "lucide-react";

const PROD_WIDGET_URL = "https://accumax-client-portal.azurewebsites.net/askfirm?embed=1";
const PROD_FULL_URL   = "https://accumax-client-portal.azurewebsites.net/askfirm";

export default function ChatWidget() {
  const [open, setOpen]           = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState("Nurture Next");

  const iframeUrl = useMemo(() => {
    const raw = import.meta.env.VITE_CHAT_WIDGET_URL || PROD_WIDGET_URL;
    return String(raw);
  }, []);

  // Derive full-page URL by stripping ?embed=1
  const fullPageUrl = useMemo(() => {
    try {
      const url = new URL(iframeUrl);
      url.searchParams.delete("embed");
      return url.toString();
    } catch {
      return PROD_FULL_URL;
    }
  }, [iframeUrl]);

  // Load iframe only after first open so it doesn't hit production on every page load
  const handleToggle = () => {
    if (!open && !hasOpened) setHasOpened(true);
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as {
        type?: string;
        payload?: { chatbotName?: string; customerName?: string };
      } | null;
      if (!data || data.type !== "askfirm-config") return;
      const next = data.payload?.chatbotName || data.payload?.customerName;
      if (next) setWidgetTitle(next);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  /* ── inline style helpers ── */
  const gold      = "#d4ad59";
  const navy      = "#0c111d";
  const goldAlpha = (a: number) => `rgba(212,173,89,${a})`;
  const whiteAlpha = (a: number) => `rgba(255,255,255,${a})`;

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">

      {/* ── Popup panel ── */}
      <div
        className={`absolute bottom-[4.5rem] right-0 w-[min(92vw,420px)] h-[min(78vh,680px)] flex flex-col overflow-hidden rounded-2xl transition-all duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
        style={{
          background: navy,
          border: `1px solid ${goldAlpha(0.22)}`,
          boxShadow: `0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px ${goldAlpha(0.08)}`,
        }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center gap-3 px-4 shrink-0"
          style={{
            height: 62,
            background: navy,
            borderBottom: `1px solid ${goldAlpha(0.18)}`,
          }}
        >
          {/* Bot icon */}
          <div
            style={{
              width: 36, height: 36,
              borderRadius: 10,
              background: gold,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              boxShadow: `0 4px 12px ${goldAlpha(0.35)}`,
            }}
          >
            <MessageSquareText size={18} color={navy} />
          </div>

          {/* Title + status */}
          <div className="flex-1 min-w-0">
            <p style={{
              fontFamily: "'Sora','Manrope',sans-serif",
              fontWeight: 700,
              fontSize: 14.5,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>
              {widgetTitle}
            </p>
            <p style={{ fontSize: 11.5, color: gold, margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: gold, display: "inline-block" }} />
              Online
            </p>
          </div>

          {/* Expand to full page */}
          <a
            href={fullPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open full page"
            className="group"
            style={{
              width: 32, height: 32,
              borderRadius: 8,
              border: `1px solid ${goldAlpha(0.28)}`,
              background: goldAlpha(0.08),
              color: gold,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              textDecoration: "none",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = goldAlpha(0.18);
              (e.currentTarget as HTMLElement).style.borderColor = goldAlpha(0.55);
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = goldAlpha(0.08);
              (e.currentTarget as HTMLElement).style.borderColor = goldAlpha(0.28);
            }}
          >
            <Maximize2 size={14} />
          </a>

          {/* Close */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            title="Close"
            style={{
              width: 32, height: 32,
              borderRadius: 8,
              border: `1px solid ${whiteAlpha(0.1)}`,
              background: whiteAlpha(0.05),
              color: whiteAlpha(0.65),
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = whiteAlpha(0.12);
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = whiteAlpha(0.05);
              (e.currentTarget as HTMLElement).style.color = whiteAlpha(0.65);
            }}
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Iframe (only mounted after first open) ── */}
        {hasOpened && (
          <iframe
            title={widgetTitle}
            src={iframeUrl}
            className="border-0 flex-1 w-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
      </div>

      {/* ── Trigger button ── */}
      <button
        type="button"
        onClick={handleToggle}
        style={{
          width: 56, height: 56,
          borderRadius: "50%",
          border: `1.5px solid ${goldAlpha(0.55)}`,
          background: navy,
          color: gold,
          boxShadow: `0 8px 24px ${goldAlpha(0.28)}, 0 2px 8px rgba(0,0,0,0.35)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 14px 32px ${goldAlpha(0.38)}, 0 2px 8px rgba(0,0,0,0.35)`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${goldAlpha(0.28)}, 0 2px 8px rgba(0,0,0,0.35)`;
        }}
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? <X size={20} /> : <MessageSquareText size={20} />}
      </button>
    </div>
  );
}
