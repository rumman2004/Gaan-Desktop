import React from "react";
import { cn } from "../../lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article" | "aside";
  variant?: "primary" | "secondary" | "tertiary" | "card";
  padding?: "default" | "compact" | "none";
}

export function Section({
  as: Component = "section",
  variant = "primary",
  padding = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    primary: "bg-[var(--bg-primary)] text-[var(--text-primary)]",
    secondary: "bg-[var(--bg-secondary)] text-[var(--text-primary)]",
    tertiary: "bg-[var(--bg-tertiary)] text-[var(--text-primary)]",
    card: "bg-[var(--bg-card)] text-[var(--text-primary)]",
  };

  const paddingStyles = {
    default: "gaan-section",
    compact: "gaan-section-compact",
    none: "p-0",
  };

  return (
    <Component
      className={cn(variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
