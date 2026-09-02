import type { Metadata } from "next";
import { TrackList } from "@/components/TrackList";
import { WISHLIST } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "The Crate — DHH",
  description: "The full running order for the rooftop boombox.",
};

const REPO = "https://github.com/VaibhavRawat27/DHH";

export default function TracksPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <header>
          <h1 className="display text-4xl text-cream">The Crate</h1>
          <p className="mt-2 text-sm text-muted">Tap a line to play.</p>
        </header>

        <TrackList />
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="display text-2xl text-cream">On the shortlist</h2>
          <p className="mt-2 text-sm text-muted">
            Tracks that belong up here but still need a verified YouTube link.{" "}
            <a
              href={`${REPO}/blob/main/CONTRIBUTING.md`}
              target="_blank"
              rel="noreferrer"
              className="text-ember underline underline-offset-2 hover:text-ember-bright"
            >
              Send a PR
            </a>{" "}
            with the id and it moves into the crate.
          </p>
        </header>

        <ul className="divide-y divide-line border-y border-line">
          {WISHLIST.map((t) => (
            <li
              key={`${t.artist}-${t.title}`}
              className="flex items-baseline justify-between gap-4 px-3 py-3"
            >
              <span className="min-w-0">
                <span className="display block truncate text-cream">
                  {t.title}
                  {t.note && (
                    <span className="ml-2 align-middle text-[10px] tracking-wide text-muted">
                      {t.note}
                    </span>
                  )}
                </span>
                <span className="block truncate text-sm text-muted">
                  {t.artist}
                </span>
              </span>
              <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted">
                {[t.city, t.year].filter(Boolean).join(" · ")}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted/70">
          Know a rap that isn&apos;t here at all?{" "}
          <a
            href={`${REPO}/issues/new?labels=track&title=Track%3A%20`}
            target="_blank"
            rel="noreferrer"
            className="text-ember underline underline-offset-2 hover:text-ember-bright"
          >
            Open an issue
          </a>
          .
        </p>
      </section>
    </div>
  );
}
