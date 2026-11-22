export interface ReplayTimeRange {
  range: "week" | "month" | "year" | "all";
  label: string;
  minutesListened: number;
  topArtist: string;
  topTrack: string;
  songsPlayed: number;
  barData: { label: string; value: number }[];
}

export const REPLAY_DATA: Record<ReplayTimeRange["range"], ReplayTimeRange> = {
  week: {
    range: "week",
    label: "This Week",
    minutesListened: 1840,
    topArtist: "Radiohead",
    topTrack: "Weird Fishes / Arpeggi",
    songsPlayed: 412,
    barData: [
      { label: "Mon", value: 180 },
      { label: "Tue", value: 240 },
      { label: "Wed", value: 320 },
      { label: "Thu", value: 210 },
      { label: "Fri", value: 380 },
      { label: "Sat", value: 290 },
      { label: "Sun", value: 220 },
    ],
  },
  month: {
    range: "month",
    label: "This Month",
    minutesListened: 7420,
    topArtist: "Pink Floyd",
    topTrack: "Comfortably Numb",
    songsPlayed: 1680,
    barData: [
      { label: "W1", value: 1650 },
      { label: "W2", value: 1980 },
      { label: "W3", value: 2100 },
      { label: "W4", value: 1690 },
    ],
  },
  year: {
    range: "year",
    label: "2026 Year in Music",
    minutesListened: 48920,
    topArtist: "Daft Punk",
    topTrack: "Get Lucky",
    songsPlayed: 11400,
    barData: [
      { label: "Q1", value: 11200 },
      { label: "Q2", value: 13400 },
      { label: "Q3", value: 12100 },
      { label: "Q4", value: 12220 },
    ],
  },
  all: {
    range: "all",
    label: "All Time",
    minutesListened: 128440,
    topArtist: "Radiohead",
    topTrack: "Weird Fishes / Arpeggi",
    songsPlayed: 29480,
    barData: [
      { label: "2022", value: 17800 },
      { label: "2023", value: 22400 },
      { label: "2024", value: 27600 },
      { label: "2025", value: 31000 },
      { label: "2026", value: 29640 },
    ],
  },
};

export const JSON_BACKUP_PREVIEW = `{
  "app": "Gaan",
  "version": "1.1.2",
  "exportDate": "2026-11-21T08:48:17Z",
  "statistics": {
    "totalTracks": 3842,
    "totalPlaylists": 24,
    "totalListeningHours": 815
  },
  "playlists": [
    {
      "name": "Late Night Coding",
      "trackCount": 48,
      "syncProvider": "local"
    },
    {
      "name": "Favorites 2026",
      "trackCount": 112,
      "syncProvider": "spotify-import"
    }
  ],
  "localFolders": [
    "/Music/FLAC Collection",
    "/Music/Vinyl Rips"
  ]
}`;
