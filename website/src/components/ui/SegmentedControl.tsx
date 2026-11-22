import React from "react";
import { cn } from "../../lib/utils";

export interface SegmentOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  ariaLabel?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  const sizeMap = {
    sm: "h-10 p-0.5 text-xs sm:h-9",
    md: "h-11 p-1 text-sm",
    lg: "h-13 p-1.5 text-base",
  };

  const itemSizeMap = {
    sm: "px-2 py-1 sm:px-3",
    md: "px-4 py-1.5",
    lg: "px-6 py-2",
  };

  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)] select-none",
        sizeMap[size],
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={opt.ariaLabel}
            disabled={opt.disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
              itemSizeMap[size],
              isSelected
                ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              opt.disabled && "opacity-40 pointer-events-none"
            )}
          >
            {opt.icon && <span className="size-4 shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
