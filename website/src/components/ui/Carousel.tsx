import React, { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "@/components/ui/animated-icons";
import { IconButton } from "./IconButton";

export interface CarouselProps {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
  itemClassName?: string;
  onIndexChange?: (index: number) => void;
  currentIndex?: number;
}

export function Carousel({
  items,
  autoplay = false,
  autoplayInterval = 4500,
  showArrows = true,
  showIndicators = true,
  className,
  itemClassName,
  onIndexChange,
  currentIndex: controlledIndex,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const total = items.length;
  const touchStartX = useRef<number | null>(null);

  const setIndex = (idx: number) => {
    const nextIdx = (idx + total) % total;
    if (!isControlled) setInternalIndex(nextIdx);
    onIndexChange?.(nextIdx);
  };

  const next = () => setIndex(activeIndex + 1);
  const prev = () => setIndex(activeIndex - 1);

  // Autoplay
  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const interval = setInterval(next, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, activeIndex, total]);

  // Touch gesture handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Screenshot gallery"
      tabIndex={0}
      className={cn("relative w-full overflow-hidden select-none", className)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") { event.preventDefault(); prev(); }
        if (event.key === "ArrowRight") { event.preventDefault(); next(); }
      }}
    >
      <div
        className="flex transition-transform duration-500 ease-[var(--ease-smooth)]"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className={cn("w-full shrink-0", itemClassName)}
            aria-hidden={idx !== activeIndex}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && total > 1 && (
        <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
          <IconButton
            icon={<ChevronLeft className="size-5" />}
            aria-label="Previous slide"
            onClick={prev}
            className="pointer-events-auto bg-[var(--bg-card)]/90 backdrop-blur-md shadow-md hover:scale-105"
          />
          <IconButton
            icon={<ChevronRight className="size-5" />}
            aria-label="Next slide"
            onClick={next}
            className="pointer-events-auto bg-[var(--bg-card)]/90 backdrop-blur-md shadow-md hover:scale-105"
          />
        </div>
      )}

      {/* Indicator dots */}
      {showIndicators && total > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === activeIndex
                  ? "w-8 bg-[var(--btn-primary-bg)]"
                  : "w-2 bg-[var(--border-default)] hover:bg-[var(--text-secondary)]"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
