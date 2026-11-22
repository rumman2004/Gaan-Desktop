import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import type { BackgroundEffectName } from "../backgrounds/placements";

export interface PlaybackFeatureCardProps {
  title: string;
  desc: string;
  badge?: string;
  icon: React.ReactNode;
  backgroundEffect?: BackgroundEffectName;
  className?: string;
}

export function PlaybackFeatureCard({
  title,
  desc,
  badge,
  icon,
  backgroundEffect,
  className,
}: PlaybackFeatureCardProps) {
  return (
    <Card
      variant="interactive"
      backgroundEffect={backgroundEffect}
      className={cn("p-4 sm:p-6 flex flex-col justify-between group", className)}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="size-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] group-hover:bg-[var(--btn-primary-bg)] group-hover:text-[var(--btn-primary-text)] transition-colors">
            {icon}
          </div>
          {badge && <Badge variant="outline">{badge}</Badge>}
        </div>

        <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
          {desc}
        </p>
      </div>
    </Card>
  );
}
