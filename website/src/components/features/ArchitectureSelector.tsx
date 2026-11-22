import React from "react";
import { cn } from "../../lib/utils";
import { RadioGroup } from "../ui/RadioGroup";
import { type Architecture } from "../../data/downloads";

export interface ArchitectureSelectorProps {
  architectures: {
    arch: Architecture;
    label: string;
    description: string;
    recommended?: boolean;
    fileExtension: string;
  }[];
  selected: Architecture;
  onChange: (arch: Architecture) => void;
  className?: string;
}

export function ArchitectureSelector({
  architectures,
  selected,
  onChange,
  className,
}: ArchitectureSelectorProps) {
  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Choose Architecture & Package
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {architectures.map((item) => {
          const isSelected = selected === item.arch;
          return (
            <button
              type="button"
              aria-pressed={isSelected}
              key={item.arch}
              onClick={() => onChange(item.arch)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--text-primary)]",
                isSelected
                  ? "bg-[var(--bg-secondary)] border-[var(--text-primary)] ring-1 ring-[var(--text-primary)]"
                  : "bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--border-default)]"
              )}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[var(--text-primary)]">
                    {item.label}
                  </span>
                  {item.recommended && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[var(--success-bg)] text-[var(--success-text)]">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  {item.description}
                </p>
              </div>

              <div
                className={cn(
                  "size-4.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                  isSelected
                    ? "border-[var(--btn-primary-bg)]"
                    : "border-[var(--border-default)]"
                )}
              >
                {isSelected && (
                  <div className="size-2.5 rounded-full bg-[var(--btn-primary-bg)]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
