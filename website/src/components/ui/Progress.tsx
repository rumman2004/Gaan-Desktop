import React from "react";
import { cn } from "../../lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  max?: number;
  showLabel?: boolean;
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn("w-full flex items-center gap-3", className)} {...props}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
        <div
          className="h-full bg-[var(--btn-primary-bg)] transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono font-medium text-[var(--text-secondary)] min-w-8 text-right">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}
