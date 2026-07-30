import { ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type Stat = { value: string; label: string };

/** The green Trustpilot star, inline — lucide has no brand marks (CLAUDE.md §11). */
function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="#00b67a">
      <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
    </svg>
  );
}

/**
 * The navy proof band used under the hero on About and the service pages.
 *
 * One centred row on desktop with hairline dividers between each stat; on
 * smaller screens the stats wrap and centre with no dividers (a divider on a
 * wrapped row reads as a stray line). Values are `whitespace-nowrap` so
 * multi-word figures like "A-rated" never break across two lines — the bug the
 * old per-item grid cell caused.
 *
 * `reviewsLink` (optional) renders a Trustpilot chip centred below the row. It
 * sits under the whole band rather than under one stat on purpose: hanging it
 * off a single figure would make that column taller and knock the big numbers
 * out of their shared baseline.
 */
export default function StatBand({
  stats,
  reviewsLink,
}: {
  stats: Stat[];
  reviewsLink?: { href: string; label: string };
}) {
  return (
    <section className="bg-brand-band py-14 text-white sm:py-16">
      <Container>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-y-8">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className={cn(
                "px-8 text-center sm:px-12",
                i > 0 && "lg:border-l lg:border-white/15",
              )}
            >
              <p className="whitespace-nowrap font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2.5 text-sm text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>

        {reviewsLink && (
          <Reveal delay={0.24} className="mt-9 flex justify-center">
            <a
              href={reviewsLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 border border-white/20 bg-white/[0.06] px-5 py-2.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-colors duration-200 hover:border-white/45 hover:bg-white/10 hover:text-white"
            >
              <TrustpilotStar className="h-4 w-4" />
              {reviewsLink.label}
              <ExternalLink className="h-3.5 w-3.5 opacity-70 transition-opacity group-hover:opacity-100" />
            </a>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
