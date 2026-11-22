import React from "react";
import { cn } from "../../lib/utils";

export interface AudioVisualizerProps {
  barsCount?: number;
  animated?: boolean;
  className?: string;
  barColor?: string;
}

export function AudioVisualizer({
  barsCount = 28,
  animated = true,
  className,
}: AudioVisualizerProps) {
  return (
    <div
      className={cn(
        "flex items-end justify-center gap-1.5 h-16 w-full max-w-md mx-auto select-none",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: barsCount }).map((_, i) => {
        // Curve shape: peak around center
        const normalized = Math.sin((i / (barsCount - 1)) * Math.PI);
        const baseHeight = Math.max(12, Math.round(normalized * 100));
        const animDelay = (i % 7) * 0.15;
        const animDuration = 0.8 + ((i % 5) * 0.2);

        return (
          <span
            key={i}
            className="w-1.5 rounded-full bg-[var(--text-primary)] transition-all"
            style={{
              height: `${baseHeight}%`,
              opacity: 0.3 + normalized * 0.7,
              animation: animated
                ? `gaan-bounce ${animDuration}s ease-in-out infinite alternate ${animDelay}s`
                : undefined,
            }}
          />
        );
      })}

      <style>{`
        @keyframes gaan-bounce {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1.1); }
        }
      `}</style>
    </div>
  );
}
