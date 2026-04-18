import { getAllArticles } from "@/lib/articles";

// Static. Regenerated with every build (same cadence as the rest of the site).
export const dynamic = "force-static";

const SITE_URL = "https://mdjstudios.com";
const SITE_TITLE = "MDJ Studios";
const SITE_DESCRIPTION =
  "Writing on agentic AI, full-stack engineering, technical education, and the craft of building software.";
const FEED_URL = `${SITE_URL}/feed.xml`;

/** Escape characters that XML element text can't contain raw. */
function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Wrap text in CDATA, escaping any stray ]]> that could close the section. */
function cdata(input: string): string {
  return `<![CDATA[${input.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export function GET() {
  const articles = getAllArticles();

  const lastBuildDate =
    articles[0]?.date
      ? new Date(articles[0].date).toUTCString()
      : new Date().toUTCString();

  const items = articles
    .map((a) => {
      const url = `${SITE_URL}/articles/${a.slug}`;
      const pubDate = new Date(a.date).toUTCString();
      const categories = a.tags
        .map((t) => `    <category>${escapeXml(t)}</category>`)
        .join("\n");
      return [
        "  <item>",
        `    <title>${cdata(a.title)}</title>`,
        `    <link>${url}</link>`,
        `    <guid isPermaLink="true">${url}</guid>`,
        `    <pubDate>${pubDate}</pubDate>`,
        `    <description>${cdata(a.excerpt)}</description>`,
        `    <author>noreply@mdjstudios.com (${escapeXml(a.author.name)})</author>`,
        categories,
        "  </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}/articles</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
