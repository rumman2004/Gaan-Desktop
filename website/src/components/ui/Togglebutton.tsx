import React from "react";
import { cn } from "../../lib/utils";

export interface ToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  size?: "sm" | "md" | "lg";
}

export function ToggleButton({
  className,
  pressed = false,
  onPressedChange,
  onClick,
  size = "md",
  children,
  ...props
}: ToggleButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onPressedChange?.(!pressed);
  };

  const sizeStyles: Record<string, string> = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-5 text-base gap-2.5",
  };

  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-all select-none cursor-pointer border",
        pressed
          ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)]"
          : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]",
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
