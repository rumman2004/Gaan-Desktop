import React from "react";
import { cn } from "../../lib/utils";
import { AlertCircle } from "@/components/ui/animated-icons";
import { Card } from "../ui/Card";

export interface LimitationItem {
  title: string;
  desc: string;
}

export interface LimitationCardProps {
  limitations: LimitationItem[];
  className?: string;
}

export function LimitationCard({ limitations, className }: LimitationCardProps) {
  return (
    <Card
      variant="outlined"
      className={cn(
        "p-6 sm:p-8 bg-[var(--bg-secondary)]/50 border-[var(--border-default)]",
        className
      )}
    >
      <div className="flex items-center gap-2.5 mb-5 text-[var(--text-primary)]">
        <AlertCircle className="size-5 shrink-0 text-[var(--text-secondary)]" />
        <h3 className="text-base sm:text-lg font-bold tracking-tight">
          Honest Product Limitations
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {limitations.map((item) => (
          <div key={item.title} className="flex flex-col gap-1.5">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">
              {item.title}
            </h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
