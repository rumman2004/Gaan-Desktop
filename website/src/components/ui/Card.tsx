import React from "react";
import { cn } from "../../lib/utils";
import { BackgroundEffect } from "../backgrounds/BackgroundEffect";
import type { BackgroundEffectName } from "../backgrounds/placements";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "interactive";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  backgroundEffect?: BackgroundEffectName;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      backgroundEffect,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles: Record<string, string> = {
      default:
        "bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)]",
      outlined:
        "bg-transparent border border-[var(--border-default)]",
      elevated:
        "bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] shadow-[var(--shadow-hover)]",
      interactive:
        "bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-card)] transition-all duration-300 hover:border-[var(--border-default)] hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] cursor-pointer",
    };

    const paddingStyles: Record<string, string> = {
      none: "p-0",
      sm: "p-4",
      md: "p-4 sm:p-6",
      lg: "p-5 sm:p-8",
      xl: "p-10",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] overflow-hidden",
          backgroundEffect && "has-react-bits-background",
          variantStyles[variant],
          paddingStyles[padding],
          className
        )}
        data-icon-hover=""
        {...props}
      >
        {backgroundEffect && <BackgroundEffect effect={backgroundEffect} />}
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 mb-4", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-semibold text-lg tracking-tight text-[var(--text-primary)]",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-[var(--text-secondary)] leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center pt-4 mt-auto border-t border-[var(--border-subtle)]", className)}
      {...props}
    />
  );
}
