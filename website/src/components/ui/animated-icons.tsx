import React, { useEffect, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "./arrow-right";
import { AudioLinesIcon } from "./audio-lines";
import { BadgeAlertIcon } from "./badge-alert";
import { BanIcon } from "./ban";
import { BookmarkIcon } from "./bookmark";
import { BookTextIcon } from "./book-text";
import { CalendarDaysIcon } from "./calendar-days";
import { ChartNoAxesColumnIncreasingIcon } from "./chart-no-axes-column-increasing";
import { CheckIcon } from "./check";
import { ChevronDownIcon } from "./chevron-down";
import { ChevronLeftIcon } from "./chevron-left";
import { ChevronRightIcon } from "./chevron-right";
import { CircleCheckIcon } from "./circle-check";
import { CircleGaugeIcon } from "./circle-gauge";
import { CircleHelpIcon } from "./circle-help";
import { ClockIcon } from "./clock";
import { CopyIcon } from "./copy";
import { DatabaseBackupIcon } from "./database-backup";
import { Disc3Icon } from "./disc-3";
import { DownloadIcon } from "./download";
import { ExternalLinkIcon } from "./external-link";
import { EyeIcon } from "./eye";
import { FileTextIcon } from "./file-text";
import { FlameIcon } from "./flame";
import { FolderHeartIcon } from "./folder-heart";
import { FolderOpenIcon } from "./folder-open";
import { GaugeIcon } from "./gauge";
import { GitCommitHorizontalIcon } from "./git-commit-horizontal";
import { GithubIcon } from "./github";
import { HardDriveDownloadIcon } from "./hard-drive-download";
import { HeartIcon } from "./heart";
import { HomeIcon } from "./home";
import { KeyboardIcon } from "./keyboard";
import { LaptopMinimalCheckIcon } from "./laptop-minimal-check";
import { LayersIcon } from "./layers";
import { LayoutGridIcon } from "./layout-grid";
import { LoaderCircleIcon } from "./loader-circle";
import { Maximize2Icon } from "./maximize-2";
import { MenuIcon } from "./menu";
import { MessageSquareIcon } from "./message-square";
import { MinimizeIcon } from "./minimize";
import { MonitorCheckIcon } from "./monitor-check";
import { PaletteIcon } from "./palette";
import { PhoneIcon } from "./phone";
import { PlayIcon } from "./play";
import { RadioIcon } from "./radio";
import { RefreshCWIcon } from "./refresh-cw";
import { RocketIcon } from "./rocket";
import { RotateCCWIcon } from "./rotate-ccw";
import { SearchIcon } from "./search";
import { SettingsIcon } from "./settings";
import { ShieldCheckIcon } from "./shield-check";
import { SlidersHorizontalIcon } from "./sliders-horizontal";
import { SparklesIcon } from "./sparkles";
import { SunIcon } from "./sun";
import { TerminalIcon } from "./terminal";
import { UsersIcon } from "./users";
import { VolumeIcon } from "./volume";
import { WaypointsIcon } from "./waypoints";
import { XIcon } from "./x";
import { ZapIcon } from "./zap";

type MotionHandle = { startAnimation: () => void; stopAnimation: () => void };
export type LucideIcon = React.ComponentType<any>;
type AnimatedIconProps = React.HTMLAttributes<HTMLSpanElement> & {
  size?: number;
  strokeWidth?: number;
  fill?: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function withMotion(Icon: React.ComponentType<any>): React.ForwardRefExoticComponent<AnimatedIconProps & React.RefAttributes<HTMLSpanElement>> {
  return React.forwardRef<HTMLSpanElement, AnimatedIconProps>(function AnimatedIcon(
    { className, size = 24, onMouseEnter, onMouseLeave, role, strokeWidth: _strokeWidth, fill: _fill, ...props },
    forwardedRef
  ) {
    const iconRef = useRef<MotionHandle | null>(null);
    const hostRef = useRef<HTMLSpanElement | null>(null);
    useImperativeHandle(forwardedRef, () => hostRef.current as HTMLSpanElement);

    useEffect(() => {
      const host = hostRef.current;
      if (!host) return;

      const play = () => { if (!prefersReducedMotion()) iconRef.current?.startAnimation(); };
      const reset = () => { if (!prefersReducedMotion()) iconRef.current?.stopAnimation(); };
      host.addEventListener("gaan-icon-play", play);
      host.addEventListener("gaan-icon-reset", reset);

      const touchDevice = window.matchMedia("(hover: none), (pointer: coarse)").matches;
      let observer: IntersectionObserver | undefined;
      if (touchDevice && "IntersectionObserver" in window) {
        observer = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
              play();
              observer?.disconnect();
            }
          }, { threshold: 0.35, rootMargin: "0px 0px -6% 0px" });
        observer.observe(host);
      }

      return () => {
        observer?.disconnect();
        host.removeEventListener("gaan-icon-play", play);
        host.removeEventListener("gaan-icon-reset", reset);
      };
    }, []);

    const triggerPlay = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(event as unknown as React.MouseEvent<HTMLSpanElement>);
      if (!prefersReducedMotion()) iconRef.current?.startAnimation();
    };
    const triggerReset = (event: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(event as unknown as React.MouseEvent<HTMLSpanElement>);
      if (!prefersReducedMotion()) iconRef.current?.stopAnimation();
    };

    return (
      <span
        {...props}
        ref={hostRef}
        role={role ?? (props["aria-label"] ? "img" : undefined)}
        data-animated-icon=""
        className={cn("animated-icon-host inline-flex shrink-0 items-center justify-center", className ?? `size-[${size}px]`)}
      >
        <Icon
          ref={iconRef}
          size={size}
          aria-hidden="true"
          onMouseEnter={triggerPlay}
          onMouseLeave={triggerReset}
        />
      </span>
    );
  });
}

