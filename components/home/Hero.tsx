import Image from "next/image";
import heroBackdrop from "@/public/images/home_page_background.webp";
import { ArrowRight, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Centred editorial hero.
 *
 * The former right-hand image block is gone. With no art to balance against,
 * a left-aligned column would leave a dead half-page, so the message is centred
 * and given room instead. The credential chips that used to float on the photo
 * aren't lost — TrustStrip sits directly below and already carries all of them.
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-hero-wash">
      {/* 3D showcase artwork. The art clusters at the left and right edges and
          leaves the centre open, which is exactly where the message sits — so
          it frames the headline instead of fighting it. Decorative only.
          `preload`: this is the LCP element (`priority` is deprecated in Next 16).
          Static import so the blur placeholder is generated at build time. */}
      <Image
        src={heroBackdrop}
        alt=""
        aria-hidden
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* White pool through the centre column keeps the headline at full
          contrast while the artwork stays readable out at the edges. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(58%_62%_at_50%_48%,rgba(255,255,255,0.94),rgba(255,255,255,0.55)_72%,transparent_100%)]"
      />

      <Container className="relative py-14 sm:py-16 lg:py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 border border-hairline bg-white/80 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand backdrop-blur-sm">
            {site.descriptor}
          </span>

          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-6xl lg:text-7xl">
            Payroll, sorted.
            <br />
            <span className="text-brand">People, placed.</span>
            <br />
            Business, supported.
          </h1>



          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Rimaya runs accurate, compliant payroll, finds you the right people,
            and advises you when it counts — so you can focus on running your
            business.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* <Button href="/contact?intent=quote" size="lg">
              Get a Payroll Quote
              <ArrowRight className="h-4 w-4" />
            </Button> */}
            {/* <Button href="/jobs" size="lg" variant="secondary">
              View Jobs
            </Button> */}
          </div>

          {/* <p className="mt-6 inline-flex items-center gap-2 text-sm text-muted">
            <Clock className="h-4 w-4 text-action" aria-hidden />
            {site.responsePromise} — from a named person, not a queue.
          </p> */}
        </Reveal>
      </Container>
    </section>
  );
}
