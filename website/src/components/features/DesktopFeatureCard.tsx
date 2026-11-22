import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import type { BackgroundEffectName } from "../backgrounds/placements";

export interface DesktopFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  preview?: React.ReactNode;
  backgroundEffect?: BackgroundEffectName;
  className?: string;
}

export function DesktopFeatureCard({
  icon,
  title,
  description,
  preview,
  backgroundEffect,
  className,
}: DesktopFeatureCardProps) {
  return (
    <Card
      variant="interactive"
      backgroundEffect={backgroundEffect}
      className={cn("p-4 sm:p-7 flex flex-col justify-between group", className)}
    >
      <div>
        <div className="size-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--btn-primary-bg)] group-hover:text-[var(--btn-primary-text)] transition-colors mb-4">
          {icon}
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {preview && (
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
          {preview}
        </div>
      )}
    </Card>
  );
}
