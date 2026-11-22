import { useCallback, useEffect, useState } from "react";
import { CalendarDays, Download, ExternalLink, Github, RefreshCw, Rocket } from "@/components/ui/animated-icons";
import { Card } from "../ui/Card";
import { Skeleton } from "../ui/Skeleton";
import { BackgroundEffect } from "../backgrounds/BackgroundEffect";
import { CARD_BACKGROUNDS } from "../backgrounds/placements";

const REPOSITORY = "rumman2004/Gaan-Desktop";
const API = `https://api.github.com/repos/${REPOSITORY}`;
const CACHE_KEY = "gaan_github_stats_v1";
const CACHE_TTL = 12 * 60 * 1000;

interface GitHubStatsData {
  stars: number;
  downloads: number;
  version: string;
  releaseDate: string;
  releaseUrl: string;
  updatedAt: number;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  published_at: string | null;
  html_url: string;
  assets: { id: number; download_count: number }[];
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) as GitHubStatsData : null;
    } catch { return null; }
  });
  const [loading, setLoading] = useState(!stats);
  const [error, setError] = useState(false);

  const refresh = useCallback(async (force = false) => {
    if (!force && stats && Date.now() - stats.updatedAt < CACHE_TTL) {
      setLoading(false);
      return;
    }
    setLoading(!stats);
    setError(false);
    try {
      const headers = { Accept: "application/vnd.github+json" };
      const [repoResponse, firstPage] = await Promise.all([
        fetch(API, { headers }),
        fetch(`${API}/releases?per_page=100&page=1`, { headers }),
      ]);
      if (!repoResponse.ok || !firstPage.ok) throw new Error("GitHub API unavailable");
      const repo = await repoResponse.json() as { stargazers_count: number };
      const releases = await firstPage.json() as GitHubRelease[];
      const pages = Number(firstPage.headers.get("Link")?.match(/&page=(\d+)>; rel="last"/)?.[1] ?? 1);
      const remaining = await Promise.all(Array.from({ length: Math.max(0, pages - 1) }, async (_, index) => {
        const response = await fetch(`${API}/releases?per_page=100&page=${index + 2}`, { headers });
        if (!response.ok) throw new Error("Could not load all GitHub releases");
        return response.json() as Promise<GitHubRelease[]>;
      }));
      const allReleases = [...releases, ...remaining.flat()];
      const latest = allReleases[0];
      const assets = new Map<number, number>();
      allReleases.forEach((release) => release.assets.forEach((asset) => assets.set(asset.id, asset.download_count)));
      const next: GitHubStatsData = {
        stars: repo.stargazers_count,
        downloads: [...assets.values()].reduce((sum, count) => sum + count, 0),
        version: latest?.name || latest?.tag_name || "—",
        releaseDate: latest?.published_at || "",
        releaseUrl: latest?.html_url || `https://github.com/${REPOSITORY}/releases`,
        updatedAt: Date.now(),
      };
      setStats(next);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify(next)); } catch { /* cache is optional */ }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [stats]);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(true), CACHE_TTL);
    return () => window.clearInterval(timer);
  }, [refresh]);

  const date = stats?.releaseDate ? new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(stats.releaseDate)) : "—";
  const metrics = [
    { label: "GitHub stars", value: stats?.stars.toLocaleString(), icon: Github },
    { label: "Release asset downloads", value: stats?.downloads.toLocaleString(), icon: Download },
    { label: "Latest release", value: stats?.version || (loading ? "" : "Unavailable"), icon: Rocket, href: stats?.releaseUrl },
    { label: "Released", value: date, icon: CalendarDays, href: stats?.releaseUrl },
  ];

  return (
    <section className="gaan-section-compact relative isolate overflow-hidden border-t border-[var(--border-subtle)]" aria-labelledby="github-stats-title">
      <BackgroundEffect effect={CARD_BACKGROUNDS.sections.githubStats} className="react-bits-background-section" />
      <div className="gaan-container-wide relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[.16em] text-[var(--text-muted)] font-semibold mb-3">Built in the open</p>
            <h2 id="github-stats-title" className="text-3xl sm:text-4xl font-bold tracking-tight">Loved by listeners.</h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span aria-live="polite">{error ? "Showing last available data" : stats ? `Updated ${new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(stats.updatedAt)}` : "Loading GitHub data"}</span>
            <button type="button" onClick={() => void refresh(true)} disabled={loading} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-default)] px-3 py-2 text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-50" aria-label="Refresh GitHub statistics">
              <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {metrics.map(({ label, value, icon: Icon, href }) => (
            <Card key={label} variant="outlined" className="p-5 sm:p-6 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-5 text-[var(--text-muted)]"><span className="text-xs sm:text-sm">{label}</span><Icon className="size-4 shrink-0" /></div>
              {loading && !stats ? <Skeleton className="h-8 w-28" /> : href ? <a href={href} target="_blank" rel="noreferrer" className="group inline-flex max-w-full items-center gap-1.5 text-lg sm:text-2xl font-bold tracking-tight truncate hover:underline">{value}<ExternalLink className="size-3.5 shrink-0 opacity-60" /></a> : <div className="text-lg sm:text-2xl font-bold tracking-tight truncate">{value ?? "Unavailable"}</div>}
            </Card>
          ))}
        </div>
        <p className="mt-4 text-xs text-[var(--text-muted)]">Downloads are GitHub release asset downloads, not unique people or installed copies. Data is public and fetched directly from GitHub.</p>
      </div>
    </section>
  );
}
