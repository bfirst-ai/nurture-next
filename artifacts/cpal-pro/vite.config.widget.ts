import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * Build config for the standalone embeddable Lead-Generation Widget.
 *
 * Produces a single self-contained IIFE file at public/askcpal-widget.js — the
 * exact path index.html loads (src="/askcpal-widget.js"). CSS is inlined via
 * `?inline` + shadow DOM in src/widget/embed.tsx, and React is bundled in, so the
 * firm's page needs nothing but the one <script> tag.
 *
 * Writing into public/ (not dist/) means dev (`npm run dev`), the GH Pages deploy
 * (build:ghpages copies public/ → dist/public), and the embed snippet all serve
 * the SAME freshly built bundle. Because of this, build:ghpages runs this widget
 * build FIRST, then the site build, so dist picks up the regenerated bundle.
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  // The widget bundle is a single JS file — don't copy the marketing site's
  // public/ assets (logos, CNAME) into the widget output folder.
  publicDir: false,
  define: {
    // Lib builds don't get the SPA's mode replacement; pin to production so React
    // ships its optimized build and dev-only warnings are stripped.
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    // Emit directly into public/ so the served file (the one index.html loads)
    // is always the freshly built bundle. emptyOutDir:false so the rest of
    // public/ (logos, favicon, CNAME) is left intact.
    outDir: path.resolve(import.meta.dirname, "public"),
    emptyOutDir: false,
    // Don't hash the filename — the embed snippet references a stable URL.
    lib: {
      entry: path.resolve(import.meta.dirname, "src/widget/embed.tsx"),
      name: "NurtureNextLeadWidget",
      formats: ["iife"],
      fileName: () => "askcpal-widget.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
