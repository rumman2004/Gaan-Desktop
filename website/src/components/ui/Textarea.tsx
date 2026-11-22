import React from "react";
import { cn } from "../../lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full min-h-[100px] p-3.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all focus:outline-none focus:border-[var(--focus-ring)] focus:ring-2 focus:ring-[var(--focus-ring)]/25 disabled:opacity-[var(--disabled-opacity)] disabled:pointer-events-none resize-y",
            error && "border-[var(--danger-bg)] focus:border-[var(--danger-bg)] focus:ring-[var(--danger-bg)]/25",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-[var(--danger-text-soft)]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
