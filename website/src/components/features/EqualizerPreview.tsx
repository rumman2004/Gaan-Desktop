import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { SlidersVertical, RotateCcw } from "@/components/ui/animated-icons";
import {
  EQUALIZER_BANDS,
  EQUALIZER_PRESETS,
  type EqualizerBand,
} from "../../data/playback";

export interface EqualizerPreviewProps {
  className?: string;
}

export function EqualizerPreview({ className }: EqualizerPreviewProps) {
  const [gains, setGains] = useState<number[]>(
    EQUALIZER_BANDS.map((b) => b.defaultGain)
  );
  const [activePreset, setActivePreset] = useState("Flat");

  const handleGainChange = (index: number, val: number) => {
    const updated = [...gains];
    updated[index] = val;
    setGains(updated);
    setActivePreset("Custom");
  };

  const applyPreset = (presetName: string, presetGains: number[]) => {
    setActivePreset(presetName);
    setGains([...presetGains]);
  };

  const resetFlat = () => {
    applyPreset("Flat", [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  };

  return (
    <Card
      variant="outlined"
      className={cn(
        "p-6 sm:p-8 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-card)]",
        className
      )}
    >
      {/* Header and Preset buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
            <SlidersVertical className="size-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              Interactive 10-Band Equalizer
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Real-time parametric gain control (-12dB to +12dB)
            </p>
          </div>
        </div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap">
          {EQUALIZER_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p.name, p.gains)}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer",
                activePreset === p.name
                  ? "bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-[var(--btn-primary-bg)] shadow-xs"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-subtle)] hover:text-[var(--text-primary)]"
              )}
            >
              {p.name}
            </button>
          ))}

          <button
            type="button"
            onClick={resetFlat}
            title="Reset to Flat"
            className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
            aria-label="Reset equalizer"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-10 gap-2 sm:gap-4 items-end pt-4 pb-2">
        {EQUALIZER_BANDS.map((band, idx) => {
          const currentGain = gains[idx] ?? 0;
          return (
            <div key={band.freq} className="flex flex-col items-center gap-3">
              <span className="text-[11px] font-mono font-medium text-[var(--text-secondary)]">
                {currentGain > 0 ? `+${currentGain}` : currentGain}
              </span>

              {/* Vertical slider wrapper */}
              <div className="h-36 sm:h-44 flex items-center justify-center">
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="1"
                  value={currentGain}
                  onChange={(e) => handleGainChange(idx, Number(e.target.value))}
                  className="w-36 sm:w-44 -rotate-90 appearance-none bg-[var(--border-subtle)] h-1.5 rounded-full accent-[var(--text-primary)] cursor-pointer"
                  aria-label={`${band.freq} gain`}
                />
              </div>

              <span className="text-[10px] sm:text-xs font-medium text-[var(--text-muted)] whitespace-nowrap">
                {band.freq}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
