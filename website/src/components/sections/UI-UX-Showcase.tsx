import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { ScreenshotGallery } from "../features/ScreenshotGallery";
import { Layers, MonitorSmartphone, Sparkles } from "@/components/ui/animated-icons";

const FEATURES = [
  { icon: Layers, title: "Clean interface", text: "Minimal, focused and easy to use." },
  { icon: MonitorSmartphone, title: "Multi-platform", text: "A consistent experience across devices." },
  { icon: Sparkles, title: "Thoughtful details", text: "Polished UI with a focus on real listening needs." },
];

export function UIUXShowcase() {
  return (
    <Section id="showcase" className="overflow-x-clip border-t border-[var(--border-subtle)] py-12 sm:py-20 lg:py-28">
      <Container variant="wide">
        <header className="mb-12 grid gap-8 sm:mb-16 lg:grid-cols-[minmax(0,1.1fr)_auto_minmax(0,1.4fr)] lg:items-center lg:gap-10">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-[var(--text-secondary)]">
              <span className="h-px w-8 bg-[var(--text-secondary)]" aria-hidden />
              UI / UX SHOWCASE
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              A closer look at Gaan.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Explore the interface, experience the design, and see how every feature comes together — on desktop and mobile.
            </p>
          </div>

          <div className="hidden h-28 w-px bg-[var(--border-default)] lg:block" aria-hidden />

          <ul className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon className="mb-3 size-7 text-[var(--text-primary)]" strokeWidth={1.5} />
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{text}</p>
              </li>
            ))}
          </ul>
        </header>

        <ScreenshotGallery />
      </Container>
    </Section>
  );
}