import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/components/articles/ArticleCard";
import {
  getAllTags,
  getArticlesByTag,
  getTagBySlug,
} from "@/lib/articles";

// ---------------------------------------------------------------------------
// Static params + metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const summary = getTagBySlug(tag);
  if (!summary) return {};

  const canonical = `https://mdjstudios.com/articles/tag/${tag}`;
  const title = `Articles tagged "${summary.tag}"`;
  const description = `${summary.count} article${summary.count === 1 ? "" : "s"} on ${summary.tag} from MDJ Studios.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | MDJ Studios`,
      description,
      url: canonical,
      type: "website",
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const summary = getTagBySlug(tag);
  if (!summary) notFound();

  const articles = getArticlesByTag(tag);
  // If the tag exists in metadata but has no visible articles right now,
  // 404, since there's nothing meaningful to render.
  if (articles.length === 0) notFound();

  const allTags = getAllTags();

  const canonical = `https://mdjstudios.com/articles/tag/${tag}`;

  // CollectionPage + BreadcrumbList structured data so search engines
  // recognize this as a curated listing within the blog rather than a
  // duplicate of /articles. The ItemList provides the ordered set of posts.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonical}#collection`,
        url: canonical,
        name: `Articles tagged "${summary.tag}"`,
        description: `${summary.count} article${summary.count === 1 ? "" : "s"} on ${summary.tag} from MDJ Studios.`,
        inLanguage: "en-US",
        isPartOf: { "@id": "https://mdjstudios.com/articles#blog" },
        publisher: { "@id": "https://mdjstudios.com/#organization" },
        about: summary.tag,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: articles.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://mdjstudios.com/articles/${a.slug}`,
            name: a.title,
          })),
        },
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
            item: "https://mdjstudios.com/articles",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: summary.tag,
            item: canonical,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="mb-12 max-w-3xl">
          <p className="text-sm text-[var(--color-text-secondary)]">
            <Link
              href="/articles"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Articles
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span>Tag</span>
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-balance">
            {summary.tag}
          </h1>
          <p className="mt-4 text-lg text-[var(--color-text-secondary)]">
            {summary.count} article{summary.count === 1 ? "" : "s"} tagged{" "}
            <span className="font-medium text-[var(--color-text)]">
              {summary.tag}
            </span>
            .
          </p>
        </header>

        {/* Tag filter strip with current tag highlighted */}
        <nav
          aria-label="Filter by tag"
          className="mb-10 flex flex-wrap gap-2"
        >
          <Link
            href="/articles"
            className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
          >
            All
          </Link>
          {allTags.map((t) => {
            const active = t.slug === summary.slug;
            return (
              <Link
                key={t.slug}
                href={`/articles/tag/${t.slug}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "inline-flex items-center rounded-full bg-[var(--color-primary)] px-3 py-1 text-xs font-medium text-white"
                    : "inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                }
              >
                {t.tag}
                <span
                  className={
                    active
                      ? "ml-1.5 text-white/80"
                      : "ml-1.5 text-[var(--color-text-secondary)]/70"
                  }
                >
                  {t.count}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Article grid */}
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} showTags={false} />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
