import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import WhatIsRimaya from "@/components/home/WhatIsRimaya";
import ServicePillars from "@/components/home/ServicePillars";
import HowItWorks from "@/components/home/HowItWorks";
import QuoteBand from "@/components/sections/QuoteBand";
import WhyRimaya from "@/components/home/WhyRimaya";
import CandidateBand from "@/components/home/CandidateBand";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/sections/CTASection";
import { site } from "@/lib/site";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  foundingDate: site.credentials.established,
  description:
    "Rimaya provides payroll, recruitment, and consulting services for UK businesses.",
  address: {
    "@type": "PostalAddress",
    "streetAddress": "Columbine Way",
    addressLocality: "Romford",
    postalCode: "RM3 0XN",
    addressCountry: "GB",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.credentials.rating,
    bestRating: "5",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Homepage spine — the story, in order:
          hook → credibility → what we are → what we sell → how it goes →
          convert (mid-page) → why us → for candidates → proof → objections → convert */}
      <Hero />
      <TrustStrip />
      <WhatIsRimaya />
      <ServicePillars />
      <WhyRimaya />
      {/* <HowItWorks /> */}
      <QuoteBand />

      {/* <CandidateBand /> */}
      <Testimonials />
      {/* <CTASection
        eyebrow="Ready when you are"
        title="Let's take the first step together."
        intro="Whether you need payroll sorted, people placed, or expert advice — tell us what you need and we'll come straight back to you."
        primaryLabel="Get a Quote"
        primaryHref="/contact?intent=quote"
        secondaryLabel="Browse Jobs"
        secondaryHref="/jobs"
      /> */}
    </>
  );
}
