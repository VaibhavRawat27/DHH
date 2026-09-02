"use client";

import { usePlayer } from "@/components/PlayerProvider";

export function NowPlayingCard() {
  const p = usePlayer();

  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
        {p.isPlaying ? "▶ now spinning" : "Up next"}
      </p>

      <p className="display mt-3 truncate text-2xl text-cream">
        {p.current.title}
      </p>
      <p className="truncate text-muted">{p.current.artist}</p>

      <button
        onClick={() => p.toggle()}
        className="mt-4 w-full rounded-full bg-ember px-4 py-2.5 font-semibold text-[#160a04] transition hover:bg-ember-bright"
      >
        {p.isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
