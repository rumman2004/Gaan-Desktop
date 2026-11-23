import React, { useState, useEffect } from "react";
import { ChevronDown } from "@/components/ui/animated-icons";
import { DownloadIcon as AnimatedDownload } from "../ui/download";
import { GithubIcon as AnimatedGithub } from "../ui/github";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "../ui/Button";
import { IconButton } from "../ui/IconButton";
import { Dropdown } from "../ui/Dropdown";
import { cn } from "../../lib/utils";
import { useReleases } from "../../lib/releases";

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const releases = useReleases();

  const navLinks = [
    { label: "The Player", href: "#player" },
    { label: "Features", href: "#features" },
    { label: "Showcase", href: "#showcase" },
    { label: "Desktop", href: "#desktop" },
    { label: "Library", href: "#library" },
    { label: "The Difference", href: "#difference" },
    { label: "Downloads", href: "#downloads" },
    { label: "FAQ", href: "#faq" },
  ];

  const downloadItems = [
    {
      key: "windows",
      label: "Windows (x64 Installer)",
      onClick: () => {
        window.location.href = releases.desktop.windowsExeUrl;
      },
    },
    {
      key: "mac-arm",
      label: "macOS (Apple Silicon)",
      onClick: () => {
        window.location.href = releases.desktop.macArm64DmgUrl;
      },
    },
    {
      key: "mac-intel",
      label: "macOS (Intel)",
      onClick: () => {
        window.location.href = releases.desktop.macX64DmgUrl;
      },
    },
    {
      key: "android",
      label: "Android APK (Mobile)",
      onClick: () => {
        window.location.href = releases.mobile.apkArm64Url;
      },
    },
  ];

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((l) => l.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("floating-site-nav", className)}>
      <div className="gaan-container-wide nav-glass-panel flex items-center justify-between gap-4 sm:gap-6">
        {/* Brand */}
        <a href="#top" className="flex items-center gap-3 select-none" aria-label="Gaan home">
          <img
            src="/brand/gaan-icon.png"
            alt="Gaan logo"
            className="size-9 object-contain rounded-xl shadow-xs"
          />
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              gaan
            </span>
            <span className="hidden lg:inline text-xs font-medium text-[var(--text-muted)] border-l border-[var(--border-subtle)] pl-3">
              music, in its place
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2 nav-primary-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.substring(1) ? "location" : undefined}
              className={cn(
                "nav-primary-link text-sm font-medium transition-colors hover:text-[var(--text-primary)]",
                activeSection === link.href.substring(1)
                  ? "is-active text-[var(--text-primary)] font-semibold"
                  : "text-[var(--text-secondary)]"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ThemeToggle />

          <a
            href="https://github.com/rumman2004/Gaan-Desktop"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="hidden sm:inline-flex"
          >
            <IconButton
              icon={<AnimatedGithub size={16} className="size-4" aria-hidden="true" />}
              aria-label="Star Gaan on GitHub"
              tooltip="Star on GitHub"
            />
          </a>

          {/* Download Dropdown */}
          <div className="hidden sm:block">
            <Dropdown
              align="right"
              trigger={
                <Button
                  variant="primary"
                  size="md"
                  rightIcon={<ChevronDown className="size-3.5" />}
                  className="gap-2 shadow-xs"
                >
                  <AnimatedDownload size={16} className="size-4 shrink-0" aria-hidden="true" />
                  <span>Download</span>
                </Button>
              }
              items={downloadItems}
            />
          </div>

          {/* Mobile menu trigger */}
          <div className="xl:hidden">
            <IconButton
              icon={
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path d="M18 6 6 18M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              }
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-site-navigation"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div id="mobile-site-navigation" className="nav-mobile-panel xl:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="nav-mobile-link px-3 py-2.5 text-base font-medium text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-4 mt-2 border-t border-[var(--border-subtle)] flex flex-col gap-2.5">
              <a
                href="#downloads"
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="lg" className="w-full justify-center">
                  <AnimatedDownload size={16} className="size-4 shrink-0" aria-hidden="true" />
                  <span>Download Gaan</span>
                </Button>
              </a>

              <a
                href="https://github.com/rumman2004/Gaan-Desktop"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button variant="outline" size="md" className="w-full justify-center gap-2">
                  <AnimatedGithub size={16} className="size-4" aria-hidden="true" />
                  <span>Star on GitHub</span>
                </Button>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
