import React from "react";
import { cn } from "../../lib/utils";

export interface InstallStepItem {
  step: number;
  title: string;
  instruction: string;
}

export interface InstallStepsProps {
  steps: InstallStepItem[];
  systemRequirements?: string;
  className?: string;
}

export function InstallSteps({
  steps,
  systemRequirements,
  className,
}: InstallStepsProps) {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <h3 className="text-base font-bold text-[var(--text-primary)]">
        Installation Steps
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((st) => (
          <div
            key={st.step}
            className="p-5 rounded-2xl bg-[var(--bg-secondary)]/50 border border-[var(--border-subtle)] flex flex-col gap-2"
          >
            <div className="flex items-center gap-3">
              <span className="size-6 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {st.step}
              </span>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">
                {st.title}
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-9">
              {st.instruction}
            </p>
          </div>
        ))}
      </div>

      {systemRequirements && (
        <p className="text-xs text-[var(--text-muted)] text-center sm:text-left">
          <strong className="text-[var(--text-secondary)]">System Requirements:</strong>{" "}
          {systemRequirements}
        </p>
      )}
    </div>
  );
}
