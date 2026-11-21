import React from 'react';
import { Smartphone, Download, Cloud, BatteryCharging, Headphones, Shield, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MobileAppSectionProps {
  onDownloadApk?: () => void;
}

export const MobileAppSection: React.FC<MobileAppSectionProps> = ({ onDownloadApk }) => {
  const handleDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10b981', '#06b6d4', '#ffffff'],
    });

    if (onDownloadApk) {
      onDownloadApk();
    } else {
      // Direct APK download link or GitHub releases APK
      window.location.href = 'https://github.com/rumman2004/Gaan-Desktop/releases/latest';
    }
  };

  return (
    <section id="mobile" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient background glow for mobile section */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-14 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Details & Action */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[12.5px] font-semibold mb-5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Experience</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Take GAAN Everywhere.{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Now on Android.
                </span>
              </h2>

              <p className="mt-4 text-zinc-300 text-base sm:text-lg leading-relaxed">
                Enjoy your music seamlessly across all your devices. Your playlists, liked songs, and listening history sync effortlessly between your PC, Mac, and Android phone.
              </p>

              {/* Mobile Features List */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <Cloud className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[13.5px]">Cloud Sync</div>
                    <div className="text-zinc-400 text-[12px]">Library syncs instantly with desktop</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <BatteryCharging className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[13.5px]">Background Playback</div>
                    <div className="text-zinc-400 text-[12px]">Music plays with screen locked</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <Headphones className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[13.5px]">Offline Downloads</div>
                    <div className="text-zinc-400 text-[12px]">Save tracks to storage for offline trips</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <Shield className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-[13.5px]">Zero Ads Forever</div>
                    <div className="text-zinc-400 text-[12px]">No subscriptions or interruptions</div>
                  </div>
                </div>
              </div>

              {/* Android Download CTA */}
              <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleDownload}
                  className="px-8 py-4 rounded-2xl font-bold text-zinc-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 text-[15px]"
                >
                  <Smartphone className="w-5 h-5" />
                  <span>Download for Android (.apk)</span>
                  <Download className="w-4 h-4 ml-1 opacity-70" />
                </button>

                <div className="text-[12px] text-zinc-400 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>Compatible with Android 10+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[280px] sm:w-[320px] rounded-[48px] p-3.5 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black shadow-2xl border-4 border-zinc-700/60 animate-float">
                {/* Speaker pill notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-800 mr-2" />
                  <div className="w-2 h-2 rounded-full bg-blue-900" />
                </div>

                {/* Inner Screen */}
                <div className="relative rounded-[36px] overflow-hidden aspect-[9/19.5] bg-[#0c0d10] border border-white/10 flex flex-col justify-between p-4 pt-12">
                  {/* Top Bar inside app */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src="/brand/gaan-icon.png" alt="App" className="w-7 h-7 rounded-lg" />
                      <span className="font-extrabold text-sm text-white">GAAN</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold">
                      ANDROID
                    </span>
                  </div>

                  {/* Album Cover inside mobile mockup */}
                  <div className="my-auto py-4">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                      <img
                        src="/screenshots/home.jpg"
                        alt="Mobile Now Playing"
                        className="w-full h-full object-cover scale-150"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 text-left">
                        <div className="text-[13px] font-bold text-white">Starboy</div>
                        <div className="text-[11px] text-zinc-300">The Weeknd • Daft Punk</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                      <div className="w-3/5 h-full bg-rose-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-mono">
                      <span>2:15</span>
                      <span>3:50</span>
                    </div>
                  </div>

                  {/* Mini Bottom Controls */}
                  <div className="glass-card rounded-2xl p-2.5 flex items-center justify-around border border-white/10">
                    <span className="text-zinc-400 text-xs">⏮</span>
                    <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                      ▶
                    </div>
                    <span className="text-zinc-400 text-xs">⏭</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
