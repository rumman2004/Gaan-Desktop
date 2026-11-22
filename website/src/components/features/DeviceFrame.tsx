import React from "react";
import { cn } from "../../lib/utils";

export interface DeviceFrameProps {
  device?: "mac" | "windows" | "phone";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({
  device = "mac",
  title = "Gaan",
  children,
  className,
}: DeviceFrameProps) {
  if (device === "phone") {
    return (
      <div
        className={cn(
          "relative mx-auto rounded-[38px] sm:rounded-[44px] p-2.5 sm:p-3 bg-[var(--device-frame)] shadow-[var(--shadow-hover)] border-4 border-[var(--device-border)] max-w-[340px]",
          className
        )}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3.5 sm:top-4 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-4.5 bg-[var(--device-screen)] rounded-full z-20" />
        {/* Screen */}
        <div className="rounded-[30px] sm:rounded-[34px] overflow-hidden bg-[var(--device-screen)] aspect-[9/19.5]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-hover)] overflow-hidden",
        className
      )}
    >
      {/* Title Bar */}
      <div className="h-10 px-4 bg-[var(--bg-secondary)] border-b border-[var(--border-subtle)] flex items-center justify-between select-none">
        {device === "mac" ? (
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[var(--window-close)] inline-block" />
            <span className="size-3 rounded-full bg-[var(--window-minimize)] inline-block" />
            <span className="size-3 rounded-full bg-[var(--window-expand)] inline-block" />
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]">
            <span>⊞</span>
            <span>{title}</span>
          </div>
        )}

        {device === "mac" && (
          <span className="text-xs font-medium text-[var(--text-muted)]">
            {title}
          </span>
        )}

        <div className="w-12 flex justify-end text-xs text-[var(--text-muted)]">
          {device === "windows" && (
            <div className="flex items-center gap-3">
              <span>—</span>
              <span>□</span>
              <span>✕</span>
            </div>
          )}
        </div>
      </div>

      {/* Frame content */}
      <div className="w-full overflow-hidden bg-[var(--bg-primary)]">
        {children}
      </div>
    </div>
  );
}
