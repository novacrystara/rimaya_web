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
    // Public review profile and the "leave a review" flow. These work today —
    // the evaluate URL is what the "Write a review" button points at.
    reviewUrl: "https://uk.trustpilot.com/review/rimaya.co.uk",
    writeReviewUrl: "https://uk.trustpilot.com/evaluate/rimaya.co.uk",
    // ⚠️ Fill BOTH to switch the testimonials section over to LIVE Trustpilot
    // reviews that update automatically as people post them. Get them from a
    // Trustpilot Business account (Integrations → TrustBox):
    //   businessUnitId — Business Unit ID for rimaya.co.uk
    //   templateId     — the TrustBox template you pick (e.g. Carousel/Grid)
    // While either is empty the section shows the curated testimonials below.
    businessUnitId: "", // TODO
    templateId: "", // TODO
    // Locale + the on-widget height. Safe defaults; adjust to the template.
    locale: "en-GB",
    widgetHeight: "500px",
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
