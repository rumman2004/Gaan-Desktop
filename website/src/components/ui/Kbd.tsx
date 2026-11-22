import React from "react";
import { cn } from "../../lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string | string[];
}

export function Kbd({ className, keys, children, ...props }: KbdProps) {
  const formatKey = (key: string): string => {
    const map: Record<string, string> = {
      cmd: "⌘",
      command: "⌘",
      ctrl: "Ctrl",
      control: "Ctrl",
      shift: "⇧",
      alt: "⌥",
      opt: "⌥",
      option: "⌥",
      enter: "↵",
      esc: "Esc",
      space: "Space",
      tab: "⇥",
      backspace: "⌫",
      up: "↑",
      down: "↓",
      left: "←",
      right: "→",
    };
    return map[key.toLowerCase()] || key;
  };

  const keyList = keys
    ? Array.isArray(keys)
      ? keys
      : [keys]
    : children
    ? [String(children)]
    : [];

  return (
    <span className="inline-flex items-center gap-1">
      {keyList.map((k, idx) => (
        <kbd
          key={idx}
          className={cn(
            "inline-flex items-center justify-center min-w-6 h-6 px-1.5 text-xs font-mono font-medium rounded-md bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-default)] shadow-[0_1px_1px_rgba(0,0,0,0.06)] select-none",
            className
          )}
          {...props}
        >
          {formatKey(k)}
        </kbd>
      ))}
    </span>
  );
}
