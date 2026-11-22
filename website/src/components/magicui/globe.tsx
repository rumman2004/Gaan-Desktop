import createGlobe, { COBEOptions } from "cobe";
import { useEffect, useRef } from "react";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

const BASE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.1, 0.1, 0.1],
  glowColor: [0.85, 0.85, 0.85],
  devicePixelRatio: 2,
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.08 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.08 },
    { location: [19.4326, -99.1332], size: 0.08 },
    { location: [40.7128, -74.006], size: 0.08 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
  dark?: boolean;
}

export function Globe({ className, config = {}, dark = false }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const phiRef = useRef(0);
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const rafRef = useRef<number>(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      ...BASE_CONFIG,
      ...config,
      dark: dark ? 1 : 0,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
    });

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.005;
      }
      // Spring-like smooth rotation
      rotationRef.current +=
        (targetRotationRef.current - rotationRef.current) * 0.08;

      globe.update({
        phi: phiRef.current + rotationRef.current,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        dark: dark ? 1 : 0,
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    setTimeout(() => {
      canvas.style.opacity = "1";
      rafRef.current = requestAnimationFrame(animate);
    }, 0);

    return () => {
      cancelAnimationFrame(rafRef.current);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [dark]);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerMovement.current = delta;
      targetRotationRef.current = delta / 200;
    }
  };

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current =
            e.clientX - pointerMovement.current;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
        style={{
          width: "100%",
          height: "100%",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
