import React from "react";
import { cn } from "../../lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "wide" | "default" | "narrow" | "full";
}

export function Container({
  variant = "wide",
  className,
  children,
  ...props
}: ContainerProps) {
  const variantStyles = {
    wide: "gaan-container-wide",
    default: "gaan-container-default",
    narrow: "gaan-container-narrow",
    full: "gaan-container-full",
  };

  return (
    <div className={cn(variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
}
