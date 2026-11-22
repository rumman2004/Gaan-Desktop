import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BookOpen,
  Clock,
  Code2,
  Database,
  Download,
  FileText,
  Folder,
  Keyboard,
  LayoutGrid,
  Layers,
  ListMusic,
  Monitor,
  Music,
  Music2,
  Play,
  RefreshCw,
  Shield,
  Shuffle,
  Search,
  Smartphone,
  SlidersHorizontal,
  SlidersVertical,
  Type,
  Users,
  Volume2,
  Zap,
  type LucideIcon,
} from "@/components/ui/animated-icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollStack, { ScrollStackItem } from "../ui/ScrollStack";
import { BackgroundEffect } from "../backgrounds/BackgroundEffect";
import { CARD_BACKGROUNDS, type BackgroundEffectName } from "../backgrounds/placements";

gsap.registerPlugin(ScrollTrigger);

/* ───────────────────────── Data ───────────────────────── */

type FilterKey =
  | "all"
  | "playback"
  | "library"
  | "lyrics"
  | "personalization"
  | "discovery"
  | "social"
  | "desktop"
  | "android"
  | "privacy";

const FILTERS: { key: FilterKey; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All Features", icon: LayoutGrid },
  { key: "playback", label: "Playback & Audio", icon: Play },
  { key: "library", label: "Music Library", icon: BookOpen },
  { key: "lyrics", label: "Lyrics", icon: Music },
  { key: "personalization", label: "Personalization", icon: SlidersHorizontal },
  { key: "discovery", label: "Discovery", icon: Search },
  { key: "social", label: "Rooms & Social", icon: Users },
  { key: "desktop", label: "Desktop Integration", icon: Monitor },
  { key: "android", label: "Android Experience", icon: Smartphone },
  { key: "privacy", label: "Privacy & Open Source", icon: Shield },
];

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  backgroundEffect?: BackgroundEffectName;
  /** extra filters this card also appears under (its group is always included) */
  also?: FilterKey[];
};

type Group = {
  key: FilterKey;
  icon: LucideIcon;
  title: string;
  desc: string;
  features: Feature[];
};

