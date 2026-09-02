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
