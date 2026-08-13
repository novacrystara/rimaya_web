"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * A hero video presented as a premium object: the poster frame shows on load
 * behind a large, floating play button, and one click hands over to the native
 * player — real controls for scrubbing, volume, and fullscreen, which is what
 * people expect and trust for a "watch this" video. When it ends we return to
 * the poster + play button so it reads as replayable rather than spent.
 *
 * Native controls are the deliberate choice over a hand-rolled bar: they are
 * accessible, keyboard-driven, and identical to every other video the visitor
 * has ever used — the professional default, not a bespoke gimmick.
 *
 * Scrolling the video out of view pauses it. A voice talking on from somewhere
 * off-screen is the single most irritating thing a site can do, and the visitor
 * has already moved on. It only ever pauses — never auto-resumes — because
 * sound starting on its own as you scroll back is the same sin in reverse.
 */
export default function HeroVideo({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // "Playback has begun and hasn't finished" — drives the native controls and
  // hides the poster overlay. Deliberately NOT cleared on pause: a pause (by
  // the viewer, or by scrolling away) should leave the player exactly where it
  // is, so scrolling back resumes from the same frame instead of throwing the
  // viewer back to the poster and losing their place.
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !v.paused) v.pause();
      },
      // Fires once less than a third of the player is still on screen — late
      // enough that a small scroll nudge doesn't stop playback mid-sentence.
      { threshold: 0.3 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const start = () => {
    const v = ref.current;
    if (!v) return;
    v.play();
    setEngaged(true);
  };

  return (
    <div className="group relative aspect-video w-full overflow-hidden border border-hairline bg-brand-band card-shadow">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        controls={engaged}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        className="h-full w-full object-cover"
        onPlay={() => setEngaged(true)}
        onEnded={() => setEngaged(false)}
      />

      {!engaged && (
        <button
          type="button"
          onClick={start}
          aria-label={label ?? "Play the introduction video"}
          className="absolute inset-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action"
        >
          {/* Scrim — lifts the button and any caption off the poster. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,42,71,0.15),transparent_35%,rgba(1,42,71,0.55))]"
          />

          {/* The play button. White is the loudest thing on a photo, so it is
              the primary; the soft ping gives it life without motion sickness. */}
          <span className="relative inline-flex h-[72px] w-[72px] items-center justify-center bg-white/95 text-brand shadow-[0_12px_44px_-10px_rgba(0,40,72,0.6)] ring-1 ring-white/60 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:scale-105">
            <span
              aria-hidden
              className="absolute inset-0 animate-ping bg-white/25"
              style={{ animationDuration: "2.6s" }}
            />
            <Play className="relative ml-1 h-8 w-8 fill-current" aria-hidden />
          </span>

          {label && (
            <span className="pointer-events-none absolute inset-x-5 bottom-4 text-left text-sm font-semibold text-white sm:text-base">
              {label}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
