import { useEffect, useMemo, useState } from "react";
import type { FilterChip, SortOption } from "../components/PlaylistFilterBar";
import { isLocalSong } from "./devicePlaylists";
import { useLibrary } from "../stores/library";
import type { Track } from "../types";

export interface UsePlaylistFilterOptions {
  defaultSort?: SortOption;
  allowCustom?: boolean;
}

export function usePlaylistFilter(
  tracks: Track[],
  options?: UsePlaylistFilterOptions
) {
  const allowCustom = options?.allowCustom ?? true;
  const defaultSort: SortOption = options?.defaultSort ?? (allowCustom ? "custom" : "recent");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeChip, setActiveChip] = useState<FilterChip>("all");
  const [sortOption, setSortOption] = useState<SortOption>(defaultSort);

  const history = useLibrary((s) => s.history);
  const liked = useLibrary((s) => s.liked);
  const downloads = useLibrary((s) => s.downloads);

  // Play count mapping combining listening history & long-term replay stats
  const [playMap, setPlayMap] = useState<Map<string, number>>(() => new Map());

  useEffect(() => {
    let cancelled = false;
    const map = new Map<string, number>();

    // 1. Tally from immediate recent history (weighted by recency)
    history.forEach((t, i) => {
      const weight = Math.max(1, Math.round((history.length - i) / 15));
      map.set(t.id, (map.get(t.id) ?? 0) + weight);
    });

    // 2. Tally from Electron stats summary if available
    const bridge = window.GAAN;
    if (bridge?.statsSummary) {
      void bridge
        .statsSummary("all")
        .then((summary) => {
          if (cancelled || !summary?.tracks) return;
          for (const t of summary.tracks) {
            map.set(t.id, (map.get(t.id) ?? 0) + (t.plays || 0) * 3);
          }
          setPlayMap(new Map(map));
        })
        .catch(() => {
          if (!cancelled) setPlayMap(map);
        });
    } else {
      setPlayMap(map);
    }

    return () => {
      cancelled = true;
    };
  }, [history]);

  const likedSet = useMemo(() => new Set(liked.map((t) => t.id)), [liked]);

  const hasLiked = useMemo(() => tracks.some((t) => likedSet.has(t.id)), [tracks, likedSet]);
  const hasDownloads = useMemo(
    () => tracks.some((t) => downloads[t.id]?.status === "done"),
    [tracks, downloads]
  );
  const hasLocal = useMemo(() => tracks.some(isLocalSong), [tracks]);

  // Compute filtered & sorted list
  const filteredTracks = useMemo(() => {
    let result = [...tracks];

    // 1. Filter by Chip
    if (activeChip === "liked") {
      result = result.filter((t) => likedSet.has(t.id));
    } else if (activeChip === "downloaded") {
      result = result.filter((t) => downloads[t.id]?.status === "done");
    } else if (activeChip === "local") {
      result = result.filter(isLocalSong);
    }

    // 2. Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.artist || "").toLowerCase().includes(q) ||
          (t.album || "").toLowerCase().includes(q)
      );
    }

    // 3. Sort
    switch (sortOption) {
      case "recent":
        // Recently added: original sequence for collections where new items prepend (or swapped per user preference)
        break;
      case "oldest":
        // Oldest added: reverse sequence
        result.reverse();
        break;
      case "most_played":
        result.sort((a, b) => (playMap.get(b.id) ?? 0) - (playMap.get(a.id) ?? 0));
        break;
      case "title_asc":
        result.sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
        break;
      case "title_desc":
        result.sort((a, b) => b.title.localeCompare(a.title, undefined, { sensitivity: "base" }));
        break;
      case "artist_asc":
        result.sort((a, b) => (a.artist || "").localeCompare(b.artist || "", undefined, { sensitivity: "base" }));
        break;
      case "duration_desc":
        result.sort((a, b) => (b.duration || 0) - (a.duration || 0));
        break;
      case "duration_asc":
        result.sort((a, b) => (a.duration || 0) - (b.duration || 0));
        break;
      case "custom":
      default:
        // Keep original playlist order
        break;
    }

    return result;
  }, [tracks, activeChip, searchQuery, sortOption, likedSet, downloads, playMap]);

  const resetFilters = () => {
    setSearchQuery("");
    setActiveChip("all");
    setSortOption(defaultSort);
  };

  const isFilteredOrSorted =
    searchQuery.trim().length > 0 || activeChip !== "all" || sortOption !== defaultSort;

  return {
    searchQuery,
    setSearchQuery,
    activeChip,
    setActiveChip,
    sortOption,
    setSortOption,
    filteredTracks,
    totalCount: tracks.length,
    filteredCount: filteredTracks.length,
    hasLiked,
    hasDownloads,
    hasLocal,
    allowCustom,
    defaultSort,
    resetFilters,
    isFilteredOrSorted,
  };
}
