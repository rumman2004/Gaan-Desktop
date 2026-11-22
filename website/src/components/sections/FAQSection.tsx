import { useMemo, useState } from "react";
import { Section } from "../shared/Section";
import { Container } from "../shared/Container";
import { SectionHeader } from "../shared/SectionHeader";
import { Card } from "../ui/Card";
import OptionWheel from "../ui/OptionWheel";
import { FAQS } from "../../data/faqs";
import { ExternalLink } from "@/components/ui/animated-icons";
import { MessageSquareIcon as AnimatedMessageSquare } from "../ui/message-square";

function renderAnswer(answer: string) {
  const parts = answer.split(/(\[[^\]]+\]\(https?:\/\/[^)\s]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return (
        <a key={index} href={link[2]} target="_blank" rel="noreferrer" className="faq-answer-link">
          {link[1]} <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return <code key={index} className="faq-inline-code">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

export function FAQSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentFaq = FAQS[selectedIndex] ?? FAQS[0];
  const questions = useMemo(
    () => FAQS.map((faq) => faq.question.length > 38 ? `${faq.question.slice(0, 35).trimEnd()}…` : faq.question),
    []
  );

  return (
    <Section id="faq" className="faq-section border-t border-[var(--border-subtle)] py-12 sm:py-20 lg:py-28">
      <Container variant="wide">
        <SectionHeader
          eyebrow="NEED HELP?"
          title="Frequently Asked Questions."
          description="Find clear answers about the player, its features, installation and more."
          align="center"
          className="mb-10 sm:mb-14"
        />

        {currentFaq && (
          <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8">
            <Card variant="outlined" className="faq-wheel-card flex min-h-[330px] flex-col justify-center p-3 sm:min-h-[430px] sm:p-6">
              <div className="mb-2 flex items-center justify-between gap-3 px-3 sm:px-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Questions</p>
                <span className="text-xs tabular-nums text-[var(--text-muted)]">{selectedIndex + 1} / {FAQS.length}</span>
              </div>
              <OptionWheel
                items={questions}
                defaultSelected={0}
                onChange={(index) => setSelectedIndex(index)}
                textColor="var(--text-muted)"
                activeColor="var(--text-primary)"
                side="left"
                fontSize={1.05}
                spacing={2.15}
                curve={0.85}
                tilt={5}
                blur={1.1}
                fade={0.22}
                minOpacity={0.12}
                smoothing={240}
                inset={24}
                loop={false}
                draggable
                className="h-[270px] sm:h-[340px]"
                aria-label="Browse frequently asked questions"
              />
              <p className="mt-1 px-3 text-xs text-[var(--text-muted)] sm:px-4">Scroll, drag, or use the arrow keys to browse.</p>
            </Card>

            <Card
              variant="outlined"
              aria-live="polite"
              aria-atomic="true"
              className="faq-answer-card flex min-h-[330px] flex-col justify-center p-5 sm:min-h-[430px] sm:p-8 lg:p-10"
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Answer</p>
              <h3 className="mb-5 text-xl font-semibold leading-snug tracking-tight text-[var(--text-primary)] sm:text-2xl">
                {currentFaq.question}
              </h3>
              <div className="faq-answer-copy text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {renderAnswer(currentFaq.answer)}
              </div>
            </Card>
          </div>
        )}

        <Card
          variant="outlined"
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)]/60 p-4 sm:mt-12 sm:flex-row sm:gap-6 sm:rounded-2xl sm:p-8 lg:p-10"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] text-[var(--text-primary)]">
              <AnimatedMessageSquare size={24} className="size-6" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[var(--text-primary)]">Still have a question?</h4>
              <p className="mt-0.5 text-xs text-[var(--text-secondary)] sm:text-sm">
                Open an issue to ask a question, request a feature, or report a problem.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-wrap items-center justify-center gap-2 sm:gap-3">
            <a
              href="https://github.com/rumman2004/Gaan-Desktop/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="section-action-secondary inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors hover:bg-[var(--bg-secondary)] sm:text-sm"
            >
              <span>Open an Issue</span> <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/rumman2004/Gaan-Desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="section-action-primary inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90 sm:text-sm"
            >
              <span>View Source</span> <ExternalLink className="size-3.5" aria-hidden="true" />
            </a>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
