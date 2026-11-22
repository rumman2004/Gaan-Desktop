import React from "react";
import { cn } from "../../lib/utils";

export interface WaveformProps {
  points?: number;
  className?: string;
  height?: number;
}

export function Waveform({
  points = 48,
  className,
  height = 72,
}: WaveformProps) {
  return (
    <div
      className={cn("w-full flex items-center justify-center gap-1.5 overflow-hidden", className)}
      style={{ height }}
      aria-hidden="true"
    >
      {Array.from({ length: points }).map((_, i) => {
        // Natural audio spectrum waveform curve
        const center = points / 2;
        const dist = Math.abs(i - center) / center;
        const envelope = Math.exp(-dist * dist * 3.5);
        const randomFactor = 0.4 + 0.6 * Math.sin(i * 1.3);
        const barHeight = Math.max(8, Math.round(envelope * randomFactor * 100));

        return (
          <span
            key={i}
            className="w-1 rounded-full bg-[var(--text-primary)] shrink-0 transition-all duration-300"
            style={{
              height: `${barHeight}%`,
              opacity: Math.max(0.2, envelope * 0.9),
            }}
          />
        );
      })}
    </div>
  );
}
