import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { EqualizerPreview } from "../features/EqualizerPreview";
import { AudioVisualizer } from "../features/AudioVisualizer";
import { PlaybackFeatureCard } from "../features/PlaybackFeatureCard";
import { PLAYBACK_FEATURES } from "../../data/playback";
import {
  Shuffle,
  Volume2,
  Gauge,
  SlidersHorizontal,
  Disc,
  Headphones,
  Music2,
  Clock3,
  Radio,
  Repeat2,
} from "@/components/ui/animated-icons";
import { CARD_BACKGROUNDS } from "../backgrounds/placements";

export function PlaybackAudio() {
  const getIcon = (id: string) => {
    switch (id) {
      case "crossfade":
        return <Shuffle className="size-5" />;
      case "automix":
        return <SlidersHorizontal className="size-5" />;
      case "skip-silence":
        return <Gauge className="size-5" />;
      case "speed-pitch":
        return <Disc className="size-5" />;
      case "volume-leveling":
        return <Volume2 className="size-5" />;
      case "audio-output":
        return <Headphones className="size-5" />;
      case "sleep-timer":
        return <Clock3 className="size-5" />;
      case "streaming-quality":
        return <Radio className="size-5" />;
      case "equalizer":
        return <SlidersHorizontal className="size-5" />;
      case "playback-modes":
        return <Repeat2 className="size-5" />;
      default:
        return <Music2 className="size-5" />;
    }
  };

  return (
    <Section id="player" className="py-12 sm:py-20 lg:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
      <Container variant="wide">
        <SectionHeader
          eyebrow="PLAYBACK & AUDIO"
          title="Powerful playback, the way you like."
          description="A feature-rich playback experience with audio customization, flexible controls and a smooth listening experience."
          align="center"
          className="mb-12 sm:mb-16"
        />

        {/* Live Audio Visualizer Banner */}
        <div className="w-full mb-10 p-4 sm:p-6 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-card)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
              <Headphones className="size-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">
                A player that stays out of the way
              </h4>
              <p className="text-xs text-[var(--text-secondary)]">
                Shape your sound with the equalizer, then get back to listening.
              </p>
            </div>
          </div>
          <div className="w-full sm:w-80">
            <AudioVisualizer barsCount={32} animated />
          </div>
        </div>

        {/* 10-Band Equalizer Preview */}
        <div className="mb-12">
          <EqualizerPreview />
        </div>

        {/* 6 Advanced Playback Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLAYBACK_FEATURES.map((feat) => (
            <PlaybackFeatureCard
              key={feat.id}
              title={feat.title}
              desc={feat.desc}
              badge={feat.badge}
              icon={getIcon(feat.id)}
              backgroundEffect={CARD_BACKGROUNDS.playback[feat.title as keyof typeof CARD_BACKGROUNDS.playback]}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
