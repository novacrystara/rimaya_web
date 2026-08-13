"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

export type { Testimonial };

// Gap between cards, in px — kept here because the arrow step needs the exact
// value and Tailwind's `gap-6` is 1.5rem = 24px.
const GAP = 24;

/** Trustpilot green. The star is the platform's mark, not a brand accent. */
const TRUSTPILOT_GREEN = "#00b67a";

// Cycled by card index so a rail of initial tiles has some variety without ever
// being random — a random tone would differ between server and client render.
const AVATAR_TONES = ["bg-brand", "bg-action", "bg-[#00427a]", "bg-[#0b6fb8]"];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * Formats `YYYY-MM-DD` by hand rather than via Date/Intl. Parsing an ISO date
 * into a Date object applies the runtime's timezone, which can render a
 * different day on the server than in the browser — a hydration mismatch on a
 * string nobody would think to suspect.
 */
function formatReviewDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/**
 * First and last initial — "Sunil Kumar Veeravalli" → "SV". Mononyms give a
 * single letter, which is what the review portals do too.
 */
function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  const first = parts[0][0];
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

/** One rating star, drawn as Trustpilot does it: a filled square, white glyph. */
function RatingStar({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden
      className="inline-flex h-5 w-5 items-center justify-center"
      style={{ backgroundColor: filled ? TRUSTPILOT_GREEN : "#dbe0e6" }}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#ffffff">
        <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
      </svg>
    </span>
  );
}

/**
 * A review card in Trustpilot's information order — who, then how many stars,
 * then what they said, then when. That order is deliberate: the identity and
 * the rating are what a skimming reader takes in, and the date is the thing
 * that makes it credible rather than the thing that sells.
 *
 * Long reviews do NOT grow the card. The body is a fixed-height window: it
 * clips when collapsed, and "Read more" turns the same window into a scroll
 * area. Every card in the rail therefore stays exactly the same height whether
 * a review is one line or three hundred words, which is the whole reason the
 * rail reads as tidy instead of ragged.
 *
 * The avatar is a square, not a circle: `globals.css` enforces
 * `* { border-radius: 0 }` brand-wide, and a lone circle here would be the only
 * curved edge on the site.
 */
