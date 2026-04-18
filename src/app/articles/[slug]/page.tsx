import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  DEFAULT_AUTHOR,
  getAllArticles,
  getArticleBySlug,
  tagToSlug,
} from "@/lib/articles";

// ---------------------------------------------------------------------------
// Static params / metadata
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const canonical = `https://mdjstudios.com/articles/${slug}`;

  // NOTE: og:image / twitter:image are handled by the sibling
  // opengraph-image.tsx file convention (branded dynamic OG). We deliberately
  // omit `images` here so we don't end up with duplicate, conflicting tags.
  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    category: article.tags[0],
    alternates: {
      canonical,
      types: {
        "application/rss+xml": [
          { url: "/feed.xml", title: "MDJ Studios: Articles" },
        ],
      },
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: canonical,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

// ---------------------------------------------------------------------------
// MDX custom components
// ---------------------------------------------------------------------------

/** Styling for MDX-rendered content. Kept in parity with the prior rich-text
 * renderers so the visual feel stays consistent. */
const mdxComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h2
      {...props}
      className="scroll-mt-24 text-3xl font-bold mt-10 mb-4 text-[var(--color-text)]"
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="scroll-mt-24 text-2xl font-bold mt-10 mb-4 text-[var(--color-text)]"
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="scroll-mt-24 text-xl font-bold mt-8 mb-3 text-[var(--color-text)]"
    />
  ),
  h4: (props: React.ComponentPropsWithoutRef<"h4">) => (
    <h4
      {...props}
      className="scroll-mt-24 text-lg font-bold mt-6 mb-3 text-[var(--color-text)]"
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p
      {...props}
      className="mb-4 leading-relaxed text-[var(--color-text-secondary)]"
    />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong
      {...props}
      className="font-semibold text-[var(--color-text)]"
    />
  ),
  a: ({
    href,
    children,
    ...rest
  }: React.ComponentPropsWithoutRef<"a">) => {
    const isExternal =
      typeof href === "string" && /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
          {...rest}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-[var(--color-primary)] hover:underline"
      >
        {children}
      </Link>
    );
  },
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="list-disc list-outside pl-6 mb-4 space-y-1 text-[var(--color-text-secondary)]"
    />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="list-decimal list-outside pl-6 mb-4 space-y-1 text-[var(--color-text-secondary)]"
    />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="mb-1" />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="border-l-4 border-[var(--color-primary)] pl-4 my-6 italic text-[var(--color-text-secondary)]"
    />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded bg-[var(--color-surface-hover)] px-1.5 py-0.5 text-[0.9em] font-mono text-[var(--color-text)]"
    />
  ),
  pre: (props: React.ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg bg-[var(--color-bg-secondary)] p-4 text-sm font-mono border border-[var(--color-border)]"
    />
  ),
  hr: (props: React.ComponentPropsWithoutRef<"hr">) => (
    <hr
      {...props}
      className="my-10 border-[var(--color-border)]"
    />
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        {...props}
        className="w-full border-collapse text-sm"
      />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="border border-[var(--color-border)] bg-[var(--color-surface-hover)] px-3 py-2 text-left font-semibold"
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className="border border-[var(--color-border)] px-3 py-2 align-top text-[var(--color-text-secondary)]"
    />
  ),
  img: ({
    src,
    alt,
    ...rest
  }: React.ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      loading="lazy"
      className="my-6 w-full rounded-lg border border-[var(--color-border)]"
      {...rest}
    />
  ),
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const canonical = `https://mdjstudios.com/articles/${slug}`;

  // Reference the canonical Person entity defined in `layout.tsx` rather than
  // inlining a fresh Person each time. This keeps the knowledge graph for
  // Daniel Scott unified across the site. Guest authors fall back to inline.
  const isDefaultAuthor = article.author.name === DEFAULT_AUTHOR.name;
  const authorRef = isDefaultAuthor
    ? { "@id": "https://mdjstudios.com/#person-daniel-scott" }
    : {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.title,
      };

  // Prefer the post's cover image; otherwise let crawlers fetch the dynamic
  // OG image route Next generates from `opengraph-image.tsx`.
  const heroImage = article.cover
    ? `https://mdjstudios.com${article.cover}`
    : `${canonical}/opengraph-image`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": canonical,
        headline: article.title,
        description: article.excerpt,
        image: heroImage,
        datePublished: article.date,
        dateModified: article.updated ?? article.date,
        author: authorRef,
        publisher: { "@id": "https://mdjstudios.com/#organization" },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        isPartOf: { "@id": "https://mdjstudios.com/articles#blog" },
        inLanguage: "en-US",
        keywords: article.tags.join(", "),
        articleSection: article.tags[0],
        wordCount: article.readingTime.words,
        timeRequired: `PT${Math.max(1, Math.round(article.readingTime.minutes))}M`,
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
            name: article.title,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="py-12">
        {/* Hero image */}
        {article.cover ? (
          <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-8">
            <Image
              src={article.cover}
              alt={article.coverAlt ?? article.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-4xl mx-auto">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance">
                {article.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-balance">
              {article.title}
            </h1>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-sm text-[var(--color-text-secondary)]"
          >
            <Link
              href="/"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Home
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <Link
              href="/articles"
              className="hover:text-[var(--color-primary)] transition-colors"
            >
              Articles
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-[var(--color-text)]">{article.title}</span>
          </nav>

          {/* Author + meta */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pb-8 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-3">
              {article.author.avatar ? (
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div
                  aria-hidden
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-semibold"
                >
                  {article.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
              <div>
                <p className="font-semibold leading-tight">
                  {article.author.name}
                </p>
                {article.author.title && (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-tight">
                    {article.author.title}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:ml-auto flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  timeZone: "UTC",
                })}
              </time>
              <span aria-hidden>·</span>
              <span>{article.readingTime.text}</span>
            </div>
          </div>

          {/* MDX content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-[var(--color-border)]">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] mb-3">
                Tagged
              </h2>
              <ul className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/articles/tag/${tagToSlug(tag)}`}
                      className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
            <Link
              href="/articles"
              className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              <svg
                className="mr-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
