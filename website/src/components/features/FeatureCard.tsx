import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  preview?: React.ReactNode;
  highlight?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  preview,
  highlight = false,
  className,
  size = "md",
}: FeatureCardProps) {
  const sizeStyles = {
    sm: "p-5 gap-3",
    md: "p-4 sm:p-7 gap-4",
    lg: "p-5 sm:p-9 gap-5",
  };

  return (
    <Card
      variant="interactive"
      className={cn(
        "flex flex-col justify-between transition-all duration-300 group",
        highlight && "border-[var(--text-primary)]/40 shadow-md",
        sizeStyles[size],
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          {icon && (
            <div className="size-11 sm:size-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] transition-all duration-200 group-hover:bg-[var(--btn-primary-bg)] group-hover:text-[var(--btn-primary-text)] group-hover:border-[var(--btn-primary-bg)] shrink-0">
              {icon}
            </div>
          )}
          {badge && <Badge variant="default">{badge}</Badge>}
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-primary)] transition-colors">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {preview && (
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] overflow-hidden">
          {preview}
        </div>
      )}
    </Card>
  );
}
