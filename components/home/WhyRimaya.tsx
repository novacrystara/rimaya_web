import {
  PiggyBank,
  Timer,
  Network,
  SlidersHorizontal,
  Scale,
  Handshake,
  HeartHandshake,
  Eye,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import CardBrackets from "@/components/ui/CardBrackets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

type Reason = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Extra grid classes — widens a tile to build the bento rhythm. */
  span?: string;
  /** Navy accent tile — the anchor of the bento. */
  feature?: boolean;
};

// Order is the hierarchy the client gave. "Integrity First" folds the former
// separate "Ethical" and "Compliant" entries into one value and leads, so it
// takes the navy anchor tile; Cost efficiency closes the set. The reasons that
// aren't in that list are kept commented out rather than deleted — they're
// still good copy if the list is ever widened again.
const reasons: Reason[] = [
  {
    icon: Scale,
    title: "Integrity First",
    body: "Every decision is guided by honesty, fairness, transparency, and strict compliance — earning the trust of clients, candidates, employees, and government authorities.",
    feature: true,
    span: "lg:col-span-2",
  },
  {
    icon: Timer,
    title: "Quickest turnaround",
    body: "Fast responses and fast delivery. We reply quickly and move at your pace.",
    span: "lg:col-span-2",
  },
  {
    icon: HeartHandshake,
    title: "Client obsession",
    body: "Clients sit at the heart of everything we do — your outcome drives every decision we make.",
    span: "lg:col-span-2",
  },
  {
    icon: PiggyBank,
    title: "Cost efficiency",
    body: "Clear value and honest pricing — no bloated fees, no surprises on the invoice. You always know what you're paying for.",
    span: "lg:col-span-2",
  },
  // {
  //   icon: Network,
  //   title: "Extensive network",
  //   body: "A deep, growing pool of vetted candidates and trusted partners across sectors.",
  // },
  // {
  //   icon: SlidersHorizontal,
  //   title: "Flexible terms",
  //   body: "Arrangements that fit how you actually work — scale up or down without friction.",
  // },
  // {
  //   icon: Handshake,
  //   title: "Integrity",
  //   body: "We keep our word. What we promise at the outset is what you get, without the small print.",
  //   span: "lg:col-span-2",
  // },
  // {
  //   icon: Eye,
  //   title: "Transparent",
  //   body: "Clear pricing and open communication — you always know where things stand and why.",
  //   span: "lg:col-span-2",
  // },
];

/**
 * A bento of four reasons on a four-column grid. The navy "Integrity First"
 * anchor carries the top of the client's stated hierarchy, and every tile spans
 * two columns so each row fills exactly — no trailing gaps: (2+2) and (2+2).
 */
export default function WhyRimaya() {
  return (
    <section className="bg-azure-mint py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Why Rimaya"
            title="Reasons to choose us — not just claims."
            intro="Here's what you actually get when you work with Rimaya, and why clients stay with us."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) =>
            r.feature ? (
              <StaggerItem
                key={r.title}
                as="article"
                className={`h-full ${r.span ?? ""}`}
              >
                <div className="group relative flex h-full flex-col justify-between overflow-hidden bg-brand-band p-7 text-white card-shadow">
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-white/10 text-white">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-white">{r.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                      {r.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ) : (
              <StaggerItem
                key={r.title}
                as="article"
                className={`h-full ${r.span ?? ""}`}
              >
                <div className="group relative flex h-full flex-col border border-hairline bg-white p-7 transition-all duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover">
                  <CardBrackets />
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-surface-blue text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <r.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              </StaggerItem>
            )
          )}
        </Stagger>
      </Container>
    </section>
  );
}
