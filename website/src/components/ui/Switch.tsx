import React from "react";
import { cn } from "../../lib/utils";

export interface SwitchProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({
  id,
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  className,
}: SwitchProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div className="relative inline-flex items-center mt-0.5">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "w-11 h-6 rounded-full transition-colors duration-200 border border-transparent",
            checked ? "bg-[var(--btn-primary-bg)]" : "bg-[var(--border-default)]"
          )}
        >
          <div
            className={cn(
              "size-5 rounded-full bg-[var(--btn-primary-text)] shadow-sm transition-transform duration-200 mt-0.5 ml-0.5",
              checked ? "translate-x-5" : "translate-x-0"
            )}
          />
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {label}
            </span>
          )}
          {description && (
            <span className="text-xs text-[var(--text-secondary)]">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
