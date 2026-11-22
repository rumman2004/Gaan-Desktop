import React from "react";
import { cn } from "../../lib/utils";
import { Card } from "./Card";

export interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeType = "neutral",
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card className={cn("flex flex-col gap-2 p-4 sm:p-6", className)}>
      <div className="flex items-center justify-between text-[var(--text-secondary)]">
        <span className="text-sm font-medium">{label}</span>
        {icon && <span className="size-5 text-[var(--text-muted)]">{icon}</span>}
      </div>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </span>
        {change && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              changeType === "positive" && "bg-[var(--success-bg)] text-[var(--success-text)]",
              changeType === "negative" && "bg-[var(--danger-soft-bg)] text-[var(--danger-text-soft)]",
              changeType === "neutral" && "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
            )}
          >
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-[var(--text-muted)] mt-1">{description}</p>
      )}
    </Card>
  );
}
