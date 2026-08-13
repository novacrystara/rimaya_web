import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";
import TrustpilotWidget from "./TrustpilotWidget";
import TestimonialsCarousel from "./TestimonialsCarousel";

// The section flips to live Trustpilot reviews the moment both IDs are set.
const trustpilotLive = Boolean(
  site.trustpilot.businessUnitId && site.trustpilot.templateId,
);

/** The green Trustpilot star, inline — lucide has no brand marks (CLAUDE.md §11). */
function TrustpilotStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="#00b67a">
      <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
    </svg>
  );
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Social proof"
            title="Trusted by the businesses we work with."
            intro="Real feedback from clients who rely on Rimaya day to day."
            align="center"
          />
        </Reveal>

        {/* Two Trustpilot routes, both above the reviews: read the real profile
            (for anyone who wants proof from a source we don't control), or add
            your own. Both open Trustpilot in a new tab. */}
        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                href={site.trustpilot.reviewUrl}
                variant="secondary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TrustpilotStar className="h-5 w-5" />
                See our reviews on Trustpilot
              </Button>
              <Button
                href={site.trustpilot.writeReviewUrl}
                variant="secondary"
                size="md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TrustpilotStar className="h-5 w-5" />
                Write a review
              </Button>
            </div>
            <p className="text-xs text-muted">
              Every review below is a real, verified review from our Trustpilot
              profile.
            </p>
          </div>
        </Reveal>
      </Container>

      {trustpilotLive ? (
        // Live reviews, updated automatically by Trustpilot.
        <Container>
          <Reveal className="mt-12">
            <TrustpilotWidget />
          </Reveal>
        </Container>
      ) : (
        <Reveal className="mt-12">
          {/* Swipeable rail with edge arrows. Sits in a Container so the cards
              align to the page grid; the rail scrolls within it. */}
          <Container className="relative">
            <TestimonialsCarousel items={testimonials} />
            {/* The arrows are hidden below sm (no room for the gutters), so the
                hint must not promise them there. */}
            <p className="mt-8 text-center text-xs text-muted">
              <span className="sm:hidden">Swipe to see more.</span>
              <span className="hidden sm:inline">
                Swipe, or use the arrows, to see more.
              </span>
            </p>
          </Container>
        </Reveal>
      )}
    </section>
  );
}
