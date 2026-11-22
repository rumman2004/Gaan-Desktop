import { lazy, Suspense, useEffect, useRef, useState, type ComponentType, type LazyExoticComponent, type RefObject } from "react";
import { useTheme } from "../../context/theme-context";
import type { BackgroundEffectName } from "./placements";

type EffectProps = Record<string, unknown>;
type EffectComponent = LazyExoticComponent<ComponentType<EffectProps>>;
type BackgroundPalette = { purple: string; pink: string };

const DEFAULT_BACKGROUND_PALETTE: BackgroundPalette = { purple: "#6d28d9", pink: "#ec4899" };

const effects: Record<BackgroundEffectName, EffectComponent> = {
  pixelBlast: lazy(() => import("./PixelBlast") as Promise<{ default: ComponentType<EffectProps> }>),
  gradientAscii: lazy(() => import("./GradientASCII") as Promise<{ default: ComponentType<EffectProps> }>),
  fluxLines: lazy(() => import("./FluxLines") as Promise<{ default: ComponentType<EffectProps> }>),
  webThreads: lazy(() => import("./WebThreads") as Promise<{ default: ComponentType<EffectProps> }>),
  shapeGrid: lazy(() => import("./ShapeGrid") as Promise<{ default: ComponentType<EffectProps> }>),
  dotGrid: lazy(() => import("./DotGrid") as Promise<{ default: ComponentType<EffectProps> }>),
  rippleGrid: lazy(() => import("./RippleGrid") as Promise<{ default: ComponentType<EffectProps> }>),
  softAurora: lazy(() => import("./SoftAurora") as Promise<{ default: ComponentType<EffectProps> }>),
};

function useBackgroundVisibility(nodeRef: RefObject<HTMLDivElement | null>) {
  const [nearViewport, setNearViewport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motion.matches);
    updateMotion();
    motion.addEventListener?.("change", updateMotion);

    const node = nodeRef.current;
    if (!node) return () => motion.removeEventListener?.("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setNearViewport(Boolean(entry?.isIntersecting)), { rootMargin: "180px" });
    observer.observe(node);

    return () => {
      observer.disconnect();
      motion.removeEventListener?.("change", updateMotion);
    };
  }, [nodeRef]);

  return { nearViewport, reducedMotion };
}

function useBackgroundPalette() {
  const [palette, setPalette] = useState(DEFAULT_BACKGROUND_PALETTE);
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setPalette({
      purple: styles.getPropertyValue("--background-accent-purple").trim() || DEFAULT_BACKGROUND_PALETTE.purple,
      pink: styles.getPropertyValue("--background-accent-pink").trim() || DEFAULT_BACKGROUND_PALETTE.pink,
    });
  }, []);
  return palette;
}

