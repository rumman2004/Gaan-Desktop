import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { ComparisonTable } from "../features/ComparisonTable";
import { LimitationCard } from "../features/LimitationCard";
import { COMPARISONS, HONEST_LIMITATIONS } from "../../data/comparisons";
import { Card } from "../ui/Card";
import { Check, Code2, Minus } from "@/components/ui/animated-icons";
import { GithubIcon as AnimatedGithub } from "../ui/github";

/** Renders a string or boolean comparison value compactly. */
function Value({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-4 text-emerald-500" aria-label="Yes" />
    ) : (
      <Minus className="size-4 text-[var(--text-muted)]" aria-label="No" />
    );
  }
  return <>{value}</>;
}

/**
 * Mobile-only comparison list. The wide table is hard to read on narrow
 * screens, so each feature becomes one compact row with both values stacked.
 */
function MobileComparison() {
  return (
    <div className="md:hidden rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] overflow-hidden">
      <div className="grid grid-cols-[1fr] divide-y divide-[var(--border-subtle)]">
        {COMPARISONS.map((row) => (
          <div key={row.feature} className="px-4 py-3">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-[13px] font-semibold text-[var(--text-primary)]">
                {row.feature}
              </h3>
              {row.highlight && (
                <span
                  className="size-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
              )}
            </div>

            <dl className="space-y-1.5 text-xs leading-snug">
              <div className="flex gap-3">
                <dt className="w-[72px] shrink-0 font-medium text-[var(--text-primary)]">
                  Gaan
                </dt>
                <dd className="text-[var(--text-primary)] flex items-start min-w-0">
                  <Value value={row.gaan} />
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-[72px] shrink-0 text-[var(--text-muted,var(--text-secondary))]">
                  Streaming
                </dt>
                <dd className="text-[var(--text-secondary)] flex items-start min-w-0">
                  <Value value={row.commercialStreaming} />
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TheDifference() {
  return (
    <Section
      id="difference"
      className="py-10 sm:py-16 lg:py-24 border-t border-[var(--border-subtle)]"
    >
      <Container variant="wide">
        <SectionHeader
          eyebrow="THE DIFFERENCE"
          title="Where Gaan actually differs."
          description="Many people find Gaan while searching for a free Spotify alternative. That is a fair way to describe it: free, no ads, no subscription. Here are the differences that matter, stated precisely."
          align="center"
          className="mb-8 sm:mb-12 lg:mb-16 max-w-2xl mx-auto [&_h2]:text-[1.65rem] sm:[&_h2]:text-4xl [&_h2]:leading-tight [&_p]:text-sm sm:[&_p]:text-base [&_p]:leading-relaxed"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-10">
          <div className="lg:col-span-8 min-w-0">
            {/* Compact list on phones, full table from md up */}
            <MobileComparison />
            <div className="hidden md:block overflow-x-auto">
              <ComparisonTable metrics={COMPARISONS} />
            </div>
          </div>
          <aside className="lg:col-span-4 min-w-0">
            <LimitationCard limitations={HONEST_LIMITATIONS} />
          </aside>
        </div>

        {/* Summary + source link */}
        <Card
          variant="outlined"
          className="p-4 sm:p-6 lg:p-8 bg-[var(--bg-secondary)]/40 border border-[var(--border-default)] flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6"
        >
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="size-9 sm:size-11 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
              <Code2 className="size-4 sm:size-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-sm sm:text-base font-semibold text-[var(--text-primary)]">
                In short
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-secondary)] mt-0.5 max-w-xl">
                Free to use, open source and designed around a local music
                library. Its features and release assets are listed openly on
                GitHub.
              </p>
            </div>
          </div>

          <a
            href="https://github.com/rumman2004/Gaan-Desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="section-action-primary w-full md:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)] transition-opacity shrink-0 inline-flex items-center justify-center gap-2"
          >
            <AnimatedGithub size={16} className="size-4" aria-hidden="true" />
            <span>View source on GitHub</span>
          </a>
        </Card>
      </Container>
    </Section>
  );
}
