# GAAN: Free, Open-Source Spotify Alternative with AI Recommendations for Windows & macOS

![GAAN YouTube Music desktop app for Windows and macOS — home feed with Jump back in, library sidebar, now-playing panel and player bar](docs/screenshots/home.jpg)

**GAAN is a free, open-source music player for Windows and macOS: the YouTube Music catalog and your own local files in one app, with no ads, no subscription, word-synced lyrics, aesthetic themes, and AI-powered recommendations.** Bring your Spotify playlists over, listen together with friends in Rooms, customize your look with designer themes, and enjoy AI smart shuffle powered by Gemini, Groq, Cohere, and OpenAI.

**[Download](#installation)** · **[Website](https://gaan.space/)** · **[Releases](https://github.com/rumman2004/Gaan-Desktop/releases)** · **[Contributing](CONTRIBUTING.md)** · **[License](#license)**

[![Latest release](https://img.shields.io/github/v/release/rumman2004/Gaan-Desktop?label=release&color=a8324a)](https://github.com/rumman2004/Gaan-Desktop/releases/latest)
[![Downloads](https://img.shields.io/github/downloads/rumman2004/Gaan-Desktop/total?label=downloads&color=a8324a)](https://github.com/rumman2004/Gaan-Desktop/releases)
[![Stars](https://img.shields.io/github/stars/rumman2004/Gaan-Desktop?color=a8324a)](https://github.com/rumman2004/Gaan-Desktop/stargazers)
[![License](https://img.shields.io/github/license/rumman2004/Gaan-Desktop?color=a8324a)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%2010%2F11%20·%20macOS%2013%2B-1f6f5c)](#installation)

---

## What is GAAN?

GAAN is a modern desktop music player for Windows and macOS, built with Electron, React and TypeScript. It streams YouTube Music's public catalog without requiring a Google sign-in, plays your local files (MP3, M4A/AAC, FLAC, WAV, OGG, Opus) side by side in the same library, and delivers a true desktop experience: one unified queue, word-synced lyrics, playlist management, mini player (PiP), listening stats, and keyboard shortcuts.

### Highlights

- **AI-Enhanced Queue & Smart Shuffle** — Multi-tier auto-cascade intelligence powered by Google Gemini, Groq (ultra-fast LPU), Cohere, and OpenAI/xingchiapi. Seamlessly reorders upcoming queue tracks into harmonic vibe flow and surfaces fresh discoveries.
- **Playlist AI Recommendations** — Inside any playlist, GAAN analyzes track vibes and curates 5 tailor-made song recommendations with instant one-click additions and infinite shuffle refresh.
- **Aesthetic Designer Themes** — Choose between **System**, **Dark**, **Light**, 🌿 **Olive Green & Beige Cream** (`#4D694E` & `#FFF3D5`), and 💖 **Rose Velvet / Pookie** (Grapefruit `#DA6C81`, Vanilla `#F5E9D0`, Raspberry `#BF2B54`).
- **YouTube Music on the desktop** — Explore moods, genres, podcasts, and search across songs, videos, albums, artists, and playlists without account requirements.
- **Word-synced lyrics** — Real-time line and word highlighting in sync with your music; pulls from 13 sources including LRCLIB and Musixmatch with per-track timing offsets.
- **Rooms (Listen Together)** — Sync playback with up to 10 friends in real-time, hearing the exact same song at the same second.
- **Spotify playlist import** — Paste any public Spotify playlist link or text list, and GAAN maps every track to YouTube Music automatically.
- **Endless AutoPlay** — Keeps music playing smoothly with context-aware recommendations when your queue finishes.
- **Fullscreen Now Playing** — Immersive artwork, live audio visualizer, dynamic cover glow, and synchronized lyrics.
- **Mini Player (Picture-in-Picture)** — Compact always-on-top window with hover controls that folds into an ultra-slim desktop bar.
- **Local music library** — Point to your music folders to index albums and artists with automatic non-music filtering (voice notes, short clips).
- **Offline downloads** — Save tracks locally with selectable audio quality and real-time download progress.
- **Replay listening stats** — Track your top artists, songs, minutes, and streaks by week, month, year, or all-time, with 1080×1920 story card exports.
- **In-App Auto-Updates** — Checks GitHub Releases API for newer semantic versions and release timestamps with one-click download & restart on Windows.

---

## Screenshots

### Main Player & Home
![GAAN home feed with Jump back in, library sidebar, now-playing panel and player bar](docs/screenshots/home.jpg)

### AI Playlist Recommendations & Shuffle
![GAAN playlist view showing 5 AI recommended songs with shuffle and instant add](docs/screenshots/ai-playlist.jpg)
*Inside any playlist, GAAN curates 5 fresh AI recommendations matched to your playlist's genre and vibe, with one-click additions and instant shuffle.*

### Aesthetic Themes

<table>
  <tr>
    <td align="center"><b>🌿 Olive Green & Beige Cream</b></td>
    <td align="center"><b>💖 Rose Velvet (Pookie)</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/theme-olive.jpg" alt="Olive Green and Beige Cream theme" width="480"></td>
    <td><img src="docs/screenshots/theme-pookie.jpg" alt="Rose Velvet and Pookie theme" width="480"></td>
  </tr>
</table>

### Settings & AI Provider Cascade
![GAAN AI and smart recommendations settings with provider dropdown and API configuration](docs/screenshots/settings.jpg)
*Configure your AI providers (Groq LPU, Gemini Flash, Cohere Command-R, Custom OpenAI / xingchiapi gateway) or let Auto Cascade pick the fastest available model.*

### Appearance & Theme Customizer
![GAAN appearance settings showing clean theme dropdown with Lucide icons](docs/screenshots/settings-appearance.jpg)

### Fullscreen Cinematic View
![GAAN fullscreen now-playing view with album artwork, audio visualizer and word-synced lyrics](docs/screenshots/fullscreen.jpg)

### Synchronized Lyrics
![GAAN synchronized lyrics interface with the current word highlighted](docs/screenshots/lyrics.jpg)

### Artist & Album Pages
![GAAN artist page with top songs, play controls and the persistent player bar](docs/screenshots/artist.jpg)

### Mini Player (Picture-in-Picture)
![GAAN mini player picture-in-picture window floating over the desktop](docs/screenshots/miniplayer.jpg)

### Queue & Now Playing
![GAAN queue panel showing now playing and next up tracks](docs/screenshots/queue.jpg)

### Replay Listening Stats
![GAAN Replay page: minutes listened, plays, top artist and streak](docs/screenshots/replay.jpg)
<p align="center"><img src="docs/screenshots/replay-card.jpg" alt="GAAN Replay story card" width="300"></p>

---

## Feature Overview

| Feature | GAAN |
|---|---|
| Free: no ads, no subscription, no paid tier | ✅ |
| Open source (GPL-3.0) | ✅ |
| Streaming from YouTube Music (no Google account needed) | ✅ |
| AI Smart Recommendations & Harmonic Queue Shuffle | ✅ |
| Multi-Provider AI Cascade (Gemini, Groq, Cohere, OpenAI Gateway) | ✅ |
| Playlist AI Recommendations (5 tracks + instant shuffle) | ✅ |
| Themes: System, Dark, Light, Olive & Cream, Rose Velvet | ✅ |
| Word- or line-synced lyrics from 13 sources with click-to-seek | ✅ |
| Rooms: listen together with up to 10 friends | ✅ (free account) |
| Spotify playlist import (public URL or song list) | ✅ |
| Fullscreen Now Playing view with live visualizer | ✅ |
| Mini player (Picture-in-Picture) with folding bar | ✅ |
| Queue with drag reorder, play next, and endless AutoPlay | ✅ |
| Local music library (MP3, M4A/AAC, FLAC, WAV, OGG, Opus) | ✅ |
| Downloads for offline listening | ✅ |
| Listening statistics & shareable story cards (Replay) | ✅ |
| 10-band equalizer, volume leveling, output device picker | ✅ |
| Crossfade up to 12s, Automix, skip silence, pitch-preserving speed | ✅ |
| In-App Auto-Updates (Version & Release Timing validation) | ✅ |
| Windows media keys, SMTC overlay, close to tray | ✅ Windows |
| Native macOS traffic lights, menu bar, close-to-hide | ✅ macOS |

---

## Installation

### Download

**Windows 10/11 (64-bit)**:
- **[Download Gaan-Setup.exe](https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-Setup.exe)** *(always points to the newest release)*
- Run the installer (`Gaan-Setup.exe`). If Windows SmartScreen displays a notice on first run, click **More info** → **Run anyway**.

**macOS (Apple Silicon & Intel)**:
- Grab the latest DMG from the **[Releases Page](https://github.com/rumman2004/Gaan-Desktop/releases)** (`-arm64` for Apple Silicon M1+, `-x64` for Intel).
- Drag **GAAN** into your **Applications** folder.

---

## Development

### Prerequisites
- Node.js 20+ (Node 22 recommended)
- npm

### Quick Start
```bash
# Clone the repository
git clone https://github.com/rumman2004/Gaan-Desktop.git
cd Gaan-Desktop

# Install dependencies
npm install

# Start Vite renderer + Electron main with hot reload
npm run dev
```

### Useful Commands
```bash
npm run typecheck    # TypeScript verification
npm test             # Run test suite
npm run build        # Build renderer + Electron main
npm run dist:win     # Package Windows NSIS installer (.exe) into release/
npm run dist:mac     # Package macOS DMG/ZIP into release/
```

### GitHub Actions CI/CD Secrets
To build and publish releases via GitHub Actions, add these repository secrets under **Settings → Secrets and variables → Actions**:

- `GAAN_SUPABASE_URL` — Supabase backend endpoint
- `GAAN_SUPABASE_KEY` — Supabase public client key
- `GEMINI_API_KEY` — Google Gemini recommendation API
- `GROQ_API_KEY` — Groq ultra-fast LPU inference API
- `COHERE_API_KEY` — Cohere Command models API
- `OPENAI_API_KEY` — OpenAI / custom gateway bearer token
- `OPENAI_BASE_URL` — Gateway URL (e.g. `https://api.xingchiapi.com/v1`)
- `OPENAI_MODEL` — Model name (e.g. `gpt-6.1-sol`)

---

## Architecture

```
UI (React 18 + Tailwind CSS + Lucide Icons)
        │
Application State (Zustand: player · library · settings · ui)
        │
Audio Engine & Player Bar (Web Audio API, MediaSession, shortcuts)
        │  IPC (contextBridge preload)
Electron Main Process
  ├─ music-service     YouTube Music catalog & lyrics
  ├─ stream-proxy      Local range-aware media proxy
  ├─ downloads         Track downloader with progress events
  ├─ updater           Version & release timing checker (GitHub API + electron-updater)
  ├─ pip               Mini player window (always-on-top, state-synced)
  ├─ mac-menu          Native macOS application menu bar
  ├─ supabase          Auth (guest / cloud) + library sync & Rooms
  └─ persist           JSON storage for library, settings & history
```

---

## License

Copyright © 2026. GAAN is licensed under the **GNU General Public License v3.0** (see [LICENSE](LICENSE)). Third-party packages and their respective licenses are listed in [NOTICE](NOTICE).

Official downloads and source code are available at:
**[https://github.com/rumman2004/Gaan-Desktop](https://github.com/rumman2004/Gaan-Desktop)**