function getEffectProps(effect: BackgroundEffectName, isDark: boolean, palette: BackgroundPalette): EffectProps {
  const base = { className: "h-full w-full" };
  switch (effect) {
    case "pixelBlast":
      return { ...base, variant: "square", pixelSize: 2.6, color: palette.purple, accentColor: palette.pink, patternScale: 2.2, patternDensity: 0.52, pixelSizeJitter: 0.18, enableRipples: true, rippleIntensityScale: 0.32, autoPauseOffscreen: true, speed: 0.14, transparent: true, edgeFade: 0.7, noiseAmount: 0.025, softness: 0.5, glow: 0.06, twinkle: 0.18, drift: 0.12, hoverEffect: "grow", hoverRadius: 0.4, autoRipple: 0.05, intro: true, lightMode: !isDark, dpr: 1.15 };
    case "gradientAscii":
      return { ...base, colors: [palette.purple, palette.pink], shape: "horizon", characters: " .:-=+*#%@", cellSize: 11, density: 0.55, glyphOpacity: 0.48, glow: 0.05, depthOfField: 0.35, flicker: 0.05, softness: 0.72, speed: 0.16, gradientOpacity: 0.48, grain: 0.02, mouseInteraction: true, clickEffect: "none", intro: true, lightMode: !isDark, dpr: 1.1 };
    case "fluxLines":
      return { ...base, colors: [palette.purple, palette.pink], speed: 0.14, scale: 0.9, turbulence: 0.36, fluidity: 0.55, shimmer: 0.12, glow: 0.035, lineWidth: 1, flowDirection: "right", opacity: 0.72, mouseInteraction: true, mouseStrength: 0.28, clickSwirl: false, intro: true, lightMode: !isDark, transparent: true, dpr: 1.15 };
    case "webThreads":
      return { ...base, colors: [palette.purple, palette.pink], coreColor: "#ffffff", lightMode: true, threadCount: 12, speed: 0.1, frequency: 5, spread: 0.24, taper: 1, position: 0.3, pinch: 0.32, nodes: 1, angle: 0, glow: 0.018, falloff: 0.6, thickness: 2, brightness: 0.82, opacity: 1, depth: 0.06, pulses: 0.31, mirror: true, shimmer: false, fade: 0, grain: 0.015, intro: true, mouseInteraction: true, mouseStrength: 0.61, pulseOnClick: true, dpr: 1.15 };
    case "shapeGrid":
      return { ...base, shape: "diamond", cellSize: 26, lineWidth: 1, direction: "diagonal", speed: 0.12, lineColor: palette.purple, hoverColor: palette.pink, hoverFillColor: palette.pink, fillOpacity: 0.08, rainbow: false, tiltX: 5, tiltY: -3, radius: 150, trail: 0.3, glow: 0.05, twinkle: 0.08, fade: 0.45, intro: true, opacity: 0.75, backgroundColor: "transparent", dpr: 1.15 };
    case "dotGrid":
      return { ...base, dotSize: 2.2, gap: 14, baseColor: palette.purple, activeColor: palette.pink, proximity: 110, strength: 0.28, bounce: 0.12, tension: 0.16, returnDuration: 0.55, shockRadius: 160, shockStrength: 0.24, swell: 0.12, stretch: 0.16, glow: 0.04, shape: "circle", fade: 0.55, opacity: 0.68, intro: true, mouseInteraction: true, clickShock: false, dpr: 1.1 };
    case "rippleGrid":
      return { ...base, color: palette.purple, variant: "dots", cellSize: 22, lineWidth: 1, glow: 0.04, rippleStrength: 0.26, rippleSpeed: 0.48, rippleSize: 0.65, autoRipple: "none", tilt: 0, rotation: 0, mouseInteraction: true, clickRipple: false, intro: true, fade: 0.55, opacity: 0.72, lightMode: !isDark, dpr: 1.1 };
    case "softAurora":
      return { ...base, speed: 0.12, scale: 1, brightness: 0.62, color1: palette.purple, color2: palette.pink, noiseFrequency: 1.1, noiseAmplitude: 0.25, bandHeight: 0.24, bandSpread: 0.68, octaveDecay: 0.58, layerOffset: 0.2, colorSpeed: 0.08, spectrum: 0, tilt: -0.08, enableMouseInteraction: false, clickPulse: false, intro: true, lightMode: !isDark, opacity: 0.58 };
  }
}

export function BackgroundEffect({ effect, className = "" }: { effect: BackgroundEffectName; className?: string }) {
  const { isDark } = useTheme();
  const palette = useBackgroundPalette();
  const nodeRef = useRef<HTMLDivElement>(null);
  const { nearViewport, reducedMotion } = useBackgroundVisibility(nodeRef);
  const Effect = effects[effect];

  return <div ref={nodeRef} className={`react-bits-background-layer ${className}`.trim()} aria-hidden="true" data-react-bits-background-pending>
    {nearViewport && !reducedMotion && <Suspense fallback={null}><Effect {...getEffectProps(effect, isDark, palette)} /></Suspense>}
  </div>;
}
