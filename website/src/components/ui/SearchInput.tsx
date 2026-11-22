import React from "react";
import { cn } from "../../lib/utils";
import { Search, X } from "@/components/ui/animated-icons";
import { Kbd } from "./Kbd";

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcut?: string;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, onClear, shortcut = "/", placeholder = "Search...", ...props }, ref) => {
    const hasValue = Boolean(value && String(value).length > 0);

    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--text-muted)]">
          <Search className="size-4" />
        </div>
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-11 pl-10 pr-12 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm transition-all focus:outline-none focus:bg-[var(--bg-card)] focus:border-[var(--border-default)] focus:ring-1 focus:ring-[var(--text-primary)]",
            className
          )}
          {...props}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {hasValue ? (
            <button
              type="button"
              onClick={onClear}
              className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          ) : shortcut ? (
            <Kbd className="hidden sm:inline-flex text-[10px] h-5 min-w-5">{shortcut}</Kbd>
          ) : null}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
