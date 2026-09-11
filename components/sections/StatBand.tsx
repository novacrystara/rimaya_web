import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type Stat = { value: string; label: string };

/**
 * The navy proof band used under the hero on About and the service pages.
 *
 * One centred row on desktop with hairline dividers between each stat; on
 * smaller screens the stats wrap and centre with no dividers (a divider on a
 * wrapped row reads as a stray line). Values are `whitespace-nowrap` so
 * multi-word figures like "A-rated" never break across two lines — the bug the
 * old per-item grid cell caused.
 */
export default function StatBand({ stats }: { stats: Stat[] }) {
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
      </Container>
    </section>
  );
}
