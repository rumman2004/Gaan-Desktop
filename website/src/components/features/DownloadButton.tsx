import React from "react";
import { Loader2 } from "@/components/ui/animated-icons";
import { Button, type ButtonProps } from "../ui/Button";
import { cn } from "../../lib/utils";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import { DownloadIcon as AnimatedDownload } from "../ui/download";

export interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
  label?: string;
  sublabel?: string;
  href?: string;
}

export function DownloadButton({
  label = "Download Gaan",
  sublabel,
  href = "https://github.com/rumman2004/Gaan-Desktop/releases/latest",
  className,
  size = "lg",
  variant = "primary",
  loading = false,
  ...props
}: DownloadButtonProps) {
  const content = (
    <span className="flex items-center justify-center gap-2 sm:gap-3 text-left">
      {loading ? <Loader2 className="size-5 shrink-0 animate-spin" /> : <AnimatedDownload size={20} className="size-5 shrink-0" aria-hidden="true" />}
      <span className="flex flex-col items-start">
        <span className="text-base sm:text-lg font-bold leading-tight">{label}</span>
        {sublabel && <span className="text-xs font-normal leading-tight opacity-75">{sublabel}</span>}
      </span>
    </span>
  );

  if (href) {
    return (
      <InteractiveHoverButton
        href={href}
        className={cn("h-12 w-full px-5 sm:h-16 sm:w-auto sm:px-8", loading && "pointer-events-none opacity-60", className)}
        aria-label={sublabel ? `${label}. ${sublabel}` : label}
        aria-disabled={loading || undefined}
        tabIndex={loading ? -1 : undefined}
      >{content}</InteractiveHoverButton>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      loading={loading}
      className={cn("gap-2 sm:gap-3 h-12 sm:h-16 px-5 sm:px-8 rounded-xl sm:rounded-2xl shadow-[var(--shadow-card)]", className)}
      {...props}
    >
      {content}
    </Button>
  );
}
