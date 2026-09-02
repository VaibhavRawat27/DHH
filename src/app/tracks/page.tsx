import type { Metadata } from "next";
import { TrackList } from "@/components/TrackList";

export const metadata: Metadata = {
  title: "The Crate — DHH",
  description: "The full running order for the rooftop boombox.",
};

export default function TracksPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="display text-4xl text-cream">The Crate</h1>
        <p className="mt-2 text-sm text-muted">Tap a line to play. ▲ to upvote.</p>
      </header>

      <TrackList />
    </div>
  );
}
