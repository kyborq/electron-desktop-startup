import path from "node:path";
import { defineConfig } from "vite";
import electron from "vite-plugin-electron/simple";
import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "",
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src"),
      "@electron": path.resolve(__dirname, "./electron"),
      "@models": path.resolve(__dirname, "./models"),
    },
  },
  plugins: [
    svgr(),
    react(),
    electron({
      main: {
        entry: "electron/main.ts",
      },
      preload: {
        input: path.join(__dirname, "electron/preload.ts"),
      },
      renderer: process.env.NODE_ENV === "test" ? undefined : {},
    }),
  ],
});
