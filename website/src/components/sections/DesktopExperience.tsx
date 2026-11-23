import type { ReactNode } from "react";
import { AppWindow, Minimize2, Radio, Waypoints } from "@/components/ui/animated-icons";
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
    description: "Works with your keyboard, headset and system media controls.",
  },
  {
    key: "Native Window Controls",
    icon: <AppWindow className="size-5" />,
    title: "Native Window Controls",
    description: "A frameless window on Windows with custom controls, and real traffic lights on macOS.",
  },
  {
    key: "Tray Integration",
    icon: <Minimize2 className="size-5" />,
    title: "Tray Integration",
    description: "Closing the window pauses the music and keeps Gaan in the tray (Windows).",
  },
  {
    key: "Quick Access",
    icon: <Waypoints className="size-5" />,
    title: "Quick Access",
    description: "Every playlist, queue and action is just a right-click away.",
  },
];

const PLATFORMS: { name: string; description: string; logo: ReactNode }[] = [
  {
    name: "Windows",
    description:
      "Custom window controls, rich taskbar thumbnail (previous, play, next), system media integration and tray support.",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-full">
        <path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
      </svg>
    ),
  },
  {
    name: "macOS",
    description: "Native traffic lights, a full menu bar and background playback even when the window is closed.",
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-full">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    ),
  },
];

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
            <h4 className="text-[13px] font-semibold text-[var(--text-primary)] leading-tight">{f.title}</h4>
            <p className="text-xs text-[var(--text-secondary)] leading-snug mt-1">{f.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function DesktopExperience() {
  return (
    <Section id="desktop" className="py-10 sm:py-16 lg:py-24 border-t border-[var(--border-subtle)]">
      <Container variant="wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.85fr)] gap-8 sm:gap-10 xl:gap-12 items-center">
          {/* Left: header + shortcuts */}
          <div className="lg:col-span-2 xl:col-span-1 min-w-0">
            <SectionHeader
              eyebrow="DESKTOP"
              title="Built for the desktop, not squeezed onto it."
              description="Media keys, system media controls and a desktop-first experience that feels right at home. Gaan gives you deep OS integration, powerful shortcuts and a smooth, distraction-free experience."
              align="left"
              className="mb-6 sm:mb-10 max-w-2xl [&_h2]:text-[2rem] sm:[&_h2]:text-5xl lg:[&_h2]:text-6xl [&_h2]:font-extrabold [&_h2]:leading-[1.05] [&_h2]:tracking-tight [&_p]:text-sm sm:[&_p]:text-lg [&_p]:leading-relaxed"
            />
            <div className="min-w-0 overflow-x-auto">
              <ShortcutGrid />
            </div>
          </div>

          {/* Middle: mini player with a stacked card behind it */}
          <div className="relative min-w-0 w-full max-w-xs sm:max-w-sm mx-auto xl:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-x-4 -top-4 sm:-top-6 bottom-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] -rotate-3 opacity-70"
            />
            <div className="relative">
              <MiniPlayerPreview />
            </div>
          </div>

          {/* Right: features, flattened to a plain list on desktop */}
          <div className="min-w-0">
            <MobileFeatureList />
            <div
              className="hidden sm:flex flex-col gap-5 lg:gap-6
                [&>*]:!bg-transparent [&>*]:!border-0 [&>*]:!shadow-none [&>*]:!p-0"
            >
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

        {/* Platform strip */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] overflow-hidden">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 min-w-0">
              <span className="size-10 sm:size-14 shrink-0 text-[var(--text-primary)]">{p.logo}</span>
              <div className="min-w-0">
                <h3 className="text-base sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">{p.name}</h3>
                <p className="mt-1 text-xs sm:text-sm leading-snug text-[var(--text-secondary)]">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}