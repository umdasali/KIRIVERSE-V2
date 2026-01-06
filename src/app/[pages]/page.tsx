/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticleCard from "@/components/Card/ArticleCard";
import FeaturedCard from "@/components/Card/FeaturedCard";
import Pagination from "@/components/Pagination";
import { Article } from "@/types/type";
import { extractText } from "@/util/helper";
import { categoryConfig, CategoryKey } from "@/util/metaTags";
import { Metadata } from "next";

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
  searchParams: {
    page?: string;
  };
  params: { pages?: string };
}

const PER_PAGE = 40;

/* -------------------------------------------------------------------------- */
/*                              CONTENTFUL FETCH                              */
/* -------------------------------------------------------------------------- */

async function getArticles(page = 1, title: string): Promise<ArticlesResponse> {
  const skip = (page - 1) * PER_PAGE;

  // Category filter
  const contentType =
    title === "Entertainments"
      ? `&fields.category[in]=${encodeURIComponent(
          "Pop Culture,Entertainments"
        )}`
      : `&fields.category=${encodeURIComponent(title)}`;

  const url =
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}` +
    `/entries?content_type=blogging` +
    `${contentType}` +
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

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const pageQuery = await searchParams;
  const pages = await params;
  const currentPage = Number(pageQuery?.page) || 1;

  const currentTitle = pages.pages as CategoryKey;

  const data = categoryConfig?.[currentTitle];

  if (!data) {
    return {
      title: "Category Not Found | KiriVerse",
      robots: "noindex",
    };
  }

  return {
    title: currentPage > 1 ? `${data.title} – Page ${currentPage}` : data.title,
    description: data.description,
    alternates: {
      canonical:
        currentPage > 1
          ? `${data.canonical}/${currentTitle}?page=${currentPage}`
          : data.canonical,
    },
    openGraph: {
      title: currentPage > 1 ? `${data.ogTitle} – Page ${currentPage}` : data.ogTitle,
      description: data.ogDescription,
      url: `https://www.kiriverse.com/${currentTitle}`,
      siteName: "KiriVerse",
      images: [
        {
          url: data.image,
          width: 1200,
          height: 630,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentPage > 1 ? `${data.ogTitle} – Page ${currentPage}` : data.ogTitle,
      description: data.ogDescription,
      images: [data.image],
    },
  };
}

export default async function Articles({ params, searchParams }: PageProps) {
  const pageQuery = await searchParams;
  const pages = await params;
  const currentPage = Number(pageQuery?.page) || 1;

  const currentTitle = pages.pages as string;

  const titleMap: Record<string, string> = {
    articles: "",
    games: "Gaming",
    "anime-and-manga": "Anime & Manga",
    technology: "Technology",
    entertainments: "Entertainments",
  };

  const title = titleMap?.[currentTitle] ?? "";

  const data = await getArticles(currentPage, title);
  const showHero = currentPage === 1;
  const hero = showHero ? data.items[0] : null;
  const rest = showHero ? data.items.slice(1) : data.items;

  return (
    <div className="main-articles">
      {hero && <FeaturedCard data={hero} />}

      <div className="section-header">
        <h2 className="section-title">Latest Articles</h2>
      </div>
      <div className="article-grid">
        {rest &&
          rest?.map((data, index) => <ArticleCard key={index} data={data} />)}
      </div>

      {data.totalPages > 1 && (
        <Pagination
          data={data}
          currentPage={currentPage}
          title={currentTitle}
        />
      )}
    </div>
  );
}
