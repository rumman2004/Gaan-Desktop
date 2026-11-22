import React from "react";
import { cn } from "../../lib/utils";

export interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[var(--text-secondary)] mb-4 select-none",
        className
      )}
      {...props}
    >
      <span className="w-7 h-[1.5px] bg-[var(--text-primary)] rounded-full shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
