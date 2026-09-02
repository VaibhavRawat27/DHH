"use client";

import { usePlayer } from "@/components/PlayerProvider";

export function TrackList() {
  const p = usePlayer();

  return (
    <ol className="divide-y divide-line border-y border-line">
      {p.tracks.map((track, i) => {
        const isCurrent = i === p.index;
        const isBroken = p.broken.has(track.id);
        return (
          <li
            key={track.id}
            className={`flex items-center gap-3 px-3 py-3 transition ${
              isCurrent ? "bg-white/8" : "hover:bg-white/5"
            }`}
          >
            <button
              onClick={() => p.play(i)}
              className="group flex min-w-0 flex-1 items-center gap-4 text-left"
            >
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-sm ${
                  isCurrent
                    ? "border-ember text-ember"
                    : "border-line text-muted group-hover:border-ember group-hover:text-ember"
                }`}
              >
                {isCurrent && p.isPlaying ? "❚❚" : "▶"}
              </span>

              <span className="w-7 shrink-0 text-right font-mono text-xs text-muted">
                {track.id}
              </span>

              <span className="min-w-0 flex-1">
                <span className="display block truncate text-cream">
                  {track.title}
                  {isBroken && (
                    <span className="ml-2 align-middle text-[10px] tracking-wide text-ember">
                      (unavailable)
                    </span>
                  )}
                </span>
                <span className="block truncate text-sm text-muted">
                  {track.artist}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
