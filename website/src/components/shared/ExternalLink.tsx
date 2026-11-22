import React from "react";
import { ExternalLink as ExtIcon } from "@/components/ui/animated-icons";
import { cn } from "../../lib/utils";

export interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export function ExternalLink({
  href,
  children,
  showIcon = false,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "inline-flex items-center gap-1 text-[var(--text-primary)] hover:underline underline-offset-4 transition-colors",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showIcon && <ExtIcon className="size-3.5 opacity-60" aria-hidden="true" />}
    </a>
  );
}
