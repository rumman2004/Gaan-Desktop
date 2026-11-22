import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "@/components/ui/animated-icons";

export interface CoverflowCarouselProps {
  items: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  /** Tailwind classes for the stage (set its height / aspect-ratio here). */
  stageClassName?: string;
  /** Tailwind width classes for each slide, e.g. "w-[56%]". */
  slideClassName?: string;
  /** Horizontal distance between slides, as % of slide width. */
  step?: number;
  /** Tilt per step, in degrees. */
  rotate?: number;
  /** Scale lost per step away from the centre. */
  scaleFalloff?: number;
  /** Slides further than this from the centre are hidden. */
  visibleRange?: number;
  showIndicators?: boolean;
  label?: string;
  className?: string;
}

/**
 * Coverflow carousel: the active slide sits flat in the centre, neighbours tilt
 * back in 3D. All motion maths lives in `getSlideStyle` — replace that function
 * with your own animation code and nothing else needs to change.
 */
export function CoverflowCarousel({
  items,
  currentIndex,
  onIndexChange,
  stageClassName,
  slideClassName = "w-[56%]",
  step = 68,
  rotate = 32,
  scaleFalloff = 0.14,
  visibleRange = 2,
  showIndicators = true,
  label = "Screenshot gallery",
  className,
}: CoverflowCarouselProps) {
  const total = items.length;
  const touchX = useRef<number | null>(null);

  const go = (i: number) => onIndexChange((i + total) % total);
  const next = () => go(currentIndex + 1);
  const prev = () => go(currentIndex - 1);

  // Shortest signed distance on a looping track
  const offsetOf = (i: number) => {
    let off = i - currentIndex;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  const getSlideStyle = (off: number): React.CSSProperties => {
    const abs = Math.abs(off);
    const hidden = abs > visibleRange;
    return {
      transform: `translate(-50%, -50%) translateX(${off * step}%) translateZ(${-abs * 120}px) rotateY(${-off * rotate}deg) scale(${1 - abs * scaleFalloff})`,
      opacity: hidden ? 0 : abs === 0 ? 1 : abs === 1 ? 0.92 : 0.6,
      zIndex: 10 - abs,
      pointerEvents: hidden ? "none" : "auto",
    };
  };

  useEffect(() => {
    if (total > 0 && currentIndex >= total) onIndexChange(0);
  }, [total, currentIndex, onIndexChange]);

  const arrow =
    "absolute top-1/2 -translate-y-1/2 z-20 grid place-items-center size-11 sm:size-14 rounded-full bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] shadow-sm transition-transform duration-200 hover:scale-105 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      className={cn("relative w-full select-none outline-none", className)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) { if (diff > 0) next(); else prev(); }
        touchX.current = null;
      }}
    >
      <div
        className={cn("relative mx-auto w-full", stageClassName)}
        style={{ perspective: "1600px", perspectiveOrigin: "50% 45%" }}
      >
        {items.map((item, i) => {
          const off = offsetOf(i);
          return (
            <div
              key={i}
              aria-hidden={off !== 0}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              className={cn(
                "absolute left-1/2 top-1/2 will-change-transform transition-[transform,opacity] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                slideClassName
              )}
              style={getSlideStyle(off)}
            >
              {item}
            </div>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button type="button" aria-label="Previous slide" onClick={prev} className={cn(arrow, "left-0 sm:left-2")}>
            <ChevronLeft className="size-5 sm:size-6" />
          </button>
          <button type="button" aria-label="Next slide" onClick={next} className={cn(arrow, "right-0 sm:right-2")}>
            <ChevronRight className="size-5 sm:size-6" />
          </button>
        </>
      )}

      {showIndicators && total > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === currentIndex}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                i === currentIndex
                  ? "w-6 bg-[var(--btn-primary-bg)]"
                  : "w-2 bg-[var(--border-default)] hover:bg-[var(--text-secondary)]"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}