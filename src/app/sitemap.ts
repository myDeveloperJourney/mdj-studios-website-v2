import type { MetadataRoute } from "next";
import {
  getAllArticles,
  getAllTags,
  getArticlesByTag,
} from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mdjstudios.com";
  const now = new Date();
  const articles = getAllArticles();

  /** Newest article date across the whole blog (or `now` if empty). */
  const blogLastModified =
    articles[0] !== undefined
      ? new Date(articles[0].updated ?? articles[0].date)
      : now;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/workshops`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      // Use newest article's date so search engines see meaningful change
      // signals only when content actually changes.
      url: `${baseUrl}/articles`,
      lastModified: blogLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${baseUrl}/articles/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = getAllTags().map((t) => {
    // Newest article carrying this tag, falling back to global newest.
    const tagged = getArticlesByTag(t.slug);
    const tagLastModified =
      tagged[0] !== undefined
        ? new Date(tagged[0].updated ?? tagged[0].date)
        : blogLastModified;
    return {
      url: `${baseUrl}/articles/tag/${t.slug}`,
      lastModified: tagLastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    };
  });

  return [...staticPages, ...articlePages, ...tagPages];
}
