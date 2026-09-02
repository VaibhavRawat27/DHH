# Contributing to DHH

Thanks for pulling up. The main thing people contribute here is **tracks for the
crate** — but bug fixes and UI polish are just as welcome.

## Add a song

Every track is one entry in [`src/lib/tracks.ts`](src/lib/tracks.ts). The player
only needs a YouTube video id; everything else is flavour.

1. **Find the official upload** on YouTube. Artist channel, label channel, or the
   official topic channel — not a random re-upload.
2. **Grab the id** — the bit after `watch?v=`:
   `https://www.youtube.com/watch?v=1bK5dzwhu-I` → `1bK5dzwhu-I`
3. **Check it embeds.** Open
   `https://www.youtube.com/embed/<id>` directly. If it plays there, it will
   play on the site. If YouTube blocks embedding, the site auto-skips it — so
   pick a different upload.
4. **Add the entry** to `TRACKS`, using the next free `id` (zero-padded):

   ```ts
   {
     id: "11",
     title: "Kaam 25",
     artist: "DIVINE",
     youtubeId: "XXXXXXXXXXX",
     year: 2019,        // optional
     city: "Mumbai",    // optional
     note: "Gully Boy.", // optional, keep it short
   },
   ```

   If the song is already in `WISHLIST`, just move it up into `TRACKS` and drop
   in the id.
5. **Run it** — `npm run dev`, open http://localhost:3000/tracks, click your
   line, confirm it plays.
6. **Open a PR.** One song (or one tight batch by the same artist) per PR is
   easiest to review. Say where the id came from.

### House rules for the crate

- **Raps only.** Desi hip hop — bars over a beat. No film songs, no pop features
  where the rap is an afterthought.
- **Official uploads only**, so the artist gets the play count.
- **No duplicates.** Check the current `TRACKS` and `WISHLIST` first.
- Keep `note` to a few words. It's a caption, not a review.

## Just suggesting a song?

No code needed —
[open an issue](https://github.com/VaibhavRawat27/DHH/issues/new?labels=track&title=Track%3A%20)
with the title, artist, and a YouTube link. It'll land on the shortlist.

## Code changes

```bash
npm install
npm run dev     # Turbopack dev server on :3000
npm run build   # must pass before you push
npm run lint
```

- TypeScript + Next.js App Router + Tailwind v4. Match the surrounding style.
- Keep PRs focused. One concern per PR.
- No new dependencies without a reason in the PR description.

## Reporting bugs

Open an issue with what you did, what you expected, and what happened. Browser +
OS help. A screenshot helps more.
