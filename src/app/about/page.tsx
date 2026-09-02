import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manifesto — DHH",
  description: "What this place is and how the music works.",
};

export default function AboutPage() {
  return (
    <div className="max-w-prose space-y-6">
      <h1 className="display text-4xl text-cream">Manifesto</h1>

      <p className="text-lg text-muted">
        A rooftop at golden hour — boombox on the ledge, flag in the wind, spray
        cans still rattling. You walk in, something&apos;s already playing, and it
        stays playing. The point is that the room never goes quiet.
      </p>

      <div className="space-y-4">
        <Rule n="01" title="The music follows you">
          One YouTube player lives above every page. Browsing the crate, reading
          this, hitting the rooftop — none of it stops the track. Move around all
          you want; the boombox comes with.
        </Rule>
        <Rule n="02" title="Raps only">
          Desi Hip Hop — Mumbai, Delhi, Pune, Bengaluru. Gully rap, boom bap,
          drill, the lot. If it isn&apos;t bars, it isn&apos;t on the wall.
        </Rule>
        <Rule n="03" title="First play is on you">
          Browsers won&apos;t let sound start on its own. Hit play once and the
          rooftop takes it from there for the rest of your visit.
        </Rule>
        <Rule n="04" title="It&apos;s your crate">
          Every track is a YouTube id in{" "}
          <code className="font-mono text-ember">src/lib/tracks.ts</code>. Swap
          them for your own picks — grab the id from any{" "}
          <code className="font-mono text-ember">youtube.com/watch?v=</code> link.
        </Rule>
      </div>
    </div>
  );
}

function Rule({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-ember pl-4">
      <p className="font-mono text-xs text-muted">{n}</p>
      <h2 className="display text-xl text-cream">{title}</h2>
      <p className="mt-1 text-muted">{children}</p>
    </div>
  );
}
