/* eslint-disable @typescript-eslint/no-explicit-any */
// import PortraitAdsCard from '@/components/adsComponent/PortraitAdsCard'
import ArticleCard from "@/components/Card/ArticleCard";
import FeaturedCard from "@/components/Card/FeaturedCard";
import HeroSide from "@/components/Card/HeroSide";
import { Article } from "@/types/type";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

interface ArticlesResponse {
  items: Article[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PageProps {
  searchParams: { page?: string };
}

const PER_PAGE = 30;

/* -------------------------------------------------------------------------- */
/*                               HELPER UTILS                                 */
/* -------------------------------------------------------------------------- */

function extractText(content: any): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  try {
    return documentToPlainTextString(content);
  } catch {
    return "";
  }
}

/* -------------------------------------------------------------------------- */
/*                              CONTENTFUL FETCH                              */
/* -------------------------------------------------------------------------- */

async function getArticles(page = 1): Promise<ArticlesResponse> {
  const skip = (page - 1) * PER_PAGE;

  const url =
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}` +
    `/entries?content_type=blogging` +
    `&order=-sys.createdAt` +
    `&limit=${PER_PAGE}` +
    `&skip=${skip}` +
    `&include=2` +
    `&select=sys.id,sys.createdAt,fields.title,fields.slug,fields.desc,fields.tags,fields.thumbnail,fields.featuredImage,fields.category`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return {
      items: [],
      total: 0,
      currentPage: page,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
    };
  }

  const data = await res.json();

  const assetMap: Record<string, string> = {};
  data.includes?.Asset?.forEach((a: any) => {
    if (a.fields?.file?.url) {
      assetMap[a.sys.id] = `https:${a.fields.file.url}?w=1200&fm=webp&q=80`;
    }
  });

  const items: Article[] = data.items.map((item: any) => {
    const f = item.fields;
    const imageId = f.featuredImage?.sys?.id || f.thumbnail?.sys?.id || null;

    return {
      id: item.sys.id,
      title: f.title,
      slug: f.slug ?? item.sys.id,
      desc: extractText(f.desc),
      createdAt: item.sys.createdAt,
      tags: Array.isArray(f.tags) ? f.tags : [],
      image: imageId ? assetMap[imageId] ?? null : null,
      category: f.category ?? "Entertainment",
    };
  });

  const totalPages = Math.ceil(data.total / PER_PAGE);

  return {
    items,
    total: data.total,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

/* -------------------------------------------------------------------------- */
/*                                  METADATA                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
  description:
    "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
  keywords: [
    "anime news",
    "manga updates",
    "gaming news",
    "video game reviews",
    "technology news",
    "tech trends",
    "entertainment news",
    "pop culture",
    "anime gaming website",
    "geek culture",
    "fandom news",
    "KiriVerse",
  ],
  alternates: {
    canonical: "https://www.kiriverse.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.kiriverse.com",
    title: "KiriVerse | Anime, Gaming, Technology & Entertainment Culture",
    description:
      "KiriVerse is your go-to hub for anime & manga news, gaming updates, tech trends, reviews, and entertainment culture from around the world.",
    siteName: "KiriVerse",
    images: [
      {
        url: "https://www.kiriverse.com/og-images/home.jpg",
        width: 1200,
        height: 630,
        alt: "KiriVerse",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kiriverse",
    creator: "@kiriverse",
    images: ["https://www.kiriverse.com/og-images/home-news.jpg"],
  },
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;
  const data = await getArticles(currentPage);
  const showHero = currentPage === 1;
  const hero = showHero ? data.items[0] : null;
  const subHero = showHero ? data.items.slice(1, 3) : data.items;
  const rest = showHero ? data.items.slice(3) : data.items;
  return (
    <div>
      <div className="main-articles">
        {hero && <FeaturedCard data={hero} />}
        <div className="hero-sidebar">
          {subHero &&
            subHero?.map((data, index) => <HeroSide key={index} data={data} />)}
        </div>
        <div className="section-header">
          <h2 className="section-title">Latest News</h2>
          <Link href="/articles" className="view-all">
            View All →
          </Link>
        </div>

        <div className="article-grid">
          {rest &&
            rest?.map((data, index) => <ArticleCard key={index} data={data} />)}

          {/* In-feed Ad */}
          {/* <PortraitAdsCard /> */}
        </div>
      </div>
    </div>
  );
}