const GROUPS: Group[] = [
  { key: "playback", icon: Play, title: "Playback & Audio", desc: "Controls and sound tools for everyday listening.", features: [
    { icon: Play, title: "Playback Controls", desc: "Play, pause, skip and seek through your music.", backgroundEffect: CARD_BACKGROUNDS.features["Playback Controls"] },
    { icon: SlidersVertical, title: "10-Band Equalizer", desc: "Shape your sound with a customizable equalizer and presets.", also: ["personalization"] },
    { icon: Shuffle, title: "Playback Modes", desc: "Shuffle and repeat options for your queue.", backgroundEffect: "rippleGrid" },
    { icon: Volume2, title: "Audio Controls", desc: "Adjust volume and set a sleep timer.", also: ["personalization"] },
  ] },
  { key: "library", icon: Layers, title: "Music Library", desc: "Keep local music and playlists organized in one place.", features: [
    { icon: Folder, title: "Local Music", desc: "Play audio files stored on your device.", backgroundEffect: CARD_BACKGROUNDS.features["Local Music"] },
    { icon: ListMusic, title: "Playlists", desc: "Create, edit and manage personal playlists." },
    { icon: Database, title: "Library Management", desc: "Add or remove music folders and organize your library." },
  ] },
  { key: "lyrics", icon: Music, title: "Lyrics", desc: "Follow along with lyrics while you listen.", features: [
    { icon: FileText, title: "Synced Lyrics", desc: "View time-synced lyrics that follow a track." },
    { icon: Type, title: "Lyrics Sources", desc: "Look up lyrics from supported providers." },
    { icon: Clock, title: "Timing Adjustment", desc: "Adjust lyric timing when synchronization needs a correction.", also: ["personalization"] },
  ] },
  { key: "personalization", icon: SlidersHorizontal, title: "Personalization", desc: "Make playback and the app feel more like your own.", features: [
    { icon: SlidersVertical, title: "Sound Presets", desc: "Choose an equalizer preset or tune the bands yourself." },
    { icon: Zap, title: "Appearance Options", desc: "Adjust the app's appearance to suit your setup." },
  ] },
  { key: "discovery", icon: Search, title: "Discovery", desc: "Find music and bring playlists into your collection.", features: [
    { icon: Download, title: "Playlist Import", desc: "Import supported public playlists from Spotify or YouTube Music.", backgroundEffect: "shapeGrid" },
    { icon: Music2, title: "Search & Explore", desc: "Search supported sources and browse for music." },
  ] },
  { key: "social", icon: Users, title: "Rooms & Social", desc: "Listen together through Gaan Rooms.", features: [
    { icon: Users, title: "Listen Together", desc: "Create or join a room to listen with others.", backgroundEffect: "webThreads" },
  ] },
  { key: "desktop", icon: Monitor, title: "Desktop Integration", desc: "Useful controls for a desktop listening setup.", features: [
    { icon: Monitor, title: "Mini Player", desc: "Switch to a compact player while you work.", backgroundEffect: CARD_BACKGROUNDS.features["Mini Player"] },
    { icon: Keyboard, title: "Keyboard Shortcuts", desc: "Control playback and navigate with keyboard shortcuts." },
  ] },
  { key: "android", icon: Smartphone, title: "Android Experience", desc: "A dedicated Gaan app for Android phones and tablets.", features: [
    { icon: Smartphone, title: "Android App", desc: "Take your playlists and online listening on Android." },
    { icon: Folder, title: "Local Files", desc: "Browse music stored on your Android device." },
  ] },
  { key: "privacy", icon: Shield, title: "Privacy & Open Source", desc: "Understand the project and keep control over your library.", features: [
    { icon: Code2, title: "GPL-3.0 Source", desc: "Inspect the public source code and contribute on GitHub.", backgroundEffect: CARD_BACKGROUNDS.features["GPL-3.0 Source"] },
    { icon: Folder, title: "Local Library Data", desc: "Keep your local music collection and paths on your device." },
  ] },
];

const MORE_STATS: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: LayoutGrid, title: "Cross-Platform", desc: "Desktop & Android" },
  { icon: Code2, title: "Open Source", desc: "Free to use & modify" },
  { icon: Shield, title: "No Ads", desc: "A clean, uninterrupted experience" },
  { icon: RefreshCw, title: "Actively Updated", desc: "New features and improvements regularly" },
];

/* ───────────────────────── Styles ─────────────────────────
   Breakpoints
     > 1100px   desktop : header beside filters, 2-column groups, 4-card rows, wrapped pills
     <= 1100px  tablet  : stacked groups, 4 cards (>=900) or 2 compact cards, sticky scrolling pill bar
     <= 899px   compact : cards become small icon-left rows
     <= 560px   phone   : single-column rows, tighter type and spacing
   --fs-sticky-top: set this to your fixed navbar height so the pill bar sticks below it.
────────────────────────────────────────────────────────── */

