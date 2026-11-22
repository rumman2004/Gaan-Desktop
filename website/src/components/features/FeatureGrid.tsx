import React from "react";
import { cn } from "../../lib/utils";

export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({
  columns = 3,
  className,
  children,
  ...props
}: FeatureGridProps) {
  const colStyles = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div
      className={cn("grid gap-5 sm:gap-6", colStyles[columns], className)}
      {...props}
    >
      {children}
    </div>
  );
}
