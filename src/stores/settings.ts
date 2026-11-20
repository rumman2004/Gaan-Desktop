export type ThemeMode = "system" | "dark" | "light" | "olive" | "pookie";

export const THEME_LABELS: Record<ThemeMode, string> = {
  system: "System",
  dark: "Dark",
  light: "Light",
  olive: "Olive & Cream",
  pookie: "Rose Velvet",
};

/** User settings (persisted). */
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { storage } from "../lib/persist";
import type { MatchLanguage } from "../../electron/track-match";

export type StreamQuality = "low" | "medium" | "high" | "lossless";
export type DownloadQuality = "standard" | "high" | "lossless";

/** Volume leveling: the loudness every stream is brought to, or off. */
export type LoudnessLevel = "off" | "quiet" | "normal" | "loud";
export const LOUDNESS_LABEL: Record<LoudnessLevel, string> = {
  off: "Off",
  quiet: "Quiet",
  normal: "Normal",
  loud: "Loud",
};

/** A saved equalizer curve: one dB value per band (EQ_BANDS in lib/audio). */
export interface EqPreset {
  name: string;
  gains: number[];
}
/** Saved presets kept; the oldest goes first. */
export const EQ_PRESET_LIMIT = 20;

export const STREAM_QUALITY_LABEL: Record<StreamQuality, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  lossless: "Lossless",
};

export const ENV_GEMINI_KEY = ((import.meta.env?.VITE_GEMINI_API_KEY || import.meta.env?.GEMINI_API_KEY || "") as string).trim();
export const ENV_GROQ_KEY = ((import.meta.env?.VITE_GROQ_API_KEY || import.meta.env?.GROQ_API_KEY || "") as string).trim();
export const ENV_COHERE_KEY = ((import.meta.env?.VITE_COHERE_API_KEY || import.meta.env?.COHERE_API_KEY || "") as string).trim();
export const ENV_OPENAI_KEY = ((import.meta.env?.VITE_OPENAI_API_KEY || import.meta.env?.OPENAI_API_KEY || "") as string).trim();
export const ENV_OPENAI_BASE = ((import.meta.env?.VITE_OPENAI_BASE_URL || import.meta.env?.OPENAI_BASE_URL || "https://api.xingchiapi.com/v1") as string).trim();
export const ENV_OPENAI_MODEL = ((import.meta.env?.VITE_OPENAI_MODEL || import.meta.env?.OPENAI_MODEL || "gpt-6.1-sol") as string).trim();

export const DOWNLOAD_QUALITY_LABEL: Record<DownloadQuality, string> = {
  standard: "Standard",
  high: "High",
  lossless: "Lossless",
};

interface SettingsState {
  /* Downloads */
  downloadDir: string | null;
  downloadQuality: DownloadQuality;
  exportDownloads: boolean;

  /* Playback */
  streamingQuality: StreamQuality;
  crossfadeSeconds: number;
  smartFade: boolean;
  skipSilence: boolean;
  autoplay: boolean;
  /** 0.5..2 — persisted playback speed (pitch-preserving) */
  playbackSpeed: number;
  /** Audio output device (setSinkId). "" follows the system default. */
  audioSinkId: string;
  /** 10-band graphic EQ; gains in dB (−12..+12), one per EQ_BANDS entry */
  eqEnabled: boolean;
  eqGains: number[];
  /** the listener's own EQ presets (synced; validated in cloud-payload/backup-transfer) */
  eqPresets: EqPreset[];
  /** lower the level only when EQ boosts would clip at the current volume */
  eqAutoHeadroom: boolean;
  /** volume leveling target (lib/audio LOUDNESS_TARGETS) */
  loudnessLevel: LoudnessLevel;

  /* Importing */
  /** which language's version of a song an import or Spotify playlist prefers ("" = any) */
  matchLanguage: MatchLanguage | "";

  /* Appearance */
  theme: ThemeMode;
  reduceAnimation: boolean;
  reduceDynamicBlur: boolean;
  liquidGlass: boolean;
  fullBleedArtwork: boolean;
  legacyMeshGradient: boolean;
  animatedCanvas: boolean;
  syncedLyrics: boolean;
  blurUnfocusedLyrics: boolean;
  /** show a Latin-letters reading under lyrics in other scripts */
  romanizeLyrics: boolean;
  /** seconds this device shows lyrics later (+) or earlier (−) — headphone
      delay is per device, so it never syncs (DEVICE_SETTINGS_FIELDS) */
  lyricsOffset: number;

