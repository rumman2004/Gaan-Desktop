import React, { useState, useEffect } from "react";
import { IconButton } from "../ui/IconButton";
import { cn } from "../../lib/utils";
import { ArrowUpIcon as AnimatedArrowUp } from "../ui/arrow-up";

export interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export function BackToTop({ threshold = 400, className }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div className={cn("fixed bottom-6 right-6 z-40 animate-in fade-in zoom-in-95 duration-200", className)}>
      <IconButton
        icon={<AnimatedArrowUp size={20} className="size-5" aria-hidden="true" />}
        aria-label="Back to top of page"
        tooltip="Back to top"
        onClick={scrollToTop}
        className="bg-[var(--bg-card)] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border border-[var(--border-default)] size-12"
      />
    </div>
  );
}
