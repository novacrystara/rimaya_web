import type { Metadata } from "next";
import Image from "next/image";
import raviKalra from "@/public/images/ravi_kalra.webp";
import {
  BadgeCheck,
  ShieldCheck,
  Hash,
  Lock,
  Umbrella,
  Award,
  Scale,
  Timer,
  HeartHandshake,
  PiggyBank,
  MessageCircle,
  Mail,
  User,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import HeroVideo from "@/components/sections/HeroVideo";
import CTASection from "@/components/sections/CTASection";
import StatBand from "@/components/sections/StatBand";
import Testimonials from "@/components/home/Testimonials";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Rimaya is a UK firm delivering payroll, recruitment, and consulting. Established 2022, VAT registered, with an A-rated sponsor licence. Meet the team behind the service.",
};

/**
 * The trust page. Nobody arrives here for entertainment — they arrive to decide
 * whether we're real and whether we're any good. So it leads with verifiable
 * facts (a navy proof band directly under the hero), then earns the claim with
 * the story, then closes on a CTA rather than trailing off.
 */

const proof = [
  { value: site.credentials.established, label: "Trading since" },
  { value: `${site.credentials.rating}★`, label: "Client rating" },
  { value: "A-rated", label: "Sponsor licence" },
];

const credentials = [
  {
    icon: Hash,
    title: site.credentials.companyNo,
    body: "A registered, accountable business in England & Wales you can verify.",
  },
  {
    icon: BadgeCheck,
    title: site.credentials.vat,
    body: "Fully VAT registered and compliant in how we operate.",
  },
  {
    icon: ShieldCheck,
    title: "A-rated sponsor licence",
    body: "We can sponsor Skilled Worker visas — a genuine advantage for employers.",
  },
  {
    icon: Lock,
    title: "ICO registered",
    body: "Registered with the Information Commissioner's Office — your data is handled properly.",
  },
  {
    icon: Umbrella,
    title: "Fully insured",
    body: "Employer's Liability, Professional Indemnity, and Public Liability insurance in place.",
  },
  {
    icon: Award,
    title: "Qualified Chartered Accountants",
    body: "Led by ACA-qualified professionals — real financial expertise behind every engagement.",
  },
];

// Values are the same set as "Reasons to choose us" on the homepage, so the two
// pages tell one consistent story.
const values = [
  {
    icon: Scale,
    title: "Ethical",
    body: "We do right by workers and clients alike — fair treatment and honest advice, every time.",
  },
  {
    icon: ShieldCheck,
    title: "Compliant",
    body: "Careful and correct. Your payroll and hiring stay on the right side of the rules.",
  },
  {
    icon: Timer,
    title: "Quickest turnaround",
    body: "Fast responses and fast delivery — we reply quickly and move at your pace.",
  },
  {
    icon: HeartHandshake,
    title: "Client obsession",
    body: "Clients sit at the heart of everything we do — your outcome drives every decision we make.",
  },
  {
    icon: PiggyBank,
    title: "Cost efficiency",
    body: "Clear value and honest pricing — no bloated fees, no surprises on the invoice.",
  },
];

