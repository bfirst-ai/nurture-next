import { useEffect } from "react";

declare global {
  interface Window {
    AccumaxChatWidget?: {
      destroy: () => void;
    };
  }
}

const SCRIPT_ID = "askfirm-widget-script";
const WIDGET_URL = import.meta.env.DEV
  ? "http://localhost:4200"
  : "https://accumax-client-portal.azurewebsites.net";

export default function AskfirmWidgetEmbed() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = WIDGET_URL + "/askfirm-widget.js?v=" + Date.now();
    script.async = true;
    script.dataset.widgetUrl = WIDGET_URL;
    script.dataset.path = "/askfirm";

    document.body.appendChild(script);

    return () => {
      if (window.AccumaxChatWidget?.destroy) {
        window.AccumaxChatWidget.destroy();
      }
      const current = document.getElementById(SCRIPT_ID);
      if (current?.parentNode) {
        current.parentNode.removeChild(current);
      }
    };
  }, []);

  return null;
}
