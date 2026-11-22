import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { BackgroundEffectName } from "../backgrounds/placements";

export interface LibraryCardProps {
  title: string;
  tagline: string;
  description: string;
  badge?: string;
  preview: React.ReactNode;
  backgroundEffect?: BackgroundEffectName;
  className?: string;
}

export function LibraryCard({
  title,
  tagline,
  description,
  badge,
  preview,
  backgroundEffect,
  className,
}: LibraryCardProps) {
  return (
    <Card
      variant="interactive"
      backgroundEffect={backgroundEffect}
      className={cn(
        "p-5 sm:p-9 flex flex-col justify-between overflow-hidden group border border-[var(--border-subtle)]",
        className
      )}
    >
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            {tagline}
          </span>
          {badge && <Badge variant="version">{badge}</Badge>}
        </div>

        <h3 className="text-xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-2 sm:mb-3">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl">
          {description}
        </p>
      </div>

      <div className="w-full">{preview}</div>
    </Card>
  );
}
