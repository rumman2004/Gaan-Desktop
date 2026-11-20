import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const isWin = process.platform === "win32";
const electronBin = isWin
  ? path.join(root, "node_modules", "electron", "dist", "electron.exe")
  : path.join(root, "node_modules", ".bin", "electron");

const DEBUG_PORT = 9444;

const profile = mkdtempSync(path.join(os.tmpdir(), "GAAN-shots-"));
const dataDir = path.join(profile, "userdata", "data");
mkdirSync(dataDir, { recursive: true });

writeFileSync(path.join(profile, ".GAAN-install"), new Date().toISOString());
writeFileSync(
  path.join(dataDir, "profile.json"),
  JSON.stringify({ deviceId: "dev_shots", createdAt: Date.now(), mode: "guest" })
);

const sampleTracks = [
  { id: "m83_mc", title: "Midnight City", artist: "M83", duration: 243, thumb: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300" },
  { id: "home_res", title: "Resonance", artist: "HOME", duration: 212, thumb: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300" },
  { id: "kav_nc", title: "Nightcall", artist: "Kavinsky", duration: 259, thumb: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=300" },
  { id: "mid_dot", title: "Days of Thunder", artist: "The Midnight", duration: 329, thumb: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
  { id: "gun_tn", title: "Tech Noir", artist: "GUNSHIP", duration: 297, thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" }
];

writeFileSync(
  path.join(dataDir, "player.json"),
  JSON.stringify({
    state: {
      queue: sampleTracks,
      index: 0,
      position: 72,
      volume: 0.9,
      muted: false,
      shuffle: false,
      repeat: "off",
    },
    version: 0,
  })
);

writeFileSync(
  path.join(dataDir, "library.json"),
  JSON.stringify({
    state: {
      liked: [sampleTracks[0], sampleTracks[1]],
      playlists: [
        {
          id: "pl_synthwave",
          name: "Synthwave Nights",
          tracks: sampleTracks,
          createdAt: Date.now() - 86400000,
        }
      ],
      folders: [],
      followedArtists: [],
      history: sampleTracks,
      downloads: {},
      pinnedSingles: { liked: true, spotify: true, replay: true, downloads: true, local: true, v2: true },
    },
    version: 0,
  })
);

writeFileSync(
  path.join(dataDir, "settings.json"),
  JSON.stringify({
    state: {
      theme: "dark",
      aiSmartShuffle: true,
      aiProvider: "auto",
      streamingQuality: "high",
    },
    version: 0,
  })
);

const env = { ...process.env, GAAN_GUI_PROFILE: profile, GAAN_ALLOW_MULTI: "1", ELECTRON_ENABLE_LOGGING: "1" };
delete env.ELECTRON_RUN_AS_NODE;

const child = spawn(electronBin, ["scripts/gui-launcher.cjs", `--remote-debugging-port=${DEBUG_PORT}`], {
  cwd: root,
  env,
  stdio: ["ignore", "pipe", "pipe"],
});

child.stdout.on("data", (d) => {
  const s = d.toString();
  if (!s.includes("lyrics")) console.log(`[electron:out] ${s.trim()}`);
});
child.stderr.on("data", (d) => {
  const s = d.toString();
  if (!s.includes("Not implemented") && !s.includes("ParsingError")) console.log(`[electron:err] ${s.trim()}`);
});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findPageTarget(timeoutMs = 40000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page" && !t.url.includes("window=pip"));
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(400);
  }
  throw new Error("no CDP page target");
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
    return new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression) {
    const r = await this.send("Runtime.evaluate", { expression, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  }
}

async function capture(cdp, filename) {
  console.log(`[capture] Taking ${filename}...`);
  const res = await cdp.send("Page.captureScreenshot", {
    format: "jpeg",
    quality: 92,
  });
  const outPath = path.join(root, "docs", "screenshots", filename);
  writeFileSync(outPath, Buffer.from(res.data, "base64"));
  console.log(`[capture] Saved ${outPath}`);
}

try {
  console.log("[capture] Connecting to CDP...");
  const wsUrl = await findPageTarget();
  const cdp = new Cdp(wsUrl);
  await cdp.ready();
  console.log("[capture] CDP connected!");

  // Wait for window.__stores to become available
  const deadline = Date.now() + 30000;
  while (!(await cdp.eval(`(() => !!window.__stores)()`))) {
    if (Date.now() > deadline) throw new Error("window.__stores timed out");
    await sleep(300);
  }
  console.log("[capture] App stores mounted!");

  await sleep(2500);

  // 1. Home View (Dark)
  await cdp.eval(`(() => {
    window.__stores.useSettings.getState().setTheme('dark');
    window.__stores.useUI.getState().navigate({ name: 'home' });
  })()`);
  await sleep(1500);
  await capture(cdp, "home.jpg");

  // 2. Settings View: Smart Recommendations & AI Provider
  await cdp.eval(`(() => {
    window.__stores.useUI.getState().navigate({ name: 'settings', param: 'ai' });
    const scroll = document.getElementById('view-scroll');
    if (scroll) scroll.scrollTop = 0;
  })()`);
  await sleep(1500);
  await capture(cdp, "settings.jpg");

  // 3. Settings View: Appearance Theme Switcher
  await cdp.eval(`(() => {
    window.__stores.useUI.getState().navigate({ name: 'settings', param: 'display' });
    const scroll = document.getElementById('view-scroll');
    if (scroll) scroll.scrollTop = 0;
  })()`);
  await sleep(1500);
  await capture(cdp, "settings-appearance.jpg");

  // 4. Olive Green & Beige Cream Theme
  await cdp.eval(`(() => {
    window.__stores.useSettings.getState().setTheme('olive');
    window.__stores.useUI.getState().navigate({ name: 'home' });
  })()`);
  await sleep(1500);
  await capture(cdp, "theme-olive.jpg");

  // 5. Rose Velvet (Pookie) Theme
  await cdp.eval(`(() => {
    window.__stores.useSettings.getState().setTheme('pookie');
    window.__stores.useUI.getState().navigate({ name: 'home' });
  })()`);
  await sleep(1500);
  await capture(cdp, "theme-pookie.jpg");

  // 6. Playlist View with AI Recommendations
  await cdp.eval(`(() => {
    window.__stores.useSettings.getState().setTheme('dark');
    window.__stores.useUI.getState().navigate({ name: 'playlist', param: 'pl_synthwave' });
  })()`);
  await sleep(4000); // wait for recommendations query
  await cdp.eval(`(() => {
    const scroll = document.getElementById('view-scroll');
    if (scroll) scroll.scrollTop = 280;
  })()`);
  await sleep(1000);
  await capture(cdp, "ai-playlist.jpg");

  console.log("[capture] All screenshots captured successfully!");
} catch (err) {
  console.error("[capture] Error:", err);
} finally {
  try {
    if (isWin) {
      spawn("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });
    } else {
      child.kill("SIGTERM");
    }
  } catch {}
  process.exit(0);
}
