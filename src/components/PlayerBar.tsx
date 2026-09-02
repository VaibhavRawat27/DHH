"use client";

import { usePlayer } from "@/components/PlayerProvider";
import { VoteButton } from "@/components/VoteButton";

function Equalizer({ active }: { active: boolean }) {
  return (
    <span className="flex h-5 items-end gap-[3px]" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom bg-ember"
          style={{
            height: "100%",
            animation: active
              ? `eq-bar 900ms ease-in-out ${i * 120}ms infinite`
              : "none",
            transform: active ? undefined : "scaleY(0.3)",
          }}
        />
      ))}
    </span>
  );
}

export function PlayerBar() {
  const p = usePlayer();
  const isBroken = p.broken.has(p.current.id);

  return (
    <div className="sticky bottom-0 z-40 border-t border-line bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:gap-4">
        {/* Spinning record */}
        <div className="relative hidden h-11 w-11 shrink-0 sm:block">
          <div
            className={`h-11 w-11 rounded-full bg-[radial-gradient(circle,#0a0a0a_0_17%,#2b2320_17%_44%,#0a0a0a_44%_48%,#2b2320_48%_100%)] ${
              p.isPlaying ? "spin-slow" : ""
            }`}
          />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" />
        </div>

        {/* Transport */}
        <div className="flex items-center gap-1">
          <button
            onClick={p.prev}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-cream"
            aria-label="Previous track"
          >
            ⏮
          </button>
          <button
            onClick={p.toggle}
            className="grid h-11 w-11 place-items-center rounded-full bg-ember text-lg text-[#160a04] shadow-lg shadow-ember/25 transition hover:bg-ember-bright"
            aria-label={p.isPlaying ? "Pause" : "Play"}
          >
            {p.isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            onClick={p.next}
            className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-white/10 hover:text-cream"
            aria-label="Next track"
          >
            ⏭
          </button>
        </div>

        {/* Now playing + scrubber */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm">
              <span className="display text-cream">{p.current.title}</span>
              <span className="text-muted"> — {p.current.artist}</span>
              {isBroken && (
                <span className="ml-2 rounded bg-ember/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ember">
                  skipped
                </span>
              )}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <div className="hidden sm:block">
                <Equalizer active={p.isPlaying} />
              </div>
              <VoteButton id={p.current.id} size="sm" />
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              p.seek((e.clientX - rect.left) / rect.width);
            }}
            className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-white/12"
            aria-label="Seek"
          >
            <span
              className="block h-full bg-ember"
              style={{ width: `${Math.round(p.progress * 100)}%` }}
            />
          </button>
        </div>

        {/* Volume + video toggle */}
        <div className="flex items-center gap-3">
          <label className="hidden items-center gap-2 text-muted md:flex">
            <span aria-hidden>🔊</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={p.volume}
              onChange={(e) => p.setVolume(Number(e.target.value))}
              className="h-1 w-20 accent-ember"
              aria-label="Volume"
            />
          </label>
          <button
            onClick={() => p.setVideoOpen(!p.videoOpen)}
            aria-pressed={p.videoOpen}
            title={p.videoOpen ? "Back to the still backdrop" : "Play video as the backdrop"}
            className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-widest transition ${
              p.videoOpen
                ? "border-ember bg-ember/10 text-ember"
                : "border-line text-muted hover:text-cream"
            }`}
          >
            {p.videoOpen ? "video ●" : "video"}
          </button>
        </div>
      </div>

      {!p.started && (
        <div className="border-t border-line bg-base/70 px-4 py-2 text-center text-xs text-muted">
          Boombox is loaded —{" "}
          <button
            onClick={() => p.play()}
            className="font-semibold text-ember underline underline-offset-2"
          >
            hit play
          </button>{" "}
          and it rides with you across every page.
        </div>
      )}
    </div>
  );
}
