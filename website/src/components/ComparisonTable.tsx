import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

const ROWS = [
  { feature: 'Price', gaan: '100% Free', spotify: '$11.99 / mo (ad-free)', ytm: '$10.99 / mo (ad-free)' },
  { feature: 'Audio & Video Ads', gaan: 'Never (0 ads)', spotify: 'Every few songs', ytm: 'Between tracks' },
  { feature: 'Account Required', gaan: 'Optional (Guest mode)', spotify: 'Mandatory', ytm: 'Mandatory' },
  { feature: 'AI Queue & Smart Shuffle', gaan: 'Gemini, Groq, Cohere, OpenAI', spotify: 'Closed Algorithm', ytm: 'Radio queue only' },
  { feature: 'Playlist AI Recommendations', gaan: '5 tracks + instant shuffle', spotify: 'Static suggestions', ytm: 'Algorithmic only' },
  { feature: 'Custom Aesthetic Themes', gaan: 'Olive, Rose Velvet, OLED Dark', spotify: 'Dark mode only', ytm: 'Dark mode only' },
  { feature: 'Word-Synced Lyrics', gaan: 'Included (13 sources)', spotify: 'Premium or limited', ytm: 'Static lyrics' },
  { feature: 'Local Files + Streaming', gaan: 'One unified library', spotify: 'Limited local sync', ytm: 'Separate uploads' },
  { feature: 'Listen Together (Rooms)', gaan: 'Up to 10 friends', spotify: 'Jam (Premium only)', ytm: 'Not supported' },
  { feature: 'Open Source (GPL-3.0)', gaan: '100% Open & Auditable', spotify: 'Proprietary', ytm: 'Proprietary' },
];

export const ComparisonTable: React.FC = () => {
  return (
    <section id="comparison" className="py-24 lg:py-32 relative bg-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-rose-500/20 text-rose-300 text-[12.5px] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Side-by-Side</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            How Does GAAN Compare?
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Everything you need for serious desktop listening, with zero commercial compromises.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-panel rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="py-5 px-6 font-display font-bold text-base text-zinc-400">Feature</th>
                  <th className="py-5 px-6 font-display font-extrabold text-lg text-rose-400 bg-rose-500/[0.08] border-x border-rose-500/20">
                    <div className="flex items-center gap-2">
                      <span>GAAN</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-sans font-bold">
                        WINNER
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 font-display font-bold text-base text-zinc-300">Spotify Free</th>
                  <th className="py-5 px-6 font-display font-bold text-base text-zinc-300">YouTube Music</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[13.5px]">
                {ROWS.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-medium text-white">{row.feature}</td>
                    <td className="py-4 px-6 font-bold text-white bg-rose-500/[0.06] border-x border-rose-500/20 flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{row.gaan}</span>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      <div className="flex items-center gap-2">
                        {row.spotify.includes('Every') || row.spotify.includes('Mandatory') ? (
                          <X className="w-4 h-4 text-rose-500/70 shrink-0" />
                        ) : null}
                        <span>{row.spotify}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-400">
                      <div className="flex items-center gap-2">
                        {row.ytm.includes('Between') || row.ytm.includes('Not supported') ? (
                          <X className="w-4 h-4 text-rose-500/70 shrink-0" />
                        ) : null}
                        <span>{row.ytm}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
