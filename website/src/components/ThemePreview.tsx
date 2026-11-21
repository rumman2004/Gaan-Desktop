import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, Check, Heart, Leaf, Moon } from 'lucide-react';

const THEMES = [
  {
    id: 'olive',
    name: 'Olive Green & Cream',
    badge: '🌿 Natural & Earthy',
    tagline: 'Deep forest olive with soft beige cream highlights',
    image: '/screenshots/theme-olive.png',
    bgClass: 'from-[#161F17] to-[#0d140e]',
    borderColor: 'border-[#4D694E]/40',
    colors: [
      { name: 'Olive Green', hex: '#4D694E' },
      { name: 'Beige Cream', hex: '#FFF3D5' },
      { name: 'Forest Base', hex: '#161F17' },
    ],
    icon: Leaf,
  },
  {
    id: 'pookie',
    name: 'Rose Velvet (Pookie)',
    badge: '💖 Warm & Playful',
    tagline: 'Grapefruit and sweet vanilla over rich velvety raspberry',
    image: '/screenshots/theme-pookie.png',
    bgClass: 'from-[#230D15] to-[#12060a]',
    borderColor: 'border-[#DA6C81]/40',
    colors: [
      { name: 'Grapefruit', hex: '#DA6C81' },
      { name: 'Vanilla Cream', hex: '#F5E9D0' },
      { name: 'Raspberry', hex: '#BF2B54' },
    ],
    icon: Heart,
  },
  {
    id: 'dark',
    name: 'OLED Midnight Dark',
    badge: '🌙 Pure & Focused',
    tagline: 'Cinematic deep black with refined liquid glass glow',
    image: '/screenshots/home.jpg',
    bgClass: 'from-[#12141a] to-[#0a0b0d]',
    borderColor: 'border-white/20',
    colors: [
      { name: 'Midnight', hex: '#0B0C0E' },
      { name: 'Card Surface', hex: '#161922' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    icon: Moon,
  },
];

export const ThemePreview: React.FC = () => {
  const [selectedThemeId, setSelectedThemeId] = useState('olive');
  const activeTheme = THEMES.find((t) => t.id === selectedThemeId) || THEMES[0];

  return (
    <section id="themes" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background radial glow matching selected theme */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none -z-10 transition-colors duration-700"
        style={{
          backgroundColor:
            selectedThemeId === 'olive'
              ? 'rgba(77, 105, 78, 0.22)'
              : selectedThemeId === 'pookie'
              ? 'rgba(218, 108, 129, 0.22)'
              : 'rgba(244, 63, 94, 0.15)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-rose-500/20 text-rose-300 text-[12.5px] font-semibold mb-4">
            <Palette className="w-3.5 h-3.5" />
            <span>Aesthetic Personalization</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Designed for Aesthetics. Made for You.
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Say goodbye to one-size-fits-all players. Switch between OLED Dark, tranquil Olive & Cream, or romantic Rose Velvet in a single tap.
          </p>
        </div>

        {/* Theme Picker Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          {THEMES.map((theme) => {
            const Icon = theme.icon;
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => setSelectedThemeId(theme.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-[14px] font-bold transition-all duration-300 ${
                  isSelected
                    ? 'bg-white text-zinc-950 shadow-xl shadow-white/10 scale-105'
                    : 'glass-card text-zinc-300 hover:text-white hover:bg-white/[0.08] hover:border-white/20'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{theme.name}</span>
                {isSelected && <Check className="w-4 h-4 text-emerald-600 ml-1" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/[0.1] shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Theme Details & Palette */}
            <div className="lg:col-span-5 text-left">
              <span className="text-[12px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-white/[0.08] border border-white/10 text-zinc-300 inline-block mb-3">
                {activeTheme.badge}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {activeTheme.name}
              </h3>
              <p className="mt-2 text-zinc-300 text-[14.5px] leading-relaxed">
                {activeTheme.tagline}. Hand-tuned for optimal contrast, readability, and late-night listening tranquility.
              </p>

              {/* Color Swatches Ladder */}
              <div className="mt-6 space-y-2.5">
                <div className="text-[12px] font-bold uppercase tracking-wider text-zinc-400">Color Palette</div>
                <div className="grid grid-cols-3 gap-2.5">
                  {activeTheme.colors.map((c) => (
                    <div key={c.name} className="glass-card rounded-xl p-2.5 border border-white/[0.08]">
                      <div
                        className="w-full h-8 rounded-lg shadow-inner mb-2 border border-white/10"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="text-[11.5px] font-semibold text-white truncate">{c.name}</div>
                      <div className="text-[10px] font-mono text-zinc-400">{c.hex}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Note */}
              <div className="mt-6 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[12.5px] text-zinc-400 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Available directly under <b>Settings › Appearance</b> with instant preview.</span>
              </div>
            </div>

            {/* Right: Live Mockup View */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/[0.12] aspect-[16/10] bg-black/80">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeTheme.image}
                    src={activeTheme.image}
                    alt={activeTheme.name}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
