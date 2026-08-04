import type { Metadata } from "next";
import Image from "next/image";
import recruiterHandshake from "@/public/images/recruitment.webp";
import {
  Clock,
  Database,
  Handshake,
  UserCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import PageHero from "@/components/sections/PageHero";
import FeatureCards from "@/components/sections/FeatureCards";
import StatBand from "@/components/sections/StatBand";
import JobCard from "@/components/jobs/JobCard";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Recruitment",
  description:
    "Temporary and permanent recruitment for UK businesses, backed by a live job board and a growing pool of vetted candidates. Hire with Rimaya or browse jobs.",
};

// NOTE: placeholder stats — replace with the client's real numbers.
const stats = [
  { value: "40+", label: "Placements" },
  { value: "35+", label: "Workers on payroll" },
  { value: "24hr", label: "Response time" },
  { value: "1,000+", label: "Profiles in our database" },
];

// Mirrors the Talent Sourcing points shown on the homepage service pillar, so
// the story is consistent between the front page and this deeper page.
const features = [
  {
    icon: Database,
    title: "Robust candidate database",
    body: "A deep, growing pool of vetted candidates across sectors — so the right people are ready the moment you need them.",
  },
  {
    icon: UserCheck,
    title: "Personalised approach",
    body: "We take time to understand your business, your team, and the role, so every candidate we put forward genuinely fits.",
  },
  {
    icon: Handshake,
    title: "End to end support",
    body: "From first brief to first day and beyond — screening, onboarding, and the paperwork in between, all handled.",
  },
  {
    icon: Clock,
    title: "Quick turnaround",
    body: "Fast responses and fast delivery — especially when you need reliable people at short notice.",
  },
];

// The sectors Rimaya recruits into (client-supplied).
const industries = [
  "Pharmaceutical",
  "Hospitality",
  "Not for profit",
  "Banking",
  "Construction",
  "Manufacturing",
];

export default function RecruitmentPage() {
  // Landscape rows, so a deeper list stays scannable instead of turning into a
  // wall of tall cards.
  const featured = jobs.slice(0, 6);

  return (
    <>
      <PageHero
        breadcrumb="Recruitment"
        eyebrow="Recruitment"
        title="The right people, placed fast."
        intro="Temporary or permanent, Rimaya connects growing UK businesses with vetted, ready-to-work talent — and connects candidates with roles that fit."
        primary={{ label: "Hire with us", href: "/contact?intent=hire" }}
        secondary={{ label: "Browse jobs", href: "/jobs" }}
      />

      {/* Stats */}
      <StatBand stats={stats} />

      {/* Why contract & temporary staff matter — the client-supplied article,
          paired with the specialisms we recruit for. */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden border border-hairline card-shadow">
                <Image
                  src={recruiterHandshake}
                  alt="A Rimaya recruiter welcoming a candidate with a handshake in a modern office"
                  fill
                  placeholder="blur"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading
                eyebrow="Why it matters"
                title="Why contract and temporary staff are a smart move."
              />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-ink/85">
                <p>
                  Contract and temporary staff give a business flexibility it
                  can&apos;t get any other way. You scale your team up for a busy
                  period, a project, or a sudden gap — and back down again —
                  without the cost or long-term commitment of permanent
                  headcount. The right temporary hire is productive from day one,
                  covers critical roles the moment they open, and lets you prove
                  a fit before you make it permanent.
                </p>
                <p>
                  We have a team of qualified accountants who specialise in
                  finding the right talent for{" "}
                  <strong className="font-semibold text-ink">Finance</strong>{" "}
                  roles — though we cover other skills too, including{" "}
                  <strong className="font-semibold text-ink">IT</strong>,{" "}
                  <strong className="font-semibold text-ink">
                    Business Development
                  </strong>
                  ,{" "}
                  <strong className="font-semibold text-ink">
                    Project Management
                  </strong>
                  , and <strong className="font-semibold text-ink">Admin</strong>.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <FeatureCards
        eyebrow="What we do"
        title="Recruitment built around your business."
        intro="A practical, relationship-led approach to hiring — for employers who need people they can rely on."
        features={features}
        columns={2}
        tone="surface"
      />

      {/* Industries we serve */}
      <section className="border-y border-hairline bg-soft-blue py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Sectors"
                title="Industries we serve."
                intro="We place people across a broad range of sectors — from regulated, compliance-heavy fields to fast-moving operational teams."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {industries.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-3 border border-hairline bg-white px-5 py-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-action"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-action" aria-hidden />
                    {name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Live jobs teaser */}
      <section className="bg-white py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Live vacancies"
              title="Some of the roles we're hiring for now."
              intro="Candidates can apply online in minutes and upload a CV. New roles are added regularly."
            />
            <Button href="/jobs" variant="secondary" className="shrink-0">
              View all jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 space-y-4">
            {featured.map((job, i) => (
              <Reveal key={job.slug} delay={Math.min(i, 4) * 0.06}>
                <JobCard job={job} layout="landscape" />
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted">
                {`Showing ${featured.length} of ${jobs.length} live roles.`}{" "}
                Nothing that fits? Send your CV and we&apos;ll match you to
                what&apos;s coming.
              </p>
              <Button href="/submit-cv" variant="secondary" className="shrink-0">
                Submit your CV
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Dual CTA */}
      <section className="bg-soft-blue border-y border-hairline py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col border border-hairline bg-white p-8">
                <h3 className="text-2xl font-semibold text-ink">
                  Employers — need talent?
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Tell us the roles you&apos;re filling and we&apos;ll send vetted
                  candidates who match. Temporary, permanent, or both.
                </p>
                <div className="mt-6">
                  <Button href="/contact?intent=hire">Request talent</Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col border border-hairline bg-white p-8">
                <h3 className="text-2xl font-semibold text-ink">
                  Candidates — looking for work?
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  Browse our live vacancies, apply online, and upload your CV.
                  We&apos;ll be in touch about roles that suit you.
                </p>
                <div className="mt-6">
                  <Button href="/jobs">Browse jobs</Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
