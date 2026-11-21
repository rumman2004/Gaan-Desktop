import React from 'react';
import { Sparkles, Zap, Cpu, Network, Bot, RefreshCw, Plus, CheckCircle2 } from 'lucide-react';

const PROVIDERS = [
  {
    name: 'Groq LPU Accelerators',
    speed: '< 300ms',
    model: 'OpenAI/GPT-OSS & Qwen3.8',
    description: 'Sub-second real-time inference for instant, interruption-free queue reordering.',
    icon: Zap,
    color: 'text-amber-400',
    border: 'border-amber-500/20',
  },
  {
    name: 'Google Gemini 2.5',
    speed: 'High Quality',
    model: 'Gemini 2.5 Flash',
    description: 'Deep acoustic & semantic contextual analysis of artist discographies and moods.',
    icon: Sparkles,
    color: 'text-rose-400',
    border: 'border-rose-500/20',
  },
  {
    name: 'Cohere Command-R',
    speed: 'Multilingual',
    model: 'Command-R7B',
    description: 'Specialized natural-language understanding across cross-cultural and regional music.',
    icon: Network,
    color: 'text-purple-400',
    border: 'border-purple-500/20',
  },
  {
    name: 'Custom OpenAI Gateway',
    speed: 'Custom API',
    model: 'gpt-6.1-sol / xingchiapi',
    description: 'Bring your own self-hosted or proxy endpoint with custom bearer tokens & models.',
    icon: Bot,
    color: 'text-cyan-400',
    border: 'border-cyan-500/20',
  },
];

export const AiSection: React.FC = () => {
  return (
    <section id="ai" className="py-24 lg:py-32 relative overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-rose-500/20 text-rose-300 text-[12.5px] font-semibold mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Harmonic Intelligence</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            AI-Enhanced Flow & Discovery
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg">
            Say goodbye to repetitive algorithms. Gaan harmonizes your upcoming queue into an unbroken vibe journey and curates 5 fresh gems for any playlist.
          </p>
        </div>

        {/* Feature 1: Playlist AI Recommendations (Screenshot + Interactive Explainer) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/[0.1] shadow-2xl mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 text-left">
              <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 mb-3 inline-block">
                Playlist Companion
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                5 Fresh Songs Curated for Every Playlist
              </h3>
              <p className="mt-3 text-zinc-300 text-[14.5px] leading-relaxed">
                Open any playlist you create. Gaan scans its tempo, artist profile, and sonic mood, curating 5 recommendations right underneath your songs.
              </p>

              <div className="mt-5 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-[13.5px]">
                    <b>One-Click Add:</b> Add any recommended song directly into the playlist with a single click.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-[13.5px]">
                    <b>Infinite Shuffle:</b> Click <i>Shuffle / Refresh</i> to immediately curate 5 brand-new discoveries.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Plus className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-300 text-[13.5px]">
                    <b>Auto Replenishment:</b> Adding a recommended song dynamically queries 1 new track to maintain your 5 choices.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/[0.12] shadow-2xl bg-zinc-950">
                <img
                  src="/screenshots/ai-playlist.jpg"
                  alt="AI Playlist Recommendations"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Multi-Provider Cascade Ladder */}
        <div className="text-center mb-8">
          <h3 className="font-display font-bold text-2xl text-white">
            Multi-Tier Auto Cascade Architecture
          </h3>
          <p className="text-zinc-400 text-[14px] mt-1">
            Configure your preferred model in Settings, or let Auto Cascade route to whichever provider responds fastest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROVIDERS.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`glass-card rounded-2xl p-5 border ${p.border} text-left transition-transform hover:-translate-y-1 hover:border-white/20`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10">
                    <Icon className={`w-5 h-5 ${p.color}`} />
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-300">
                    {p.speed}
                  </span>
                </div>

                <div className="font-bold text-white text-[15px]">{p.name}</div>
                <div className="text-[11px] font-mono text-zinc-400 mb-2">{p.model}</div>
                <p className="text-zinc-400 text-[12.5px] leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
