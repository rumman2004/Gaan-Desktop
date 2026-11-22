import React, { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "../../context/theme-context";
import { cn } from "../../lib/utils";
import { MoonIcon as AnimatedMoon } from "../ui/moon";
import { SunIcon as AnimatedSun } from "../ui/sun";

export interface AnimatedThemeTogglerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  duration?: number;
  fromCenter?: boolean;
}

/** Circle-reveal theme toggle inspired by Magic UI's AnimatedThemeToggler. */
export function AnimatedThemeToggler({
  className,
  duration = 850,
  fromCenter = false,
  type = "button",
  ...props
}: AnimatedThemeTogglerProps) {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const transitioning = useRef(false);
  const isDark = theme === "dark";

  const handleClick = useCallback(() => {
    const root = document.documentElement;
    const button = buttonRef.current;
    if (!button || transitioning.current) return;
    if (
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      toggleTheme();
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const rect = button.getBoundingClientRect();
    const centerX = fromCenter ? viewportWidth / 2 : rect.left + rect.width / 2;
    const centerY = fromCenter ? viewportHeight / 2 : rect.top + rect.height / 2;
    const farthestCorner = Math.hypot(
      Math.max(centerX, viewportWidth - centerX),
      Math.max(centerY, viewportHeight - centerY)
    );

    // Use percentage coordinates against the transition snapshot so the reveal
    // reaches every corner, including at fractional display scales.
    const pointCount = 64;
    const maxRippleRadius = farthestCorner * 1.1;
    const rippleClip = (progress: number, phase: number) => {
      const points = Array.from({ length: pointCount }, (_, index) => {
        const angle = (index / pointCount) * Math.PI * 2;
        const wave =
          1 +
          0.032 * Math.sin(9 * angle + phase) +
          0.014 * Math.sin(17 * angle - phase * 0.7);
        const radius = maxRippleRadius * progress * wave;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        return `${(x / viewportWidth) * 100}% ${(y / viewportHeight) * 100}%`;
      });
      return `polygon(${points.join(", ")})`;
    };

    transitioning.current = true;
    const cleanup = () => {
      transitioning.current = false;
    };

    try {
      const transition = document.startViewTransition(() => {
        flushSync(toggleTheme);
      });
      transition.ready
        .then(() => {
          const rippleColor = getComputedStyle(root)
            .getPropertyValue("--text-primary")
            .trim();
          root.animate(
            [
              {
                clipPath: rippleClip(0, 0),
                filter: "drop-shadow(0 0 0 transparent)",
                offset: 0,
              },
              {
                clipPath: rippleClip(0.34, 0.4),
                filter: `drop-shadow(0 0 7px ${rippleColor})`,
                offset: 0.34,
              },
              {
                clipPath: rippleClip(0.72, 1.1),
                filter: `drop-shadow(0 0 5px ${rippleColor})`,
                offset: 0.72,
              },
              {
                clipPath: rippleClip(1, 1.7),
                filter: "drop-shadow(0 0 0 transparent)",
                offset: 1,
              },
            ],
            {
              duration,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              fill: "forwards",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(cleanup);
      transition.finished.then(cleanup, cleanup);
    } catch {
      cleanup();
      toggleTheme();
    }
  }, [duration, fromCenter, toggleTheme]);

  return (
    <button
      {...props}
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      aria-label={props["aria-label"] ?? (isDark ? "Switch to light theme" : "Switch to dark theme")}
      title={props.title ?? (isDark ? "Light mode" : "Dark mode")}
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-[var(--border-subtle)] bg-transparent text-[var(--text-primary)] transition-colors hover:border-[var(--border-default)] hover:bg-[var(--bg-secondary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]",
        className
      )}
    >
      {isDark ? (
        <AnimatedSun key="sun" size={20} className="size-5" aria-hidden="true" />
      ) : (
        <AnimatedMoon key="moon" size={20} className="size-5" aria-hidden="true" />
      )}
      <span className="sr-only">{isDark ? "Switch to light theme" : "Switch to dark theme"}</span>
    </button>
  );
}
