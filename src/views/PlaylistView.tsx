/**
 * One of your playlists: a wall of its songs' covers, its name, how many songs and how long (and
 * which stay on this device), Play, Shuffle and its options; then its songs in your order, each lit
 * by its own cover as the pointer passes. Songs dropped on the page are added (App's panel drop);
 * its own songs move within the list instead (useSortable).
 */
import { useEffect, useRef, useState } from "react";
import {
  Check,
  Download,
  FileDown,
  HardDrive,
  Heart,
  ListMusic,
  ListPlus,
  MoreHorizontal,
  Play,
  Plus,
  RefreshCw,
  Search,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { downloadAll } from "../lib/downloads";
import { exportPlaylist } from "../lib/playlistShare";
import { DownloadBadge } from "../components/TrackList";
import { CollectionHero, HERO_PLAY } from "../components/CollectionHero";
import { HERO_ROUND } from "../components/PlaylistHero";
import { PlayingLight, useRowLight } from "../components/RowLight";
import { Artwork, EmptyState, EqBars, ExplicitBadge } from "../components/primitives";
import { playlistHeaderItems, playlistMenuItems } from "../lib/trackActions";
import { useDrag } from "../lib/dnd";
import { useSortable, type SortableDragProps } from "../lib/useSortable";
import { collectionFacts } from "../lib/collection";
import { fmtTime, shortTitle } from "../lib/format";
import { FitText } from "../components/FitText";
import { useLibrary, type Playlist } from "../stores/library";
import { isLocalSong, staysOnDevice } from "../lib/devicePlaylists";
import { usePlayer } from "../stores/player";
import { useUI } from "../stores/ui";
import { PlaylistFilterBar } from "../components/PlaylistFilterBar";
import { usePlaylistFilter } from "../lib/usePlaylistFilter";
import { getPlaylistRecommendations } from "../lib/aiRecs";
import type { Track } from "../types";

export function PlaylistView({ playlistId }: { playlistId: string }) {
  const playlist = useLibrary((s) => s.playlists.find((p) => p.id === playlistId) ?? null);
  const playQueue = usePlayer((s) => s.playQueue);
  const openContextMenu = useUI((s) => s.openContextMenu);
  const toast = useUI((s) => s.toast);
  const rowLight = useRowLight();

  const tracks = playlist?.tracks ?? [];
  const filter = usePlaylistFilter(tracks, { allowCustom: true, defaultSort: "custom" });
  const displayTracks = filter.filteredTracks;
  const isCustomAndUnfiltered =
    filter.sortOption === "custom" && !filter.searchQuery.trim() && filter.activeChip === "all";

  // A song dragged within the list moves the way the queue's do; dragged out,
  // it still drops onto other playlists or the queue.
  const listRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    scrollRef.current = document.getElementById("view-scroll");
  }, []);
  const sortable = useSortable({
    signature: (playlist?.tracks ?? []).map((t) => t.id).join(","),
    listRef,
    scrollRef,
    clamp: (_from, target) => target,
    canDrag: () => isCustomAndUnfiltered,
    onCommit: (from, to) => {
      if (playlist && isCustomAndUnfiltered) useLibrary.getState().moveInPlaylist(playlist.id, from, to);
    },
  });

  if (!playlist) {
    return (
      <EmptyState
        icon={ListMusic}
        title="This playlist no longer exists"
        body="It may have been deleted. Head back to your playlists to find the rest."
        className="pt-10"
      />
    );
  }

  // Keys stay with the song (id + which copy), so a moved row moves rather than remounting.
  const copies = new Map<string, number>();
  const rowKey = (id: string): string => {
    const n = copies.get(id) ?? 0;
    copies.set(id, n + 1);
    return `${id}#${n}`;
  };
  // Songs from this computer don't sync: the playlist says what stays here.
  const onDevice = staysOnDevice(playlist);
  const localCount = tracks.filter(isLocalSong).length;
  const facts = collectionFacts(tracks);

  const play = (shuffle: boolean): void => {
    if (!displayTracks.length) return;
    if (shuffle) {
      usePlayer.setState({ shuffle: true });
      playQueue(displayTracks, Math.floor(Math.random() * displayTracks.length), playlistId);
    } else {
      playQueue(displayTracks, 0, playlistId);
    }
  };

  const openHeaderMenu = (x: number, y: number): void => {
    const [renameItem, deleteItem] = playlistHeaderItems(playlist);
    openContextMenu(x, y, [
      {
        label: "Add all to queue",
        icon: ListPlus,
        action: () => {
          usePlayer.getState().addToQueue(tracks);
          toast("Playlist added to queue");
        },
      },
      { label: "Download all", icon: Download, action: () => downloadAll(tracks, `"${playlist.name}"`) },
      { label: "Export playlist", icon: FileDown, action: () => void exportPlaylist(playlist.name, tracks) },
      { ...renameItem, separatorBefore: true },
      deleteItem,
    ]);
  };

  return (
    <div className="pb-14">
      <CollectionHero
        icon={onDevice ? HardDrive : ListMusic}
        kind={onDevice ? "On this device" : "Your playlist"}
        title={playlist.name}
        // An artist's playlist leads with the artist's photo.
        covers={[playlist.artistThumb, ...tracks.map((t) => t.thumb)]}
        facts={
          <>
            {tracks.length ? [facts.songs, facts.length].filter(Boolean).join(" · ") : "No songs yet"}
            {facts.topArtist && (
              <>
                {" · Top artist: "}
                <span className="font-semibold text-white">{facts.topArtist.name}</span>
              </>
            )}
            {localCount > 0 && (
              <span className="block mt-1.5 text-[13px] text-white/60">
                {onDevice
                  ? "All its songs are from this computer, so it stays here and doesn't sync."
                  : `${localCount === 1 ? "1 song is" : `${localCount} songs are`} from this computer and ${
                      localCount === 1 ? "stays" : "stay"
                    } on this device. The rest of the playlist syncs.`}
              </span>
            )}
          </>
        }
      >
        {/* Not dimmed when empty: play() does nothing then, and grey buttons made new playlists look broken. */}
        <button type="button" className={HERO_PLAY} aria-label={`Play ${playlist.name}`} onClick={() => play(false)}>
          <Play className="w-5 h-5 fill-current" />
          Play
        </button>
        <button type="button" className={HERO_ROUND} aria-label="Shuffle" title="Shuffle" onClick={() => play(true)}>
          <Shuffle className="w-5 h-5" />
        </button>
        <button
          type="button"
          className={HERO_ROUND}
          aria-label="More options"
          title="More options"
          onClick={(e) => openHeaderMenu(e.clientX, e.clientY)}
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </CollectionHero>

      <div className="pt-4">
        {tracks.length > 0 && (
          <PlaylistFilterBar
            searchQuery={filter.searchQuery}
            onSearchChange={filter.setSearchQuery}
            activeChip={filter.activeChip}
            onChipChange={filter.setActiveChip}
            sortOption={filter.sortOption}
            onSortChange={filter.setSortOption}
            totalCount={filter.totalCount}
            filteredCount={filter.filteredCount}
            hasLocal={filter.hasLocal}
            hasDownloads={filter.hasDownloads}
            hasLiked={filter.hasLiked}
            allowCustom={filter.allowCustom}
            defaultSort={filter.defaultSort}
          />
        )}

        {tracks.length === 0 ? (
          <EmptyState
            icon={ListMusic}
            title="Let's find something for your playlist"
            body="Search for songs you love, or browse Explore to discover something new, then right-click any song to add it here. Its cover joins the wall above."
            action={
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    useUI.getState().navigate({ name: "home" });
                    // The search field lives in the top bar; focus it once
                    // home has painted so typing starts immediately.
                    window.setTimeout(() => document.getElementById("global-search")?.focus(), 80);
                  }}
                  className="h-10 px-5 rounded-full bg-primary text-on-primary text-[13.5px] font-semibold hover:brightness-110 hover:shadow-[0_10px_36px_-10px_rgb(var(--primary)/0.55)] transition-all active:scale-[0.98]"
                >
                  Search for songs
                </button>
                <button
                  onClick={() => useUI.getState().navigate({ name: "explore" })}
                  className="h-10 px-5 rounded-full bg-panel border border-ink-hi/[0.09] text-[13.5px] font-semibold text-ink-hi hover:bg-ink-hi/[0.05] hover:border-ink-hi/[0.2] transition-all active:scale-[0.98]"
                >
                  Browse Explore
                </button>
              </div>
            }
          />
        ) : displayTracks.length === 0 ? (
          <EmptyState
            icon={Search}
            title={`No songs match “${filter.searchQuery || filter.activeChip}”`}
            body="Try checking the spelling or clearing the filter to see all songs in this playlist."
            action={
              <button
                onClick={filter.resetFilters}
                className="h-9 px-4 rounded-full bg-ink-hi/[0.08] hover:bg-ink-hi/[0.14] text-[13px] font-semibold text-ink-hi transition-colors"
              >
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="relative" onMouseLeave={rowLight.leave}>
            {rowLight.light}
            <div ref={listRef}>
              {displayTracks.map((track, i) => (
                <div key={rowKey(track.id)} style={isCustomAndUnfiltered ? sortable.styleFor(i) : undefined}>
                  <PlaylistTrackRow
                    track={track}
                    index={i}
                    queue={displayTracks}
                    playlist={playlist}
                    sortDrag={
                      isCustomAndUnfiltered
                        ? sortable.dragProps(i)
                        : {
                            onDragStart: () => {},
                            onDragEnd: () => {},
                            onPointerDown: () => {},
                            onPointerMove: () => {},
                            onPointerUp: () => {},
                            onPointerCancel: () => {},
                          }
                    }
                    onHover={rowLight.hover}
                  />
                  {i < displayTracks.length - 1 && <div className="h-px bg-ink-hi/[0.05] ml-[112px] mr-3" />}
                </div>
              ))}
            </div>
          </div>
        )}

        <PlaylistRecommendations playlist={playlist} />
      </div>
    </div>
  );
}

