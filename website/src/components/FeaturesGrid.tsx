import React from 'react';
import {
  Mic2,
  Users,
  Music,
  Sliders,
  FolderArchive,
  Maximize2,
  PieChart,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const FEATURES = [
  {
    title: 'Word-Synced Lyrics',
    category: 'Sing Along',
    description: 'Line and word-level real-time highlighting. Pulls from 13 sources including LRCLIB and Musixmatch with timing nudge.',
    icon: Mic2,
    gradient: 'from-amber-500/20 to-orange-500/5',
    iconColor: 'text-amber-400',
  },
  {
    title: 'Listen Together in Rooms',
    category: 'Social Sync',
    description: 'Host rooms with up to 10 friends. Everyone hears the exact same song at the same second across Windows, Mac, and mobile.',
    icon: Users,
    gradient: 'from-purple-500/20 to-indigo-500/5',
    iconColor: 'text-purple-400',
  },
  {
    title: 'Spotify Playlist Importer',
    category: 'No Lock-in',
    description: 'Paste any public Spotify playlist URL or plain text song list. Gaan finds and maps every song to YouTube Music catalog instantly.',
    icon: Music,
    gradient: 'from-emerald-500/20 to-teal-500/5',
    iconColor: 'text-emerald-400',
  },
  {
    title: '10-Band Pro Equalizer',
    category: 'Audiophile Grade',
    description: 'Precision graphic EQ, Automix crossfade up to 12s, loudness leveling, pitch-preserving speed, and skip silence.',
    icon: Sliders,
    gradient: 'from-blue-500/20 to-cyan-500/5',
    iconColor: 'text-blue-400',
  },
  {
    title: 'Local Music Library',
    category: 'Your Files',
    description: 'Import folders from your hard drive: MP3, FLAC, WAV, M4A, and OGG. Filter out voice notes and short recordings automatically.',
    icon: FolderArchive,
    gradient: 'from-pink-500/20 to-rose-500/5',
    iconColor: 'text-pink-400',
  },
  {
    title: 'Mini Player & Cinema View',
    category: 'Desktop Power',
    description: 'Resizable always-on-top picture-in-picture window that folds into a slim bar, or toggle full-screen cinema artwork.',
    icon: Maximize2,
    gradient: 'from-red-500/20 to-orange-500/5',
    iconColor: 'text-red-400',
  },
  {
    title: 'Replay Listening Stats',
    category: 'Your Year in Music',
    description: 'Count minutes, plays, streaks, and peak listening hours by week, month, or year. Export 1080×1920 story cards with one click.',
    icon: PieChart,
    gradient: 'from-cyan-500/20 to-sky-500/5',
    iconColor: 'text-cyan-400',
  },
  {
    title: 'Smart In-App Updates',
    category: 'Zero Maintenance',
    description: 'Validates both semantic version and exact release timestamps directly from GitHub. Update and restart in one click on Windows.',
    icon: RefreshCw,
    gradient: 'from-lime-500/20 to-emerald-500/5',
    iconColor: 'text-lime-400',
  },
];

export const FeaturesGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-rose-500/20 text-rose-300 text-[12.5px] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Music Freedom</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Everything You Love. Nothing You Hate.
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            No audio ads, no monthly subscription fees, and no locked features. Built from the ground up for lovers of great music.
          </p>
        </div>

        {/* 8-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="glass-panel rounded-3xl p-6 border border-white/[0.08] shadow-xl text-left relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20 group"
              >
                {/* Subtle top corner gradient */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 rounded-full bg-gradient-to-br ${f.gradient} blur-xl group-hover:scale-125 transition-transform duration-500`}
                />

                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 w-fit mb-5">
                  <Icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>

                <div className="text-[11px] font-bold tracking-wider uppercase text-zinc-400 mb-1">
                  {f.category}
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-zinc-400 text-[13.5px] leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