function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const rating = t.rating ?? 5;
  const bodyRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  // Measured after paint, not during render: whether the text overflows depends
  // on the resolved font, which the server cannot know. Starting at `false`
  // keeps the server and first client render identical, and the toggle appears
  // a frame later on the cards that actually need it.
  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => {
      // Only meaningful while collapsed — once scrollable, clientHeight is the
      // window and scrollHeight is the full text by definition.
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded]);

  // Collapsing should also rewind the scroll, or reopening starts mid-sentence.
  const toggle = () => {
    setExpanded((v) => {
      if (v && bodyRef.current) bodyRef.current.scrollTop = 0;
      return !v;
    });
  };

  return (
    <figure
      data-card
      // Wide enough that a few cards always overrun the rail, so there's a real
      // next card to reach for (and a sliver of it peeks in to advertise that).
      // 86vw on mobile shows one card plus that peek.
      className="flex w-[86vw] max-w-[27rem] shrink-0 snap-start flex-col border border-hairline bg-white p-7 transition-shadow duration-300 ease-[var(--ease-out-soft)] hover:card-shadow-hover sm:w-[27rem]"
    >
      {/* Who */}
      <div className="flex items-center gap-3.5">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt=""
            width={73}
            height={73}
            className="h-11 w-11 shrink-0 object-cover"
          />
        ) : (
          <span
            aria-hidden
            className={`inline-flex h-11 w-11 shrink-0 items-center justify-center font-heading text-sm font-semibold tracking-wide text-white ${
              AVATAR_TONES[index % AVATAR_TONES.length]
            }`}
          >
            {initialsOf(t.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{t.name}</p>
          {(t.country || t.reviewCount) && (
            <p className="truncate text-xs text-muted">
              {[
                t.country,
                t.reviewCount
                  ? `${t.reviewCount} ${t.reviewCount === 1 ? "review" : "reviews"}`
                  : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </p>
          )}
        </div>
      </div>

      {/* How many stars */}
      <div
        className="mt-5 flex gap-1"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }).map((_, s) => (
          <RatingStar key={s} filled={s < rating} />
        ))}
      </div>

      {/* What they said. Fixed-height window — see the component note. */}
      {t.title && (
        <h3 className="mt-4 line-clamp-2 text-base font-semibold leading-snug text-ink">
          {t.title}
        </h3>
      )}
      <div
        ref={bodyRef}
        // `leading-6` (24px) against `h-[7.5rem]` (120px) is exactly five lines,
        // so the collapsed text never cuts a line in half at the fold — the
        // difference between "clipped" and "deliberately truncated".
        // `overscroll-contain` stops a flick at the bottom of an expanded review
        // from carrying on and scrolling the page behind it.
        className={`mt-3 h-[7.5rem] text-sm leading-6 text-ink/85 ${
          expanded
            ? "overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin]"
            : "overflow-hidden"
        }`}
      >
        <blockquote>{t.quote}</blockquote>
      </div>

      {/* Reserve the toggle's row on every card, so cards whose review happens
          to fit don't sit a line shorter than the ones beside them. */}
      <div className="mt-2 h-6">
        {(overflows || expanded) && (
          <button
            type="button"
            onClick={toggle}
            aria-expanded={expanded}
            className="cursor-pointer text-xs font-semibold text-action underline-offset-4 transition-colors hover:text-action-hover hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* When — and where it came from. */}
      {(t.date || t.source) && (
        <figcaption className="mt-auto flex items-center justify-between gap-3 border-t border-hairline pt-4">
          {t.date ? (
            <time dateTime={t.date} className="text-xs text-muted">
              Reviewed {formatReviewDate(t.date)}
            </time>
          ) : (
            <span />
          )}
          {t.source === "trustpilot" && (
            <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill={TRUSTPILOT_GREEN}
                aria-hidden
              >
                <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
              </svg>
              Trustpilot
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

function ArrowButton({
  side,
  enabled,
  onClick,
}: {
  side: "left" | "right";
  enabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!enabled}
      aria-label={side === "left" ? "Previous testimonials" : "Next testimonials"}
      className={cnArrow(side, enabled)}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

// Pinned to the outer gutters, NOT floated over the cards — an arrow sitting on
// top of a review covers the rating or a line of the quote, which is the one
// overlap that actually costs something. Greyed and non-interactive at the end
// of travel so the pair reads as a carousel without ever lying about what it does.
function cnArrow(side: "left" | "right", enabled: boolean) {
  return [
    "absolute top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center",
    "h-11 w-11 border bg-white sm:flex",
    "shadow-[0_8px_24px_-8px_rgba(0,40,72,0.35)] transition-all duration-200",
    side === "left" ? "left-0" : "right-0",
    enabled
      ? "cursor-pointer border-hairline text-brand hover:border-brand hover:bg-brand hover:text-white"
      : "cursor-not-allowed border-hairline/60 text-muted/40",
  ].join(" ");
}

/**
 * Swipeable testimonial rail. Native horizontal scroll gives touch + trackpad
 * swipe and scroll-snap for free; the arrows drive the same scroll for mouse
 * and keyboard users.
 *
 * The outer element carries horizontal padding on sm+ purely to open a gutter
 * for the arrows; the rail lives inside that padding, so the two never overlap.
 * Below sm there is no room for gutters, the arrows are hidden, and swiping is
 * the interaction — which is what a touch user reaches for anyway.
 */
export default function TestimonialsCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    // Recompute when the rail resizes (breakpoint change, font swap, etc.).
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + GAP : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  return (
    <div className="relative sm:px-14">
      <ArrowButton side="left" enabled={canPrev} onClick={() => step(-1)} />
      <ArrowButton side="right" enabled={canNext} onClick={() => step(1)} />

      <div className="relative">
        {/* Edge fades: a partial card at the boundary reads as intentional, and
            the fade points to the hidden content. Shown only when scrollable. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-[5] w-12 bg-gradient-to-r from-white to-transparent transition-opacity duration-200 ${
            canPrev ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-[5] w-12 bg-gradient-to-l from-white to-transparent transition-opacity duration-200 ${
            canNext ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          ref={trackRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          // No horizontal padding: it would inflate scrollWidth and fake an
          // overflow when the cards actually fit. Vertical padding only, so the
          // card shadows and the focus ring aren't clipped. Scrollbar hidden
          // across engines; swipe/scroll still work.
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-2 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
