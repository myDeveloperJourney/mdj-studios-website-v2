import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Internal endpoints have no value to search engines, and they consume
      // crawl budget. Safe to disallow across the board.
      disallow: ["/api/"],
    },
    sitemap: "https://mdjstudios.com/sitemap.xml",
    host: "https://mdjstudios.com",
  };
}