const CSS = `
.fs-section {
  --bg: var(--bg-primary);
  --surface: var(--bg-secondary);
  --ink: var(--text-primary);
  --body: var(--text-secondary);
  --line: var(--border-subtle);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --fs-pad: clamp(16px, 4vw, 64px);
  --fs-sticky-top: 64px;

  box-sizing: border-box;
  width: 100%;
  background: var(--bg);
  color: var(--ink);
  padding: clamp(36px, 7vw, 96px) 0;
  -webkit-tap-highlight-color: transparent;
}
.fs-section *, .fs-section *::before, .fs-section *::after { box-sizing: border-box; }

.fs-sr {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

.fs-inner {
  width: 100%;
  max-width: 1790px;
  margin: 0 auto;
  padding: 0 var(--fs-pad);
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 4vw, 52px);
}

/* ───── Eyebrow + header ───── */
.fs-eyebrow {
  display: flex; align-items: center; gap: 12px; margin: 0;
  font-size: clamp(.72rem, 1.6vw, .8rem); font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
  color: var(--body);
}
.fs-eyebrow-line { width: 28px; height: 1.5px; background: var(--body); }

.fs-header {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  column-gap: clamp(32px, 6vw, 96px);
  align-items: center;
}
.fs-title {
  margin: 0;
  font-size: clamp(1.75rem, 5.2vw, 4.6rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.04em;
}
.fs-title-line { display: block; overflow: hidden; padding-bottom: .08em; margin-bottom: -.08em; }
.fs-title-inner { display: block; }
.fs-desc {
  margin: 0;
  padding-left: clamp(16px, 3vw, 44px);
  border-left: 1.5px solid var(--line);
  max-width: 54ch;
  font-size: clamp(.92rem, 1.25vw, 1.15rem);
  line-height: 1.65;
  color: var(--body);
}

/* ───── Filter pills ───── */
.fs-filters {
  margin-inline: calc(-1 * var(--fs-pad));
  padding-inline: var(--fs-pad);
}
.fs-track { position: relative; display: flex; flex-wrap: wrap; gap: 12px; }
.fs-indicator {
  position: absolute; top: 0; left: 0; z-index: 0;
  border-radius: 999px; background: var(--btn-primary-bg);
  pointer-events: none;
}
.fs-pill {
  position: relative; z-index: 1;
  display: inline-flex; align-items: center; gap: 10px;
  height: 46px; padding: 0 22px;
  border: 1px solid var(--line); border-radius: 999px;
  background: var(--bg-card); color: var(--ink);
  font: inherit; font-size: .95rem; font-weight: 500; line-height: 1;
  white-space: nowrap; cursor: pointer; touch-action: manipulation;
  transition: background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease), transform .2s var(--ease);
}
.fs-pill:active { transform: scale(.97); }
.fs-pill:focus-visible { outline: 2px solid var(--ink); outline-offset: 3px; }
.fs-pill[aria-pressed="true"] { background: transparent; border-color: transparent; color: var(--btn-primary-text); }
@media (hover: hover) {
  .fs-pill:hover { border-color: var(--border-default); }
}

/* ───── Groups ───── */
.fs-groups { display: flex; flex-direction: column; }
.fs-scroll-stack { overflow: visible; }
.fs-scroll-stack-inner { padding: 0; }
.fs-scroll-stack-item {
  min-height: 210px;
  padding: clamp(20px, 3vw, 40px);
  border: 1px solid var(--line);
  border-radius: clamp(18px, 2vw, 26px);
  background: var(--surface);
  color: var(--ink);
  box-shadow: var(--shadow-card);
}
.fs-scroll-stack-slot { overflow: visible; }
.fs-scroll-stack-item > .fs-group { padding: 0; }
.fs-scroll-stack-item .fs-group-line { display: none; }
.fs-scroll-stack-item .fs-card { background: var(--bg); }
.fs-group {
  position: relative;
  display: grid;
  grid-template-columns: minmax(230px, .85fr) minmax(0, 3.15fr);
  column-gap: clamp(20px, 2.4vw, 36px);
  align-items: start;
  padding: clamp(18px, 3vw, 40px) 0;
}
.fs-group-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: var(--line); transform-origin: left;
}
.fs-group-head {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  column-gap: 16px; row-gap: 8px;
  align-items: center;
  padding-top: 6px;
}
.fs-group-icon {
  grid-row: 1; grid-column: 1;
  display: grid; place-items: center;
  width: 52px; height: 52px;
  background: var(--bg-card); border: 1px solid var(--line); border-radius: 15px;
}
.fs-group-title {
  grid-row: 1; grid-column: 2; margin: 0;
  font-size: clamp(1.15rem, 1.7vw, 1.65rem); font-weight: 700; letter-spacing: -0.025em; line-height: 1.15;
}
.fs-group-desc {
  grid-row: 2; grid-column: 2; margin: 0;
  font-size: .98rem; line-height: 1.6; color: var(--body);
}

.fs-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(10px, 1.2vw, 18px);
}
.fs-card {
  display: flex; flex-direction: column; gap: 8px;
  padding: clamp(16px, 1.8vw, 26px);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: var(--shadow-card);
  transition: transform .3s var(--ease), box-shadow .3s var(--ease), border-color .3s var(--ease);
}
.fs-card-icon {
  display: grid; place-items: center;
  width: 44px; height: 44px; margin-bottom: 10px;
  background: var(--bg-card); border: 1px solid var(--line); border-radius: 13px;
  transition: background .3s var(--ease), color .3s var(--ease), border-color .3s var(--ease);
}
.fs-card-title { margin: 0; font-size: 1.05rem; font-weight: 700; letter-spacing: -0.015em; line-height: 1.25; text-wrap: balance; }
.fs-card-desc { margin: 0; font-size: .92rem; line-height: 1.55; color: var(--body); }
@media (hover: hover) {
  .fs-card:hover { transform: translateY(-2px); border-color: var(--border-default); box-shadow: var(--shadow-hover); }
  .fs-card:hover .fs-card-icon { background: var(--btn-primary-bg); color: var(--btn-primary-text); border-color: var(--btn-primary-bg); }
}

/* ───── And much more ───── */
.fs-more {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 2fr);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: var(--shadow-card);
}
.fs-more-lead {
  display: flex; align-items: center; gap: clamp(14px, 2vw, 28px);
  padding: clamp(18px, 2.6vw, 36px);
}
.fs-more-logo {
  flex: none; display: grid; place-items: center;
  width: clamp(48px, 6vw, 80px); aspect-ratio: 1;
  border-radius: 16px; background: var(--btn-primary-bg); color: var(--btn-primary-text);
}
.fs-more-title { margin: 0 0 6px; font-size: clamp(1.15rem, 1.8vw, 1.65rem); font-weight: 700; letter-spacing: -0.025em; }
.fs-more-desc { margin: 0; font-size: .98rem; line-height: 1.6; color: var(--body); }
.fs-more-stats {
  display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
  margin-block: clamp(18px, 2.2vw, 28px);
  border-left: 1px solid var(--line);
}
.fs-stat { display: flex; flex-direction: column; gap: 6px; padding: 0 clamp(14px, 1.8vw, 28px); }
.fs-stat-icon { margin-bottom: 8px; }
.fs-stat-title { margin: 0; font-size: 1rem; font-weight: 700; letter-spacing: -0.01em; }
.fs-stat-desc { margin: 0; font-size: .88rem; line-height: 1.5; color: var(--body); }

/* ───── Responsive ───── */
@media (max-width: 1280px) {
  .fs-group { grid-template-columns: minmax(200px, .8fr) minmax(0, 3.2fr); }
  .fs-card-desc { font-size: .88rem; }
}

/* Tablet and below */
@media (max-width: 1100px) {
  /* one scrolling, sticky row of pills instead of a tall wrapped block */
  .fs-filters {
    position: sticky; top: var(--fs-sticky-top); z-index: 20;
    overflow-x: auto; scrollbar-width: none;
    padding-block: 8px;
    background: color-mix(in srgb, var(--bg) 90%, transparent);
    -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px);
    -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
            mask-image: linear-gradient(to right, #000 calc(100% - 20px), transparent);
  }
  .fs-filters::-webkit-scrollbar { display: none; }
  .fs-track { flex-wrap: nowrap; width: max-content; gap: 8px; }
  .fs-pill { height: 42px; padding: 0 16px; gap: 8px; font-size: .9rem; }

  .fs-group { grid-template-columns: 1fr; row-gap: 16px; }
  .fs-group-head { padding-top: 0; grid-template-columns: 44px minmax(0, 1fr); column-gap: 14px; row-gap: 4px; }
  .fs-group-icon { width: 44px; height: 44px; border-radius: 13px; }
  .fs-group-desc { font-size: .92rem; line-height: 1.5; }

  .fs-more { grid-template-columns: 1fr; }
  .fs-more-stats {
    border-left: 0; border-top: 1px solid var(--line);
    margin: 0 clamp(18px, 2.6vw, 36px); padding: 20px 0 22px;
    grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 20px;
  }
  .fs-stat { padding: 0 12px 0 0; }
}

@media (max-width: 899px) {
  .fs-scroll-stack-item { padding: 18px; }
  .fs-header { grid-template-columns: 1fr; row-gap: 16px; }
  .fs-cards { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }

  /* compact icon-left cards */
  .fs-card {
    display: grid; grid-template-columns: 40px minmax(0, 1fr);
    column-gap: 12px; row-gap: 2px; align-items: start;
    padding: 12px 14px; border-radius: 14px; box-shadow: none;
  }
  .fs-card-icon { grid-row: 1 / span 2; width: 40px; height: 40px; margin: 0; border-radius: 12px; }
  .fs-card-title { grid-column: 2; font-size: .95rem; align-self: end; }
  .fs-card-desc { grid-column: 2; font-size: .84rem; line-height: 1.45; }
}

/* Phone */
@media (max-width: 560px) {
  .fs-scroll-stack-item { padding: 14px; border-radius: 16px; }
  .fs-inner { gap: 18px; }
  .fs-cards { grid-template-columns: 1fr; gap: 8px; }
  .fs-group { padding: 16px 0; row-gap: 12px; }
  .fs-group-icon { width: 38px; height: 38px; border-radius: 11px; }
  .fs-group-head { grid-template-columns: 38px minmax(0, 1fr); column-gap: 12px; }
  .fs-group-desc { font-size: .86rem; }
  .fs-card { padding: 10px 12px; }
  .fs-card-icon { width: 36px; height: 36px; }
  .fs-card { grid-template-columns: 36px minmax(0, 1fr); }
  .fs-card-title { font-size: .92rem; }
  .fs-card-desc { font-size: .82rem; }

  .fs-more { border-radius: 16px; }
  .fs-more-lead { padding: 16px; }
  .fs-more-desc { font-size: .88rem; line-height: 1.5; }
  .fs-more-stats { margin: 0 16px; padding: 16px 0 18px; row-gap: 16px; }
  .fs-stat { gap: 3px; }
  .fs-stat-icon { margin-bottom: 4px; width: 20px; height: 20px; }
  .fs-stat-title { font-size: .92rem; }
  .fs-stat-desc { font-size: .8rem; line-height: 1.4; }
}

@media (prefers-reduced-motion: reduce) {
  .fs-section *, .fs-section *::before, .fs-section *::after { transition: none !important; }
}
`;

