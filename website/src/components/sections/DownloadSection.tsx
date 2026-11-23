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

  const infoRows = [
    { icon: CalendarDays, label: "Release date", value: releaseDate },
    { icon: PackageCheck, label: "Windows installer", value: installerSize },
    { icon: ShieldCheck, label: "License", value: "GPL-3.0" },
  ];

  return (
    <Section
      id="downloads"
      className="download-section relative isolate overflow-hidden py-10 sm:py-16 lg:py-24 border-t border-[var(--border-subtle)] !bg-transparent"
    >
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
      <Container variant="wide" className="relative z-10 px-4 sm:px-6">
        <SectionHeader
          eyebrow="DOWNLOAD & INSTALL"
          title={
            <HyperText
              className="download-hyper-text text-[1.75rem] leading-tight sm:text-4xl lg:text-5xl"
              startOnView
              animateOnHover={false}
            >
              Take Gaan home.
            </HyperText>
          }
          description={
            <span className="block mx-auto max-w-xl text-sm sm:text-base leading-relaxed">
              Gaan is available for Windows, macOS and Android.{" "}
              <HyperText className="download-hyper-text" startOnView animateOnHover={false} duration={1000}>
                Free, open source and straightforward to install.
              </HyperText>{" "}
              Choose your platform to find the latest official release.
            </span>
          }
          align="center"
          className="mb-6 sm:mb-12 lg:mb-14"
        />

        <DownloadCounter />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
          {/* Release information — compact on mobile, sticky sidebar on desktop */}
          <Card
            variant="outlined"
            style={{ backgroundColor: "color-mix(in srgb, var(--bg-card) 80%, transparent)" }}
            className="lg:col-span-4 lg:sticky lg:top-24 p-4 sm:p-6 lg:p-8 flex flex-col gap-4 sm:gap-5 lg:gap-6"
          >
            <div className="flex items-start justify-between gap-3 lg:block">
              <div className="min-w-0">
                <p className="text-[0.625rem] sm:text-xs uppercase tracking-[.14em] text-[var(--text-muted)] font-semibold mb-1.5 sm:mb-3">
                  Release information
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-lg sm:text-2xl font-bold tracking-tight break-all">{releases.desktop.tag}</h3>
                  <Badge variant="version">Latest</Badge>
                </div>
              </div>
              <a
                href={releases.desktop.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs sm:text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] lg:mt-2 min-h-8"
              >
                <HyperText animateOnHover>View latest release</HyperText>
                <ExternalLink className="size-3.5" />
              </a>
            </div>

            <dl className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
              {infoRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between gap-3 py-2 sm:py-3 text-xs sm:text-sm">
                  <dt className="inline-flex items-center gap-2 text-[var(--text-secondary)]">
                    <Icon className="size-3.5 sm:size-4" />
                    {label}
                  </dt>
                  <dd className="font-medium text-right">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center justify-between gap-3 lg:block">
              <div>
                <p className="hidden lg:block text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold mb-3">
                  Available for
                </p>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)]">Windows · macOS · Android</p>
              </div>
              <a
                href={releases.desktop.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:underline lg:mt-4 min-h-8"
              >
                <HyperText animateOnHover>What's new</HyperText>
                <ExternalLink className="size-3.5 sm:size-4" />
              </a>
            </div>
          </Card>

          <div className="lg:col-span-8 min-w-0 w-full">
            <DownloadCard initialPlatform={initialPlatform} releases={releases} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
