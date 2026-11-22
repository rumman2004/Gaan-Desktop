import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(
            "w-full h-11 px-4 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all focus:outline-none focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)]/25 disabled:opacity-[var(--disabled-opacity)] disabled:pointer-events-none",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-[var(--danger-bg)] focus:border-[var(--danger-bg)] focus:ring-[var(--danger-bg)]/25",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[var(--text-muted)]">
            {rightIcon}
          </div>
        )}
        {error && <p className="mt-1 text-xs text-[var(--danger-text-soft)]">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
