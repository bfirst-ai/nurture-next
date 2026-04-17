import { useEffect } from "react";

declare global {
  interface Window {
    AccumaxChatWidget?: {
      destroy: () => void;
    };
  }
}

const SCRIPT_ID = "askfirm-widget-script";

export default function AskfirmWidgetEmbed() {
  useEffect(() => {
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "/askfirm-widget.js";
    script.async = true;
    script.dataset.widgetUrl = "https://accumax-client-portal.azurewebsites.net";
    script.dataset.path = "/askfirm";
    script.dataset.color = "#10182d";
    script.dataset.textColor = "#FFFFFF";

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
