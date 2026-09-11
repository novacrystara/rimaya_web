import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import TrustBox, { TrustpilotMark } from "@/components/ui/TrustBox";
import { site } from "@/lib/site";

const { businessUnitId, collector, reviews, reviewUrl } = site.trustpilot;

// Each TrustBox is gated on its own template ID plus the shared business unit
// ID. An unconfigured TrustBox isn't harmless — the script hydrates the element
// into nothing and hides the fallback link with it — so we don't render one
// until it can actually work.
const collectorLive = Boolean(businessUnitId && collector.templateId);
const reviewsLive = Boolean(businessUnitId && reviews.templateId);

/**
 * Social proof, entirely via official Trustpilot TrustBoxes — nothing here is
 * hand-copied (CLAUDE.md §6).
 *
 * Two slots. The Review Collector is the "Review us on ★ Trustpilot" strip
 * the client was issued: it is a call-to-action and shows no reviews. The
 * second slot is for a template that does show them (Carousel, Grid…) and
 * appears the moment `site.trustpilot.reviews.templateId` is filled in.
 *
 * If a slot's IDs are ever blank, it renders the same "Review us on
 * ★ Trustpilot" line as a plain link instead, so the page never shows a broken
 * or empty widget.
 */
export default function Testimonials() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Social proof"
            title="Trusted by the businesses we work with."
            intro="Our reviews are collected and verified independently by Trustpilot."
            align="center"
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 flex max-w-xl justify-center">
            {collectorLive ? (
              <div className="w-full">
                <TrustBox
                  templateId={collector.templateId}
                  token={collector.token}
                  height={collector.height}
                />
              </div>
            ) : (
              <a
                href={reviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-medium text-ink transition-opacity hover:opacity-80"
              >
                Review us on
                <TrustpilotMark />
              </a>
            )}
          </div>
        </Reveal>

        {reviewsLive && (
          <Reveal delay={0.1} className="mt-12">
            <TrustBox
              templateId={reviews.templateId}
              height={reviews.height}
              fallback="Read our reviews on"
            />
          </Reveal>
        )}
      </Container>
    </section>
  );
}
