export interface ShortcutGroup {
  category: string;
  shortcuts: {
    action: string;
    description: string;
    keysWin: string[];
    keysMac: string[];
  }[];
}

const same = (key: string) => ({ keysWin: [key], keysMac: [key] });

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    category: "Playback",
    shortcuts: [
      { action: "Play / Pause", description: "Toggle playback", ...same("Space") },
      { action: "Seek Back 5 seconds", description: "Move back in the current track", ...same("←") },
      { action: "Seek Forward 5 seconds", description: "Move forward in the current track", ...same("→") },
      { action: "Volume Up / Down", description: "Adjust playback volume", keysWin: ["↑ / ↓"], keysMac: ["↑ / ↓"] },
      { action: "Shuffle", description: "Toggle shuffle", ...same("S") },
      { action: "Repeat", description: "Cycle repeat mode", ...same("R") },
      { action: "Mute", description: "Toggle mute", ...same("M") },
      { action: "Previous / Next", description: "Change track", keysWin: ["Shift", "← / →"], keysMac: ["Shift", "← / →"] },
    ],
  },
  {
    category: "Navigation",
    shortcuts: [
      { action: "Queue", description: "Open the queue", ...same("Q") },
      { action: "Lyrics", description: "Open lyrics", ...same("L") },
      { action: "Search", description: "Focus search", ...same("/") },
      { action: "Now Playing", description: "Return to the current track", ...same("N") },
    ],
  },
];
