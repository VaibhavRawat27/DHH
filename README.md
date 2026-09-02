# DHH — Desi Hip Hop

A rooftop for **Desi Hip Hop**. Golden-hour boombox aesthetic (background art in
`public/bg.png`), raps only, and one **persistent YouTube player** that lives
above the whole site — hit play once and the music keeps running while you move
between pages.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Hit **play** once (browsers block autoplay with
sound); after that it rides along across every route.

Hit **video** in the player bar and the YouTube video takes over the whole
backdrop in place of `bg.png`, scaled to cover exactly like the still image
(with the same dark gradient over it so text stays readable). Hit it again and
the still image comes back. Either way the audio never stops — the toggle only
resizes the player, it is never unmounted.

> Dev runs on **Turbopack** (`next dev --turbopack`); the webpack dev server has
> an intermittent ENOENT bug for the root route on Windows with this Next
> version. `next build` is unaffected.

## The crate

Every track is just a YouTube video id in [`src/lib/tracks.ts`](src/lib/tracks.ts):

```ts
{
  id: "01",
  title: "Mere Gully Mein",
  artist: "DIVINE feat. Naezy",
  youtubeId: "1bK5dzwhu-I",  // youtube.com/watch?v=1bK5dzwhu-I
}
```

Swap `youtubeId` for your own picks. The starting list is drawn from official
uploads (DIVINE, Naezy, Seedhe Maut, KR$NA, Raftaar, Prabh Deep, MC Stan, Emiway,
Brodha V) — worth spot-checking, since channels re-upload and rename. If YouTube
refuses to embed one, the player marks it and skips to the next.

## Layout

```
public/
  bg.png                 rooftop background art
src/
  app/
    layout.tsx           root layout — mounts the persistent player
    page.tsx             rooftop (home)
    tracks/page.tsx      the crate (full tracklist)
    about/page.tsx       manifesto
    globals.css          Tailwind v4 + theme + bg.png treatment
  components/
    PlayerProvider.tsx   YouTube IFrame player + context (persists across routes)
    PlayerBar.tsx        sticky bottom transport bar
    NowPlayingCard.tsx   hero "now spinning" card
    TrackList.tsx        clickable tracklist
    SiteHeader.tsx       nav
  lib/
    tracks.ts            the crate — edit this
```

## How "music keeps playing" works

`PlayerProvider` creates a single YouTube IFrame player inside the root layout
and never unmounts it. In the App Router the layout does not remount on
navigation, so route changes never interrupt playback. The **video** toggle only
adds/removes a CSS class on that same container — full-bleed backdrop vs. a 1px
sliver offscreen — so the player itself stays mounted and audible throughout.
