import React from "react";
import { cn } from "../../lib/utils";
import { PlatformIcon, type SupportedPlatform } from "../shared/PlatformIcon";
import { type TargetPlatform, DOWNLOAD_PLATFORMS } from "../../data/downloads";

export interface PlatformSelectorProps {
  selected: TargetPlatform;
  onChange: (platform: TargetPlatform) => void;
  className?: string;
}

export function PlatformSelector({
  selected,
  onChange,
  className,
}: PlatformSelectorProps) {
  const platforms: TargetPlatform[] = ["windows", "mac", "android"];

  return (
    <div
      role="tablist"
      aria-label="Select target operating system"
      className={cn("grid grid-cols-3 gap-3 w-full max-w-xl mx-auto", className)}
    >
      {platforms.map((p) => {
        const info = DOWNLOAD_PLATFORMS[p];
        const isSelected = selected === p;
        return (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(p)}
            className={cn(
              "min-h-[112px] flex flex-col items-center justify-center gap-2 p-3 sm:p-5 rounded-xl sm:rounded-2xl border transition-all duration-200 cursor-pointer select-none",
              isSelected
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)] shadow-md"
                : "bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-default)]"
            )}
          >
            <div className="size-8 flex items-center justify-center">
              <PlatformIcon platform={p as SupportedPlatform} size={24} />
            </div>
            <span className="text-sm sm:text-base font-bold tracking-tight">
              {info.displayName}
            </span>
            <span
              className={cn(
                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                isSelected
                  ? "bg-[var(--selected-chip-bg)] text-[var(--btn-primary-text)]"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
              )}
            >
              {info.badge}
            </span>
          </button>
        );
      })}
    </div>
  );
}
