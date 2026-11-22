import React from "react";
import { cn } from "../../lib/utils";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "pill" | "underline" | "enclosed";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "pill",
  size = "md",
  className,
}: TabsProps) {
  const variantStyles = {
    pill: "inline-flex p-1 gap-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-subtle)]",
    underline: "flex gap-6 border-b border-[var(--border-subtle)]",
    enclosed: "inline-flex p-1 gap-1 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]",
  };

  const itemStyles = {
    pill: (isActive: boolean) =>
      cn(
        "rounded-full font-medium transition-all duration-200 cursor-pointer select-none",
        isActive
          ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      ),
    underline: (isActive: boolean) =>
      cn(
        "pb-3 font-medium transition-colors border-b-2 -mb-px cursor-pointer select-none",
        isActive
          ? "border-[var(--text-primary)] text-[var(--text-primary)]"
          : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      ),
    enclosed: (isActive: boolean) =>
      cn(
        "rounded-lg font-medium transition-all duration-200 cursor-pointer select-none",
        isActive
          ? "bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm"
          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      ),
  };

  const sizeStyles = {
    sm: "min-h-10 px-3 py-1 text-xs gap-1.5 sm:min-h-9",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-2.5 text-base gap-2.5",
  };

  return (
    <div role="tablist" className={cn(variantStyles[variant], className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap",
              sizeStyles[size],
              itemStyles[variant](isActive),
              tab.disabled && "opacity-40 pointer-events-none"
            )}
          >
            {tab.icon && <span className="size-4 shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  "px-1.5 py-0.2 text-[10px] rounded-full font-mono font-medium",
                  isActive
                    ? "bg-[var(--selected-chip-bg)] text-[var(--btn-primary-text)]"
                    : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
