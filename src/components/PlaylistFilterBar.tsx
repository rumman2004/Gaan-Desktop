import { useMemo } from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ArrowUpDown,
  Check,
  ChevronDown,
  Clock,
  Flame,
  HardDrive,
  Heart,
  RotateCcw,
  Search,
  User,
  X,
} from "lucide-react";
import { useUI, type MenuItem } from "../stores/ui";
import type { Track } from "../types";

export type SortOption =
  | "custom"
  | "recent"
  | "oldest"
  | "most_played"
  | "title_asc"
  | "title_desc"
  | "artist_asc"
  | "duration_desc"
  | "duration_asc";

export type FilterChip = "all" | "liked" | "downloaded" | "local";

export const SORT_LABELS: Record<SortOption, string> = {
  custom: "Custom order",
  recent: "Recently added",
  oldest: "Oldest added",
  most_played: "Most played",
  title_asc: "Title (A–Z)",
  title_desc: "Title (Z–A)",
  artist_asc: "Artist (A–Z)",
  duration_desc: "Duration (Longest)",
  duration_asc: "Duration (Shortest)",
};

export interface PlaylistFilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeChip: FilterChip;
  onChipChange: (chip: FilterChip) => void;
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalCount: number;
  filteredCount: number;
  hasLocal?: boolean;
  hasDownloads?: boolean;
  hasLiked?: boolean;
  allowCustom?: boolean;
  defaultSort?: SortOption;
}

