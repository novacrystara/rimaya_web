import Link from "next/link";
import { Mail, Phone, PhoneCall, MapPin, Clock, ShieldCheck, BadgeCheck, CalendarCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { site } from "@/lib/site";

const linkGroups: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Services",
    links: [
      { label: "Payroll Solutions", href: "/payroll" },
      { label: "Consulting", href: "/consulting" },
      { label: "Talent Sourcing", href: "/recruitment" },
      
      // { label: "Get a Quote", href: "/contact?intent=quote" },
    ],
  },
  {
    heading: "Careers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Submit your CV", href: "/submit-cv" },
      // "Common questions" pointed at /contact#faq. The FAQ accordion has since
      // been removed from the contact page, so the anchor no longer exists.
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Rimaya", href: "/about" },
      { label: "How it works", href: "/#services" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const credentials = [
  { icon: CalendarCheck, label: `Established ${site.credentials.established}` },
  { icon: BadgeCheck, label: site.credentials.vat },
  { icon: ShieldCheck, label: site.credentials.sponsor },
];

/** Link with an underline that wipes in from the left on hover. */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group/fl relative inline-block text-sm text-white/70 transition-colors duration-200 hover:text-white"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/60 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/fl:scale-x-100"
      />
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-band text-white">
      {/* Bright accent rule — ties the footer to the action colour and gives the
          band a deliberate top edge instead of just starting. */}
      <div aria-hidden className="h-1 w-full bg-action" />

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,0.8fr)_1.2fr] lg:gap-10">
          {/* Brand */}
          <div className="lg:pr-6">
            {/* ⚠️ The emblem is deep blue on a TRANSPARENT background — dropped
                straight onto the navy band it all but disappears (measured: the
                wordmark inside it sinks into the background entirely). The white
                plaque is what lets the real mark be used here. */}
            <span className="inline-flex bg-white p-3.5">
              <Logo size={92} />
            </span>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/70">
              Accurate, compliant payroll, fast recruitment, and expert
              consulting for growing UK businesses.
            </p>
            {/* <p className="mt-7 inline-flex items-center gap-2 border border-white/25 bg-white/5 px-3.5 py-2.5 text-xs font-semibold text-white/90">
              <Clock className="h-4 w-4 text-action" aria-hidden />
              {site.responsePromise}
            </p> */}
            {/* <ul className="mt-7 space-y-2.5">
              {credentials.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-xs text-white/60">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />
                  {label}
                </li>
              ))}
            </ul> */}
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                {group.heading}
              </h3>
              <span aria-hidden className="mt-3 block h-px w-8 bg-action" />
              <ul className="mt-5 space-y-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Get in touch
            </h3>
            <span aria-hidden className="mt-3 block h-px w-8 bg-action" />
            <p className="mt-5 text-sm font-semibold text-white">
              {site.address.label}
            </p>
            <ul className="mt-4 space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                <span className="leading-relaxed">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
              </li>
              {/* <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
                  {site.phone}
                </a>
              </li> */}
              {/* <li>
                <a
                  href={site.officePhoneHref}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <PhoneCall className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
                  {site.officePhone}
                </a>
              </li> */}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors duration-200 hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-white/40" aria-hidden />
                  {site.email}
                </a>
              </li>
              {/* <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
                <span className="leading-relaxed">
                  Mon–Fri, 9:00–17:30
                  <br />
                  <span className="text-white/50">UK time</span>
                </span>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs leading-relaxed text-white/50">
            <p>
              © {year} {site.name} Ltd. All rights reserved.
            </p>
            {/* The registered numbers are the company's proof of existence —
                shown in full, not abbreviated or buried. */}
            <p className="mt-1 text-white/70">
              {site.credentials.companyNo} · {site.credentials.vat}
            </p>
            <p className="mt-1">
              Registered in England &amp; Wales · {site.descriptor}
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rimaya on LinkedIn"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white/70 transition-colors duration-200 hover:border-white hover:bg-white hover:text-brand"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            {/* <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rimaya on Instagram"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/25 text-white/70 transition-colors duration-200 hover:border-white hover:bg-white hover:text-brand"
            >
              <InstagramIcon className="h-4 w-4" />
            </a> */}
          </div>
        </div>
      </Container>
    </footer>
  );
}
