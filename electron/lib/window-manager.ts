import { BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class WindowManager {
  private windows: Map<string, BrowserWindow>;

  constructor(private rendererDist: string, private devServerUrl?: string) {
    this.windows = new Map<string, BrowserWindow>();
  }

  private loadWindowContent(window: BrowserWindow, name: string): void {
    if (this.devServerUrl) {
      window.loadURL(`${this.devServerUrl}#/${name}`);
    } else {
      window.loadFile(path.join(this.rendererDist, "index.html"), {
        hash: name,
      });
    }
  }

  private setupWindowListeners(window: BrowserWindow, name: string): void {
    window.on("closed", () => {
      this.windows.delete(name);
    });
  }

  hideWindow(name: string): void {
    const window = this.windows.get(name);
    if (window) {
      window.hide();
    }
  }

  closeWindow(name: string): void {
    const window = this.windows.get(name);
    if (window) {
      window.close();
    }
  }

  sendUnreadyEvent(name: string, channel: string, ...args: any[]) {
    const window = this.windows.get(name);
    if (window) {
      window.webContents.send(channel, ...args);
    }
  }

  sendEvent(name: string, channel: string, ...args: any[]): void {
    const window = this.windows.get(name);
    if (window) {
      window.webContents.once("did-finish-load", () => {
        window.webContents.send(channel, ...args);
      });
    }
  }

  getAllWindows(): BrowserWindow[] {
    return Array.from(this.windows.values());
  }

  createWindow(name: string, options: BrowserWindowConstructorOptions): void {
    const window = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC!, "electron-vite.svg"),
      webPreferences: {
        preload: path.join(__dirname, "preload.mjs"),
      },
      frame: false,
      ...options,
    });

    this.loadWindowContent(window, name);
    this.setupWindowListeners(window, name);
    this.windows.set(name, window);
  }
}