function PlaylistRecommendations({ playlist }: { playlist: Playlist }) {
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const seenIds = useRef<Set<string>>(new Set());
  const toast = useUI((s) => s.toast);
  const playQueue = usePlayer((s) => s.playQueue);
  const openContextMenu = useUI((s) => s.openContextMenu);

  // Initialize or reload recommendations when playlist changes
  useEffect(() => {
    let cancelled = false;
    seenIds.current = new Set(playlist.tracks.map((t) => t.id));

    const load = async () => {
      setLoading(true);
      try {
        const recs = await getPlaylistRecommendations(playlist, 5, seenIds.current);
        if (!cancelled) {
          setRecommendations(recs);
          recs.forEach((r) => seenIds.current.add(r.id));
        }
      } catch (err) {
        console.warn("[GAAN][AI] Failed to load playlist recommendations:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [playlist.id]);

  // Shuffle / Refresh with 5 brand new AI recommendations
  const shuffleRecommendations = async () => {
    if (loading) return;
    setLoading(true);
    recommendations.forEach((r) => seenIds.current.add(r.id));
    playlist.tracks.forEach((t) => seenIds.current.add(t.id));

    try {
      const fresh = await getPlaylistRecommendations(playlist, 5, seenIds.current);
      if (fresh.length > 0) {
        setRecommendations(fresh);
        fresh.forEach((r) => seenIds.current.add(r.id));
        toast("Shuffled with 5 new AI recommendations", "success");
      } else {
        toast("No new recommendations found right now", "info");
      }
    } catch {
      toast("Couldn't refresh recommendations", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add a recommended song to the playlist and immediately fetch 1 new song to maintain 5
  const addAndReplace = async (track: Track) => {
    if (addingId) return;
    setAddingId(track.id);

    // 1. Add track to playlist in library store
    useLibrary.getState().addToPlaylist(playlist.id, track);
    toast(`Added “${shortTitle(track.title)}” to ${playlist.name}`, "success");

    // 2. Mark as seen
    seenIds.current.add(track.id);
    playlist.tracks.forEach((t) => seenIds.current.add(t.id));

    // 3. Immediately fetch 1 replacement recommendation to keep exactly 5
    try {
      const replacement = await getPlaylistRecommendations(playlist, 1, seenIds.current);
      if (replacement.length > 0) {
        const newTrack = replacement[0];
        seenIds.current.add(newTrack.id);
        setRecommendations((prev) =>
          prev.map((t) => (t.id === track.id ? newTrack : t))
        );
      } else {
        setRecommendations((prev) => prev.filter((t) => t.id !== track.id));
      }
    } catch {
      setRecommendations((prev) => prev.filter((t) => t.id !== track.id));
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-ink-hi/[0.08]">
      <div className="flex items-center justify-between mb-4 px-2">
        <div>
          <div className="flex items-center gap-2 text-[17px] font-bold text-ink-hi tracking-tight">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            Recommended Songs
          </div>
          <div className="text-[12.5px] text-ink-dim mt-0.5">
            Based on the tracks and vibe of “{playlist.name}”
          </div>
        </div>

        <button
          onClick={() => void shuffleRecommendations()}
          disabled={loading}
          className="flex items-center gap-2 h-8 px-3.5 rounded-full bg-ink-hi/[0.06] hover:bg-ink-hi/[0.12] text-[12.5px] font-semibold text-ink-hi transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          title="Shuffle with 5 new AI recommendations"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-accent" : ""}`} />
          <span>{loading ? "Finding songs…" : "Shuffle / Refresh"}</span>
        </button>
      </div>

      {loading && !recommendations.length ? (
        <div className="py-8 text-center text-ink-dim text-[13px] flex flex-col items-center gap-2">
          <RefreshCw className="w-5 h-5 animate-spin text-accent" />
          <span>Curating AI recommendations for this playlist…</span>
        </div>
      ) : recommendations.length === 0 ? (
        <div className="py-6 text-center text-ink-dim text-[13px]">
          No recommendations available right now. Click Shuffle / Refresh to try again.
        </div>
      ) : (
        <div className="space-y-0.5">
          {recommendations.map((recTrack) => {
            const isAdding = addingId === recTrack.id;
            const alreadyInPlaylist = playlist.tracks.some((t) => t.id === recTrack.id);

            return (
              <div
                key={recTrack.id}
                onClick={() => playQueue([recTrack], 0)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  openContextMenu(e.clientX, e.clientY, playlistMenuItems(playlist, recTrack));
                }}
                className="group flex items-center gap-3.5 h-[60px] px-3 rounded-lg hover:bg-ink-hi/[0.04] transition-colors cursor-pointer select-none"
              >
                <div className="relative w-[46px] h-[46px] rounded-lg overflow-hidden shrink-0">
                  <Artwork
                    src={recTrack.thumb}
                    className="w-full h-full object-cover"
                    iconClassName="w-4 h-4"
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[15px] font-semibold text-ink-hi truncate">
                    {recTrack.explicit && <ExplicitBadge />}
                    <FitText text={shortTitle(recTrack.title)} full={recTrack.title} />
                  </div>
                  <FitText text={recTrack.artist} className="text-[13px] text-ink-dim mt-0.5 truncate" />
                </div>

                <div className="text-xs text-ink-faint tabular-nums shrink-0 px-2">
                  {recTrack.duration > 0 ? fmtTime(recTrack.duration) : ""}
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {alreadyInPlaylist ? (
                    <span className="flex items-center gap-1 h-7 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-[12px] font-medium">
                      <Check className="w-3 h-3" />
                      Added
                    </span>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        void addAndReplace(recTrack);
                      }}
                      disabled={isAdding}
                      className="flex items-center gap-1.5 h-7 px-3 rounded-full border border-ink-hi/20 hover:border-ink-hi/60 hover:bg-ink-hi/[0.08] text-[12px] font-semibold text-ink-hi transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                      title={`Add “${recTrack.title}” to ${playlist.name}`}
                    >
                      {isAdding ? (
                        <RefreshCw className="w-3 h-3 animate-spin text-accent" />
                      ) : (
                        <Plus className="w-3 h-3" />
                      )}
                      <span>{isAdding ? "Adding…" : "Add"}</span>
                    </button>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openContextMenu(e.clientX, e.clientY, playlistMenuItems(playlist, recTrack));
                    }}
                    className="p-1.5 rounded-md text-ink-faint hover:text-ink-hi hover:bg-ink-hi/[0.07] opacity-0 group-hover:opacity-100 transition-opacity"
                    title="More options"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PlaylistTrackRow({
  track,
  index,
  queue,
  playlist,
  sortDrag,
  onHover,
}: {
  track: Track;
  index: number;
  queue: Track[];
  playlist: Playlist;
  /** moving the row within the playlist (see useSortable) */
  sortDrag: SortableDragProps;
  /** the pointer came onto this row: the list's light moves to it */
  onHover: (row: HTMLElement, thumb: string) => void;
}) {
  const playQueue = usePlayer((s) => s.playQueue);
  const openContextMenu = useUI((s) => s.openContextMenu);
  const currentId = usePlayer((s) => s.queue[s.index]?.id ?? null);
  const playing = usePlayer((s) => s.playing);
  const liked = useLibrary((s) => s.liked.some((t) => t.id === track.id));
  const toggleLike = useLibrary((s) => s.toggleLike);
  const drag = useDrag({ track, fromPlaylist: playlist.id });
  const isCurrent = currentId === track.id;

  const openMenu = (x: number, y: number): void => {
    openContextMenu(x, y, playlistMenuItems(playlist, track));
  };

  return (
    <div
      {...drag.props}
      onDragStart={(e) => {
        drag.props.onDragStart(e);
        sortDrag.onDragStart(e);
      }}
      onDragEnd={(e) => {
        drag.props.onDragEnd(e);
        sortDrag.onDragEnd(e);
      }}
      onPointerDown={sortDrag.onPointerDown}
      onPointerMove={sortDrag.onPointerMove}
      onPointerUp={sortDrag.onPointerUp}
      onPointerCancel={sortDrag.onPointerCancel}
      onMouseEnter={(e) => onHover(e.currentTarget, track.thumb)}
      onClick={() => playQueue(queue, index, playlist.id)}
      onContextMenu={(e) => {
        e.preventDefault();
        openMenu(e.clientX, e.clientY);
      }}
      className={`tl-row fit-host group flex items-center gap-3.5 h-[64px] px-3 rounded-lg cursor-pointer select-none ${
        isCurrent ? "bg-ink-hi/[0.06]" : "hover:bg-ink-hi/[0.04]"
      } ${drag.dragging ? "opacity-40" : ""}`}
    >
      {isCurrent && <PlayingLight thumb={track.thumb} />}
      {/* The playlist's own running order: numbered rows, play on hover. */}
      <div data-ghost-hide className="w-7 shrink-0 grid place-items-center text-[13px] text-ink-faint tabular-nums">
        {isCurrent && playing ? (
          <EqBars />
        ) : (
          <>
            <span className={`group-hover:hidden ${isCurrent ? "text-ink-hi font-medium" : ""}`}>{index + 1}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (isCurrent) usePlayer.getState().toggle();
                else playQueue(queue, index, playlist.id);
              }}
              className="hidden group-hover:block text-ink-hi hover:text-ink-hi transition-colors"
              title="Play"
              aria-label={`Play ${track.title}`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </>
        )}
      </div>
      <Artwork src={track.thumb} className="w-[52px] h-[52px] rounded-lg shrink-0" iconClassName="w-4 h-4" alt="" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-[16px] font-semibold tracking-[-0.2px] text-ink-hi">
          {track.explicit && <ExplicitBadge />}
          <FitText text={shortTitle(track.title)} full={track.title} />
        </div>
        <FitText text={track.artist} className="text-[14px] text-ink-dim mt-0.5" />
      </div>
      <div
        data-ghost-hide
        className="w-[88px] shrink-0 flex items-center justify-end gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(track);
          }}
          title={liked ? "Remove from Liked" : "Add to Liked"}
          aria-label={liked ? "Remove from Liked" : "Add to Liked"}
          className="p-1.5 rounded-md text-ink-faint hover:text-ink-hi hover:bg-ink-hi/[0.07] transition-colors"
        >
          <Heart key={liked ? "liked" : "unliked"} className={`w-4 h-4 animate-icon-pop ${liked ? "fill-ink-hi text-ink-hi" : ""}`} />
        </button>
        <span className="opacity-80">
          <DownloadBadge id={track.id} />
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            openMenu(e.clientX, e.clientY);
          }}
          title="More options"
          aria-label={`More options for ${track.title}`}
          className="p-1.5 rounded-md text-ink-faint hover:text-ink-hi hover:bg-ink-hi/[0.07] transition-colors"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="w-11 shrink-0 text-right text-xs text-ink-faint tabular-nums">
        {track.duration > 0 ? fmtTime(track.duration) : "—"}
      </div>
    </div>
  );
}
