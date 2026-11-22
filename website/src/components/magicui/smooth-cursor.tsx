import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "motion/react";

export interface SmoothCursorProps {
  className?: string;
}

const desktopPointerQuery = "(any-hover: hover) and (any-pointer: fine)";

/** A lightweight, spring-smoothed pointer for fine-pointer devices. */
export function SmoothCursor({ className }: SmoothCursorProps) {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const angleRef = useRef(0);
  const x = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  const y = useSpring(0, { damping: 45, stiffness: 400, mass: 1, restDelta: 0.001 });
  const rotate = useSpring(0, { damping: 60, stiffness: 300, mass: 1, restDelta: 0.001 });

  useEffect(() => {
    const query = window.matchMedia(desktopPointerQuery);
    const update = () => setEnabled(query.matches && !reduceMotion);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("smooth-cursor-active");
      setVisible(false);
      return;
    }

    document.documentElement.classList.add("smooth-cursor-active");
    let frame = 0;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const now = performance.now();
        const dt = Math.max(1, now - lastTime.current);
        const dx = event.clientX - lastPosition.current.x;
        const dy = event.clientY - lastPosition.current.y;
        if (lastTime.current && Math.hypot(dx, dy) > 1) {
          const nextAngle = Math.atan2(dy / dt, dx / dt) * (180 / Math.PI) + 90;
          let difference = nextAngle - angleRef.current;
          if (difference > 180) difference -= 360;
          if (difference < -180) difference += 360;
          angleRef.current += difference;
          rotate.set(angleRef.current);
        }
        lastPosition.current = { x: event.clientX, y: event.clientY };
        lastTime.current = now;
        x.set(event.clientX);
        y.set(event.clientY);
        setVisible(true);
      });
    };
    const onPointerLeave = (event: PointerEvent) => {
      if (event.relatedTarget === null) setVisible(false);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("smooth-cursor-active");
    };
  }, [enabled, rotate, x, y]);

  if (!enabled) return null;

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 24 30"
      width="24"
      height="30"
      className={className}
      style={{
        position: "fixed",
        left: x,
        top: y,
        rotate,
        zIndex: 10000,
        pointerEvents: "none",
        willChange: "transform",
        opacity: visible ? 1 : 0,
        overflow: "visible",
      }}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.9 }}
      transition={{ duration: 0.14 }}
    >
      <path d="M3 2.8 20.5 17l-8.1.7-4.5 8.1L3 2.8Z" fill="var(--text-primary)" stroke="var(--bg-primary)" strokeWidth="2" strokeLinejoin="round" />
      <path d="m9 19.2 2.2 4" stroke="var(--bg-primary)" strokeWidth="1.8" strokeLinecap="round" />
    </motion.svg>
  );
}

export default SmoothCursor;
