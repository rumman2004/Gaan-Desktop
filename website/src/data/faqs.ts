export type FAQCategoryKey =
  | "all"
  | "general"
  | "installation"
  | "account"
  | "playback"
  | "library"
  | "rooms"
  | "troubleshooting";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategoryKey;
}

export const FAQS: FAQItem[] = [
  {
    id: "what-is-gaan",
    question: "What is Gaan?",
    answer: "Gaan brings online music, your own files, playlists and synced lyrics together in one music player. Desktop releases are available for Windows and macOS, with a companion Android app.",
    category: "general",
  },
  {
    id: "is-gaan-free",
    question: "Is Gaan free to use?",
    answer: "Yes. Gaan is free to download and use, and its source is published under GPL-3.0. There are no ads, subscriptions or paid tiers. You can use the player as a guest; a free account is only needed for Gaan Rooms.",
    category: "general",
  },
  {
    id: "open-source",
    question: "Is all of Gaan open source?",
    answer: "The Gaan Desktop source is public on GitHub under GPL-3.0, and the Android app has a public source repository too. You can inspect the code, report issues and contribute. [View Gaan Desktop source](https://github.com/rumman2004/Gaan-Desktop) · [View Android source](https://github.com/rumman2004/Gaan)",
    category: "general",
  },
  {
    id: "privacy-and-download-safety",
    question: "Does Gaan collect analytics, and where should I download it?",
    answer: "Gaan's website does not use analytics scripts or tracking pixels. Library paths and downloads stay on your device; optional account features sync the supported data described in the privacy information. Download desktop builds from this site's Downloads section or the official [Gaan Desktop GitHub Releases](https://github.com/rumman2004/Gaan-Desktop/releases). The installers are not code-signed, so Windows SmartScreen or macOS Gatekeeper may show a first-launch warning.",
    category: "account",
  },
  {
    id: "system-requirements",
    question: "What devices and system versions does Gaan support?",
    answer: "Gaan Desktop supports 64-bit Windows 10 version 1903 or later and Windows 11, with 4 GB RAM and 200 MB of disk space. On Mac, it supports macOS 12 or later on Intel and Apple Silicon. The Android app supports Android 8.0 or later. Current packages and platform-specific installation steps are listed in the Downloads section.",
    category: "installation",
  },
  {
    id: "mobile-apps",
    question: "Is there an Android or iOS version?",
    answer: "Gaan has an Android app for Android 8.0 and newer. There is no iPhone or iPad release at this time. Check the official releases for current availability.",
    category: "installation",
  },
  {
    id: "local-file-support",
    question: "Can I add my own music, and which formats work?",
    answer: "Yes. Add your local music folders to the library and play supported formats including MP3, AAC/M4A, FLAC, ALAC, WAV, AIFF, OGG Vorbis and Opus. Gaan reads supported tags and embedded album artwork. Local files remain available offline.",
    category: "library",
  },
  {
    id: "gaan-vs-local-players",
    question: "When should I choose Gaan over a local music player?",
    answer: "Choose Gaan if you want online listening and your local collection in one app, with playlists, lyrics and cross-device features. If you only play files you own and want a long-established, local-library-focused player, MusicBee or foobar2000 may suit you better.",
    category: "general",
  },
  {
    id: "online-listening-offline",
    question: "Does online listening work offline?",
    answer: "Online listening and discovery need an internet connection. Music stored on your device, and songs you have downloaded, can play offline.",
    category: "playback",
  },
  {
    id: "spotify-playlist-import",
    question: "Can I import a Spotify playlist?",
    answer: "Yes. Paste a supported public playlist link from Spotify or YouTube Music into Gaan's import flow. Gaan looks for matching tracks in supported online sources and your local library; tracks it cannot match may not be available. Public playlist imports do not require Spotify sign-in.",
    category: "library",
  },
  {
    id: "gaan-rooms",
    question: "How does listening together in Gaan Rooms work?",
    answer: "Rooms let people listen together in sync using a shared queue. Create or join a Room with a free Gaan account, then invite friends with the room's join details. Room playback uses supported online tracks; local files are not shared with other listeners.",
    category: "rooms",
  },
  {
    id: "lyrics-sources",
    question: "Where do Gaan's synced lyrics come from?",
    answer: "Gaan checks supported lyric providers, including LRCLIB and other public sources. The available timing can vary by track and provider: some lyrics sync word by word, others line by line, and some may not be available. You can adjust lyric timing when needed.",
    category: "playback",
  },
  {
    id: "account-required",
    question: "Do I need an account to use Gaan?",
    answer: "No. Guest mode includes the core player, online listening, local files, lyrics and playlist imports. Create a free account if you want supported library data and settings to sync between computers, or if you want to use Gaan Rooms. Local file paths, downloads and secrets stay on your device, and you can export supported library data and settings to a backup.",
    category: "account",
  },
  {
    id: "update-gaan",
    question: "How do I get the latest Gaan release?",
    answer: "The Downloads section shows the current packages for Windows, macOS and Android and links to the official release pages. You can also check [Gaan Desktop Releases on GitHub](https://github.com/rumman2004/Gaan-Desktop/releases) or the [Android releases](https://github.com/rumman2004/Gaan/releases) for the latest version and release notes.",
    category: "installation",
  },
  {
    id: "official-downloads",
    question: "Where is the official Gaan download?",
    answer: "Use the Downloads section on this site or download from the official GitHub release pages: [Gaan Desktop](https://github.com/rumman2004/Gaan-Desktop/releases) and [Gaan for Android](https://github.com/rumman2004/Gaan/releases). Check the repository and release details before installing a build from another source.",
    category: "installation",
  },
  {
    id: "install-gaan",
    question: "How do I install Gaan on Windows, macOS or Android?",
    answer: "Choose your platform and package in the Downloads section for the current step-by-step instructions. Windows uses an .exe installer; macOS uses a .dmg for Intel or Apple Silicon; Android uses an APK. Because desktop releases are not code-signed, Windows SmartScreen or macOS Gatekeeper may ask you to confirm the first launch. Your library data is designed to remain available across reinstalls; export a backup before making major changes.",
    category: "installation",
  },
];
