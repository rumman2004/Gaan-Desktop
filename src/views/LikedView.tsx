/**
 * Liked Songs: a wall of the covers of the songs you liked; how many, how long, and who you like most;
 * then the songs, each lit by its own cover as the pointer passes. A song dropped on the page is liked
 * (App's panel drop).
 */
import { Heart, Play, Search, Shuffle } from "lucide-react";
import { CollectionHero, HERO_PLAY } from "../components/CollectionHero";
import { HERO_ROUND } from "../components/PlaylistHero";
import { TrackList } from "../components/TrackList";
import { Btn, EmptyState } from "../components/primitives";
import { collectionFacts } from "../lib/collection";
import { useLibrary } from "../stores/library";
import { usePlayer } from "../stores/player";
import { useUI } from "../stores/ui";
import { PlaylistFilterBar } from "../components/PlaylistFilterBar";
import { usePlaylistFilter } from "../lib/usePlaylistFilter";

export function LikedView() {
  const liked = useLibrary((s) => s.liked);
  const navigate = useUI((s) => s.navigate);
  const facts = collectionFacts(liked);

  const filter = usePlaylistFilter(liked, { allowCustom: false, defaultSort: "recent" });
  const displayTracks = filter.filteredTracks;

  const play = (shuffle: boolean): void => {
    if (!displayTracks.length) return;
    if (shuffle) usePlayer.setState({ shuffle: true });
    usePlayer.getState().playQueue(displayTracks, shuffle ? Math.floor(Math.random() * displayTracks.length) : 0, "__liked__");
  };

  return (
    <div className="pb-16">
      <CollectionHero
        icon={Heart}
        kind="Liked by you"
        title="Liked Songs"
        covers={liked.map((t) => t.thumb)}
        facts={
          <>
            {[facts.songs, facts.length].filter(Boolean).join(" · ")}
            {facts.topArtist && (
              <>
                {" · Your most liked: "}
                <span className="font-semibold text-white">{facts.topArtist.name}</span>
              </>
            )}
          </>
        }
      >
        <button type="button" className={HERO_PLAY} aria-label="Play Liked Songs" disabled={!displayTracks.length} onClick={() => play(false)}>
          <Play className="w-5 h-5 fill-current" />
          Play
        </button>
        <button type="button" className={HERO_ROUND} aria-label="Shuffle" title="Shuffle" disabled={!displayTracks.length} onClick={() => play(true)}>
          <Shuffle className="w-5 h-5" />
        </button>
      </CollectionHero>

      <div className="mt-4">
        {liked.length > 0 && (
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
            hasLiked={false}
            allowCustom={false}
            defaultSort={filter.defaultSort}
          />
        )}

        {liked.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Songs you like will show up here"
            body="Click the heart on any song, in the player, a playlist or search, and it lands here. Its cover joins the wall above."
            action={
              <Btn variant="white" onClick={() => navigate({ name: "search" })}>
                Find something to like
              </Btn>
            }
          />
        ) : displayTracks.length === 0 ? (
          <EmptyState
            icon={Search}
            title={`No liked songs match “${filter.searchQuery || filter.activeChip}”`}
            body="Try checking the spelling or clearing the filter to see all your liked songs."
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
          <TrackList tracks={displayTracks} from="__liked__" showAlbum />
        )}
      </div>
    </div>
  );
}
