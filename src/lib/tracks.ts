export type Track = {
  id: string;
  title: string;
  artist: string;
  /** YouTube video id — the bit after watch?v= */
  youtubeId: string;
  year?: number;
  city?: string;
  note?: string;
};

/** A song we want in the crate but haven't sourced a clean embeddable id for. */
export type WishlistTrack = Omit<Track, "id" | "youtubeId">;

/**
 * The crate. This is the running order for the rooftop boombox.
 *
 * `youtubeId` is the only thing the player needs. To swap a track, grab the
 * id from any YouTube URL (youtube.com/watch?v=XXXXXXXXXXX -> "XXXXXXXXXXX")
 * and drop it in. Ids below are pulled from official uploads — double-check
 * any you care about, since channels re-upload and rename.
 */
export const TRACKS: Track[] = [
  {
    id: "01",
    title: "Mere Gully Mein",
    artist: "DIVINE feat. Naezy",
    youtubeId: "1bK5dzwhu-I",
    year: 2015,
    city: "Mumbai",
    note: "The one that kicked the door in.",
  },
  {
    id: "02",
    title: "Kohinoor",
    artist: "DIVINE",
    youtubeId: "7dt9LvdSdIA",
    year: 2019,
    city: "Mumbai",
  },
  {
    id: "03",
    title: "101",
    artist: "Seedhe Maut",
    youtubeId: "IUFPs3j341k",
    year: 2017,
    city: "Delhi",
  },
  {
    id: "04",
    title: "Namastute",
    artist: "Seedhe Maut",
    youtubeId: "UKSztTj1D1A",
    year: 2021,
    city: "Delhi",
  },
  {
    id: "05",
    title: "No Cap",
    artist: "KR$NA",
    youtubeId: "j4d0HZz5CTk",
    year: 2021,
    city: "Delhi",
  },
  {
    id: "06",
    title: "Mantoiyat",
    artist: "Raftaar feat. Nawazuddin Siddiqui",
    youtubeId: "7gUAGZ30F9o",
    year: 2018,
    city: "Delhi",
  },
  {
    id: "07",
    title: "Suno",
    artist: "Prabh Deep",
    youtubeId: "kWQz7HaQs6A",
    year: 2017,
    city: "Delhi",
    note: "Class-Sikh, prod. Sez on the Beat.",
  },
  {
    id: "08",
    title: "Basti Ka Hasti",
    artist: "MC Stan",
    youtubeId: "GbXtCRCT0Ig",
    year: 2023,
    city: "Pune",
  },
  {
    id: "09",
    title: "Firse Machayenge",
    artist: "Emiway Bantai",
    youtubeId: "zaCbuB3w0kg",
    year: 2020,
    city: "Mumbai",
  },
  {
    id: "10",
    title: "Aigiri Nandini",
    artist: "Brodha V",
    youtubeId: "VY5U96vcJ3g",
    year: 2014,
    city: "Bengaluru",
  },
];

/**
 * The shortlist — tracks that belong on the rooftop but still need a verified,
 * embeddable YouTube id before they can join TRACKS above.
 *
 * Want to add one? Grab the id from the official upload
 * (youtube.com/watch?v=XXXXXXXXXXX -> "XXXXXXXXXXX"), move the entry into
 * TRACKS with the next `id`, and open a PR. See CONTRIBUTING.md.
 */
export const WISHLIST: WishlistTrack[] = [
  { title: "Kaam 25", artist: "DIVINE", year: 2019, city: "Mumbai", note: "Gully Boy." },
  { title: "Azadi", artist: "DIVINE feat. Dub Sharma", year: 2019, city: "Mumbai" },
  { title: "Jungli Sher", artist: "DIVINE", year: 2016, city: "Mumbai" },
  { title: "Khatta Flow", artist: "Seedhe Maut", year: 2020, city: "Delhi" },
  { title: "Nanchaku", artist: "Seedhe Maut x Yashraj", year: 2023, city: "Delhi" },
  { title: "Namumkin", artist: "Seedhe Maut", year: 2019, city: "Delhi" },
  { title: "Saza-E-Maut", artist: "KR$NA", year: 2020, city: "Delhi" },
  { title: "Vyanjan", artist: "KR$NA", year: 2023, city: "Delhi" },
  { title: "Farak", artist: "MC Stan", year: 2019, city: "Pune" },
  { title: "Astronaut", artist: "MC Stan", year: 2021, city: "Pune" },
  { title: "Sheikh Chilli", artist: "Prabh Deep", year: 2019, city: "Delhi" },
  { title: "Suffocation", artist: "Prabh Deep", year: 2017, city: "Delhi" },
  { title: "Aukaat", artist: "Emiway Bantai", year: 2020, city: "Mumbai" },
  { title: "Aatma Raama", artist: "Brodha V", year: 2018, city: "Bengaluru" },
  { title: "Aafat!", artist: "Naezy", year: 2014, city: "Mumbai", note: "The blueprint." },
];
