import React from "react";
import { ArrowDownToLine, Github, Heart, MessageSquare } from "@/components/ui/animated-icons";
import { Container } from "./Container";
import { SocialLinks } from "./SocialLinks";
import { BackToTop } from "./BackToTop";
import { ExternalLink } from "./ExternalLink";
import { FOOTER_COLUMNS } from "../../data/footer";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container variant="wide">
        <div className="site-footer-grid">
          {/* Brand Info Column */}
          <div className="site-footer-brand">
            <a href="#top" className="site-footer-logo" aria-label="Gaan home">
              <img
                src="/brand/gaan-icon.png"
                alt="Gaan logo"
                className="size-10 object-contain rounded-xl"
              />
              <span>gaan</span>
            </a>

            <p className="site-footer-description">
              A free, open-source music player for your local library, online listening,
              synced lyrics and playlists.
            </p>

            <div className="site-footer-values" aria-label="Gaan values">
              <span>Free forever</span>
              <span>Open source</span>
              <span>Local first</span>
            </div>

            <div className="mt-6">
              <SocialLinks />
            </div>
          </div>

          {/* Links Columns from typed data */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} className="site-footer-column" aria-label={col.title}>
              <h2>
                {col.title}
              </h2>
              <ul>
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
                        className="site-footer-link"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Gaan Music Player</p>
          <a className="site-footer-domain" href="https://gaan.website/">gaan.website</a>
          <div className="site-footer-legal">
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
