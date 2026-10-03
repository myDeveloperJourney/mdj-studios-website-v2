import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/components/articles/ArticleCard";
import { getAllArticles, getAllTags } from "@/lib/articles";

const TITLE = "Articles on Agentic AI, Engineering, and Technical Teaching";
const DESCRIPTION =
  "Field notes on agentic AI in production, full-stack engineering with Next.js and TypeScript, and technical education, from Daniel Scott and the team at MDJ Studios.";
const URL = "https://mdjstudios.com/articles";

export const metadata: Metadata = {
  title: "Articles",
  description: DESCRIPTION,
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: `${TITLE} | MDJ Studios`,
    description: DESCRIPTION,
    url: URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | MDJ Studios`,
    description: DESCRIPTION,
  },
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  // Blog + BreadcrumbList structured data so Google can recognize this page
  // as the index of a Blog and surface it with rich results when applicable.
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${URL}#blog`,
        name: "MDJ Studios Articles",
        description: DESCRIPTION,
        url: URL,
        inLanguage: "en-US",
        publisher: { "@id": "https://mdjstudios.com/#organization" },
        author: { "@id": "https://mdjstudios.com/#person-daniel-scott" },
        blogPost: articles.map((a) => ({
          "@type": "BlogPosting",
          "@id": `https://mdjstudios.com/articles/${a.slug}`,
          headline: a.title,
          url: `https://mdjstudios.com/articles/${a.slug}`,
          datePublished: a.date,
          dateModified: a.updated ?? a.date,
          description: a.excerpt,
          keywords: a.tags.join(", "),
          author: { "@id": "https://mdjstudios.com/#person-daniel-scott" },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://mdjstudios.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Articles",
            item: URL,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      <div className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <header className="mb-12 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">
              MDJ Studios
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-balance">
              Field notes on agentic AI, engineering, and teaching
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              Deep dives on building production AI agents with the Claude
              Agent SDK and MCP, full-stack engineering with Next.js and
              TypeScript, and the craft of teaching technical subjects.
            </p>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
              >
                <svg
                  aria-hidden
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
                Subscribe via RSS
              </a>
            </p>
          </header>

          {/* Tag filter strip */}
          {tags.length > 0 && (
            <nav
              aria-label="Filter by tag"
              className="mb-10 flex flex-wrap gap-2"
            >
              <span className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-[#0a0a0a]">
                All
              </span>
              {tags.map((t) => (
                <Link
                  key={t.slug}
                  href={`/articles/tag/${t.slug}`}
                  className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {t.tag}
                  <span className="ml-1.5 text-[var(--color-text-secondary)]/70">
                    {t.count}
                  </span>
                </Link>
              ))}
            </nav>
          )}

          {/* Empty state */}
          {articles.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-[var(--color-border)] rounded-lg">
              <h2 className="text-xl font-semibold">No articles yet</h2>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                New writing will land here soon. Check back in a bit.
              </p>
            </div>
          ) : (
            /* Article grid */
            <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
