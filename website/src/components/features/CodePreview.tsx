import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Copy, Check, FileJson } from "@/components/ui/animated-icons";
import { JSON_BACKUP_PREVIEW } from "../../data/library";

export interface CodePreviewProps {
  code?: string;
  className?: string;
}

export function CodePreview({
  code = JSON_BACKUP_PREVIEW,
  className,
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-xl bg-[var(--code-surface)] border border-[var(--code-border)] text-[var(--code-text)] font-mono text-xs overflow-hidden shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[var(--code-header)] border-b border-[var(--code-border)]">
        <div className="flex items-center gap-2">
          <FileJson className="size-4 text-[var(--code-accent)]" />
          <span className="text-[11px] font-semibold text-[var(--code-text)]">
            example-library-backup.json
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[11px] text-[var(--code-muted)] hover:text-[var(--overlay-text)] transition-colors cursor-pointer"
        >
          {copied ? <Check className="size-3.5 text-[var(--code-accent)]" /> : <Copy className="size-3.5" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="p-3 sm:p-4 max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--code-scrollbar)]">
        <pre className="m-0 leading-relaxed text-[11px] font-mono text-[var(--code-accent)] whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  );
}
