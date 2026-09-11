"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { site } from "@/lib/site";

/**
 * An official Trustpilot TrustBox. This is the one legitimate way to put
 * Trustpilot on the page: the review data lives on Trustpilot, their script
 * renders it live, and we never copy or store any of it (CLAUDE.md §6).
 *
 * One component, any template — the "Review Collector" strip and a reviews
 * Carousel/Grid are the same embed with a different template ID and height,
 * so the section just renders two of these. next/script dedupes the bootstrap
 * by `src`, so two TrustBoxes on a page still load it once.
 *
 * Trustpilot's bootstrap hydrates every `.trustpilot-widget` it finds on load,
 * but on a client-side route change the element can mount *after* the script
 * has already run, so we also ask it to hydrate this element once on mount.
 *
 * The child link is not decoration: it is what renders before the script
 * arrives, for crawlers, and for the visitors whose ad blocker drops
 * widget.trustpilot.com — so it is written to read as the widget it stands in
 * for ("Review us on ★ Trustpilot"), not as a generic fallback.
 */
declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (el: HTMLElement | null, forceReload?: boolean) => void;
    };
  }
}

export default function TrustBox({
  templateId,
  height,
  token,
  theme = "light",
  fallback = "Review us on",
}: {
  templateId: string;
  height: string;
  /** Only the Review Collector template issues one. */
  token?: string;
  theme?: "light" | "dark";
  /** Text before the "★ Trustpilot" mark in the pre-hydration link. */
  fallback?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { businessUnitId, locale, reviewUrl } = site.trustpilot;

  useEffect(() => {
    if (window.Trustpilot) window.Trustpilot.loadFromElement(ref.current, true);
  }, []);

  return (
    <>
      <Script
        src="https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
      />
      <div
        ref={ref}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={templateId}
        data-businessunit-id={businessUnitId}
        data-style-height={height}
        data-style-width="100%"
        data-theme={theme}
        {...(token ? { "data-token": token } : {})}
      >
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 text-base font-medium transition-opacity hover:opacity-80 ${
            theme === "dark" ? "text-white" : "text-ink"
          }`}
        >
          {fallback}
          <TrustpilotMark />
        </a>
      </div>
    </>
  );
}

/**
 * "★ Trustpilot" — the green star plus wordmark, the way Trustpilot renders
 * it. lucide has no brand marks (CLAUDE.md §11), hence the inline path.
 */
export function TrustpilotMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="#00b67a">
        <path d="M12 2l2.9 6.26L21.6 9l-4.8 4.5 1.3 6.5L12 16.9 5.9 20l1.3-6.5L2.4 9l6.7-.74L12 2z" />
      </svg>
      <span className="font-semibold">Trustpilot</span>
    </span>
  );
}