  /* Local music */
  localMusicFolder: string | null;
  filterNonMusicAudio: boolean;

  /* AI Recommendations & Smart Shuffle */
  aiProvider: "auto" | "gemini" | "groq" | "cohere" | "openai";
  geminiApiKey: string;
  groqApiKey: string;
  cohereApiKey: string;
  openaiApiKey: string;
  openaiBaseUrl: string;
  openaiModel: string;
  aiSmartShuffle: boolean;

  /* Miscellaneous */
  dontRepeatSuggestions: boolean;
  hideVolumeBar: boolean;
  /** Windows: closing the window hides GAAN in the tray, music paused (electron/close-to-tray.ts). This device's own. */
  closeToTray: boolean;

  setDownloadDir(dir: string | null): void;
  setDownloadQuality(q: DownloadQuality): void;
  setExportDownloads(v: boolean): void;
  setStreamingQuality(q: StreamQuality): void;
  setCrossfadeSeconds(v: number): void;
  setSmartFade(v: boolean): void;
  setSkipSilence(v: boolean): void;
  setAutoplay(v: boolean): void;
  setPlaybackSpeed(v: number): void;
  setAudioSinkId(sinkId: string): void;
  setEqEnabled(v: boolean): void;
  setEqGains(gains: number[]): void;
  saveEqPreset(name: string, gains: number[]): void;
  renameEqPreset(from: string, to: string): void;
  deleteEqPreset(name: string): void;
  setEqAutoHeadroom(v: boolean): void;
  setLoudnessLevel(level: LoudnessLevel): void;
  setMatchLanguage(language: MatchLanguage | ""): void;
  setTheme(theme: ThemeMode): void;
  setReduceAnimation(v: boolean): void;
  setReduceDynamicBlur(v: boolean): void;
  setLiquidGlass(v: boolean): void;
  setFullBleedArtwork(v: boolean): void;
  setLegacyMeshGradient(v: boolean): void;
  setAnimatedCanvas(v: boolean): void;
  setSyncedLyrics(v: boolean): void;
  setBlurUnfocusedLyrics(v: boolean): void;
  setRomanizeLyrics(v: boolean): void;
  setLyricsOffset(seconds: number): void;
  setLocalMusicFolder(v: string | null): void;
  setFilterNonMusicAudio(v: boolean): void;
  setAiProvider(provider: "auto" | "gemini" | "groq" | "cohere" | "openai"): void;
  setGeminiApiKey(key: string): void;
  setGroqApiKey(key: string): void;
  setCohereApiKey(key: string): void;
  setOpenaiApiKey(key: string): void;
  setOpenaiBaseUrl(url: string): void;
  setOpenaiModel(model: string): void;
  setAiSmartShuffle(v: boolean): void;
  setDontRepeatSuggestions(v: boolean): void;
  setHideVolumeBar(v: boolean): void;
  setCloseToTray(v: boolean): void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      downloadDir: null,
      downloadQuality: "lossless",
      exportDownloads: false,

      streamingQuality: "high",
      crossfadeSeconds: 0,
      smartFade: false,
      skipSilence: false,
      // On for new installs. Existing installs keep their stored value and
      // get a one-time offer when their queue first runs out (lib/autoplay).
      autoplay: true,
      playbackSpeed: 1,
      audioSinkId: "",
      eqEnabled: false,
      eqGains: Array(10).fill(0),
      eqPresets: [],
      eqAutoHeadroom: true,
      loudnessLevel: "loud",
      matchLanguage: "",

      theme: "dark",
      reduceAnimation: false,
      reduceDynamicBlur: false,
      liquidGlass: true,
      fullBleedArtwork: true,
      legacyMeshGradient: false,
      animatedCanvas: false,
      syncedLyrics: true,
      blurUnfocusedLyrics: true,
      romanizeLyrics: false,
      lyricsOffset: 0,

      localMusicFolder: null,
      filterNonMusicAudio: true,

      aiProvider: "auto",
      geminiApiKey: ENV_GEMINI_KEY,
      groqApiKey: ENV_GROQ_KEY,
      cohereApiKey: ENV_COHERE_KEY,
      openaiApiKey: ENV_OPENAI_KEY,
      openaiBaseUrl: ENV_OPENAI_BASE,
      openaiModel: ENV_OPENAI_MODEL,
      aiSmartShuffle: true,

