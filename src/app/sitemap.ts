/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllArticleSlugs } from "@/util/helper";
import { categoryConfig } from "@/util/metaTags";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kiriverse.com";

  const articles = await getAllArticleSlugs();

  return [
    {
      url: baseUrl,
      priority: 1,
    },

    {
      url: `${baseUrl}/articles`,
      priority: 0.9,
    },

    ...Object.keys(categoryConfig).map((category) => ({
      url: `${baseUrl}/${category}`,
      priority: 0.8,
    })),

    ...articles.map((article: any) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      priority: 0.7,
    })),
  ];
}
