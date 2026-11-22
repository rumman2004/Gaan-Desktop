"use client";

import { useCallback, useEffect, useId, useMemo, useRef } from "react";
import { cn } from "../../lib/utils";

const morphTime = 0.9;
const cooldownTime = 2.1;

export interface MorphingTextProps {
  className?: string;
  texts: string[];
  /** Set to false to keep the text static. */
  animate?: boolean;
}

export function MorphingText({ texts, className, animate = true }: MorphingTextProps) {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(0);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const filterId = `morph-threshold-${useId().replace(/:/g, "")}`;
  const phrases = useMemo(() => texts.filter((text) => text.trim().length > 0), [texts]);
  const longestText = phrases.reduce((longest, text) =>
    text.length > longest.length ? text : longest, phrases[0] ?? "");

  const setStyles = useCallback((fraction: number) => {
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2 || phrases.length === 0) return;

    const progress = Math.max(0.0001, Math.min(1, fraction));
    const inverse = Math.max(0.0001, 1 - progress);
    current2.style.filter = `blur(${Math.min(8 / progress - 8, 100)}px)`;
    current2.style.opacity = `${Math.pow(progress, 0.4) * 100}%`;
    current1.style.filter = `blur(${Math.min(8 / inverse - 8, 100)}px)`;
    current1.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`;
    current1.textContent = phrases[textIndexRef.current % phrases.length];
    current2.textContent = phrases[(textIndexRef.current + 1) % phrases.length];
  }, [phrases]);

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let progress = morphRef.current / morphTime;
    if (progress >= 1) {
      cooldownRef.current = cooldownTime;
      progress = 1;
    }
    setStyles(progress);
    if (progress === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2 || phrases.length === 0) return;
    current2.style.filter = "none";
    current2.style.opacity = "100%";
    current1.style.filter = "none";
    current1.style.opacity = "0%";
    current1.textContent = phrases[textIndexRef.current % phrases.length];
    current2.textContent = phrases[(textIndexRef.current + 1) % phrases.length];
  }, [phrases]);

  useEffect(() => {
    const current1 = text1Ref.current;
    const current2 = text2Ref.current;
    if (!current1 || !current2 || phrases.length === 0) return;

    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrameId = 0;
    const setInitialText = () => {
      textIndexRef.current = 0;
      morphRef.current = 0;
      cooldownRef.current = 0;
      current1.textContent = phrases[0];
      current2.textContent = phrases[0];
      current1.style.filter = "none";
      current2.style.filter = "none";
      current1.style.opacity = "100%";
      current2.style.opacity = "0%";
    };
    const stop = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
    };
    const animateFrame = (now: number) => {
      if (!timeRef.current) timeRef.current = now;
      const delta = Math.min((now - timeRef.current) / 1000, 0.1);
      timeRef.current = now;
      cooldownRef.current -= delta;
      if (cooldownRef.current <= 0) {
        morphRef.current += delta;
        doMorph();
      } else {
        doCooldown();
      }
      animationFrameId = requestAnimationFrame(animateFrame);
    };
    const start = () => {
      stop();
      if (!animate || reducedMotion || phrases.length < 2) {
        setInitialText();
        return;
      }
      timeRef.current = 0;
      animationFrameId = requestAnimationFrame(animateFrame);
    };
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      start();
    };

    start();
    motionQuery.addEventListener("change", onMotionChange);
    return () => {
      stop();
      motionQuery.removeEventListener("change", onMotionChange);
    };
  }, [animate, doCooldown, doMorph, phrases]);

  const accessibleText = phrases[0] ?? "";

  return (
    <span
      className={cn("relative inline-grid align-baseline text-left font-bold", className)}
      role="text"
      aria-label={accessibleText}
      style={{ filter: `url(#${filterId}) blur(0.6px)` }}
    >
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {longestText}
      </span>
      <span ref={text1Ref} className="absolute inset-0 select-none whitespace-nowrap" aria-hidden="true" />
      <span ref={text2Ref} className="absolute inset-0 select-none whitespace-nowrap opacity-0" aria-hidden="true" />
      <svg aria-hidden="true" className="pointer-events-none fixed h-0 w-0 overflow-hidden">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </span>
  );
}

export default MorphingText;
