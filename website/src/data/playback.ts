export interface EqualizerBand {
  freq: string;
  defaultGain: number; // -12 to +12 dB
}

export const EQUALIZER_BANDS: EqualizerBand[] = [
  { freq: "32 Hz", defaultGain: 3 },
  { freq: "64 Hz", defaultGain: 5 },
  { freq: "125 Hz", defaultGain: 4 },
  { freq: "250 Hz", defaultGain: 1 },
  { freq: "500 Hz", defaultGain: 0 },
  { freq: "1 kHz", defaultGain: -1 },
  { freq: "2 kHz", defaultGain: 2 },
  { freq: "4 kHz", defaultGain: 4 },
  { freq: "8 kHz", defaultGain: 5 },
  { freq: "16 kHz", defaultGain: 4 },
];

export const EQUALIZER_PRESETS = [
  { name: "Flat", gains: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { name: "Bass Boost", gains: [6, 5, 4, 2, 0, -1, 0, 1, 2, 3] },
  { name: "Acoustic", gains: [3, 2, 1, 1, 2, 3, 4, 3, 3, 2] },
  { name: "Vocal Clarity", gains: [-2, -1, 0, 2, 4, 5, 4, 2, 1, 0] },
  { name: "Electronic", gains: [5, 4, 2, 0, -2, 2, 1, 3, 5, 5] },
];

export const PLAYBACK_FEATURES = [
  {
    id: "crossfade",
    title: "Smooth Crossfade",
    desc: "Fade out the ending track while fading in the next for seamless gapless playback (up to 12s).",
    badge: "0 - 12s",
  },
  {
    id: "automix",
    title: "Smart Automix",
    desc: "Intelligently analyzes beats-per-minute and song volume to blend transitions harmoniously.",
    badge: "BPM Aware",
  },
  {
    id: "skip-silence",
    title: "Skip Silence",
    desc: "Detects leading and trailing audio silence below -60dB, saving precious seconds on every track.",
    badge: "Zero Dead Air",
  },
  {
    id: "speed-pitch",
    title: "Tempo & Pitch Control",
    desc: "Speed up or slow down playback (0.5x – 2.0x) while preserving original musical pitch.",
    badge: "0.5x – 2.0x",
  },
  {
    id: "volume-leveling",
    title: "ReplayGain Normalization",
    desc: "Maintains consistent loudness across tracks recorded at different audio levels so you never jump at sudden bursts.",
    badge: "EBU R128",
  },
  {
    id: "audio-output",
    title: "Exclusive Device Output",
    desc: "Direct bit-perfect streaming output via WASAPI / CoreAudio to external DACs and headphones.",
    badge: "DAC Ready",
  },
  {
    id: "sleep-timer",
    title: "Sleep Timer",
    desc: "Set a time limit for playback when you want music to wind down with you.",
  },
  {
    id: "streaming-quality",
    title: "Streaming Quality",
    desc: "Choose the audio quality that suits your connection and listening setup.",
  },
  {
    id: "equalizer",
    title: "10-Band Equalizer",
    desc: "Adjust ten frequency bands and save a sound that feels right to you.",
    badge: "10 bands",
  },
  {
    id: "playback-modes",
    title: "Playback Modes",
    desc: "Choose shuffle and repeat options for the way you want to listen.",
  },
];
