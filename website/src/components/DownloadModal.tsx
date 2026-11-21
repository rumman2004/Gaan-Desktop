import React from 'react';
import { X, Monitor, Apple, Smartphone, Download, Github, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DOWNLOAD_OPTIONS = [
  {
    platform: 'Windows 10 / 11',
    ext: '.exe installer (NSIS)',
    arch: '64-bit',
    size: '~122 MB',
    url: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-Setup.exe',
    icon: Monitor,
    badge: 'Recommended for PC',
    badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
  },
  {
    platform: 'macOS Apple Silicon',
    ext: '.dmg installer',
    arch: 'M1 / M2 / M3 / M4 (arm64)',
    size: '~134 MB',
    url: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-1.1.2-arm64.dmg',
    icon: Apple,
    badge: 'Apple Silicon',
    badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
  },
  {
    platform: 'macOS Intel',
    ext: '.dmg installer',
    arch: 'Intel Core 64-bit (x64)',
    size: '~138 MB',
    url: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-1.1.2-x64.dmg',
    icon: Apple,
    badge: 'Legacy Intel',
    badgeColor: 'bg-zinc-500/10 text-zinc-300 border-zinc-500/20',
  },
  {
    platform: 'Android Mobile App',
    ext: '.apk package',
    arch: 'Universal ARM64/v7a',
    size: 'Mobile Edition',
    url: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
    icon: Smartphone,
    badge: 'Android 10+',
    badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
];

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-white/[0.12] shadow-2xl overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11.5px] font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>GAAN Release v1.1.2</span>
          </div>
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Choose Your Platform
          </h3>
          <p className="text-zinc-400 text-[13.5px] mt-1">
            Free, open-source builds directly compiled via GitHub Actions CI/CD.
          </p>
        </div>

        {/* Download Rows */}
        <div className="space-y-3">
          {DOWNLOAD_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            return (
              <a
                key={opt.platform}
                href={opt.url}
                onClick={triggerConfetti}
                className="flex items-center justify-between p-4 rounded-2xl glass-card hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-[14.5px]">{opt.platform}</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${opt.badgeColor}`}>
                        {opt.badge}
                      </span>
                    </div>
                    <div className="text-[12px] text-zinc-400">
                      {opt.ext} • {opt.arch} • {opt.size}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] group-hover:bg-rose-600 text-white font-semibold text-[13px] transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Get</span>
                </div>
              </a>
            );
          })}
        </div>

        {/* Security / SmartScreen Note */}
        <div className="mt-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-[12px] text-zinc-400 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <b className="text-zinc-300">Open Source Note:</b> Installers are built transparently on GitHub Actions. On first launch, Windows SmartScreen or macOS Gatekeeper may show a confirmation prompt. Click <i>More info → Run anyway</i> (Windows) or <i>Open Anyway</i> (macOS).
          </div>
        </div>

        {/* Footer Link to GitHub Releases */}
        <div className="mt-5 text-center">
          <a
            href="https://github.com/rumman2004/Gaan-Desktop/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <Github className="w-3.5 h-3.5" />
            <span>View SHA-256 Checksums and Release Notes on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};
