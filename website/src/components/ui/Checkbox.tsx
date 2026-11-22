import React from "react";
import { cn } from "../../lib/utils";
import { Check } from "@/components/ui/animated-icons";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, checked, onChange, disabled, ...props }, ref) => {
    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-3 cursor-pointer select-none",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <div className="size-5 rounded-md border border-[var(--border-default)] bg-[var(--bg-card)] transition-all peer-checked:bg-[var(--btn-primary-bg)] peer-checked:border-[var(--btn-primary-bg)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--border-strong)] peer-focus-visible:ring-offset-2 flex items-center justify-center">
            <Check className="size-3.5 text-[var(--btn-primary-text)] opacity-0 peer-checked:opacity-100 transition-opacity" />
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
);

Checkbox.displayName = "Checkbox";
