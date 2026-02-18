import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS, GET_ARTICLE_POST } from "@/lib/queries";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";

interface Article {
  title: string;
  excerpt: string;
  content: { raw: RichTextContent };
  coverImage: { url: string };
  author: {
    name: string;
    jobTitle: string;
    profilePhoto: { url: string };
  };
}

export async function generateStaticParams() {
  try {
    const { articles } = await client.request<{
      articles: { slug: string }[];
    }>(GET_ARTICLE_POSTS);
    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { article } = await client.request<{ article: Article }>(
      GET_ARTICLE_POST,
      { slug }
    );
    if (!article) return {};
    return {
      title: article.title,
      description: article.excerpt,
      alternates: {
        canonical: `https://mdjstudios.com/articles/${slug}`,
      },
      openGraph: {
        title: article.title,
        description: article.excerpt,
        url: `https://mdjstudios.com/articles/${slug}`,
        images: [{ url: article.coverImage.url }],
        type: "article",
      },
    };
  } catch {
    return {};
  }
}

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let article: Article;
  try {
    const data = await client.request<{ article: Article }>(GET_ARTICLE_POST, {
      slug,
    });
    if (!data.article) notFound();
    article = data.article;
  } catch {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.excerpt,
        image: article.coverImage.url,
        author: {
          "@type": "Person",
          name: article.author.name,
          jobTitle: article.author.jobTitle,
          url: "https://mdjstudios.com/about",
        },
        publisher: {
          "@id": "https://mdjstudios.com/#organization",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://mdjstudios.com/articles/${slug}`,
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
            name: article.title,
            item: `https://mdjstudios.com/articles/${slug}`,
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
      <div className="relative w-full h-64 sm:h-80 lg:h-96 mb-8">
        <Image
          src={article.coverImage.url}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {article.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-[var(--color-text-secondary)]">
          <Link
            href="/"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/articles"
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            Articles
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--color-text)]">{article.title}</span>
        </nav>

        {/* Author */}
        <div className="flex items-center gap-4 mb-10 pb-8 border-b border-[var(--color-border)]">
          <Image
            src={article.author.profilePhoto.url}
            alt={article.author.name}
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{article.author.name}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {article.author.jobTitle}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <RichText
            content={article.content.raw}
            renderers={{
              h1: ({ children }) => (
                <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-8 mb-3">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg font-bold mt-6 mb-3">{children}</h4>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
                  {children}
                </p>
              ),
              bold: ({ children }) => (
                <strong className="font-semibold text-[var(--color-text)]">
                  {children}
                </strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-[var(--color-primary)] hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 space-y-1 text-[var(--color-text-secondary)]">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 space-y-1 text-[var(--color-text-secondary)]">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
            }}
          />
        </div>

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
