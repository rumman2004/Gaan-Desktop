/** Central map of the existing card and section backgrounds. */
export type BackgroundEffectName =
  | "pixelBlast"
  | "gradientAscii"
  | "fluxLines"
  | "webThreads"
  | "shapeGrid"
  | "dotGrid"
  | "rippleGrid"
  | "softAurora";

export const CARD_BACKGROUNDS = {
  objective: {
    "Listening without a subscription": "pixelBlast",
    "Local music belongs here": "dotGrid",
    "Open source, in the open": "gradientAscii",
  },
  features: {
    "Playlist Import": "shapeGrid",
    "Listen Together": "webThreads",
    "Playback Modes": "rippleGrid",
    "Playback Controls": "fluxLines",
    "Local Music": "dotGrid",
    "Mini Player": "webThreads",
    "GPL-3.0 Source": "gradientAscii",
  },
  playback: {
    "Smooth Crossfade": "fluxLines",
    "Smart Automix": "webThreads",
    "Tempo & Pitch Control": "shapeGrid",
    "Sleep Timer": "softAurora",
    "Streaming Quality": "dotGrid",
  },
  desktop: {
    "Media Keys": "fluxLines",
    "Native Window Controls": "dotGrid",
    "Tray Integration": "shapeGrid",
    "Quick Access": "webThreads",
  },
  library: {
    "Sync that follows you": "webThreads",
    "Readable backups": "gradientAscii",
    "Replay, honestly counted": "pixelBlast",
  },
  privacy: {
    "Zero Telemetry": "rippleGrid",
    "Local playback": "dotGrid",
    "Spotify Import": "softAurora",
  },
  sections: { githubStats: "softAurora" },
} as const satisfies {
  objective: Record<string, BackgroundEffectName>;
  features: Record<string, BackgroundEffectName>;
  playback: Record<string, BackgroundEffectName>;
  desktop: Record<string, BackgroundEffectName>;
  library: Record<string, BackgroundEffectName>;
  privacy: Record<string, BackgroundEffectName>;
  sections: Record<string, BackgroundEffectName>;
};
