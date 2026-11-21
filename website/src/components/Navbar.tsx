import React, { useState, useEffect } from 'react';
import { Download, Github, Sparkles, Smartphone, Menu, X, Monitor, Apple } from 'lucide-react';

interface NavbarProps {
  onOpenDownload: () => void;
  detectedOS: 'windows' | 'mac' | 'android' | 'other';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDownload, detectedOS }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getOsIcon = () => {
    if (detectedOS === 'mac') return <Apple className="w-4 h-4" />;
    if (detectedOS === 'android') return <Smartphone className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0c0e]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/brand/gaan-icon.png"
              alt="Gaan Logo"
              className="w-9 h-9 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-xl bg-rose-500/20 blur-md -z-10 group-hover:bg-rose-500/40 transition-colors" />
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-rose-400 transition-colors">
            GAAN
          </span>
          <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-zinc-400">
            v1.1.2
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-zinc-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#themes" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            Themes
          </a>
          <a href="#ai" className="hover:text-white transition-colors">AI Discovery</a>
          <a href="#mobile" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            Mobile App
          </a>
          <a href="#comparison" className="hover:text-white transition-colors">Compare</a>
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://github.com/rumman2004/Gaan-Desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium text-zinc-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
            title="Star on GitHub"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {getOsIcon()}
            <span>Download</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-[#0e1014]/95 backdrop-blur-xl border-b border-white/[0.08] flex flex-col gap-4 text-[15px]">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-zinc-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#themes"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-zinc-300 hover:text-white flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-rose-400" />
            Themes
          </a>
          <a
            href="#ai"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-zinc-300 hover:text-white"
          >
            AI Discovery
          </a>
          <a
            href="#mobile"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-zinc-300 hover:text-white flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            Mobile App (Android)
          </a>
          <a
            href="#comparison"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-zinc-300 hover:text-white"
          >
            Compare with Spotify
          </a>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download Free</span>
            </button>
            <a
              href="https://github.com/rumman2004/Gaan-Desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-zinc-300 bg-white/[0.05] border border-white/[0.08]"
            >
              <Github className="w-4 h-4" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
