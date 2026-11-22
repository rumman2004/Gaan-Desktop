export interface ObjectiveFeature {
  iconName: "Layers" | "Zap" | "Code2" | "Users";
  title: string;
  description: string;
}

export const OBJECTIVE_DATA = {
  eyebrow: "The Objective",
  title: "Why Gaan Exists",
  subtitlePrefix: "A simple idea: a music player built for",
  morphingWords: [
    "Music",
    "Playlists",
    "Freedom",
    "Lyrics",
    "Open Source",
    "Offline",
    "Community",
    "Your Way",
  ],
  description:
    "Gaan was built to be a clean, modern and open-source music player that brings together your music, your playlists and your listening experience, without the noise, limits or unnecessary complexity.",
  features: [
    {
      iconName: "Layers" as const,
      title: "A Unified Music Experience",
      description:
        "Bring your local files, online music, playlists and synced lyrics together into one coherent home.",
    },
    {
      iconName: "Zap" as const,
      title: "Clean and Distraction-Free",
      description:
        "A fast, minimalist and intuitive interface designed so you can focus on what actually matters: the music.",
    },
    {
      iconName: "Code2" as const,
      title: "Open and Accessible",
      description:
        "Built 100% in the open under the GPL-3.0 license. Free to use, inspect, modify and contribute to for everyone.",
    },
    {
      iconName: "Users" as const,
      title: "For Real Music Listeners",
      description:
        "Created to solve the everyday frustrations of subscription music apps: no ads, no paywalled basic features, full control.",
    },
  ],
  mission: {
    title: "Our Mission",
    description:
      "To provide a clean, open, lightning-fast and feature-rich music player that anyone can use, customize and truly make their own.",
  },
  vision: {
    title: "Our Vision",
    description:
      "To build an independent, community-driven music platform that stays open-source forever and remains unconditionally user-first.",
  },
};
