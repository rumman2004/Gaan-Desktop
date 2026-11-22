import React from "react";
import { cn } from "../../lib/utils";
import { Move } from "@/components/ui/animated-icons";

export interface MiniPlayerPreviewProps {
  className?: string;
}

export function MiniPlayerPreview({ className }: MiniPlayerPreviewProps) {
  return (
    <figure className={cn("w-full flex flex-col items-center", className)}>
      {/* Stage: sized by its content, so there is no empty dark area */}
      <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl sm:rounded-[28px] bg-[var(--mini-player-stage)] p-3 sm:p-5 shadow-[inset_0_1px_0_rgb(255_255_255_/_8%)]">
        {/* Soft light behind the window for depth */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-2/3 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgb(255 255 255 / 12%), transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* App window */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-[18px] border border-[var(--mini-player-edge)] bg-[var(--mini-player-window)] shadow-[0_18px_42px_rgb(0_0_0_/_38%)]">
          <div className="relative flex h-8 sm:h-9 items-center justify-between border-b border-white/10 bg-[var(--mini-player-window)] px-3 sm:px-4">
            <div className="flex items-center gap-1.5 sm:gap-2" aria-hidden="true">
              <span className="size-2.5 sm:size-3 rounded-full bg-[var(--window-close)]" />
              <span className="size-2.5 sm:size-3 rounded-full bg-[var(--window-minimize)]" />
              <span className="size-2.5 sm:size-3 rounded-full bg-[var(--window-expand)]" />
            </div>
            <span className="absolute left-1/2 -translate-x-1/2 text-[10px] sm:text-[11px] font-medium text-[var(--mini-player-title)] whitespace-nowrap">
              Gaan Mini Player
            </span>
            <span className="w-10" aria-hidden="true" />
          </div>

          {/* Shown at its natural ratio so nothing is cropped */}
          <img
            src="/screenshots-desktop/miniplayer.png"
            alt="Gaan Mini Player showing the current album artwork"
            className="block h-auto w-full select-none bg-black"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        {/* Badge sits below the window instead of covering the artwork */}
        <figcaption className="relative mt-3 sm:mt-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-sm sm:text-xs">
            <Move className="size-3.5" aria-hidden="true" />
            Draggable &amp; always on top
          </span>
        </figcaption>
      </div>
    </figure>
  );
}