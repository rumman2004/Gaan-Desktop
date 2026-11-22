import { useState, useCallback, useEffect } from "react";

interface UseCarouselOptions {
  total: number;
  initialIndex?: number;
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export function useCarousel({
  total,
  initialIndex = 0,
  loop = true,
  autoplay = false,
  autoplayInterval = 5000,
}: UseCarouselOptions) {
  const [index, setIndex] = useState(initialIndex);

  const next = useCallback(() => {
    setIndex((prev) => {
      if (prev < total - 1) return prev + 1;
      return loop ? 0 : prev;
    });
  }, [total, loop]);

  const prev = useCallback(() => {
    setIndex((prev) => {
      if (prev > 0) return prev - 1;
      return loop ? total - 1 : prev;
    });
  }, [total, loop]);

  const goTo = useCallback(
    (newIndex: number) => {
      if (newIndex >= 0 && newIndex < total) {
        setIndex(newIndex);
      }
    },
    [total]
  );

  useEffect(() => {
    if (!autoplay || total <= 1) return;
    const timer = setInterval(next, autoplayInterval);
    return () => clearInterval(timer);
  }, [autoplay, autoplayInterval, next, total]);

  return {
    index,
    next,
    prev,
    goTo,
    canNext: loop || index < total - 1,
    canPrev: loop || index > 0,
  };
}
