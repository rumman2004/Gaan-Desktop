import React from "react";
import { cn, formatDate } from "../../lib/utils";
import { Tag, Calendar, GitCommit, ShieldCheck } from "@/components/ui/animated-icons";
import { Badge } from "../ui/Badge";

export interface ReleaseInfoProps {
  version?: string;
  releaseDate?: string;
  sourceUrl?: string;
  license?: string;
  className?: string;
}

export function ReleaseInfo({
  version = "v1.1.2",
  releaseDate = "2026-11-21T08:48:17Z",
  sourceUrl = "https://github.com/rumman2004/Gaan-Desktop",
  license = "GPL-3.0",
  className,
}: ReleaseInfoProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-[var(--bg-secondary)]/70 border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-secondary)]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Tag className="size-3.5 text-[var(--text-muted)]" />
        <span>Latest Release:</span>
        <Badge variant="version" size="sm">
          {version}
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Calendar className="size-3.5 text-[var(--text-muted)]" />
        <span>Published: {releaseDate ? formatDate(releaseDate) : "—"}</span>
      </div>

      <div className="flex items-center gap-2">
        <ShieldCheck className="size-3.5 text-[var(--success-text)]" />
        <span>License: {license}</span>
      </div>

      <a
        href={sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)] hover:underline"
      >
        <GitCommit className="size-3.5" />
        <span>View Changelog</span>
      </a>
    </div>
  );
}
