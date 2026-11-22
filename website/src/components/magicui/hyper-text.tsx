import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

const defaultCharacterSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export interface HyperTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  animateOnHover?: boolean;
  characterSet?: string;
}

/** Magic UI style character scramble with reduced-motion and screen-reader support. */
export function HyperText({
  children,
  className,
  duration = 850,
  delay = 0,
  startOnView = false,
  animateOnHover = true,
  characterSet = defaultCharacterSet,
  onMouseEnter,
  onFocus,
  ...props
}: HyperTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasStarted = useRef(false);

  const startAnimation = () => {
    if (prefersReducedMotion || isAnimating) return;
    setDisplayText(children);
    setIsAnimating(true);
  };

  useEffect(() => {
    if (!startOnView || !isInView || hasStarted.current || prefersReducedMotion) return;
    hasStarted.current = true;
    const timeout = window.setTimeout(startAnimation, delay);
    return () => window.clearTimeout(timeout);
  }, [delay, isInView, prefersReducedMotion, startOnView]);

  useEffect(() => {
    if (!isAnimating) return;
    const startedAt = performance.now();
    let frame = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const revealed = Math.floor(progress * children.length);
      setDisplayText([...children].map((character, index) => {
        if (character === " " || index < revealed) return character;
        return [...characterSet][Math.floor(Math.random() * [...characterSet].length)] || character;
      }).join(""));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else {
        setDisplayText(children);
        setIsAnimating(false);
      }
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [characterSet, children, duration, isAnimating]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(children);
      setIsAnimating(false);
    }
  }, [children, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      aria-label={children}
      onMouseEnter={(event) => {
        if (animateOnHover) startAnimation();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        if (animateOnHover) startAnimation();
        onFocus?.(event);
      }}
      {...props}
    >
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

export default HyperText;
