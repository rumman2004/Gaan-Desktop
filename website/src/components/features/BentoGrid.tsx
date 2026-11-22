import React from "react";
import { cn } from "../../lib/utils";

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 auto-rows-[minmax(240px,auto)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: "1" | "2" | "3" | "full";
  rowSpan?: "1" | "2";
}

export function BentoCard({
  span = "1",
  rowSpan = "1",
  className,
  children,
  ...props
}: BentoCardProps) {
  const spanStyles = {
    "1": "md:col-span-1",
    "2": "md:col-span-2",
    "3": "md:col-span-3",
    full: "md:col-span-3 lg:col-span-4",
  };

  const rowSpanStyles = {
    "1": "row-span-1",
    "2": "row-span-2",
  };

  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-8 flex flex-col justify-between shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all duration-300",
        spanStyles[span],
        rowSpanStyles[rowSpan],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
