import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "../../lib/utils";

type TextAnimation = "blurInUp" | "slideUp" | "fadeIn";
type TextGrouping = "word" | "line" | "text";

interface TextAnimateProps {
  children: string;
  animation?: TextAnimation;
  by?: TextGrouping;
  delay?: number;
  duration?: number;
  once?: boolean;
  startOnView?: boolean;
  className?: string;
}

const hiddenStates: Record<TextAnimation, { opacity: number; y: number; filter?: string }> = {
  blurInUp: { opacity: 0, y: 12, filter: "blur(6px)" },
  slideUp: { opacity: 0, y: 12 },
  fadeIn: { opacity: 0, y: 0 },
};

/** Magic UI TextAnimate pattern using the project's existing Motion dependency. */
export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "word",
  delay = 0.045,
  duration = 0.55,
  once = true,
  startOnView = true,
  className,
}: TextAnimateProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.35 });
  const prefersReducedMotion = useReducedMotion();
  const visible = prefersReducedMotion || !startOnView || isInView;

  const motionWord = (word: string, index: number) => (
    <motion.span
      key={`${word}-${index}`}
      aria-hidden="true"
      className="inline-block"
      initial={prefersReducedMotion ? false : hiddenStates[animation]}
      animate={visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : hiddenStates[animation]}
      transition={prefersReducedMotion ? { duration: 0 } : { duration, delay: index * delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {word}
    </motion.span>
  );

  let content;
  if (by === "text") {
    content = motionWord(children, 0);
  } else if (by === "line") {
    content = children.split("\n").map((line, index) => (
      <span key={`line-${index}`} className="block">
        {line ? motionWord(line, index) : " "}
      </span>
    ));
  } else {
    const words = children.split(/(\s+)/);
    let wordIndex = 0;
    content = words.map((part, index) => {
      if (/^\s+$/.test(part)) return <span key={`space-${index}`} aria-hidden="true">{part}</span>;
      return motionWord(part, wordIndex++);
    });
  }

  return (
    <span ref={ref} role="text" aria-label={children} className={cn("[&>span]:whitespace-pre-wrap", className)}>
      {content}
    </span>
  );
}
