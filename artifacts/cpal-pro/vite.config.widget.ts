import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

/**
 * Build config for the standalone embeddable Lead-Generation Widget.
 *
 * Produces a single self-contained IIFE file at dist/public/widget/nurture-widget.js
 * (CSS is inlined via `?inline` + shadow DOM in src/widget/embed.tsx, so there is
 * no separate stylesheet to load). React is bundled in — the firm's page needs
 * nothing but the one <script> tag.
 *
 * Output sits under dist/public/widget so the existing GitHub Pages deploy
 * (build:ghpages → uploads dist/public) publishes it alongside the marketing
 * site at https://nurturenext.com/widget/nurture-widget.js
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
    outDir: path.resolve(import.meta.dirname, "dist/public/widget"),
    emptyOutDir: true,
    // Don't hash the filename — the embed snippet references a stable URL.
    lib: {
      entry: path.resolve(import.meta.dirname, "src/widget/embed.tsx"),
      name: "NurtureNextLeadWidget",
      formats: ["iife"],
      fileName: () => "nurture-widget.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
