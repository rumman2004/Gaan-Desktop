export type DeviceType = "desktop" | "mobile";

export type ScreenshotCategory =
  | "home" | "player" | "lyrics" | "library"
  | "insights" | "rooms" | "settings" | "themes";

/**
 * "window"  -> full app screenshot, shown inside a desktop / phone frame.
 * "widget"  -> already-cropped capture (e.g. mini player). Never stretched or
 *              cropped again: it is centred, uncropped, on a soft stage.
 */
export type ScreenshotFit = "window" | "widget";

export interface ScreenshotItem {
  id: string;
  device: DeviceType;
  title: string;
  category: ScreenshotCategory;
  description: string;
  highlights: string[];
  src: string;
  fit?: ScreenshotFit; // default "window"
  badge?: string;
}

/** Labels for the tab row. Icons are mapped in ScreenshotGallery. */
export const CATEGORY_LABELS: Record<ScreenshotCategory, string> = {
  home: "Home",
  player: "Player",
  lyrics: "Lyrics",
  library: "Library",
  insights: "Insights",
  rooms: "Rooms",
  settings: "Settings",
  themes: "Themes",
};

/* Slide order = tab order. Tabs are built from the categories present, in first-seen order. */
export const DESKTOP_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "dt-home",
    device: "desktop",
    title: "Home & quick discovery",
    category: "home",
    badge: "Main window",
    description:
      "Pick up where you left off. Recent tracks, playlists made for you and mixes built from your listening sit on one calm dashboard.",
    highlights: ["Jump back in grid", "Smart playlists & mixes", "Quick actions"],
    src: "/screenshots-desktop/home.png",
  },
  {
    id: "dt-local",
    device: "desktop",
    title: "Local music library",
    category: "library",
    badge: "Local first",
    description:
      "Point Gaan at a folder and it scans, reads tags and builds your library, with instant search across songs, albums and artists.",
    highlights: ["Folder scanning", "Tag recognition & editing", "Instant search"],
    src: "/screenshots-desktop/local-music.png",
  },
  {
    id: "dt-replay",
    device: "desktop",
    title: "Gaan Replay & listening stats",
    category: "insights",
    badge: "Replay",
    description:
      "See what you actually listen to. Top artists, top tracks, total playtime and month-by-month history, all computed on your device.",
    highlights: ["Top artists & tracks", "Playtime totals", "Monthly history"],
    src: "/screenshots-desktop/replay.png",
  },
  {
    id: "dt-lyrics",
    device: "desktop",
    title: "Synced karaoke lyrics",
    category: "lyrics",
    badge: "Synced lyrics",
    description:
      "Lyrics follow the song line by line, scroll on their own, and can be nudged earlier or later when a track is slightly off.",
    highlights: ["Line-by-line highlight", "Auto-scroll", "Manual offset adjust"],
    src: "/screenshots-desktop/lyrics.png",
  },
  {
    id: "dt-queue",
    device: "desktop",
    title: "Playback queue & up next",
    category: "player",
    badge: "Queue manager",
    description:
      "Reorder the queue by dragging, clear it in one click, look back through history and let recommendations fill the gaps.",
    highlights: ["Drag-and-drop reorder", "Clear all & history", "Auto-recommendations"],
    src: "/screenshots-desktop/queue.png",
  },
  {
    id: "dt-miniplayer",
    device: "desktop",
    title: "Always-on-top mini player",
    category: "player",
    fit: "widget",
    badge: "Floating widget",
    description:
      "A compact floating player that stays above your other windows, with album art, scrubber, play/pause and a queue toggle.",
    highlights: ["Stays on top", "Scrubber & controls", "Queue toggle"],
    src: "/screenshots-desktop/miniplayer.png",
  },
  {
    id: "dt-fullscreen",
    device: "desktop",
    title: "Immersive fullscreen player",
    category: "player",
    badge: "Fullscreen",
    description:
      "A distraction-free fullscreen mode where the artwork leads and a slowly moving ambient background follows the music.",
    highlights: ["Ambient animated backdrop", "Artwork-first layout", "No chrome"],
    src: "/screenshots-desktop/fullscreen.png",
  },
  {
    id: "dt-settings",
    device: "desktop",
    title: "Audio & equalizer preferences",
    category: "settings",
    badge: "Audio",
    description:
      "Choose your output device, set crossfade length, turn on normalization and shape the sound with the equalizer.",
    highlights: ["Output device picker", "Crossfade duration", "Normalization & EQ"],
    src: "/screenshots-desktop/settings.jpg",
  },
  {
    id: "dt-theme-olive",
    device: "desktop",
    title: "Custom accent themes",
    category: "themes",
    badge: "Themes",
    description:
      "Make the app yours with multiple colour palettes, or let it follow your system accent colour.",
    highlights: ["Multiple palettes", "System accent sync", "Applies app-wide"],
    src: "/screenshots-desktop/theme-olive.png",
  },
];

export const MOBILE_SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "mb-home",
    device: "mobile",
    title: "Android home & recommendations",
    category: "home",
    badge: "Android app",
    description:
      "A clean home screen with fast access to downloads, favourites and listening history.",
    highlights: ["Downloads & favourites", "History shortcuts", "One-thumb layout"],
    src: "/screenshots-mobile/home.jpeg",
  },
  {
    id: "mb-player",
    device: "mobile",
    title: "Android now playing",
    category: "player",
    badge: "Now playing",
    description:
      "A gesture-friendly player with a lyrics toggle, audio output selector and a queue sheet that slides up from the bottom.",
    highlights: ["Lyrics toggle", "Output selector", "Queue sheet"],
    src: "/screenshots-mobile/player.jpeg",
  },
  {
    id: "mb-lyrics",
    device: "mobile",
    title: "Full-screen mobile lyrics",
    category: "lyrics",
    badge: "OLED ready",
    description:
      "Large, high-contrast lyrics made for easy reading on handheld OLED screens.",
    highlights: ["Large readable type", "High contrast", "Synced scrolling"],
    src: "/screenshots-mobile/lyrics.jpeg",
  },
  {
    id: "mb-downloads",
    device: "mobile",
    title: "Offline downloads manager",
    category: "library",
    badge: "Offline",
    description:
      "Manage downloaded albums, check storage use and choose to auto-download only over Wi-Fi.",
    highlights: ["Storage usage", "Wi-Fi-only downloads", "Per-album control"],
    src: "/screenshots-mobile/downloads.jpeg",
  },
  {
    id: "mb-listen-together",
    device: "mobile",
    title: "Listen together (synced rooms)",
    category: "rooms",
    badge: "Multiplayer",
    description:
      "Create a room or scan a QR code to hear the same track at the same moment as your friends.",
    highlights: ["Create or join a room", "QR code joining", "Exact sync"],
    src: "/screenshots-mobile/listen together.jpeg",
  },
  {
    id: "mb-ambient",
    device: "mobile",
    title: "Ambient gradient visuals",
    category: "themes",
    badge: "Ambient",
    description:
      "The backdrop picks up colours from the album art, giving dark rooms a soft, matching glow.",
    highlights: ["Adapts to album art", "Dark-friendly", "Always on"],
    src: "/screenshots-mobile/ambient mode.jpeg",
  },
  {
    id: "mb-spotify-backup",
    device: "mobile",
    title: "Backup & Spotify connect",
    category: "settings",
    badge: "Backup",
    description:
      "Export your library as a JSON backup and link public Spotify playlists with one tap.",
    highlights: ["JSON library export", "Spotify public playlists", "One-tap link"],
    src: "/screenshots-mobile/spotify connect and music backup.jpeg",
  },
];