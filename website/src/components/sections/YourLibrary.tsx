import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { LibraryCard } from "../features/LibraryCard";
import { SyncPreview } from "../features/SyncPreview";
import { CodePreview } from "../features/CodePreview";
import { ListeningChart } from "../features/ListeningChart";
import { ShieldCheck, HardDrive, Share2 } from "@/components/ui/animated-icons";
import { BackgroundEffect } from "../backgrounds/BackgroundEffect";
import { CARD_BACKGROUNDS } from "../backgrounds/placements";

export function YourLibrary() {
  return (
    <Section id="library" className="py-12 sm:py-20 lg:py-28 border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
      <Container variant="wide">
        <SectionHeader
          eyebrow="YOUR LIBRARY & PRIVACY"
          title="Your library outlives reinstalls."
          description="Your listening stays yours. Sign in if you want it to follow you between computers; stay a guest and everything but Rooms still works."
          align="center"
          className="mb-10 sm:mb-16"
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {/* Card 1: Sync */}
          <LibraryCard
            tagline="Optional account"
            title="Sync that follows you"
            description="Create a username or sign in with Google to carry your library, settings and listening history between computers. Downloads and local file paths stay on the device."
            badge="Your choice"
            preview={<SyncPreview />}
            backgroundEffect={CARD_BACKGROUNDS.library["Sync that follows you"]}
          />

          {/* Card 2: JSON Backup & Open Portability */}
          <LibraryCard
            tagline="Local-first, by design"
            title="Readable backups"
            description="Keep your library data in readable JSON. Export settings and listening history to one backup, restore it on a new computer, or move a playlist as .m3u8 or JSON."
            badge="Portable"
            preview={<CodePreview />}
            backgroundEffect={CARD_BACKGROUNDS.library["Readable backups"]}
          />
          <LibraryCard
            tagline="Listening history"
            title="Replay, honestly counted"
            description="See your listening by week, month, year and all time, with stats calculated from your own listening history."
            badge="Week · Month · Year · All time"
            preview={<ListeningChart />}
            backgroundEffect={CARD_BACKGROUNDS.library["Replay, honestly counted"]}
          />
        </div>

        {/* Privacy Guarantees Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
          <div className="has-react-bits-background p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3 sm:gap-4">
            <BackgroundEffect effect={CARD_BACKGROUNDS.privacy["Zero Telemetry"]} />
            <div className="size-10 rounded-xl bg-[var(--platform-green-bg)] text-[var(--platform-green-text)] flex items-center justify-center shrink-0">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Zero Telemetry</h4>
              <p className="text-xs text-[var(--text-secondary)]">No analytics scripts or tracking pixels.</p>
            </div>
          </div>

          <div className="has-react-bits-background p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3 sm:gap-4">
            <BackgroundEffect effect={CARD_BACKGROUNDS.privacy["Local playback"]} />
            <div className="size-10 rounded-xl bg-[var(--platform-blue-bg)] text-[var(--platform-blue-text)] flex items-center justify-center shrink-0">
              <HardDrive className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Local playback</h4>
              <p className="text-xs text-[var(--text-secondary)]">Play files already on your device offline.</p>
            </div>
          </div>

          <div className="has-react-bits-background p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center gap-3 sm:gap-4">
            <BackgroundEffect effect={CARD_BACKGROUNDS.privacy["Spotify Import"]} />
            <div className="size-10 rounded-xl bg-[var(--platform-purple-bg)] text-[var(--platform-purple-text)] flex items-center justify-center shrink-0">
              <Share2 className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[var(--text-primary)]">Spotify Import</h4>
              <p className="text-xs text-[var(--text-secondary)]">Migrate public playlists with one link.</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
