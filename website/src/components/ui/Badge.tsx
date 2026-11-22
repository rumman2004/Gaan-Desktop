import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "warning" | "muted" | "version";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const variantStyles: Record<string, string> = {
    default:
      "bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-subtle)]",
    outline:
      "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)]",
    success:
      "bg-[var(--success-bg)] text-[var(--success-text)] border border-[var(--success-border)]",
    warning:
      "bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)]",
    muted:
      "bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-transparent",
    version:
      "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] font-mono border border-[var(--border-subtle)] font-medium",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-full select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
