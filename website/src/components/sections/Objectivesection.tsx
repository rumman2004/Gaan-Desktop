import { Code2, Eye, FolderHeart, HardDrive, Headphones, ShieldCheck, Target, Users, type LucideIcon } from "@/components/ui/animated-icons";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Card } from "../ui/Card";
import { CARD_BACKGROUNDS } from "../backgrounds/placements";

/*
  Layout
    < 640px    single column, compact horizontal cards (icon left, text right)
    640–1023px two equal columns, vertical cards
    >= 1024px  12-column bento: the first card is featured (6), then 3 / 3, then 4 / 4 / 4
*/

type Reason = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** desktop column span (full class names so Tailwind can see them) */
  span: string;
};

const reasons: Reason[] = [
  { icon: Headphones, title: "Listening without a subscription", body: "The core player is free to use, with no paid tier holding basic playback controls back.", span: "lg:col-span-6" },
  { icon: FolderHeart, title: "Local music belongs here", body: "Bring your own files into a library built around your collection.", span: "lg:col-span-3" },
  { icon: Code2, title: "Open source, in the open", body: "Read the code, report an issue or help shape what comes next.", span: "lg:col-span-3" },
  { icon: HardDrive, title: "Your library, your device", body: "Keep control of local music and the files that make up your collection.", span: "lg:col-span-4" },
  { icon: ShieldCheck, title: "A clear, personal space", body: "A focused interface for listening, organizing and finding your next track.", span: "lg:col-span-4" },
  { icon: Users, title: "Made for listeners", body: "Gaan puts the everyday listening experience ahead of upsells and clutter.", span: "lg:col-span-4" },
];

const statements = [
  {
    icon: Target,
    title: "Our mission",
    body: "To provide a clean, open, lightning-fast and feature-rich music player that anyone can use, customize and truly make their own.",
  },
  {
    icon: Eye,
    title: "Our vision",
    body: "To build an independent, community-driven music platform that stays open-source forever and remains unconditionally user-first.",
  },
];

const tile =
  "grid shrink-0 place-items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]";

export function ObjectiveSection() {
  return (
    <Section id="objective" className="border-b border-[var(--border-subtle)] py-10 sm:py-16 lg:py-24">
      <Container variant="wide">
        <SectionHeader
          eyebrow="WHY GAAN"
          title="Music should feel like yours."
          description="Gaan exists to give listeners a comfortable place for their music, with useful tools and clear control over how they listen."
          className="mb-6 sm:mb-10 lg:mb-14"
        />

        <ul role="list" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-12">
          {reasons.map(({ icon: Icon, title, body, span }, index) => {
            const featured = index === 0;
            return (
              <li key={title} className={span}>
                <Card
                  variant="outlined"
                  backgroundEffect={CARD_BACKGROUNDS.objective[title as keyof typeof CARD_BACKGROUNDS.objective]}
                  className={[
                    "flex h-full gap-3.5 p-4 transition-colors hover:border-[var(--border-default)]",
                    "sm:min-h-44 sm:flex-col sm:justify-between sm:gap-0 sm:p-6 lg:p-7",
                    featured ? "bg-[var(--bg-secondary)] lg:min-h-52" : "",
                  ].join(" ")}
                >
                  <span className={`${tile} size-9 sm:size-10`}>
                    <Icon className="size-[18px] sm:size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 sm:mt-8">
                    <h3
                      className={`mb-1 text-[15px] font-semibold leading-snug tracking-tight sm:mb-2 sm:text-lg ${
                        featured ? "lg:text-xl" : ""
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="max-w-[48ch] text-[13px] leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                      {body}
                    </p>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>

        {/* Mission & vision */}
        <div className="mt-2.5 grid overflow-hidden rounded-2xl border border-[var(--border-subtle)] sm:mt-4 md:grid-cols-2">
          {statements.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`flex gap-3.5 p-4 sm:gap-5 sm:p-7 lg:p-8 ${
                i > 0 ? "border-t border-[var(--border-subtle)] md:border-l md:border-t-0" : ""
              }`}
            >
              <span className={`${tile} size-9 sm:size-10`}>
                <Icon className="size-[18px] sm:size-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="mb-1 text-[15px] font-semibold tracking-tight sm:mb-2 sm:text-lg">{title}</h3>
                <p className="max-w-[56ch] text-[13px] leading-relaxed text-[var(--text-secondary)] sm:text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default ObjectiveSection;
