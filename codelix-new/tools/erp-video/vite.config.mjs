/* Builds the video stage on its own; it is not part of the site build.
   npx vite build --config tools/erp-video/vite.config.mjs
   then: python tools/erp-video/render.py <edition> */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: here,
  base: "./",
  plugins: [react()],
  build: { outDir: "dist", emptyOutDir: true, assetsInlineLimit: 0 },
  logLevel: "warn",
});
