import Image from "next/image";
import showcaseBackdrop from "@/public/images/hero_image_back.webp";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import ChevronLink from "@/components/ui/ChevronLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Pillar = {
  icon: string;
  name: string;
  tag?: string;
  blurb: string;
  points: string[];
  href: string;
  cta: string;
};

// NOTE: the capability bullets below are client-supplied. Consulting in
// particular is still unconfirmed scope (see CLAUDE.md §10) — get these signed
// off before launch.
const pillars: Pillar[] = [
  {
    icon: "/images/payroll_icon.webp",
    name: "Payroll Solutions",
    // tag: "Flagship",
    blurb:
      "End-to-end managed payroll for UK employers — accurate, compliant, and on time. From processing to HMRC filings, we run it so you don't have to.",
    points: [
      "Timely Payroll Processing",
      "HMRC & Immigration compliances",
      "Tax efficient package",
      "Flexible payment terms with clients",
    ],
    href: "/payroll",
    cta: "Explore Payroll",
  },
  {
    icon: "/images/consultation_icon.webp",
    name: "Consulting",
    blurb:
      "Strategic advisory to help you tighten operations and grow with confidence. Practical guidance for when the decision matters.",
    points: [
      "Finance Consulting",
      "Tech / AI Consulting",
      "People & HR Advisory",
      "Accounting Support",
    ],
    href: "/consulting",
    cta: "Discover Consulting",
  },
  {
    icon: "/images/recruitment_icon.webp",
    name: "Talent Sourcing",
    blurb:
      "Hire the right people faster — temporary or permanent. Backed by a live job board and a growing pool of vetted candidates.",
    points: [
      "Robust candidate database",
      "Personalised approach",
      "End to end support",
      "Quick turnaround"
    ],
    href: "/recruitment",
    cta: "Explore Talent",
  },
  
];

/**
 * The routing decision of the whole site: a visitor picks the service that is
 * theirs and goes deeper. All three cards share one blue treatment, so Payroll's
 * flagship status is carried by the badge and its longer capability list rather
 * than by a different colour.
 */
export default function ServicePillars() {
  return (
    <section
      id="services"
      // No bottom border: the scrim fades to white and hands off to How It
      // Works with no visible join.
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-hairline py-20 sm:py-28"
    >
      {/* 3D showcase artwork + scrim. Decorative only. Below the fold, so it
          stays lazy and blurs up rather than landing as a blank band. */}
      <Image
        src={showcaseBackdrop}
        alt=""
        aria-hidden
        fill
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-showcase-scrim" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Three services. One dependable partner."
            intro="We always look for long term relationships & sustainable solutions"
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
          {pillars.map((p) => (
            <StaggerItem as="article" key={p.name}>
              <PillarCard pillar={p} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col items-start gap-4 border border-hairline bg-white/80 px-6 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-muted">
              <span className="font-semibold text-ink">Not sure where to start?</span>{" "}
              Tell us what you need and we&apos;ll point you to the right service.
            </p>
            <ChevronLink href="/contact?intent=quote" className="shrink-0">
              Talk to us
            </ChevronLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PillarCard({ pillar: p }: { pillar: Pillar }) {
  return (
    <div className="group card-beam relative flex h-full flex-col overflow-hidden border border-white/20 bg-brand-band p-8 text-white transition-shadow duration-300 ease-[var(--ease-out-soft)] card-shadow hover:card-shadow-hover">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center bg-white/10 ring-1 ring-white/25 transition-colors duration-300 group-hover:bg-white/20">
          {/* Source icons are solid black artwork — knocked to pure white so
              they read on the navy card. */}
          <Image
            src={p.icon}
            alt=""
            aria-hidden
            width={28}
            height={28}
            className="h-7 w-7 brightness-0 invert"
          />
        </span>

        {p.tag && (
          <span className="border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            {p.tag}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-2xl font-semibold text-white">{p.name}</h3>
      {/* The blurb is the flexible element, not a spacer at the foot of the
          card. Blurbs differ in length (Payroll runs a line longer), so letting
          this one box absorb the difference bottom-anchors everything below it —
          the divider, the checklist, and the CTA line up across all three
          cards instead of drifting with the copy. */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">{p.blurb}</p>

      <div aria-hidden className="mt-7 h-px bg-white/15" />

      <ul className="mt-6 space-y-3">
        {p.points.map((pt) => (
          <li
            key={pt}
            className="flex items-start gap-3 text-sm leading-snug text-white/90"
          >
            <span
              className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center bg-signal text-white"
              aria-hidden
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {pt}
          </li>
        ))}
      </ul>

      {/* Hovering anywhere on the card flips the CTA from a ghost outline to a
          solid white bar with brand-blue text — the card announces where the
          click goes. Colour only: the box is already at its final size, so
          nothing reflows. */}
      <Link
        href={p.href}
        className="mt-8 inline-flex items-center justify-between gap-2 border border-white/30 px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 ease-[var(--ease-out-soft)] group-hover:border-white group-hover:bg-white group-hover:text-brand"
      >
        {p.cta}
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
          aria-hidden
        />
      </Link>
    </div>
  );
}
