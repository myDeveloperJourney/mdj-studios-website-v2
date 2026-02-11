import type { MetadataRoute } from "next";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://mdjstudios.com";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/articles`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/workshops`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const { articles } = await client.request<{
      articles: { slug: string }[];
    }>(GET_ARTICLE_POSTS);

    articlePages = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // If CMS is unavailable, return static pages only
  }

  return [...staticPages, ...articlePages];
}
