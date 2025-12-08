import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(), // ✅ Enables CRA-style SVG imports
  ],
  server: {
    port: 3002,
    open: true,
  },
  build: {
    outDir: "build",
  },
});