// NOTE: placeholder team — names only, with an icon stand-in for each headshot.
// Drop each member's real photo into public/images/ and swap the icon tile for
// an <Image> when the photos are available.
const team = ["Ian", "VJ", "Sudha", "Beena", "Params", "Ravi", "Ann", "Ray", "Guy", "Jonah"];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About Rimaya"
        title="A dependable partner for payroll, people, and advice."
        intro="Rimaya was built on a simple idea: growing businesses deserve a partner who handles the essential, behind-the-scenes work accurately and without fuss — so they can get on with what they do best."
        primary={{ label: "Work with us", href: "/contact" }}
        secondary={{ label: "See our services", href: "/#services" }}
        media={
          <HeroVideo
            src="/videos/ravi-intro.mp4"
            poster="/images/ravi-intro-poster.webp"
            label="Meet Ravi Kalra, our Director"
          />
        }
      />

      {/* Proof band — facts before claims. The Trustpilot chip sits under the
          row, tied to the 4.4★ client rating. */}
      <StatBand
        stats={proof}
        reviewsLink={{
          href: site.trustpilot.reviewUrl,
          label: "See our reviews on Trustpilot",
        }}
      />

      {/* Meet the director — the founder's photo leads the introduction, so the
          page opens on a real, named person rather than a faceless company. */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <Reveal>
              <div className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden border border-hairline card-shadow">
                  <Image
                    src={raviKalra}
                    alt="Ravi Kalra, ACA — Director and Founder of Rimaya Ltd"
                    fill
                    placeholder="blur"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-[center_20%]"
                  />
                </div>
                {/* Anchored name plate — reads as a caption on the photo. */}
                <div className="absolute -bottom-5 left-5 border border-hairline bg-brand px-5 py-4 text-white card-shadow sm:left-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                    Director &amp; Founder
                  </p>
                  <p className="mt-1 text-lg font-semibold">Ravi Kalra, ACA</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Meet the director"
                title="A chartered accountant who founded Rimaya to do staffing properly."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/85">
                <p>
                  As a Chartered Accountant and Director of Rimaya Ltd, I bring
                  over 14 years of finance and accounting experience across Big 4
                  (EY), Automotive, Media, and Non-Profit industries. I founded
                  Rimaya Ltd in March 2022 with a clear vision: to provide a
                  staffing service that truly understands the nuances of finance
                  roles and delivers with excellence.
                </p>
                <p>
                  At Rimaya, I go beyond one-off placements — I focus on building
                  long-term partnerships by delivering tailored staffing solutions
                  that empower businesses to build high-performing finance teams.
                  With hands-on industry knowledge and an unwavering commitment to
                  client satisfaction, I provide dedicated support to ensure both
                  clients and candidates achieve their goals. Staffing is more than
                  a service for me — it&apos;s my passion, and a way to strengthen
                  our professional community.
                </p>
              </div>

              {/* Direct line to the founder. Phone is WhatsApp only. */}
              <div className="mt-8 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:flex-wrap sm:gap-x-8">
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm font-medium text-ink transition-colors hover:text-action"
                >
                  <MessageCircle className="h-4 w-4 text-action" aria-hidden />
                  {site.phone}
                  <span className="text-xs font-normal text-muted">(WhatsApp)</span>
                </a>
                <a
                  href="mailto:ravi.kalra@rimaya.co.uk"
                  className="group inline-flex items-center gap-2.5 text-sm font-medium text-ink transition-colors hover:text-action"
                >
                  <Mail className="h-4 w-4 text-action" aria-hidden />
                  ravi.kalra@rimaya.co.uk
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section className="border-y border-hairline bg-soft-blue py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Credentials"
            title="Real proof you can rely on."
            intro="Registered, insured, and qualified — not badges for show, but the reason businesses trust us with something as important as payroll."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((c, i) => (
              <Reveal as="article" key={c.title} delay={i * 0.06}>
                <div className="group relative flex h-full flex-col overflow-hidden border border-hairline bg-white p-7 transition-shadow duration-200 hover:card-shadow-hover">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-action transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                  />
                  <span className="inline-flex h-12 w-12 items-center justify-center bg-brand text-white">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-ink">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Sticky framing — the list scrolls against a fixed statement. */}
            <Reveal>
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Our values</Eyebrow>
                <h2 className="mt-4 text-3xl font-semibold leading-[1.15] text-ink sm:text-4xl">
                  Our values are the reasons to choose us.
                </h2>
                <p className="mt-5 text-base leading-relaxed text-muted">
                  These aren&apos;t words on a wall — they&apos;re how we behave on
                  a bad day, and they&apos;re exactly why clients pick us and stay
                  with us.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="border-t border-hairline">
                {values.map((v, i) => (
                  <li
                    key={v.title}
                    className="group flex items-start gap-5 border-b border-hairline py-6 transition-colors hover:bg-surface"
                  >
                    <span className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center bg-surface-blue text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-semibold text-ink">
                          {v.title}
                        </h3>
                        <span className="text-xs font-semibold tabular-nums text-muted/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {v.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Meet the team — compact name tiles with an icon stand-in for each
          headshot until the real photos land. */}
      <section className="border-t border-hairline bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Meet the team"
            title="The people behind Rimaya."
            intro="A team you actually get to speak to — no call centres, no ticket numbers."
            align="center"
          />
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((name, i) => (
              <Reveal as="article" key={name} delay={Math.min(i, 6) * 0.05}>
                <div className="group flex flex-col items-center gap-3 border border-hairline bg-white p-4 text-center transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover">
                  {/* Icon placeholder — swap for an <Image> when the real photo
                      is available. Square, to match the sharp-corner brand. */}
                  <span className="inline-flex h-14 w-14 items-center justify-center bg-[linear-gradient(135deg,var(--color-surface-blue),#ffffff)] text-brand/45 ring-1 ring-hairline transition-colors duration-300 group-hover:text-brand/70">
                    <User className="h-7 w-7" />
                  </span>
                  <p className="text-sm font-semibold text-ink">{name}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Social proof — the full homepage testimonials block, Trustpilot CTAs
          and all, so both pages present reviews identically. */}
      <Testimonials />

      <CTASection
        eyebrow="Let's work together"
        title="Ready to make the essentials effortless?"
        intro="Whether it's payroll, people, or advice — we'd love to help. Get in touch and see how straightforward it can be."
        primaryLabel="Get in touch"
        primaryHref="/contact"
        secondaryLabel="Browse jobs"
        secondaryHref="/jobs"
      />
    </>
  );
}