      dontRepeatSuggestions: false,
      hideVolumeBar: false,
      // On by default: the main process reads it from this store's file when the window closes.
      closeToTray: true,

      setDownloadDir: (downloadDir) => set({ downloadDir }),
      setDownloadQuality: (downloadQuality) => set({ downloadQuality }),
      setExportDownloads: (exportDownloads) => set({ exportDownloads }),
      setStreamingQuality: (streamingQuality) => set({ streamingQuality }),
      setCrossfadeSeconds: (crossfadeSeconds) => set({ crossfadeSeconds }),
      setSmartFade: (smartFade) => set({ smartFade }),
      setSkipSilence: (skipSilence) => set({ skipSilence }),
      setAutoplay: (autoplay) => set({ autoplay }),
      setPlaybackSpeed: (playbackSpeed) => set({ playbackSpeed: Math.min(2, Math.max(0.5, playbackSpeed)) }),
      setAudioSinkId: (audioSinkId) => set({ audioSinkId }),
      setEqEnabled: (eqEnabled) => set({ eqEnabled }),
      setEqGains: (eqGains) => set({ eqGains: eqGains.map((g) => Math.min(12, Math.max(-12, g))) }),
      saveEqPreset: (name, gains) =>
        set((s) => ({
          eqPresets: [...s.eqPresets.filter((p) => p.name !== name), { name, gains: [...gains] }].slice(-EQ_PRESET_LIMIT),
        })),
      renameEqPreset: (from, to) =>
        set((s) => ({
          eqPresets: s.eqPresets.filter((p) => p.name !== to || p.name === from).map((p) => (p.name === from ? { ...p, name: to } : p)),
        })),
      deleteEqPreset: (name) => set((s) => ({ eqPresets: s.eqPresets.filter((p) => p.name !== name) })),
      setEqAutoHeadroom: (eqAutoHeadroom) => set({ eqAutoHeadroom }),
      setLoudnessLevel: (loudnessLevel) => set({ loudnessLevel }),
      setMatchLanguage: (matchLanguage) => set({ matchLanguage }),
      setTheme: (theme) => set({ theme }),
      setReduceAnimation: (reduceAnimation) => set({ reduceAnimation }),
      setReduceDynamicBlur: (reduceDynamicBlur) => set({ reduceDynamicBlur }),
      setLiquidGlass: (liquidGlass) => set({ liquidGlass }),
      setFullBleedArtwork: (fullBleedArtwork) => set({ fullBleedArtwork }),
      setLegacyMeshGradient: (legacyMeshGradient) => set({ legacyMeshGradient }),
      setAnimatedCanvas: (animatedCanvas) => set({ animatedCanvas }),
      setSyncedLyrics: (syncedLyrics) => set({ syncedLyrics }),
      setBlurUnfocusedLyrics: (blurUnfocusedLyrics) => set({ blurUnfocusedLyrics }),
      setRomanizeLyrics: (romanizeLyrics) => set({ romanizeLyrics }),
      setLyricsOffset: (seconds) => set({ lyricsOffset: Math.round(Math.min(3, Math.max(-3, seconds)) * 20) / 20 }),
      setLocalMusicFolder: (localMusicFolder) => set({ localMusicFolder }),
      setFilterNonMusicAudio: (filterNonMusicAudio) => set({ filterNonMusicAudio }),
      setAiProvider: (aiProvider) => set({ aiProvider }),
      setGeminiApiKey: (geminiApiKey) => set({ geminiApiKey: geminiApiKey.trim() }),
      setGroqApiKey: (groqApiKey) => set({ groqApiKey: groqApiKey.trim() }),
      setCohereApiKey: (cohereApiKey) => set({ cohereApiKey: cohereApiKey.trim() }),
      setOpenaiApiKey: (openaiApiKey) => set({ openaiApiKey: openaiApiKey.trim() }),
      setOpenaiBaseUrl: (openaiBaseUrl) => set({ openaiBaseUrl: openaiBaseUrl.trim() }),
      setOpenaiModel: (openaiModel) => set({ openaiModel: openaiModel.trim() }),
      setAiSmartShuffle: (aiSmartShuffle) => set({ aiSmartShuffle }),
      setDontRepeatSuggestions: (dontRepeatSuggestions) => set({ dontRepeatSuggestions }),
      setHideVolumeBar: (hideVolumeBar) => set({ hideVolumeBar }),
      setCloseToTray: (closeToTray) => set({ closeToTray }),
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => storage),
    }
  )
);