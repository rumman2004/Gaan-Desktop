import React from "react";
import { cn } from "../../lib/utils";
import { Kbd } from "../ui/Kbd";
import { Card } from "../ui/Card";

export interface ShortcutCardProps {
  action: string;
  description: string;
  keys: string[];
  className?: string;
}

export function ShortcutCard({
  action,
  description,
  keys,
  className,
}: ShortcutCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-secondary)]/60 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-colors",
        className
      )}
    >
      <div>
        <h4 className="text-sm font-semibold text-[var(--text-primary)]">
          {action}
        </h4>
        <p className="text-xs text-[var(--text-secondary)]">{description}</p>
      </div>

      <div className="shrink-0 pl-3">
        <Kbd keys={keys} />
      </div>
    </div>
  );
}
