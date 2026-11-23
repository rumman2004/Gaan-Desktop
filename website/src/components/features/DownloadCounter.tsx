import { useEffect, useRef, useState } from "react";

interface DownloadTotals {
  total: number;
  android: number;
  desktop: number;
}

const EMPTY_TOTALS: DownloadTotals = { total: 0, android: 0, desktop: 0 };
const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function sumAssetDownloads(
  releases: Array<{ assets?: Array<{ name?: string; download_count?: number }> }>,
  platform: "android" | "desktop"
): number {
  return releases.reduce((releaseTotal, release) => {
    const assetTotal = (release.assets ?? []).reduce((total, asset) => {
      const name = (asset.name ?? "").toLowerCase();
      const isAppPackage =
        platform === "android"
          ? name.endsWith(".apk")
          : name.endsWith(".exe") || name.endsWith(".dmg") || name.endsWith(".zip");

      return total + (isAppPackage ? Math.max(0, asset.download_count ?? 0) : 0);
    }, 0);

    return releaseTotal + assetTotal;
  }, 0);
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  useEffect(() => {
    const from = previousValue.current;
    const to = value;
    const duration = 1200;
    let frame = 0;
    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate);
      } else {
        previousValue.current = to;
      }
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return <>{displayValue.toLocaleString("en-IN")}</>;
}

export function DownloadCounter() {
  const [totals, setTotals] = useState<DownloadTotals>(EMPTY_TOTALS);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadDownloadTotals = async () => {
      try {
        const [androidResponse, desktopResponse] = await Promise.all([
          fetch("https://api.github.com/repos/rumman2004/Gaan/releases?per_page=100", {
            headers: { Accept: "application/vnd.github+json" },
            cache: "no-store",
          }),
          fetch("https://api.github.com/repos/rumman2004/Gaan-Desktop/releases?per_page=100", {
            headers: { Accept: "application/vnd.github+json" },
            cache: "no-store",
          }),
        ]);

        if (!androidResponse.ok || !desktopResponse.ok) {
          throw new Error("GitHub release statistics are temporarily unavailable.");
        }

        const [androidReleases, desktopReleases] = await Promise.all([
          androidResponse.json(),
          desktopResponse.json(),
        ]);

        const android = sumAssetDownloads(androidReleases, "android");
        const desktop = sumAssetDownloads(desktopReleases, "desktop");

        if (!cancelled) {
          setTotals({ android, desktop, total: android + desktop });
          setLoaded(true);
          setHasError(false);
        }
      } catch (error) {
        console.warn("Unable to load Gaan download statistics:", error);
        if (!cancelled) {
          setLoaded(true);
          setHasError(true);
        }
      }
    };

    loadDownloadTotals();
    const interval = window.setInterval(loadDownloadTotals, REFRESH_INTERVAL_MS);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className="mx-auto mb-8 w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/75 px-5 py-6 text-center shadow-[var(--shadow-card)] backdrop-blur sm:px-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.08] via-transparent to-fuchsia-500/[0.06]" />
        <div className="relative">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-[var(--text-muted)]">
            The Gaan community
          </p>
          <div
            className="text-4xl font-black tracking-tight text-[var(--text-primary)] tabular-nums sm:text-5xl"
            aria-live="polite"
            aria-label={loaded ? `${totals.total.toLocaleString("en-IN")} total downloads` : "Loading download count"}
          >
            {loaded && !hasError ? <AnimatedNumber value={totals.total} /> : hasError ? <span className="text-base font-medium">Unavailable</span> : <span className="inline-block h-12 w-28 animate-pulse rounded-lg bg-[var(--bg-secondary)] align-middle" />}
            <span className="ml-2 text-xl font-semibold text-[var(--text-secondary)] sm:text-2xl">+</span>
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Downloads across Android, Windows and macOS
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs text-[var(--text-muted)]">
            <span><strong className="font-semibold text-[var(--text-primary)]">{loaded && !hasError ? <AnimatedNumber value={totals.android} /> : "—"}</strong> Android</span>
            <span><strong className="font-semibold text-[var(--text-primary)]">{loaded && !hasError ? <AnimatedNumber value={totals.desktop} /> : "—"}</strong> Desktop</span>
          </div>
          <p className="mt-4 text-[10px] text-[var(--text-muted)]">
            GitHub-reported release downloads · refreshes every 5 minutes
          </p>
        </div>
      </div>
    </div>
  );
}
