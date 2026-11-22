import { cn } from "../../lib/utils";
import { AnimatedThemeToggler } from "../magicui/animated-theme-toggler";

export interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ThemeToggle({ className, size = "md" }: ThemeToggleProps) {
  const sizeStyles = {
    sm: "size-11 sm:size-9",
    md: "size-11 sm:size-10",
    lg: "size-12",
  };

  return <AnimatedThemeToggler className={cn(sizeStyles[size], className)} />;
}