/* ───────────────────────── Component ───────────────────────── */

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isSmall = () => typeof window !== "undefined" && window.innerWidth <= 899;

export function FeaturesSection() {
  const rootRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const pillRefs = useRef<Partial<Record<FilterKey, HTMLButtonElement | null>>>({});
  const isFirstFilter = useRef(true);
  const [active, setActive] = useState<FilterKey>("all");

  /* groups with only the cards that match the current filter */
  const visibleGroups = useMemo(
    () =>
      GROUPS.map((g) => ({
        ...g,
        features: g.features.filter(
          (f) => active === "all" || g.key === active || f.also?.includes(active)
        ),
      })).filter((g) => g.features.length > 0),
    [active]
  );
  const featureCount = visibleGroups.reduce((n, g) => n + g.features.length, 0);

  /* ── 1. Intro + scroll-triggered reveals (runs once) ── */
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    const small = isSmall();
    const rise = small ? 22 : 44; // shorter travel on small screens

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".fs-eyebrow-line", { scaleX: 0, transformOrigin: "left center", duration: 0.8 })
        .from(".fs-title-inner", { yPercent: 115, duration: 1, stagger: 0.12 }, "-=0.55")
        .from(".fs-desc", { y: 20, opacity: 0, duration: 0.8, clearProps: "transform,opacity" }, "-=0.7")
        .from(
          ".fs-pill",
          { y: 18, opacity: 0, duration: 0.55, stagger: 0.05, clearProps: "transform,opacity" },
          "-=0.6"
        );

      gsap.utils.toArray<HTMLElement>(".fs-group").forEach((group: HTMLElement, i: number) => {
        const line = group.querySelector(".fs-group-line");
        const head = group.querySelector(".fs-group-head");
        const cards = group.querySelectorAll(".fs-card");

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { id: `grp-${i}`, trigger: group, start: "top 90%", once: true },
        });

        if (line) tl.from(line, { scaleX: 0, duration: 1 }, 0);
        if (head) tl.from(head, { x: small ? -12 : -24, opacity: 0, duration: 0.7, clearProps: "transform,opacity" }, 0.05);
        if (cards.length > 0) {
          tl.from(cards, { y: rise, opacity: 0, duration: 0.7, stagger: small ? 0.06 : 0.09, clearProps: "transform,opacity" }, 0.15);
        }
      });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { id: "grp-more", trigger: ".fs-more", start: "top 92%", once: true },
        })
        .from(".fs-more", { y: rise * 0.8, opacity: 0, duration: 0.8, clearProps: "transform,opacity" })
        .from(
          ".fs-stat",
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.08, clearProps: "transform,opacity" },
          "-=0.4"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  /* ── 2. Sliding pill indicator ── */
  useLayoutEffect(() => {
    const move = (animate: boolean) => {
      const btn = pillRefs.current[active];
      const ind = indicatorRef.current;
      if (!btn || !ind) return;
      const vars = { x: btn.offsetLeft, y: btn.offsetTop, width: btn.offsetWidth, height: btn.offsetHeight };
      if (animate && !prefersReducedMotion()) {
        gsap.to(ind, { ...vars, duration: 0.55, ease: "power3.out", overwrite: true });
      } else {
        gsap.set(ind, vars);
      }
    };

    move(!isFirstFilter.current);
    // keep the chosen pill centred in the scrolling row WITHOUT scrolling the window
    const track = trackRef.current;
    const btn = pillRefs.current[active];
    if (track && btn && !isFirstFilter.current) {
      const targetLeft = btn.offsetLeft - track.offsetWidth / 2 + btn.offsetWidth / 2;
      track.scrollTo({ left: targetLeft, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }

    const onResize = () => move(false);
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => move(false));
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  /* ── 3. After a filter change: re-animate cards ── */
  useEffect(() => {
    if (isFirstFilter.current) {
      isFirstFilter.current = false;
      return;
    }

    if (prefersReducedMotion()) return;

    // the one-time scroll reveals are no longer needed once the user filters
    ScrollTrigger.getAll().forEach((st: any) => {
      if (String(st.vars.id).startsWith("grp-") && st.vars.id !== "grp-more") {
        st.animation?.progress(1);
        st.kill();
      }
    });

    const ctx = gsap.context(() => {
      const scope = rootRef.current;
      if (!scope) return;

      const heads = gsap.utils.toArray<HTMLElement>(".fs-group-head", scope);
      if (heads.length) {
        gsap.fromTo(
          heads,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" }
        );
      }

      // The first group has no separator, and some filters show only one group.
      const lines = gsap.utils.toArray<HTMLElement>(".fs-group-line", scope);
      if (lines.length) {
        gsap.fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.out", clearProps: "transform" });
      }

      const cards = gsap.utils.toArray<HTMLElement>(".fs-card", scope);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0, scale: 0.98 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.55, stagger: 0.04, ease: "power3.out",
            clearProps: "transform,opacity",
          }
        );
      }
    }, rootRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [active]);

  return (
    <section ref={rootRef} className="fs-section" aria-labelledby="fs-heading">
      <style>{CSS}</style>

      <div className="fs-inner">
        <p className="fs-eyebrow">
          <span className="fs-eyebrow-line" />
          The Features
        </p>

        {/* ── Header ── */}
        <div className="fs-header">
          <h2 className="fs-title" id="fs-heading">
            <span className="fs-title-line">
              <span className="fs-title-inner">Everything you need.</span>
            </span>
            <span className="fs-title-line">
              <span className="fs-title-inner">Nothing you don't.</span>
            </span>
          </h2>
          <p className="fs-desc">
            A complete set of features for a modern, flexible and personal music
            experience, from playback and library management to lyrics,
            synchronization and more.
          </p>
        </div>

        {/* ── Filters ── */}
        <div className="fs-filters" ref={filtersRef}>
          <div className="fs-track" ref={trackRef} role="group" aria-label="Filter features">
            <span className="fs-indicator" ref={indicatorRef} aria-hidden="true" />
            {FILTERS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                ref={(el) => { pillRefs.current[key] = el; }}
                type="button"
                className="fs-pill"
                aria-pressed={active === key}
                onClick={() => setActive(key)}
              >
                <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="fs-sr" role="status" aria-live="polite">
          Showing {featureCount} {featureCount === 1 ? "feature" : "features"}
          {active === "all" ? "" : ` in ${FILTERS.find((f) => f.key === active)?.label}`}
        </p>

        {/* ── Feature groups ── */}
        <div className="fs-groups" ref={groupsRef}>
          <ScrollStack
            className="fs-feature-stack"
            useWindowScroll
            smoothScroll
            itemDistance={72}
            itemStackDistance={26}
            stackPosition={isSmall() ? 88 : 108}
            itemScale={0.035}
            baseScale={0.88}
            dimAmount={0.14}
            holdDistance={96}
          >
          {visibleGroups.map((g, gi) => {
            const GroupIcon = g.icon;
            return (
              <ScrollStackItem key={g.key} itemClassName="fs-feature-stack-panel">
              <div className="fs-group">
                {gi > 0 && <span className="fs-group-line" aria-hidden="true" />}
                <div className="fs-group-head">
                  <div className="fs-group-icon"><GroupIcon size={24} strokeWidth={1.6} aria-hidden="true" /></div>
                  <h3 className="fs-group-title">{g.title}</h3>
                  <p className="fs-group-desc">{g.desc}</p>
                </div>
                <div className="fs-cards">
                  {g.features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <article key={f.title} className={`fs-card ${f.backgroundEffect ? "has-react-bits-background" : ""}`}>
                        {f.backgroundEffect && <BackgroundEffect effect={f.backgroundEffect} />}
                        <div className="fs-card-icon"><Icon size={20} strokeWidth={1.7} aria-hidden="true" /></div>
                        <h4 className="fs-card-title">{f.title}</h4>
                        <p className="fs-card-desc">{f.desc}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
              </ScrollStackItem>
            );
          })}
          </ScrollStack>
        </div>

        {/* ── And much more ── */}
        <div className="fs-more">
          <div className="fs-more-lead">
            <div className="fs-more-logo"><Music2 size={28} strokeWidth={1.8} aria-hidden="true" /></div>
            <div>
              <h3 className="fs-more-title">And much more...</h3>
              <p className="fs-more-desc">
                Gaan keeps evolving with thoughtful features, regular updates
                and a focus on what listeners really need.
              </p>
            </div>
          </div>
          <div className="fs-more-stats">
            {MORE_STATS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="fs-stat">
                <Icon className="fs-stat-icon" size={24} strokeWidth={1.6} aria-hidden="true" />
                <h4 className="fs-stat-title">{title}</h4>
                <p className="fs-stat-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