export const AlertCircle = withMotion(BadgeAlertIcon);
export const AppWindow = withMotion(MonitorCheckIcon);
export const Apple = withMotion(LaptopMinimalCheckIcon);
export const ArrowDownToLine = withMotion(DownloadIcon);
export const ArrowRight = withMotion(ArrowRightIcon);
export const Ban = withMotion(BanIcon);
export const BarChart3 = withMotion(ChartNoAxesColumnIncreasingIcon);
export const BookOpen = withMotion(BookTextIcon);
export const Calendar = withMotion(CalendarDaysIcon);
export const CalendarDays = withMotion(CalendarDaysIcon);
export const Check = withMotion(CheckIcon);
export const ChevronDown = withMotion(ChevronDownIcon);
export const ChevronLeft = withMotion(ChevronLeftIcon);
export const ChevronRight = withMotion(ChevronRightIcon);
export const CircleHelp = withMotion(CircleHelpIcon);
export const Clock = withMotion(ClockIcon);
export const Clock3 = withMotion(ClockIcon);
export const Code2 = withMotion(TerminalIcon);
export const Copy = withMotion(CopyIcon);
export const Database = withMotion(DatabaseBackupIcon);
export const Disc = withMotion(Disc3Icon);
export const Download = withMotion(DownloadIcon);
export const ExternalLink = withMotion(ExternalLinkIcon);
export const Eye = withMotion(EyeIcon);
export const FileJson = withMotion(FileTextIcon);
export const FileText = withMotion(FileTextIcon);
export const Flame = withMotion(FlameIcon);
export const Folder = withMotion(FolderOpenIcon);
export const FolderHeart = withMotion(FolderHeartIcon);
export const Gauge = withMotion(GaugeIcon);
export const GitCommit = withMotion(GitCommitHorizontalIcon);
export const Github = withMotion(GithubIcon);
export const HardDrive = withMotion(HardDriveDownloadIcon);
export const Headphones = withMotion(AudioLinesIcon);
export const Heart = withMotion(HeartIcon);
export const Home = withMotion(HomeIcon);
export const Keyboard = withMotion(KeyboardIcon);
export const Laptop = withMotion(LaptopMinimalCheckIcon);
export const Layers = withMotion(LayersIcon);
export const LayoutGrid = withMotion(LayoutGridIcon);
export const ListMusic = withMotion(AudioLinesIcon);
export const Loader2 = withMotion(LoaderCircleIcon);
export const Maximize2 = withMotion(Maximize2Icon);
export const Menu = withMotion(MenuIcon);
export const MessageSquare = withMotion(MessageSquareIcon);
export const Minimize2 = withMotion(MinimizeIcon);
export const Minus = withMotion(XIcon);
export const Monitor = withMotion(MonitorCheckIcon);
export const MonitorSmartphone = withMotion(LaptopMinimalCheckIcon);
export const Move = withMotion(WaypointsIcon);
export const Music = withMotion(AudioLinesIcon);
export const Music2 = withMotion(AudioLinesIcon);
export const PackageCheck = withMotion(CircleCheckIcon);
export const Palette = withMotion(PaletteIcon);
export const Play = withMotion(PlayIcon);
export const PlayCircle = withMotion(PlayIcon);
export const Quote = withMotion(MessageSquareIcon);
export const Radio = withMotion(RadioIcon);
export const RefreshCw = withMotion(RefreshCWIcon);
export const Repeat2 = withMotion(RefreshCWIcon);
export const Rocket = withMotion(RocketIcon);
export const RotateCcw = withMotion(RotateCCWIcon);
export const Search = withMotion(SearchIcon);
export const Settings = withMotion(SettingsIcon);
export const Share2 = withMotion(ExternalLinkIcon);
export const Shield = withMotion(ShieldCheckIcon);
export const ShieldCheck = withMotion(ShieldCheckIcon);
export const Shuffle = withMotion(WaypointsIcon);
export const SlidersHorizontal = withMotion(SlidersHorizontalIcon);
export const SlidersVertical = withMotion(SlidersHorizontalIcon);
export const Smartphone = withMotion(PhoneIcon);
export const Sparkles = withMotion(SparklesIcon);
export const Tag = withMotion(BookmarkIcon);
export const Target = withMotion(CircleGaugeIcon);
export const Type = withMotion(FileTextIcon);
export const Users = withMotion(UsersIcon);
export const Volume2 = withMotion(VolumeIcon);
export const Waypoints = withMotion(WaypointsIcon);
export const X = withMotion(XIcon);
export const Zap = withMotion(ZapIcon);

