import React from "react";
import { ArrowRight } from "@/components/ui/animated-icons";
import { cn } from "../../lib/utils";

export interface InteractiveHoverButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

/** Anchor-safe version of Magic UI's expanding-dot interactive hover button. */
export function InteractiveHoverButton({ children, className, ...props }: InteractiveHoverButtonProps) {
  return (
    <a
      {...props}
      className={cn("interactive-hover-button group relative isolate inline-flex overflow-hidden", className)}
    >
      <span className="interactive-hover-button-dot" aria-hidden="true" />
      <span className="interactive-hover-button-rest">{children}</span>
      <span className="interactive-hover-button-reveal" aria-hidden="true">
        {children}
        <ArrowRight className="size-4 shrink-0" />
      </span>
    </a>
  );
}

export default InteractiveHoverButton;
