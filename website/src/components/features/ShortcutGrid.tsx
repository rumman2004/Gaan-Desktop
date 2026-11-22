import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { ShortcutCard } from "./ShortcutCard";
import { Tabs } from "../ui/Tabs";
import { SHORTCUT_GROUPS } from "../../data/shortcuts";

export interface ShortcutGridProps {
  className?: string;
}

export function ShortcutGrid({ className }: ShortcutGridProps) {
  const [platform, setPlatform] = useState<"win" | "mac">("win");

  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--text-primary)]">
          Keyboard Shortcuts & Hotkeys
        </h3>
        <Tabs
          tabs={[
            { id: "win", label: "Windows" },
            { id: "mac", label: "macOS" },
          ]}
          activeTab={platform}
          onChange={(p) => setPlatform(p as "win" | "mac")}
          variant="pill"
          size="sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SHORTCUT_GROUPS.map((group) => (
          <div key={group.category} className="flex flex-col gap-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {group.category}
            </h4>
            {group.shortcuts.map((sc) => (
              <ShortcutCard
                key={sc.action}
                action={sc.action}
                description={sc.description}
                keys={platform === "win" ? sc.keysWin : sc.keysMac}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
