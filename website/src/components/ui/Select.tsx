import React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "@/components/ui/animated-icons";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, label, id, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full h-11 pl-4 pr-10 appearance-none rounded-xl bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] text-sm transition-all focus:outline-none focus:border-[var(--text-primary)] focus:ring-1 focus:ring-[var(--text-primary)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
            <ChevronDown className="size-4" />
          </div>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
