import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { DownloadCard } from "../features/DownloadCard";
import { TargetPlatform } from "../../data/downloads";
import { useReleases } from "../../lib/releases";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { CalendarDays, ExternalLink, PackageCheck, ShieldCheck } from "@/components/ui/animated-icons";
import { formatDate } from "../../lib/utils";
import Lightfall from "../backgrounds/Lightfall";
import { HyperText } from "../magicui/hyper-text";
import { DownloadCounter } from "../features/DownloadCounter";

export interface DownloadSectionProps {
  initialPlatform?: TargetPlatform;
}

export function DownloadSection({ initialPlatform = "windows" }: DownloadSectionProps) {
  const releases = useReleases();
  const desktopInstaller = releases.desktop.assets.find((asset) => asset.name.toLowerCase().endsWith(".exe"));
  const releaseDate = releases.desktop.publishedAt ? formatDate(releases.desktop.publishedAt) : "See release page";
  const installerSize = desktopInstaller ? `${(desktopInstaller.size / (1024 * 1024)).toFixed(1)} MB` : "See selected package";
  return (
    <Section id="downloads" className="download-section relative isolate overflow-hidden py-12 sm:py-20 lg:py-28 border-t border-[var(--border-subtle)] !bg-transparent">
      <Lightfall
        aria-hidden="true"
        className="!absolute inset-0 z-0"
        colors={["#6d28d9", "#ec4899", "#a78bfa"]}
        backgroundColor="#0d0d0d"
        speed={0.3}
        streakCount={3}
        streakWidth={0.8}
        streakLength={1}
        glow={1}
        density={0.6}
        twinkle={0.3}
        zoom={3}
        backgroundGlow={0.1}
        headGlow={0.6}
        depth={0.5}
        bloom={0.35}
        opacity={1}
        mouseInteraction
        mouseStrength={0.4}
        intro
        fade={0.15}
      />
      <Container variant="wide" className="relative z-10">
        <SectionHeader
          eyebrow="DOWNLOAD & INSTALL"
          title={<HyperText className="download-hyper-text" startOnView animateOnHover={false}>Take Gaan home.</HyperText>}
          description={<>Gaan is available for Windows, macOS and Android. <HyperText className="download-hyper-text" startOnView animateOnHover={false} duration={1000}>Free, open source and straightforward to install.</HyperText> Choose your platform to find the latest official release.</>}
          align="center"
          className="mb-12 sm:mb-16"
        />

        <DownloadCounter />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <Card variant="outlined" style={{ backgroundColor: "color-mix(in srgb, var(--bg-card) 80%, transparent)" }}
            className="lg:col-span-4 p-4 sm:p-8 flex flex-col gap-5 sm:gap-6">
            <div>
              <p className="text-xs uppercase tracking-[.14em] text-[var(--text-muted)] font-semibold mb-3">Release information</p>
              <div className="flex items-center gap-3"><h3 className="text-2xl font-bold tracking-tight">{releases.desktop.tag}</h3><Badge variant="version">Latest</Badge></div>
            <a href={releases.desktop.htmlUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"><HyperText animateOnHover>View latest release</HyperText> <ExternalLink className="size-3.5" /></a>
            </div>
            <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              <div className="flex items-center justify-between gap-3 py-3 text-sm"><span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><CalendarDays className="size-4" /> Release date</span><span className="font-medium">{releaseDate}</span></div>
              <div className="flex items-center justify-between gap-3 py-3 text-sm"><span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><PackageCheck className="size-4" /> Windows installer</span><span className="font-medium">{installerSize}</span></div>
              <div className="flex items-center justify-between gap-3 py-3 text-sm"><span className="inline-flex items-center gap-2 text-[var(--text-secondary)]"><ShieldCheck className="size-4" /> License</span><span className="font-medium">GPL-3.0</span></div>
            </div>
            <div><p className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">Available for</p><p className="text-sm text-[var(--text-secondary)]">Windows · macOS · Android</p></div>
            <a href={releases.desktop.htmlUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><HyperText animateOnHover>What's new</HyperText> <ExternalLink className="size-4" /></a>
          </Card>
          <div className="lg:col-span-8 min-w-0">
          <DownloadCard initialPlatform={initialPlatform} releases={releases} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
