import React from "react";
import { cn } from "../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  options,
  orientation = "vertical",
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row flex-wrap gap-4" : "flex-col gap-3",
        className
      )}
    >
      {options.map((option) => {
        const isChecked = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "inline-flex items-start gap-3 cursor-pointer select-none",
              option.disabled && "opacity-50 pointer-events-none"
            )}
          >
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <div className="size-5 rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] transition-all peer-checked:border-[var(--btn-primary-bg)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--border-strong)] peer-focus-visible:ring-offset-2 flex items-center justify-center">
                <div className="size-2.5 rounded-full bg-[var(--btn-primary-bg)] opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[var(--text-primary)]">
                {option.label}
              </span>
              {option.description && (
                <span className="text-xs text-[var(--text-secondary)]">
                  {option.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
