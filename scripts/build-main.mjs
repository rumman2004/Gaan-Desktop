/**
 * Bundles the Electron main process and preload into dist-electron/, with GAAN's Supabase project
 * baked in from GAAN_SUPABASE_URL and GAAN_SUPABASE_KEY: the environment (CI secrets) or a local,
 * uncommitted .env (see .env.example). The source carries neither, so a copy of this code doesn't come
 * wired to GAAN's database. Without them the app runs guest-only; a release build (GAAN_RELEASE=1)
 * refuses to, so no official build ships without accounts.
 */
import { build } from "esbuild";

try {
  process.loadEnvFile(".env"); // values already in the environment win
} catch {
  /* no .env: CI, or a build without GAAN's project */
}
const url = process.env.GAAN_SUPABASE_URL ?? "";
const key = process.env.GAAN_SUPABASE_KEY ?? "";
if (!url || !key) {
  if (process.env.GAAN_RELEASE === "1") {
    console.error("Release build without GAAN_SUPABASE_URL / GAAN_SUPABASE_KEY: accounts would be off. Add them to .env (or CI secrets).");
    process.exit(1);
  }
  console.warn("[build-main] No Supabase project set (.env): this build runs guest-only.");
}

await build({
  entryPoints: ["electron/main.ts", "electron/preload.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  external: ["electron", "jsdom", "undici"],
  outdir: "dist-electron",
  define: {
    "process.env.GAAN_SUPABASE_URL": JSON.stringify(url),
    "process.env.GAAN_SUPABASE_KEY": JSON.stringify(key),
  },
  logLevel: "warning",
});
