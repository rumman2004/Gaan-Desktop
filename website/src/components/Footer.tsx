import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#07080a] text-zinc-400 py-16 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/brand/gaan-icon.png" alt="Gaan Logo" className="w-8 h-8 rounded-xl" />
              <span className="font-display font-extrabold text-xl tracking-tight text-white">GAAN</span>
            </div>
            <p className="text-zinc-400 text-[14px] leading-relaxed max-w-sm">
              Free, open-source music player with YouTube Music streaming, local files, word-synced lyrics, designer aesthetic themes, and multi-model AI queue shuffle.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/rumman2004/Gaan-Desktop"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card text-zinc-300 hover:text-white hover:border-white/20 transition-colors"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-display font-bold text-white text-[14.5px] mb-3">Product</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#themes" className="hover:text-white transition-colors">Aesthetic Themes</a></li>
              <li><a href="#ai" className="hover:text-white transition-colors">AI Discovery & Cascade</a></li>
              <li><a href="#mobile" className="hover:text-white transition-colors">Android Mobile App</a></li>
              <li><a href="#comparison" className="hover:text-white transition-colors">Compare with Spotify</a></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-display font-bold text-white text-[14.5px] mb-3">Releases & Code</h4>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>
                <a
                  href="https://github.com/rumman2004/Gaan-Desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Latest Release (v1.1.2)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-Setup.exe"
                  className="hover:text-white transition-colors"
                >
                  Windows Installer (.exe)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-1.1.2-arm64.dmg"
                  className="hover:text-white transition-colors"
                >
                  macOS Apple Silicon (.dmg)
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/rumman2004/Gaan-Desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-zinc-500">
          <div>
            © 2026 Gaan Desktop. Licensed under GNU GPL v3.0.
          </div>

          <div className="text-zinc-500 text-center sm:text-right max-w-lg">
            Independent open-source software. Not affiliated with, endorsed by, or sponsored by Google, YouTube, or Spotify.
          </div>
        </div>
      </div>
    </footer>
  );
};
