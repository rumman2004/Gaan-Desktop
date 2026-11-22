import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const electronBin = path.join(root, "node_modules", "electron", "dist", "electron.exe");
const artifactDir = "C:\\Users\\Admin\\.gemini\\antigravity\\brain\\d082cceb-e0e2-40eb-b637-824041134c9f";
mkdirSync(artifactDir, { recursive: true });

const DEBUG_PORT = 9555;
const env = { ...process.env };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronBin, ["--remote-debugging-port=" + DEBUG_PORT, "--headless", "http://localhost:5174/"], {
  cwd: root,
  env,
  stdio: "ignore",
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findPageTarget(timeoutMs = 15000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(300);
  }
  throw new Error("no CDP target");
}

class Cdp {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.id = 0;
    this.pending = new Map();
    this.ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      }
    };
  }
  ready() {
    return new Promise((res, rej) => {
      this.ws.onopen = res;
      this.ws.onerror = rej;
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
}

try {
  const wsUrl = await findPageTarget();
  const cdp = new Cdp(wsUrl);
  await cdp.ready();

  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1.5,
    mobile: false,
  });

  await sleep(2500); // Wait for animations & renders to settle

  // 1. Hero snapshot
  const heroShot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
  writeFileSync(path.join(artifactDir, "website-hero-preview.jpg"), Buffer.from(heroShot.data, "base64"));

  // 2. Scroll to Themes section
  await cdp.send("Runtime.evaluate", {
    expression: `document.getElementById('themes')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
  });
  await sleep(1000);
  const themeShot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
  writeFileSync(path.join(artifactDir, "website-themes-preview.jpg"), Buffer.from(themeShot.data, "base64"));

  // 3. Scroll to Mobile app section
  await cdp.send("Runtime.evaluate", {
    expression: `document.getElementById('mobile')?.scrollIntoView({ behavior: 'instant', block: 'start' });`
  });
  await sleep(1000);
  const mobileShot = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 90 });
  writeFileSync(path.join(artifactDir, "website-mobile-preview.jpg"), Buffer.from(mobileShot.data, "base64"));

  console.log("Snapshots saved successfully!");
} catch (err) {
  console.error("Snap error:", err);
} finally {
  try {
    spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
  } catch {}
  process.exit(0);
}
