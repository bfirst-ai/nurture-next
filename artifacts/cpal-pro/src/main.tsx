import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { applyWidgetOverrides } from "./lib/widget-overrides";

applyWidgetOverrides();

createRoot(document.getElementById("root")!).render(<App />);
