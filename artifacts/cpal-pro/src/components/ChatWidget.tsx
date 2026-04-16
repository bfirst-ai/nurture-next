import { useEffect, useMemo, useState } from "react";
import { MessageSquareText, X } from "lucide-react";

const DEFAULT_WIDGET_URL = "http://localhost:4200/askfirm?embed=1";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [widgetTitle, setWidgetTitle] = useState("AskFirm Assistant");

  const iframeUrl = useMemo(() => {
    const raw = import.meta.env.VITE_CHAT_WIDGET_URL || DEFAULT_WIDGET_URL;
    return String(raw);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data as { type?: string; payload?: { chatbotName?: string; customerName?: string } } | null;
      if (!data || data.type !== "askfirm-config") return;
      const nextTitle = data.payload?.chatbotName || data.payload?.customerName;
      if (nextTitle) setWidgetTitle(nextTitle);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      <div
        className={`absolute bottom-16 right-0 w-[min(92vw,420px)] h-[min(78vh,680px)] overflow-hidden rounded-2xl border border-border/70 bg-card shadow-md transition-all duration-200 ${open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"}`}
      >
        <iframe
          title={widgetTitle}
          src={iframeUrl}
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="h-14 w-14 rounded-full border border-[#1d2aa3] bg-[#0b1580] text-white shadow-[0_10px_20px_rgba(11,21,128,0.28)] transition-transform hover:-translate-y-0.5"
        aria-label={open ? "Close chatbot" : "Open chatbot"}
      >
        {open ? <X className="mx-auto h-5 w-5" /> : <MessageSquareText className="mx-auto h-5 w-5" />}
      </button>
    </div>
  );
}
