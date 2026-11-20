/**
 * Compiles the Windows media-session helper (electron/media-helper.cs) into
 * dist-electron/GaanMedia.exe with the C# compiler that ships with every
 * Windows 10/11 (.NET Framework 4.x) — no SDK or Visual Studio needed.
 * No-op elsewhere: the helper is Windows only (electron/media-controls.ts).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

if (process.platform === "win32") {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  const outExe = path.join(root, "dist-electron", "GaanMedia.exe");
  const srcCs = path.join(root, "electron", "media-helper.cs");

  // Only recompile if output doesn't exist or source is newer
  if (fs.existsSync(outExe) && fs.existsSync(srcCs)) {
    try {
      if (fs.statSync(outExe).mtimeMs >= fs.statSync(srcCs).mtimeMs) {
        process.exit(0);
      }
    } catch {
      /* continue to build */
    }
  }

  const windir = process.env.WINDIR || "C:\\Windows";
  const framework = path.join(windir, "Microsoft.NET", "Framework64", "v4.0.30319");
  const winmd = path.join(windir, "System32", "WinMetadata");
  try {
    execFileSync(
      path.join(framework, "csc.exe"),
      [
        "/nologo",
        "/target:winexe",
        "/optimize+",
        `/out:${outExe}`,
        ...["Windows.Foundation.winmd", "Windows.Media.winmd", "Windows.Storage.winmd"].map((f) => `/reference:${path.join(winmd, f)}`),
        ...["System.Runtime.dll", "System.Runtime.InteropServices.WindowsRuntime.dll", "System.Web.Extensions.dll"].map(
          (f) => `/reference:${path.join(framework, f)}`
        ),
        srcCs,
      ],
      { stdio: "inherit" }
    );
  } catch (err) {
    if (fs.existsSync(outExe)) {
      console.warn("[build-media-helper] GaanMedia.exe is currently in use; keeping existing binary.");
    } else {
      throw err;
    }
  }
}
