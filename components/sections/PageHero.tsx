import Link from "next/link";
import Image from "next/image";
import backgroundTexture from "@/public/images/background_texture.webp";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export default function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumb,
  primary,
  secondary,
  media,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  breadcrumb: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  // Optional right-hand slot (e.g. a video). When present the hero splits into
  // two columns so the text keeps the left and nothing overlaps it; on mobile
  // the media stacks under the copy.
  media?: React.ReactNode;
}) {
  // The copy block, authored once so the single- and two-column layouts share
  // exactly the same text. In two-column mode its widths are capped so it never
  // spills toward the media.
  const copy = (
    <div className={media ? "max-w-xl" : undefined}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
      </Reveal>
      <Reveal delay={0.16}>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {intro}
        </p>
      </Reveal>

      {(primary || secondary) && (
        <Reveal delay={0.24} className="mt-8 flex flex-col gap-3 sm:flex-row">
          {primary && (
            <Button href={primary.href} size="lg">
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </Button>
          )}
        </Reveal>
      )}
    </div>
  );

  return (
    <section className="relative isolate overflow-hidden bg-hero-wash border-b border-hairline">
      {/* Soft blue texture wash. Above the fold on every page it appears, so it
          loads eagerly — lazy-loading a full-bleed backdrop pops in visibly. */}
      <Image
        src={backgroundTexture}
        alt=""
        aria-hidden
        fill
        preload
        sizes="100vw"
        className="-z-10 object-cover opacity-70"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/70 to-transparent"
      />
      <Container className="relative py-14 sm:py-20">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
          <Link href="/" className="hover:text-action">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-ink">{breadcrumb}</span>
        </nav>

        {media ? (
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {copy}
            <Reveal delay={0.2} className="w-full">
              {media}
            </Reveal>
          </div>
        ) : (
          copy
        )}
      </Container>
    </section>
  );
}