export function PlaylistFilterBar({
  searchQuery,
  onSearchChange,
  activeChip,
  onChipChange,
  sortOption,
  onSortChange,
  totalCount,
  filteredCount,
  hasLocal = false,
  hasDownloads = false,
  hasLiked = false,
  allowCustom = true,
  defaultSort = allowCustom ? "custom" : "recent",
}: PlaylistFilterBarProps) {
  const openContextMenu = useUI((s) => s.openContextMenu);

  const openSortMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const items: MenuItem[] = [
      { label: "Sort songs by", header: true },
      ...(allowCustom
        ? [
            {
              label: "Custom order",
              icon: ArrowUpDown,
              checked: sortOption === "custom",
              action: () => onSortChange("custom"),
            },
          ]
        : []),
      {
        label: "Recently added",
        icon: Clock,
        checked: sortOption === "recent",
        action: () => onSortChange("recent"),
      },
      {
        label: "Oldest added",
        icon: Clock,
        checked: sortOption === "oldest",
        action: () => onSortChange("oldest"),
      },
      {
        label: "Most played",
        icon: Flame,
        checked: sortOption === "most_played",
        action: () => onSortChange("most_played"),
      },
      {
        label: "Title (A–Z)",
        icon: ArrowDownAZ,
        checked: sortOption === "title_asc",
        action: () => onSortChange("title_asc"),
      },
      {
        label: "Title (Z–A)",
        icon: ArrowUpAZ,
        checked: sortOption === "title_desc",
        action: () => onSortChange("title_desc"),
      },
      {
        label: "Artist (A–Z)",
        icon: User,
        checked: sortOption === "artist_asc",
        action: () => onSortChange("artist_asc"),
      },
      {
        label: "Duration (Longest first)",
        icon: Clock,
        checked: sortOption === "duration_desc",
        action: () => onSortChange("duration_desc"),
      },
      {
        label: "Duration (Shortest first)",
        icon: Clock,
        checked: sortOption === "duration_asc",
        action: () => onSortChange("duration_asc"),
      },
    ];

    openContextMenu(rect.right, rect.bottom + 6, items, { alignRight: true });
  };

  const isFilteredOrSorted =
    searchQuery.trim().length > 0 || activeChip !== "all" || sortOption !== defaultSort;

  return (
    <div className="flex flex-col gap-2.5 pb-3 pt-1">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Left: Quick Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => onChipChange("all")}
            className={`h-7 px-3 rounded-full text-[12.5px] font-semibold transition-all ${
              activeChip === "all"
                ? "bg-ink-hi text-canvas shadow-sm"
                : "bg-ink-hi/[0.06] text-ink-hi/70 hover:bg-ink-hi/[0.1] hover:text-ink-hi"
            }`}
          >
            All
          </button>

          {hasLiked && (
            <button
              onClick={() => onChipChange(activeChip === "liked" ? "all" : "liked")}
              className={`h-7 px-3 rounded-full text-[12.5px] font-medium flex items-center gap-1.5 transition-all ${
                activeChip === "liked"
                  ? "bg-ink-hi text-canvas font-semibold shadow-sm"
                  : "bg-ink-hi/[0.06] text-ink-hi/70 hover:bg-ink-hi/[0.1] hover:text-ink-hi"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${activeChip === "liked" ? "fill-current" : ""}`} />
              Liked
            </button>
          )}

          {hasDownloads && (
            <button
              onClick={() => onChipChange(activeChip === "downloaded" ? "all" : "downloaded")}
              className={`h-7 px-3 rounded-full text-[12.5px] font-medium flex items-center gap-1.5 transition-all ${
                activeChip === "downloaded"
                  ? "bg-ink-hi text-canvas font-semibold shadow-sm"
                  : "bg-ink-hi/[0.06] text-ink-hi/70 hover:bg-ink-hi/[0.1] hover:text-ink-hi"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              Downloaded
            </button>
          )}

          {hasLocal && (
            <button
              onClick={() => onChipChange(activeChip === "local" ? "all" : "local")}
              className={`h-7 px-3 rounded-full text-[12.5px] font-medium flex items-center gap-1.5 transition-all ${
                activeChip === "local"
                  ? "bg-ink-hi text-canvas font-semibold shadow-sm"
                  : "bg-ink-hi/[0.06] text-ink-hi/70 hover:bg-ink-hi/[0.1] hover:text-ink-hi"
              }`}
            >
              <HardDrive className="w-3.5 h-3.5" />
              On device
            </button>
          )}
        </div>

        {/* Right: Search Input + Sort Dropdown */}
        <div className="flex items-center gap-2 ml-auto">
          {/* In-playlist Search Box */}
          <div className="relative flex items-center">
            <Search className="w-3.5 h-3.5 text-ink-hi/40 absolute left-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Find in playlist…"
              className="h-8 pl-8 pr-7 rounded-full bg-ink-hi/[0.06] border border-ink-hi/10 text-[12.5px] text-ink-hi placeholder:text-ink-hi/40 focus:outline-none focus:border-ink-hi/30 focus:bg-ink-hi/[0.09] transition-all w-36 sm:w-48 focus:w-56"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 p-0.5 rounded-full text-ink-hi/40 hover:text-ink-hi hover:bg-ink-hi/10 transition-colors"
                title="Clear search"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort dropdown button */}
          <button
            onClick={openSortMenu}
            className="h-8 px-3 rounded-full bg-ink-hi/[0.06] hover:bg-ink-hi/[0.1] border border-ink-hi/10 text-[12.5px] font-medium text-ink-hi/80 hover:text-ink-hi flex items-center gap-1.5 transition-all active:scale-[0.98]"
            title="Sort songs"
            aria-label="Sort songs"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-ink-hi/60" />
            <span>{SORT_LABELS[sortOption]}</span>
            <ChevronDown className="w-3 h-3 text-ink-hi/50 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Filter / Sort status notice with quick reset button */}
      {isFilteredOrSorted && (
        <div className="flex items-center justify-between text-[12px] text-ink-hi/60 px-1 pt-0.5">
          <div className="flex items-center gap-2">
            <span>
              Showing {filteredCount} of {totalCount} {totalCount === 1 ? "song" : "songs"}
            </span>
            {sortOption !== defaultSort && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-ink-hi/[0.07] text-ink-hi/80 font-medium text-[11.5px]">
                {SORT_LABELS[sortOption]}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              onSearchChange("");
              onChipChange("all");
              onSortChange(defaultSort);
            }}
            className="flex items-center gap-1 text-[11.5px] font-medium text-accent hover:underline hover:text-accent/90 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
