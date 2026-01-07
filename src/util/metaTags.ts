export type CategoryKey =
  | "anime-and-manga"
  | "games"
  | "technology"
  | "entertainments"
  | "articles";

export const categoryConfig: Record<
  CategoryKey,
  {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    intro: string;
    image: string;
    canonical: string;
  }
> = {


  articles: {
    title: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    description:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    ogTitle: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    ogDescription:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    intro:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    image: "/og-images/Article.webp",
    canonical: "https://www.kiriverse.com",
  },



  "anime-and-manga": {
    title: "Anime & Manga News, Reviews & Guides | KiriVerse",
    description:
      "Latest anime and manga news, episode guides, reviews, release dates, and otaku culture updates.",
    ogTitle: "Anime & Manga News & Culture | KiriVerse",
    ogDescription:
      "Stay updated with anime and manga news, reviews, and fandom culture.",
    intro:
      "Dive into the world of anime and manga with KiriVerse. From breaking anime news and manga updates to episode guides, reviews, release schedules, and otaku culture, we bring you everything fans need to stay ahead.",
    image: "/og-images/Anime.webp",
    canonical: "https://www.kiriverse.com",
  },



  games: {
    title: "Gaming News, Reviews & Updates | KiriVerse",
    description:
      "Gaming news, reviews, guides, and updates for PC, PlayStation, Xbox, Nintendo, and mobile platforms.",
    ogTitle: "Gaming News & Reviews | KiriVerse",
    ogDescription: "Latest gaming updates, game reviews, and platform news.",
    intro:
      "Stay updated with the latest gaming news, reviews, and guides across PC, console, and mobile platforms. KiriVerse covers new releases, industry updates, walkthroughs, and gaming culture.",
    image: "/og-images/Games.webp",
    canonical: "https://www.kiriverse.com",
  },



  technology: {
    title: "Technology News, Gadgets & Digital Trends | KiriVerse",
    description:
      "Technology news covering gadgets, apps, AI, gaming tech, and digital innovations.",
    ogTitle: "Technology & Digital Trends | KiriVerse",
    ogDescription:
      "Latest tech updates, AI trends, and innovations shaping the digital world.",
    intro:
      "Explore the latest in technology with news on gadgets, AI, apps, gaming tech, and digital trends. KiriVerse makes complex tech topics simple and accessible.",
    image: "/og-images/Technology.webp",
    canonical: "https://www.kiriverse.com",
  },



  entertainments: {
    title: "Entertainment News, Movies & Pop Culture | KiriVerse",
    description:
      "Entertainment news covering movies, TV series, streaming platforms, and pop culture trends.",
    ogTitle: "Entertainment & Pop Culture | KiriVerse",
    ogDescription:
      "Movies, series, fandoms, and entertainment culture updates.",
    intro:
      "Discover entertainment news covering movies, TV series, streaming platforms, pop culture, conventions, and fandom trends — all curated by KiriVerse.",
    image: "/og-images/Entertainment.webp",
    canonical: "https://www.kiriverse.com",
  },


};
