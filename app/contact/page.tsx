import type { Metadata } from "next";
import { Suspense } from "react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Rimaya for payroll, recruitment, or consulting. Tell us what you need and a named person replies personally, not a ticket queue.",
};

/**
 * The page most visitors judge us on, and the last step before a lead exists.
 *
 * Pared back at the client's request: the enquiry-routing cards, the office
 * panel, the LinkedIn strip, and the FAQ accordion are all gone, so the page is
 * now hero → one form. That leaves the form carrying the whole conversion on
 * its own — anything added back should earn its place beside it.
 */

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact"
        title="Let's talk."
        intro="Tell us what you need — payroll, people, or advice — and we'll come straight back to you with a real answer. No jargon, no pressure, no sales calls."
      />

      {/* Form. The enquiry cards, office sidebar, LinkedIn strip, and FAQ were
          all removed at the client's request, so the form runs on its own —
          capped rather than full-bleed, because a form field wider than ~50rem
          is harder to read, not easier. */}
      <section className="border-y border-hairline bg-soft-blue py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-3xl">
            <div className="border border-hairline bg-white p-6 card-shadow sm:p-9">
              <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
                Contact Us
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Only your name, email, and a message are required — the rest
                just helps us come back with a straight answer first time.
              </p>
              <div className="mt-8">
                <Suspense fallback={<div className="h-[32rem]" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
