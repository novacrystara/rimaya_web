// Central site configuration. Placeholder contact details are marked TODO —
// swap for the client's real values before launch.

export const site = {
  name: "Rimaya",
  descriptor: "Payroll · Consulting · Talent Sourcing",
  url: "https://rimaya.co.uk", // TODO: confirm final domain
  email: "info@rimaya.co.uk",
  // Mobile — also the WhatsApp line.
  phone: "+44 7448 111418",
  phoneHref: "tel:+447448111418",
  // Landline for the Romford office.
  officePhone: "020 3490 6598",
  officePhoneHref: "tel:+442034906598",
  whatsapp: "447448111418",
  responsePromise: "We reply within 12 hours",
  address: {
    label: "Corporate Office",
    line1: "Rimaya Ltd, Columbine Way",
    line2: "Romford, RM3 0XN, UK",
  },
  credentials: {
    established: "2022",
    // The registered numbers are the company's proof of existence — shown in
    // full in the footer and on the About/Contact credential lists.
    vat: "VAT No: 432146133",
    sponsor: "A-rated sponsor licence",
    companyNo: "Company Registration No: 13972727",
    rating: "4.4",
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/rimaya-ltd/?viewAsMember=true",
    // instagram: "https://www.instagram.com/", // TODO
  },
  trustpilot: {
    // Public review profile — the fallback link inside every TrustBox, and
    // where the 4.4 stat tile on the homepage points.
    reviewUrl: "https://uk.trustpilot.com/review/rimaya.co.uk",
    locale: "en-GB",

    // ── TrustBox credentials ──────────────────────────────────────────────
    // From Trustpilot Business → Integrations → TrustBox → "Get code".
    //
    // These are hard-coded on purpose. They are identifiers, not secrets: a
    // TrustBox works by printing them into the page HTML for every visitor,
    // so view-source exposes them regardless of where they live in the repo.
    // The only Trustpilot credential that must NEVER be here is an API key or
    // API secret from their developer section — that reads and writes account
    // data and belongs in server-only env. A TrustBox snippet never contains
    // one.
    businessUnitId: "64d3b819f282bf16d4fab6ca",

    // "Review Collector" — the 52px "Review us on ★ Trustpilot" strip. It is a
    // call-to-action ONLY; it does not display any reviews.
    collector: {
      templateId: "56278e9abfbbba0bdcd568bc",
      token: "34fac06b-8668-46b0-9d3a-6b5b82acb54e",
      height: "52px",
    },

    // Optional second TrustBox that actually SHOWS reviews — pick Carousel,
    // Grid, Mini, etc. in the TrustBox library and paste its template ID here.
    // While empty, the testimonials section carries only the collector above.
    reviews: {
      templateId: "", // TODO — see CLAUDE.md §6
      height: "500px",
    },
  },
} as const;

export type NavChild = { label: string; href: string; blurb: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const services: NavChild[] = [
  {
    label: "Payroll Solutions",
    href: "/payroll",
    blurb: "Accurate, compliant payroll run for you — every time.",
  },
  {
    label: "Consulting",
    href: "/consulting",
    blurb: "Expert guidance when the decision matters.",
  },
  {
    label: "Talent Sourcing",
    href: "/recruitment",
    blurb: "The right people, placed fast — temporary or permanent.",
  },
  
];

export const primaryNav: NavItem[] = [
  { label: "Services", href: "/#services", children: services },
  { label: "Jobs", href: "/jobs" },
];

export const secondaryNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
