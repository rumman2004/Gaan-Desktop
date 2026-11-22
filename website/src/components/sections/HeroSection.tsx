import React from "react";
import { ArrowDownToLine, Github, Code2, Ban } from "lucide-react";
import { Container } from "../shared/Container";
import { Section } from "../shared/Section";
import { Button } from "../ui/Button";
import { Globe } from "@/registry/magicui/globe";
import { PlatformIcon } from "../shared/PlatformIcon";
import { useTheme } from "../../hooks/useTheme";

export type Platform = "windows" | "mac" | "android" | "other";

const platformNames: Record<Platform, string> = {
  windows: "Windows",
  mac: "macOS",
  android: "Android",
  other: "Windows",
};

export function HeroSection({ detectedOS }: { detectedOS: Platform }) {
  const currentPlatformName = platformNames[detectedOS] || "Windows";
  const { isDark } = useTheme();

  return (
    <Section
      variant="primary"
      padding="none"
      className="overflow-hidden border-b border-[var(--border-subtle)]"
      id="top"
    >
      <Container variant="wide">
        <div className="hero">
          {/* Left Hero Copy */}
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span aria-hidden="true" />
              <span>Free · Open Source · Cross-Platform</span>
            </div>

            <h1>
              Music, organized
              <br />
              the way you like.
            </h1>

            <p className="hero-description">
              A clean and open-source music player to stream, play local files,
              sync lyrics, create playlists and more.
            </p>

            <div className="hero-buttons">
              <a href="#downloads">
                <Button
                  variant="primary"
                  size="lg"
                  className="primary-cta gap-3 text-base sm:text-lg"
                >
                  <ArrowDownToLine className="size-5 shrink-0" />
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
                  <Github className="size-5 shrink-0" fill="currentColor" />
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

          {/* Right Hero Art - Interactive Globe */}
          <div className="hero-art" aria-hidden="true">
            <div className="globe-container">
              <Globe className="globe-canvas" dark={isDark} />
              <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_120%,rgba(0,0,0,0.15),transparent)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.06),transparent)]" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default HeroSection;
