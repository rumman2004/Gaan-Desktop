import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { SegmentedControl } from "../ui/SegmentedControl";
import FlexCarousel from "../ui/FlexCarousel";
import { Lightbox } from "../ui/Lightbox";
import {
  DESKTOP_SCREENSHOTS,
  MOBILE_SCREENSHOTS,
  CATEGORY_LABELS,
  type DeviceType,
  type ScreenshotCategory,
} from "../../data/screenshots";
import {
  Monitor, Smartphone, Home, PlayCircle, Quote, Music2,
  BarChart3, Users, Settings, Palette, type LucideIcon,
} from "@/components/ui/animated-icons";

const CATEGORY_ICONS: Record<ScreenshotCategory, LucideIcon> = {
  home: Home, player: PlayCircle, lyrics: Quote, library: Music2,
  insights: BarChart3, rooms: Users, settings: Settings, themes: Palette,
};

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setBp(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}

// Stage height (px), card height (fraction of stage) and gap (px) per device and breakpoint.
const LAYOUT: Record<DeviceType, Record<Breakpoint, { height: number; cardHeight: number; gap: number }>> = {
  desktop: {
    mobile:  { height: 260, cardHeight: 0.68, gap: 10 },
    tablet:  { height: 400, cardHeight: 0.56, gap: 12 },
    desktop: { height: 540, cardHeight: 0.5,  gap: 12 },
  },
  mobile: {
    mobile:  { height: 440, cardHeight: 0.82, gap: 16 },
    tablet:  { height: 520, cardHeight: 0.8,  gap: 20 },
    desktop: { height: 600, cardHeight: 0.8,  gap: 20 },
  },
};

export function ScreenshotGallery({ className }: { className?: string }) {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [index, setIndex] = useState(0); // mirrors the carousel via onChange
  const [jump, setJump] = useState<{ index: number; id: number } | undefined>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const items = device === "desktop" ? DESKTOP_SCREENSHOTS : MOBILE_SCREENSHOTS;
  const active = items[index] ?? items[0];
  const isMobile = device === "mobile";
  const bp = useBreakpoint();
  const layout = LAYOUT[device][bp];

  const flexItems = useMemo(
    () => items.map((i) => ({ src: i.src, alt: i.title, title: i.title, subtitle: i.badge })),
    [items]
  );

  const tabs = useMemo(() => {
    const seen = new Set<ScreenshotCategory>();
    items.forEach((i) => seen.add(i.category));
    return [...seen];
  }, [items]);

  const isFirstTab = useRef(true);
  useEffect(() => {
    if (isFirstTab.current) {
      isFirstTab.current = false;
      return;
    }
  }, [active.category]);

  const jumpTo = (i: number) => setJump((prev) => ({ index: i, id: (prev?.id ?? 0) + 1 }));

  const lightboxImages = items.map((item) => ({
    src: item.src,
    alt: item.title,
    title: item.title,
    category: `${isMobile ? "Android" : "Desktop"} • ${CATEGORY_LABELS[item.category]}`,
  }));

  return (
    <div className={cn("w-full flex flex-col items-center", className)}>
      <SegmentedControl<DeviceType>
        value={device}
        onChange={(d) => { setDevice(d); setIndex(0); setJump(undefined); }}
        options={[
          { value: "desktop", label: "Desktop", ariaLabel: "Desktop (Windows & Mac)", icon: <Monitor className="size-4" /> },
          { value: "mobile", label: "Mobile", ariaLabel: "Android mobile", icon: <Smartphone className="size-4" /> },
        ]}
        className="mb-6 sm:mb-8"
      />

      {/* FlexCarousel fills its parent, so the parent needs an explicit height */}
      <div className="relative w-full" style={{ height: layout.height }}>
        <FlexCarousel
          items={flexItems}
          jumpTo={jump}
          onChange={(i) => setIndex(i)}
          onSelect={(i) => setLightboxIndex(i)}
          preset="liquid"
          intro="rise"
          cardHeight={layout.cardHeight}
          gap={layout.gap}
          squeeze={0.2}
          fit="natural"          /* keeps the cropped mini player uncropped */
          radius={14}
          focusOnClick={false}   /* lightbox handles zoom */
          captions={false}       /* details are rendered below */
          captureWheel={false}   /* don't trap page scrolling */
          responsive             /* softer, wider lens on phones and tablets */
          autoplay={false}
        />
      </div>

      <div key={active.id} className="mb-8 mt-2 min-h-[7.5rem] max-w-2xl text-center animate-in fade-in duration-300">
        {active.badge && (
          <span className="mb-2 inline-block rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
            {active.badge}
          </span>
        )}
        <h3 className="text-lg font-bold text-[var(--text-primary)] sm:text-xl">{active.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">{active.description}</p>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[var(--text-secondary)] sm:text-sm">
          {active.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-[var(--text-secondary)]" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>

      <div role="tablist" aria-label="Screenshot categories" className="w-full max-w-full overflow-x-auto scrollbar-none">
        <div className="mx-auto flex w-max gap-2 px-1 py-1">
          {tabs.map((cat) => {
            const Icon = CATEGORY_ICONS[cat];
            const isActive = cat === active.category;
            return (
              <button
                key={cat}
                ref={(el) => { tabRefs.current[cat] = el; }}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => jumpTo(Math.max(0, items.findIndex((i) => i.category === cat)))}
                className={cn(
                  "inline-flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)] sm:px-5",
                  isActive
                    ? "border-transparent bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)]"
                    : "border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {CATEGORY_LABELS[cat]}
              </button>
            );
          })}
        </div>
      </div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex ?? 0}
        isOpen={lightboxIndex !== null}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(i) => { setLightboxIndex(i); jumpTo(i); }}
      />
    </div>
  );
}