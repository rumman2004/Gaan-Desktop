import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Monitor, Apple, Smartphone, Sparkles, Play, Pause, Volume2, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenDownload: () => void;
  detectedOS: 'windows' | 'mac' | 'android' | 'other';
}

const TABS = [
  { id: 'home', label: 'Home Feed', image: '/screenshots/home.jpg', subtitle: 'Personalized jump back in, mixes & explore' },
  { id: 'ai', label: 'AI Playlist Recs', image: '/screenshots/ai-playlist.jpg', subtitle: '5 fresh curated tracks with infinite shuffle' },
  { id: 'lyrics', label: 'Synced Lyrics', image: '/screenshots/lyrics.png', subtitle: 'Word-by-word real-time scrolling from 13 sources' },
  { id: 'fullscreen', label: 'Cinema Fullscreen', image: '/screenshots/fullscreen.png', subtitle: 'Album art visualizer with ambient glow' },
  { id: 'miniplayer', label: 'Mini Player', image: '/screenshots/miniplayer.png', subtitle: 'Always-on-top PiP floating desktop widget' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenDownload, detectedOS }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePrimaryDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#f43f5e', '#ec4899', '#4d694e', '#ffffff'],
    });

    if (detectedOS === 'mac') {
      window.location.href = 'https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-1.1.2-arm64.dmg';
    } else if (detectedOS === 'android') {
      onOpenDownload();
    } else {
      window.location.href = 'https://github.com/rumman2004/Gaan-Desktop/releases/latest/download/Gaan-Setup.exe';
    }
  };

  const getPrimaryButtonLabel = () => {
    if (detectedOS === 'mac') return 'Download for macOS (Apple Silicon)';
    if (detectedOS === 'android') return 'Download for Android (.apk)';
    return 'Download for Windows (.exe)';
  };

  const getPrimaryButtonIcon = () => {
    if (detectedOS === 'mac') return <Apple className="w-5 h-5" />;
    if (detectedOS === 'android') return <Smartphone className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  const activeTabData = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden glow-mesh">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-rose-600/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-emerald-600/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card border border-rose-500/20 text-[13px] font-medium text-rose-300 shadow-xl mb-7 cursor-pointer hover:border-rose-500/40 transition-colors"
          onClick={onOpenDownload}
        >
          <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-ping" />
          <span className="font-semibold text-white">Gaan 1.1.2 Released</span>
          <span className="text-zinc-400">•</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            AI Recommendations & Aesthetic Themes
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.08]"
        >
          Your music.{' '}
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
            Ad-free.
          </span>{' '}
          Elevated with AI.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-zinc-300/90 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          The free, open-source music player for <b>Windows</b>, <b>macOS</b>, and <b>Android</b>. Stream YouTube Music without ads, sync your Spotify playlists, sing along with word-synced lyrics, and discover tracks with multi-model AI cascade.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handlePrimaryDownload}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-600/30 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-[15px]"
          >
            {getPrimaryButtonIcon()}
            <span>{getPrimaryButtonLabel()}</span>
            <Download className="w-4 h-4 ml-1 opacity-80" />
          </button>

          <button
            onClick={onOpenDownload}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl font-semibold text-zinc-200 glass-card hover:bg-white/[0.09] border border-white/[0.12] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-[14px]"
          >
            <span>All Platforms (Mac, Win, Android)</span>
          </button>
        </motion.div>

        {/* Safety & Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-5 text-[12.5px] text-zinc-400"
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Free & Open Source (GPL-3.0)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>No Account or Subscription Needed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>Android APK Available</span>
          </div>
        </motion.div>

        {/* Interactive App Mockup Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          {/* Tab Selector Buttons */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none px-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-[13px] font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-zinc-950 shadow-lg shadow-white/10 scale-105'
                    : 'glass-card text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Screenshot Display Box with Window Chrome */}
          <div className="relative rounded-3xl glass-panel p-2.5 sm:p-3 shadow-2xl border border-white/[0.12] overflow-hidden group">
            {/* Window Top Bar Mimic */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2 text-left">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-[11.5px] font-medium text-zinc-500">
                Gaan Desktop — {activeTabData.subtitle}
              </span>
              <div className="w-12" />
            </div>

            {/* App Screenshot Image with Motion Fade */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black/60 shadow-inner">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTabData.image}
                  src={activeTabData.image}
                  alt={activeTabData.label}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full object-cover object-top"
                />
              </AnimatePresence>

              {/* Floating Live Player Widget at bottom */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-8 sm:right-8 glass-panel rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/[0.14] flex items-center justify-between backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-rose-950/40 border border-white/10 shrink-0">
                    <img
                      src="/brand/gaan-icon.png"
                      alt="Now Playing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[13.5px] font-bold text-white flex items-center gap-1.5">
                      <span>Midnight City</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                        AI CASCADE
                      </span>
                    </div>
                    <div className="text-[11.5px] text-zinc-400">M83 • Synthwave Nights</div>
                  </div>
                </div>

                {/* Animated Equalizer Wave */}
                <div className="hidden md:flex items-center gap-1 h-5 px-3">
                  {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 bg-rose-400 rounded-full transition-all duration-300"
                      style={{
                        height: isPlaying ? `${h}%` : '20%',
                        animation: isPlaying ? `pulseSlow ${1 + (i % 3) * 0.4}s infinite alternate` : 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Mini Player Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-9 h-9 rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shadow-lg"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black ml-0.5" />}
                  </button>
                  <Volume2 className="w-4 h-4 text-zinc-400 hidden sm:block" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
