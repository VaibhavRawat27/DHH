"use client";

import { usePlayer } from "@/components/PlayerProvider";

export function VoteButton({
  id,
  size = "md",
}: {
  id: string;
  size?: "sm" | "md";
}) {
  const p = usePlayer();
  const voted = p.hasVoted(id);
  const count = p.votes[id] ?? 0;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        p.toggleVote(id);
      }}
      aria-pressed={voted}
      aria-label={voted ? "Remove upvote" : "Upvote this track"}
      title={voted ? "Remove upvote" : "Upvote"}
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border tabular-nums transition ${
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"
      } ${
        voted
          ? "border-ember bg-ember/10 text-ember"
          : "border-line text-muted hover:border-cream/40 hover:text-cream"
      }`}
    >
      <span aria-hidden className={voted ? "" : "opacity-70"}>
        ▲
      </span>
      <span>{count}</span>
    </button>
  );
}
