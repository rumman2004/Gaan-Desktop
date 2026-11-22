import React from "react";
import { cn } from "../../lib/utils";
import { Maximize2 } from "@/components/ui/animated-icons";
import type { ScreenshotFit } from "../../data/screenshots";

export interface ScreenshotFrameProps {
  src: string;
  alt: string;
  device?: "desktop" | "mobile";
  fit?: ScreenshotFit;
  /** Only the centred slide shows the zoom affordance. */
  isActive?: boolean;
  onZoom?: () => void;
  className?: string;
}

export function ScreenshotFrame({
  src,
  alt,
  device = "desktop",
  fit = "window",
  isActive = true,
  onZoom,
  className,
}: ScreenshotFrameProps) {
  const isMobile = device === "mobile";
  const isWidget = fit === "widget";

  // Desktop windows and cropped widgets share one ratio so the carousel stays even.
  const shell = isMobile
    ? "aspect-[9/19.5] rounded-[1.6rem] sm:rounded-[2rem] p-[3px] sm:p-1"
    : "aspect-[16/10] rounded-xl sm:rounded-2xl p-[2px] sm:p-[3px]";
  const inner = isMobile
    ? "rounded-[1.4rem] sm:rounded-[1.75rem]"
    : "rounded-[0.65rem] sm:rounded-[0.85rem]";

  return (
    <button
      type="button"
      onClick={onZoom}
      aria-label={`${isActive ? "Open" : "Show"} ${alt} screenshot`}
      className={cn(
        "group relative block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--text-primary)]",
        isActive ? "cursor-zoom-in" : "cursor-pointer",
        className
      )}
    >
      <div className={cn("relative bg-neutral-950 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)] ring-1 ring-black/10", shell)}>
        <div className={cn("relative h-full w-full overflow-hidden bg-neutral-900", inner)}>
          {isWidget ? (
            // Already-cropped capture: show the whole image, never crop it again.
            <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 p-[8%]">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                draggable={false}
                className="max-h-full max-w-[72%] rounded-lg object-contain shadow-2xl ring-1 ring-white/10"
              />
            </div>
          ) : (
            <img src={src} alt={alt} loading="lazy" draggable={false} className="h-full w-full object-cover object-top" />
          )}

          {isActive && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[var(--overlay-soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
              <div className="rounded-full bg-[var(--overlay-control-bg)] p-3 text-[var(--overlay-text)] backdrop-blur-md">
                <Maximize2 className="size-5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}