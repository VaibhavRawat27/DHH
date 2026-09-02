"use client";

import { useEffect, useRef, useState } from "react";
import { usePlayer } from "@/components/PlayerProvider";

type Tally = { online: number; listening: number };

function viewerId() {
  try {
    const k = "dhh:viewer";
    let v = sessionStorage.getItem(k);
    if (!v) {
      v =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2);
      sessionStorage.setItem(k, v);
    }
    return v;
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

/**
 * Little "live on the rooftop" pill: how many people have the site open right
 * now, and — the number we lead with — how many of them have the boombox
 * actually playing.
 */
export function LiveCount() {
  const { isPlaying } = usePlayer();
  const [tally, setTally] = useState<Tally | null>(null);

  const idRef = useRef("");
  const playingRef = useRef(isPlaying);
  playingRef.current = isPlaying;

  const push = useRef(async (): Promise<void> => {});
  push.current = async () => {
    try {
      const res = await fetch("/api/live", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: idRef.current,
          listening: playingRef.current,
        }),
        cache: "no-store",
      });
      if (res.ok) setTally(await res.json());
    } catch {
      /* offline / navigating away — next beat will catch up */
    }
  };

  useEffect(() => {
    idRef.current = viewerId();

    push.current();
    const iv = window.setInterval(() => push.current(), 15_000);

    const leave = () => {
      try {
        navigator.sendBeacon(
          "/api/live",
          JSON.stringify({ id: idRef.current, leave: true }),
        );
      } catch {
        /* sendBeacon unsupported — the stale sweep will drop us */
      }
    };
    window.addEventListener("pagehide", leave);

    return () => {
      window.clearInterval(iv);
      window.removeEventListener("pagehide", leave);
    };
  }, []);

  // Flip "listening" the moment playback starts or stops, don't wait for the tick.
  useEffect(() => {
    if (idRef.current) push.current();
  }, [isPlaying]);

  if (!tally) return null;

  return (
    <span
      className="hidden items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[11px] text-muted sm:inline-flex"
      title={`${tally.online} ${
        tally.online === 1 ? "person has" : "people have"
      } the rooftop open right now`}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
      </span>
      <span className="tabular-nums text-cream">{tally.listening}</span>
      <span>listening</span>
    </span>
  );
}
