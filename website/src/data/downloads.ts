export type TargetPlatform = "windows" | "mac" | "android";
export type Architecture = "x64" | "arm64" | "universal";

export interface PlatformDownloadInfo {
  platform: TargetPlatform;
  displayName: string;
  badge: string;
  icon: string;
  architectures: {
    arch: Architecture;
    label: string;
    description: string;
    recommended?: boolean;
    fileExtension: string;
    downloadUrl: string;
  }[];
  systemRequirements: string;
  installGuide: {
    step: number;
    title: string;
    instruction: string;
  }[];
}

export const DOWNLOAD_PLATFORMS: Record<TargetPlatform, PlatformDownloadInfo> = {
  windows: {
    platform: "windows",
    displayName: "Windows",
    badge: "Windows 10 / 11",
    icon: "windows",
    architectures: [
      {
        arch: "x64",
        label: "Windows 64-bit (.exe)",
        description: "Standard installer for Intel & AMD 64-bit processors",
        recommended: true,
        fileExtension: ".exe",
        downloadUrl: "https://github.com/rumman2004/Gaan-Desktop/releases/latest",
      },
    ],
    systemRequirements: "Windows 10 (version 1903+) or Windows 11. 4 GB RAM, 200 MB disk space.",
    installGuide: [
      {
        step: 1,
        title: "Download Installer",
        instruction: "Click 'Download for Windows' to get the latest Gaan-Setup.exe installer.",
      },
      {
        step: 2,
        title: "Run Setup",
        instruction: "Open the downloaded .exe. If prompted by SmartScreen, click 'More info' and 'Run anyway'.",
      },
      {
        step: 3,
        title: "Start Listening",
        instruction: "Launch Gaan from your Start Menu or Desktop shortcut. Point it to your music directory.",
      },
    ],
  },
  mac: {
    platform: "mac",
    displayName: "macOS",
    badge: "macOS 12+",
    icon: "mac",
    architectures: [
      {
        arch: "arm64",
        label: "Apple Silicon (.dmg)",
        description: "Native build for Apple Silicon M1, M2, M3, M4 chips",
        recommended: true,
        fileExtension: ".dmg",
        downloadUrl: "https://github.com/rumman2004/Gaan-Desktop/releases/latest",
      },
      {
        arch: "x64",
        label: "Intel x86_64 (.dmg)",
        description: "Native build for Intel-based MacBooks & iMacs",
        recommended: false,
        fileExtension: ".dmg",
        downloadUrl: "https://github.com/rumman2004/Gaan-Desktop/releases/latest",
      },
    ],
    systemRequirements: "macOS Monterey (12.0) or later. Compatible with M1/M2/M3/M4 & Intel Macs.",
    installGuide: [
      {
        step: 1,
        title: "Download Disk Image",
        instruction: "Select Apple Silicon (M-series) or Intel, then download the .dmg file.",
      },
      {
        step: 2,
        title: "Drag to Applications",
        instruction: "Open the downloaded DMG disk image and drag Gaan.app into your Applications folder.",
      },
      {
        step: 3,
        title: "Initial Launch",
        instruction: "On first launch, if Gatekeeper warns about an open-source app, open System Settings > Privacy & Security > Click 'Open Anyway'.",
      },
    ],
  },
  android: {
    platform: "android",
    displayName: "Android",
    badge: "Android 8.0+",
    icon: "android",
    architectures: [
      {
        arch: "arm64",
        label: "ARM64-v8a (.apk)",
        description: "Optimized for modern Android smartphones & tablets",
        recommended: false,
        fileExtension: ".apk",
        downloadUrl: "https://github.com/rumman2004/Gaan/releases/latest/download/Gaan-arm64.apk",
      },
      {
        arch: "universal",
        label: "Universal APK",
        description: "Compatible with all Android processor architectures",
        recommended: true,
        fileExtension: ".apk",
        downloadUrl: "https://github.com/rumman2004/Gaan/releases/latest/download/Gaan.apk",
      },
    ],
    systemRequirements: "Android 8.0 (Oreo) or later. Works on phones, tablets, and Android-based DAPs.",
    installGuide: [
      {
        step: 1,
        title: "Download APK",
        instruction: "Download the recommended Universal APK directly to your Android device.",
      },
      {
        step: 2,
        title: "Allow Unknown Sources",
        instruction: "If prompted, permit your browser to install unknown apps in device settings.",
      },
      {
        step: 3,
        title: "Install & Enjoy",
        instruction: "Tap 'Install', grant audio storage permission, and start playing your music.",
      },
    ],
  },
};
