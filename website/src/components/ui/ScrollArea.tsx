import React from "react";
import { cn } from "../../lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: string | number;
}

export function ScrollArea({
  children,
  maxHeight = "400px",
  className,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[var(--border-default)] scrollbar-track-transparent pr-2",
        className
      )}
      style={{ maxHeight }}
      {...props}
    >
      {children}
    </div>
  );
}
