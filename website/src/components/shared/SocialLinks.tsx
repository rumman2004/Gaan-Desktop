import React from "react";
import { Github, CircleHelp } from "@/components/ui/animated-icons";
import { cn } from "../../lib/utils";
import { IconButton } from "../ui/IconButton";

export interface SocialLinksProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SocialLinks({ className, size = "md" }: SocialLinksProps) {
  const links = [
    {
      label: "GitHub Repository",
      href: "https://github.com/rumman2004/Gaan-Desktop",
      icon: <Github className="size-4" />,
    },
    {
      label: "Report an Issue",
      href: "https://github.com/rumman2004/Gaan-Desktop/issues",
      icon: <CircleHelp className="size-4" />,
    },
  ];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
        >
          <IconButton
            icon={link.icon}
            aria-label={link.label}
            size={size}
            className="hover:border-[var(--text-primary)]"
          />
        </a>
      ))}
    </div>
  );
}
