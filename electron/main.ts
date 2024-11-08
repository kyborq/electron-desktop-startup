import { fileURLToPath } from "node:url";
import { app } from "electron";
import path from "node:path";

import { WindowManager } from "./lib/window-manager";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const APP_ROOT = path.join(__dirname, "..");
const RENDERER_DIST = path.join(APP_ROOT, "dist");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(APP_ROOT, "public")
  : RENDERER_DIST;

const windowManager = new WindowManager(RENDERER_DIST, VITE_DEV_SERVER_URL);

app.on("ready", async () => {
  windowManager.createWindow("setup", {
    width: 320,
    height: 420,
    resizable: false,
    maximizable: false,
  });
  return;
});
