import React from "react";
import { ArrowDownToLine, Github, Heart, MessageSquare } from "@/components/ui/animated-icons";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";
import { BackToTop } from "./BackToTop";
import { ExternalLink } from "./ExternalLink";
import { FOOTER_COLUMNS } from "../../data/footer";

export function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-12 transition-colors">
      <Container variant="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-16">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
            <a href="#top" className="flex items-center gap-3 mb-4 select-none">
              <img
                src="/brand/gaan-icon.png"
                alt="Gaan logo"
                className="size-10 object-contain rounded-xl"
              />
              <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                gaan
              </span>
            </a>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-sm mb-6">
              A free, open-source music player for your local library, online listening,
              synced lyrics and playlists.
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <span>Free Forever</span>
              <span>•</span>
              <span>Open Source</span>
              <span>•</span>
              <span>Local-first</span>
            </div>

            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Links Columns from typed data */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5 p-0 m-0 list-none text-sm text-[var(--text-secondary)]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <ExternalLink
                        href={link.href}
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </ExternalLink>
                    ) : (
                      <a
                        href={link.href}
                        className="transition-colors hover:text-[var(--text-primary)]"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© {new Date().getFullYear()} Gaan Music Player. Built with open-source love.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/rumman2004/Gaan-Desktop/blob/main/LICENSE"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GPL-3.0 License
            </a>
            <a
              href="https://github.com/rumman2004/Gaan-Desktop/releases"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Releases
            </a>
            <a
              href="https://github.com/rumman2004/Gaan-Desktop"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Source Code
            </a>
          </div>
        </div>
      </Container>

      <BackToTop />
    </footer>
  );
}
