import type { ReactNode } from "react";

type Shortcut = { keys: string; label: string };

const SHORTCUTS: Shortcut[] = [
  { keys: "Space", label: "Play / Pause" },
  { keys: "← →", label: "Seek 5 s" },
  { keys: "↑ ↓", label: "Volume" },
  { keys: "S", label: "Shuffle" },
  { keys: "R", label: "Repeat" },
  { keys: "Q", label: "Queue" },
  { keys: "L", label: "Lyrics" },
  { keys: "/", label: "Search" },
  { keys: "N", label: "Now Playing" },
];

function Key({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <kbd
      className={`inline-flex items-center justify-center gap-1.5 min-w-6 h-6 sm:min-w-8 sm:h-8 px-1.5 sm:px-2.5 rounded-md border border-[var(--border-default)] bg-[var(--bg-card)] text-[var(--text-primary)] font-sans text-[11px] sm:text-sm font-semibold shadow-[0_1px_0_var(--border-default)] whitespace-nowrap ${className}`}
    >
      {children}
    </kbd>
  );
}

export function ShortcutGrid() {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-5">
        <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
          Keyboard Shortcuts
        </h3>
        <span className="inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-card)] px-2.5 sm:px-3 py-1 text-[11px] sm:text-xs font-medium text-[var(--text-secondary)]">
          Essential Controls
        </span>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {SHORTCUTS.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2 sm:gap-3 min-w-0 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] px-2 py-2 sm:px-2.5 sm:py-3 shadow-[var(--shadow-card)]"
          >
            <Key className="shrink-0">{s.keys}</Key>
            <span className="text-xs sm:text-sm text-[var(--text-primary)] truncate">{s.label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs sm:text-sm leading-loose text-[var(--text-secondary)] max-w-xl">
        Plus <Key>Shift + ←/→</Key> for previous and next, <Key>M</Key> to mute, and{" "}
        <strong className="font-semibold text-[var(--text-primary)]">two-finger swipes</strong> or{" "}
        <Key>Alt + ←/→</Key> (or the mouse's side buttons) to go back and forward.
      </p>
    </div>
  );
}