import { useState, useEffect } from 'react';

export interface ReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
}

export interface ReleaseData {
  tag: string;
  name: string;
  publishedAt: string;
  htmlUrl: string;
  assets: ReleaseAsset[];
  loading: boolean;
}

export interface ReleasesState {
  desktop: ReleaseData & {
    windowsExeUrl: string;
    macArm64DmgUrl: string;
    macX64DmgUrl: string;
  };
  mobile: ReleaseData & {
    apkArm64Url: string;
    apkUniversalUrl: string;
  };
}

const FALLBACK_DESKTOP: ReleasesState['desktop'] = {
  tag: 'Latest release',
  name: 'Gaan Desktop',
  publishedAt: '',
  htmlUrl: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
  assets: [],
  loading: false,
  windowsExeUrl: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
  macArm64DmgUrl: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
  macX64DmgUrl: 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
};

const FALLBACK_MOBILE: ReleasesState['mobile'] = {
  tag: 'Latest release',
  name: 'Gaan Release Notes',
  publishedAt: '',
  htmlUrl: 'https://github.com/rumman2004/Gaan/releases/latest',
  assets: [],
  loading: false,
  apkArm64Url: 'https://github.com/rumman2004/Gaan/releases/latest',
  apkUniversalUrl: 'https://github.com/rumman2004/Gaan/releases/latest',
};

const CACHE_KEY = 'gaan_releases_cache_v2';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

interface CachedData {
  timestamp: number;
  desktop: ReleasesState['desktop'];
  mobile: ReleasesState['mobile'];
}

export function useReleases(enabled = true) {
  const [releases, setReleases] = useState<ReleasesState>({
    desktop: { ...FALLBACK_DESKTOP, loading: true },
    mobile: { ...FALLBACK_MOBILE, loading: true },
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CachedData = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          setReleases({
            desktop: { ...parsed.desktop, loading: false },
            mobile: { ...parsed.mobile, loading: false },
          });
          return;
        }
      }
    } catch {
      // Ignore cache read errors
    }

    async function fetchReleases() {
      let desktopResult = FALLBACK_DESKTOP;
      let mobileResult = FALLBACK_MOBILE;

      // 1. Fetch Mobile Release from rumman2004/Gaan
      try {
        const resMobile = await fetch('https://api.github.com/repos/rumman2004/Gaan/releases/latest');
        if (resMobile.ok) {
          const data = await resMobile.json();
          const tag = data.tag_name || FALLBACK_MOBILE.tag;
          const assets: ReleaseAsset[] = (data.assets || []).map((a: { name: string; browser_download_url: string; size: number }) => ({
            name: a.name,
            browser_download_url: a.browser_download_url,
            size: a.size,
          }));

          const arm64Asset = assets.find((a) => a.name.toLowerCase().includes('arm64') && a.name.endsWith('.apk'));
          const universalAsset = assets.find((a) => a.name.toLowerCase() === 'gaan.apk');

          mobileResult = {
            tag,
            name: data.name || `Gaan Android ${tag}`,
            publishedAt: data.published_at || FALLBACK_MOBILE.publishedAt,
            htmlUrl: data.html_url || 'https://github.com/rumman2004/Gaan/releases/latest',
            assets,
            loading: false,
            apkArm64Url: arm64Asset ? arm64Asset.browser_download_url : (data.html_url || FALLBACK_MOBILE.htmlUrl),
            apkUniversalUrl: universalAsset ? universalAsset.browser_download_url : (data.html_url || FALLBACK_MOBILE.htmlUrl),
          };
        }
      } catch (err) {
        console.warn('Could not fetch mobile releases from GitHub, using verified fallback:', err);
      }

      // 2. Fetch Desktop Release from rumman2004/Gaan-Desktop
      try {
        const resDesktop = await fetch('https://api.github.com/repos/rumman2004/Gaan-Desktop/releases/latest');
        if (resDesktop.ok) {
          const data = await resDesktop.json();
          const tag = data.tag_name || FALLBACK_DESKTOP.tag;
          const assets: ReleaseAsset[] = (data.assets || []).map((a: { name: string; browser_download_url: string; size: number }) => ({
            name: a.name,
            browser_download_url: a.browser_download_url,
            size: a.size,
          }));

          const exeAsset = assets.find((a) => a.name.endsWith('.exe'));
          const macArmAsset = assets.find((a) => a.name.endsWith('.dmg') && a.name.toLowerCase().includes('arm64'));
          const macX64Asset = assets.find((a) => a.name.endsWith('.dmg') && a.name.toLowerCase().includes('x64'));

          desktopResult = {
            tag,
            name: data.name || `Gaan Desktop ${tag}`,
            publishedAt: data.published_at || FALLBACK_DESKTOP.publishedAt,
            htmlUrl: data.html_url || 'https://github.com/rumman2004/Gaan-Desktop/releases/latest',
            assets,
            loading: false,
            windowsExeUrl: exeAsset ? exeAsset.browser_download_url : (data.html_url || FALLBACK_DESKTOP.htmlUrl),
            macArm64DmgUrl: macArmAsset ? macArmAsset.browser_download_url : (data.html_url || FALLBACK_DESKTOP.htmlUrl),
            macX64DmgUrl: macX64Asset ? macX64Asset.browser_download_url : (data.html_url || FALLBACK_DESKTOP.htmlUrl),
          };
        }
      } catch (err) {
        console.warn('Could not fetch desktop releases from GitHub, using verified fallback:', err);
      }

      if (!cancelled) {
        setReleases({
          desktop: desktopResult,
          mobile: mobileResult,
        });

        try {
          const cachePayload: CachedData = {
            timestamp: Date.now(),
            desktop: desktopResult,
            mobile: mobileResult,
          };
          localStorage.setItem(CACHE_KEY, JSON.stringify(cachePayload));
        } catch {
          // ignore cache write error
        }
      }
    }

    fetchReleases();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return releases;
}
