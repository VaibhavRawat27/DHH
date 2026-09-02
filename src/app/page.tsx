import Link from "next/link";
import { NowPlayingCard } from "@/components/NowPlayingCard";

export default function HomePage() {
  return (
    <section className="hide-on-video flex min-h-[62vh] flex-col justify-center gap-8 md:grid md:grid-cols-[1.2fr_1fr] md:items-center">
      <div>
        <p className="neon mb-4 text-[11px] font-bold uppercase tracking-[0.35em]">
          देसी hip hop
        </p>
        <h1 className="display text-5xl leading-[0.95] text-cream sm:text-6xl">
          The boombox
          <br />
          never stops.
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tracks"
            className="rounded-full bg-ember px-5 py-2.5 font-semibold text-[#160a04] transition hover:bg-ember-bright"
          >
            Open the crate
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-line px-5 py-2.5 font-semibold text-cream transition hover:bg-white/10"
          >
            Manifesto
          </Link>
        </div>
      </div>

      <NowPlayingCard />
    </section>
  );
}
