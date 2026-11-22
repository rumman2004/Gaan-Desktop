export type FeatureCategoryKey =
  | "all"
  | "playback"
  | "library"
  | "lyrics"
  | "personalization"
  | "productivity"
  | "connectivity";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: string;
  highlight?: boolean;
  categories: FeatureCategoryKey[];
}

export const FEATURE_CATEGORIES = [
  { key: "all" as FeatureCategoryKey, label: "All Features", iconName: "LayoutGrid" },
  { key: "playback" as FeatureCategoryKey, label: "Playback & Audio", iconName: "Play" },
  { key: "library" as FeatureCategoryKey, label: "Library & Local", iconName: "BookOpen" },
  { key: "lyrics" as FeatureCategoryKey, label: "Synced Lyrics", iconName: "Music" },
  { key: "personalization" as FeatureCategoryKey, label: "Personalization", iconName: "SlidersHorizontal" },
  { key: "productivity" as FeatureCategoryKey, label: "Productivity", iconName: "Zap" },
  { key: "connectivity" as FeatureCategoryKey, label: "Connectivity", iconName: "Users" },
];

export const ALL_FEATURES: FeatureItem[] = [
  // Playback
  {
    id: "advanced-playback",
    title: "Advanced Audio Playback",
    description: "Gapless audio engine with instant seek, scrub, volume curve and media keys integration.",
    iconName: "Play",
    categories: ["playback"],
  },
  {
    id: "equalizer",
    title: "10-Band Equalizer",
    description: "Customizable 10-band graphic equalizer with pre-tuned audio presets (Bass Boost, Vocal, Acoustic, Club).",
    iconName: "SlidersVertical",
    badge: "10 Bands",
    highlight: true,
    categories: ["playback", "personalization"],
  },
  {
    id: "crossfade",
    title: "Smooth Crossfade & Automix",
    description: "Configurable crossfade duration up to 12s so songs transition seamlessly into one another without abrupt silence.",
    iconName: "Shuffle",
    categories: ["playback"],
  },
  {
    id: "pitch-speed",
    title: "Playback Speed & Pitch",
    description: "Independent playback rate control from 0.5x to 2.0x with optional pitch preservation.",
    iconName: "Gauge",
    categories: ["playback", "personalization"],
  },
  {
    id: "sleep-timer",
    title: "Smart Sleep Timer",
    description: "Fade out smoothly after specified minutes or at the exact end of the currently playing track.",
    iconName: "Clock",
    categories: ["playback", "productivity"],
  },

  // Library
  {
    id: "local-files",
    title: "Local Music Scanner",
    description: "Fast multi-threaded folder scanner that auto-indexes FLAC, MP3, WAV, AAC, M4A, OGG and OPUS with cover art.",
    iconName: "Folder",
    highlight: true,
    categories: ["library"],
  },
  {
    id: "playlists-management",
    title: "Full Playlist Management",
    description: "Create, reorder, export and import playlists with drag-and-drop support and smart sorting.",
    iconName: "ListMusic",
    categories: ["library"],
  },
  {
    id: "playlist-import",
    title: "Spotify & YT Music Import",
    description: "Paste any public playlist link from Spotify or YouTube Music to import the entire song list in seconds.",
    iconName: "Download",
    badge: "Public Links",
    categories: ["library", "connectivity"],
  },
  {
    id: "replay-analytics",
    title: "Replay Listening Stats",
    description: "Privacy-preserving local stats that calculate your top artists, tracks, genres and weekly listening minutes.",
    iconName: "BarChart3",
    categories: ["library", "personalization"],
  },

  // Lyrics
  {
    id: "synced-lyrics",
    title: "Time-Synced Lyrics",
    description: "Real-time scrolling karaoke lyrics that highlight active phrases word-for-word in sync with the song.",
    iconName: "FileText",
    highlight: true,
    categories: ["lyrics"],
  },
  {
    id: "multi-lyrics-source",
    title: "Multiple Lyrics Providers",
    description: "Aggregates lyrics across LRCLIB and multiple public databases for maximum track coverage.",
    iconName: "Database",
    categories: ["lyrics", "connectivity"],
  },
  {
    id: "timing-adjust",
    title: "Offset Timing Calibration",
    description: "Adjust lyric delay or advance in 100ms increments to achieve millisecond-perfect timing for any recording.",
    iconName: "SlidersHorizontal",
    categories: ["lyrics", "personalization"],
  },

  // Productivity & Desktop
  {
    id: "miniplayer",
    title: "Floating Mini Player",
    description: "Compact, always-on-top floating player with complete playback controls, album art, and draggable positioning.",
    iconName: "Monitor",
    categories: ["productivity", "personalization"],
  },
  {
    id: "offline-cache",
    title: "Offline Storage",
    description: "Download online audio streams to local cache for uninterrupted playback while traveling or offline.",
    iconName: "DownloadCloud",
    categories: ["productivity"],
  },
  {
    id: "listen-together",
    title: "Listen Together (Rooms)",
    description: "Create peer-to-peer audio rooms to listen to songs simultaneously with friends in real-time.",
    iconName: "Users",
    badge: "Multiplayer",
    categories: ["connectivity"],
  },
  {
    id: "keyboard-shortcuts",
    title: "Universal Hotkeys",
    description: "Global and in-app keyboard shortcuts for volume, navigation, queue management, and quick search.",
    iconName: "Keyboard",
    categories: ["productivity"],
  },
];
