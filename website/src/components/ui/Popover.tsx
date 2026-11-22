import React, { useState, useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

export interface PopoverProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
}

export function Popover({
  trigger,
  content,
  align = "center",
  className,
}: PopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  const alignStyles = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      <div onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        {trigger}
      </div>
      {open && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-56 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-hover)] animate-in fade-in zoom-in-95 duration-150",
            alignStyles[align],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
