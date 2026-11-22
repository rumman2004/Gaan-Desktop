import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "@/components/ui/animated-icons";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-[var(--disabled-opacity)] disabled:pointer-events-none select-none cursor-pointer";

    const variantStyles: Record<string, string> = {
      primary:
        "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 active:scale-[0.98] focus-visible:ring-[var(--border-strong)]",
      secondary:
        "bg-[var(--btn-secondary-bg)] text-[var(--btn-secondary-text)] border border-[var(--btn-secondary-border)] hover:bg-[var(--btn-secondary-hover)] hover:border-[var(--text-primary)] active:scale-[0.98] focus-visible:ring-[var(--border-strong)]",
      outline:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-default)] hover:bg-[var(--bg-secondary)] hover:border-[var(--text-primary)] active:scale-[0.98] focus-visible:ring-[var(--border-strong)]",
      ghost:
        "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] active:scale-[0.98] focus-visible:ring-[var(--border-strong)]",
      destructive:
        "bg-[var(--danger-bg)] text-[var(--danger-text)] hover:bg-[var(--danger-hover)] active:scale-[0.98] focus-visible:ring-[var(--focus-ring)]",
      icon:
        "bg-transparent text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-default)] hover:bg-[var(--bg-secondary)] active:scale-[0.95]",
    };

    const sizeStyles: Record<string, string> = {
      sm: "h-10 px-4 text-xs gap-1.5 sm:h-9",
      md: "h-11 px-5 text-sm gap-2 sm:px-6",
      lg: "h-12 px-5 text-sm gap-2 sm:h-14 sm:px-8 sm:text-base sm:gap-2.5",
      icon: "size-11 p-0 sm:size-10",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          variant === "icon" ? sizeStyles.icon : sizeStyles[size],
          className
        )}
        data-icon-hover=""
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
