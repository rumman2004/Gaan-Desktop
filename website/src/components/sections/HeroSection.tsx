import React, { useEffect, useState } from "react";
import { Code2, Ban } from "@/components/ui/animated-icons";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { Button } from "../ui/Button";
import { Waveform } from "../features/Waveform";
import { PlatformIcon, type SupportedPlatform } from "../shared/PlatformIcon";
import { TextAnimate } from "../magicui/text-animate";
import { MorphingText } from "../magicui/morphing-text";
import GhostFibers from "../magicui/ghost-fibers";
import { useTheme } from "../../hooks/useTheme";
import { DownloadIcon as AnimatedDownload } from "../ui/download";
import { GithubIcon as AnimatedGithub } from "../ui/github";

export type Platform = "windows" | "mac" | "android" | "other";

const platformNames: Record<Platform, string> = {
  windows: "Windows",
  mac: "macOS",
  android: "Android",
  other: "Windows",
};

const heroMorphTexts = ["Your way.", "Without limits."];

export function HeroSection({ detectedOS }: { detectedOS: Platform }) {
  const currentPlatformName = platformNames[detectedOS] || "Windows";
  const { isDark } = useTheme();
  const [fiberColors, setFiberColors] = useState({ glow: "#7c3aed", line: "#4c1d95", secondary: "#a78bfa" });

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setFiberColors({
      glow: styles.getPropertyValue("--ghost-fibers-glow").trim() || "#7c3aed",
      line: styles.getPropertyValue("--ghost-fibers-line").trim() || "#4c1d95",
      secondary: styles.getPropertyValue("--ghost-fibers-secondary").trim() || "#a78bfa",
    });
  }, []);

  return (
    <Section variant="primary" padding="none" className="overflow-hidden border-b border-[var(--border-subtle)]" id="top">
      <Container variant="wide">
        <div
          className="hero"
        >
          <div className="hero-fibers" aria-hidden="true">
            <GhostFibers
              glowColor={fiberColors.glow}
              lineColor={fiberColors.line}
              secondaryColor={fiberColors.secondary}
              layers={3}
              twist={1.2}
              threads={72}
              density={1}
              fiberStyle="dots"
              depthOfField={0.85}
              hoverEffect="focus"
              intro
              mouseInteraction
              gradient="depth"
              waves={0.75}
              volume={0.7}
              spread={1}
              scale={1}
              rotation={18}
              perspective={0.65}
              thickness={1}
              tips={0}
              foldGlow={1}
              speed={0.5}
              flow={0.4}
              rollSpeed={0.15}
              focusDepth={0}
              particles={0.5}
              sparkle={0.5}
              glow={0.8}
              brightness={1}
              vignette={0.3}
              grain={0.06}
              mouseStrength={1}
              pulseOnClick
              lightMode={!isDark}
              dpr={1.25}
            />
          </div>
          {/* Left Hero Copy */}
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span aria-hidden="true" />
              <span>Free · Open Source · Cross-Platform</span>
            </div>

            <h1 className="hero-heading">
              <TextAnimate animation="blurInUp" by="word" once>Your music.</TextAnimate>
              <MorphingText
                texts={heroMorphTexts}
                className="hero-morphing-text"
                morphDuration={1.2}
                holdDuration={4.2}
              />
            </h1>

            <p className="hero-description">
              A free and open-source music player built for people who want more control over how they listen, discover and organize their music.
            </p>

            <div className="hero-buttons">
              <a href="#downloads">
                <Button
                  variant="primary"
                  size="lg"
                  className="primary-cta gap-3 text-base sm:text-lg"
                >
                  <AnimatedDownload size={20} className="size-5 shrink-0" aria-hidden="true" />
                  <span>Download Gaan</span>
                  <span className="cta-platform">{currentPlatformName}</span>
                </Button>
              </a>

              <a
                href="https://github.com/rumman2004/Gaan-Desktop"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  className="secondary-cta gap-2.5 text-base sm:text-lg"
                >
                  <AnimatedGithub size={20} className="size-5 shrink-0" aria-hidden="true" />
                  <span>Star on GitHub</span>
                </Button>
              </a>
            </div>

            {/* Perks / Platforms */}
            <div className="hero-perks">
              <span>
                <PlatformIcon platform="windows" size={18} />
                <span>Windows</span>
              </span>
              <i aria-hidden="true" />
              <span>
                <PlatformIcon platform="mac" size={17} />
                <span>macOS</span>
              </span>
              <i aria-hidden="true" />
              <span>
                <PlatformIcon platform="android" size={17} />
                <span>Android</span>
              </span>
              <i aria-hidden="true" />
              <span>
                <Code2 className="size-4" />
                <span>Free &amp; Open Source</span>
              </span>
              <i aria-hidden="true" />
              <span>
                <Ban className="size-4" />
                <span>No Ads Ever</span>
              </span>
            </div>
          </div>

          <div className="hero-art">
            <img
              src="/brand/SEO.jpg"
              alt="Gaan music player for Windows and macOS"
              width={1280}
              height={512}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection;
