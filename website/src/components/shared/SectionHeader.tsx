import React from "react";
import { cn } from "../../lib/utils";
import { SectionLabel } from "./SectionLabel";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
  maxWidth?: string;
  className?: string;
  titleId?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  maxWidth = "52ch",
  className,
  titleId,
}: SectionHeaderProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        isCentered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}

      <div className={cn("w-full flex flex-col md:flex-row md:items-end justify-between gap-6")}>
        <div className="max-w-3xl">
          <h2
            id={titleId}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] leading-[1.12] sm:leading-[1.08]"
          >
            {title}
          </h2>

          {description && (
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-lg text-[var(--text-secondary)] leading-relaxed"
              style={{ maxWidth }}
            >
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="shrink-0 md:mb-1 flex items-center gap-3">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}
