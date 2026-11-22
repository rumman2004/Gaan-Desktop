import React, { useEffect } from "react";
import { Navbar } from "../components/shared/Navbar";
import { Footer } from "../components/shared/Footer";

import { HeroSection } from "../components/sections/HeroSection";
import { ObjectiveSection } from "../components/sections/Objectivesection";
import { FeaturesSection } from "../components/sections/FeaturesSection";
import { UIUXShowcase } from "../components/sections/UI-UX-Showcase";
import { PlaybackAudio } from "../components/sections/Playback&Audio";
import { DesktopExperience } from "../components/sections/DesktopExperience";
import { YourLibrary } from "../components/sections/YourLibrary";
import { TheDifference } from "../components/sections/TheDifference";
import { DownloadSection } from "../components/sections/DownloadSection";
import { GitHubStats } from "../components/features/GitHubStats";
import { FAQSection } from "../components/sections/FAQSection";

type Platform = "windows" | "mac" | "android" | "other";

export function Home({ detectedOS }: { detectedOS: Platform }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  const downloadPlatform =
    detectedOS === "windows" || detectedOS === "mac" || detectedOS === "android"
      ? detectedOS
      : "windows";

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* Main Content Area: Sequential Sections */}
      <main id="top" className="flex flex-col">
        {/* 1. Hero Section */}
        <HeroSection detectedOS={detectedOS} />

        {/* 2. Objective / Why Gaan */}
        <ObjectiveSection />

        {/* 3. Features Section (GSAP Filtering) */}
        <FeaturesSection />

        {/* 4. UI / UX Showcase */}
        <UIUXShowcase />

        {/* 5. Playback & Audio */}
        <PlaybackAudio />

        {/* 6. Desktop Experience */}
        <DesktopExperience />

        {/* 7. Your Library */}
        <YourLibrary />

        {/* 8. The Difference */}
        <TheDifference />

        {/* 9. Download Section */}
        <DownloadSection initialPlatform={downloadPlatform} />

        <GitHubStats />

        {/* 10. FAQ Section */}
        <FAQSection />
      </main>

      {/* 11. Footer */}
      <Footer />

    </div>
  );
}
