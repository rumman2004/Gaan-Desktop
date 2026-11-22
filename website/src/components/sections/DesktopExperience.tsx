import type { ReactNode } from "react";
import { AppWindow, Keyboard, Minimize2, Radio, Waypoints } from "@/components/ui/animated-icons";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { ShortcutGrid } from "../features/ShortcutGrid";
import { MiniPlayerPreview } from "../features/MiniPlayerPreview";
import { DesktopFeatureCard } from "../features/DesktopFeatureCard";
import { CARD_BACKGROUNDS } from "../backgrounds/placements";

type DesktopFeature = {
  key: keyof typeof CARD_BACKGROUNDS.desktop;
  icon: ReactNode;
  title: string;
  description: string;
};

const FEATURES: DesktopFeature[] = [
  {
    key: "Media Keys",
    icon: <Radio className="size-5" />,
    title: "Media Keys",
    description: "Use your keyboard media keys and supported system playback controls.",
  },
  {
    key: "Native Window Controls",
    icon: <AppWindow className="size-5" />,
    title: "Native Window Controls",
    description: "Keep familiar window controls and a desktop-first layout close at hand.",
  },
  {
    key: "Tray Integration",
    icon: <Minimize2 className="size-5" />,
    title: "Tray Integration",
    description: "Reach playback from the system tray while Gaan runs in the background.",
  },
  {
    key: "Quick Access",
    icon: <Waypoints className="size-5" />,
    title: "Quick Access",
    description: "Open the compact player and return to your music without losing your place.",
  },
];

const GESTURES = ["Two-finger swipe", "Alt + ← / →", "Mouse side buttons"];

/** Compact list used on phones, where four full cards would be very tall. */
function MobileFeatureList() {
  return (
    <ul className="sm:hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] divide-y divide-[var(--border-subtle)] overflow-hidden">
      {FEATURES.map((f) => (
        <li key={f.key} className="flex items-start gap-3 px-4 py-3">
          <span className="size-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/50 flex items-center justify-center shrink-0 text-[var(--text-primary)] [&_svg]:size-4">
            {f.icon}
          </span>
          <div className="min-w-0">
            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">
              {f.title}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-snug mt-1">
              {f.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DesktopExperience() {
  return (
    <Section
      id="desktop"
      className="py-10 sm:py-16 lg:py-24 border-t border-[var(--border-subtle)]"
    >
      <Container variant="wide">
        <SectionHeader
          eyebrow="DESKTOP EXPERIENCE"
          title="Built for the desktop, not squeezed onto it."
          description="Media keys, system media controls and a desktop-first experience that feels right at home. Gaan gives you deep OS integration, useful shortcuts and a distraction-free experience."
          align="center"
          className="mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto [&_h2]:text-[1.65rem] sm:[&_h2]:text-4xl [&_h2]:leading-tight [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed"
        />

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 xl:gap-10 items-center mb-8 sm:mb-12 lg:mb-14">
          {/* Shortcuts intro */}
          <div className="xl:col-span-3 min-w-0">
            <div className="flex items-center gap-2.5 mb-2 sm:mb-3">
              <span className="size-8 sm:size-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] flex items-center justify-center shrink-0">
                <Keyboard className="size-4 sm:size-[18px]" />
              </span>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                Shortcuts that stay close
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-3 sm:mb-4 max-w-xl">
              Keep playback and navigation within reach while you work. Choose
              Windows or macOS to view the shortcut list below.
            </p>
            <ul className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[var(--text-secondary)]">
              {GESTURES.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)]/60 px-2.5 py-1 sm:px-3 sm:py-1.5"
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini player */}
          <div className="xl:col-span-4 min-w-0 w-full max-w-sm sm:max-w-md mx-auto xl:max-w-none">
            <MiniPlayerPreview />
          </div>

          {/* Features */}
          <div className="xl:col-span-5 min-w-0">
            <MobileFeatureList />
            <div className="hidden sm:grid grid-cols-2 gap-3 sm:gap-4">
              {FEATURES.map((f) => (
                <DesktopFeatureCard
                  key={f.key}
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  backgroundEffect={CARD_BACKGROUNDS.desktop[f.key]}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Shortcut reference */}
        <div className="p-3 sm:p-6 lg:p-10 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-card)] min-w-0 overflow-x-auto">
          <ShortcutGrid />
        </div>
      </Container>
    </Section>
  );
}