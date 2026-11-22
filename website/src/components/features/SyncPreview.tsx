import React from "react";
import { cn } from "../../lib/utils";
import { Laptop, Smartphone, HardDrive } from "@/components/ui/animated-icons";
import { Badge } from "../ui/Badge";

export interface SyncPreviewProps {
  className?: string;
}

export function SyncPreview({ className }: SyncPreviewProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex flex-col gap-4",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HardDrive className="size-4 text-[var(--text-secondary)]" />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Choose what follows you
          </span>
        </div>
        <Badge variant="outline" size="sm">Optional</Badge>
      </div>

      <div className="flex items-center justify-between gap-4 py-2 px-1">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center">
            <Laptop className="size-4.5 text-[var(--text-primary)]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Follows you</div>
            <div className="text-[10px] text-[var(--text-muted)]">Library data and settings</div>
          </div>
        </div>

        <div className="w-16 h-px bg-[var(--border-default)] relative flex items-center justify-center">
          <span className="size-1.5 rounded-full bg-[var(--text-muted)]" />
        </div>

        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center">
            <Smartphone className="size-4.5 text-[var(--text-primary)]" />
          </div>
          <div>
            <div className="text-xs font-bold text-[var(--text-primary)]">Never leaves this computer</div>
            <div className="text-[10px] text-[var(--text-muted)]">Downloads and local paths</div>
          </div>
        </div>
      </div>
    </div>
  );
}
