import { Check, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import ChevronLink from "@/components/ui/ChevronLink";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { site } from "@/lib/site";

/**
 * The points are deliberately authored as matched pairs — each pain on the left
 * has its answer directly opposite. Copy is kept to roughly one line each so the
 * two columns read across as rows without needing brittle fixed heights.
 */
const pairs: { without: string; with: string }[] = [
  {
    without: "Payroll eats a day of someone's week",
    with: "Payroll run for you, correct and on time",
  },
  {
    without: "HMRC deadlines you hear about late",
    with: "Find competent talent with cultural fit",
  },
  {
    without: "Good candidates gone before you reply",
    with: "Smoother onboarding offboarding",
  },
  {
    without: "Nobody to ask when the rules change",
    with: "A named expert who answers the phone",
  },
];

// NOTE: placeholder metrics — replace with the client's real, verifiable numbers
// before launch. Unverifiable stats undermine the credibility this section exists to build.
type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  /** Makes the whole tile a link out to the public review profile. */
  href?: string;
};

const stats: Stat[] = [
  {
    value: 100,
    suffix: "%",
    label: "Payroll run on 25th of every month",
    // sub: "Every client, without fail",
  },
  {
    value: 97,
    suffix: "%",
    label: "Clients come for additional services",
    // sub: "They come back for more",
  },
  {
    value: 4.4,
    decimals: 1,
    label: "Client rating",
    href: site.trustpilot.reviewUrl,
    // sub: "Rated by real clients"
  },
];

export default function WhatIsRimaya() {
  return (
    <section className="bg-azure-wash py-20 sm:py-24">
      <Container>
        {/* Heading sits full-width above the comparison so the section reads as
            one column of thought — the old side-by-side split left a dead half. */}
        <Reveal className="max-w-3xl">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl lg:text-[2.75rem]">
            We handle the work you shouldn&apos;t have to think about.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            Rimaya is a UK partner for three things every growing business needs
            and few enjoy doing:{" "}
            <strong className="font-semibold text-ink">paying people correctly</strong>,{" "}
            <strong className="font-semibold text-ink">finding the right people</strong>, and{" "}
            <strong className="font-semibold text-ink">knowing what to do next</strong>. You
            don&apos;t buy software and work out the rest yourself — you tell us what you
            need, and a real team does it.
          </p>
          <ChevronLink href="/about" className="mt-7">
            More about how we work
          </ChevronLink>
        </Reveal>

        {/* One bordered object, split down the middle — not two floating cards.
            Each row reads straight across: the pain on the left, its answer
            directly opposite. */}
        <Reveal delay={0.1} className="mt-12">
          <div className="relative grid border border-hairline md:grid-cols-2">
            {/* The seam badge. Sits exactly on the join and names what the two
                halves are doing, so the comparison can't be misread as one long
                list. Desktop only — stacked on mobile there is no seam. */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-hairline bg-white font-heading text-xs font-semibold uppercase tracking-wider text-muted card-shadow md:inline-flex"
            >
              vs
            </span>

            {/* Left: the status quo */}
            <div className="bg-surface p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Doing it alone
              </p>
              <span aria-hidden className="mt-4 block h-px w-10 bg-slate-300" />
              <ul className="mt-8 space-y-5">
                {pairs.map((p) => (
                  <li key={p.without} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-danger/10 text-danger"
                      aria-hidden
                    >
                      <X className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-snug text-muted">{p.without}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: the answer. Solid brand fill — flat and clean, so the
                type on top stays crisp. */}
            <div className="bg-brand p-8 text-white sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                With Rimaya
              </p>
              <span aria-hidden className="mt-4 block h-px w-10 bg-action" />
              <ul className="mt-8 space-y-5">
                {pairs.map((p) => (
                  <li key={p.with} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-signal text-white"
                      aria-hidden
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-white">
                      {p.with}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Proof line */}
        <div className="mt-16 border-t border-hairline pt-12">
          <Stagger
            as="ul"
            className="mx-auto grid max-w-3xl grid-cols-3 gap-x-8 gap-y-10 text-center sm:gap-x-12"
          >
          {stats.map((s) => {
            const figure = (
              <>
                <p className="font-heading text-4xl font-semibold tracking-tight text-brand sm:text-5xl">
                  <Counter
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                  />
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">{s.label}</p>
                {/* <p className="mt-0.5 text-xs text-muted">{s.sub}</p> */}
              </>
            );

            return (
              <StaggerItem as="li" key={s.label}>
                {s.href ? (
                  // The tile itself is the link, with no visible caption, so
                  // the aria-label is the only thing that tells a screen
                  // reader where it goes.
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label}: ${s.value} out of 5 — read our reviews on Trustpilot`}
                    className="block transition-opacity duration-200 hover:opacity-75"
                  >
                    {figure}
                  </a>
                ) : (
                  figure
                )}
              </StaggerItem>
            );
          })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
