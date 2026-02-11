import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS } from "@/lib/queries";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Read articles about web development, software engineering, and the tech industry from Daniel Scott and the MDJ Studios team.",
};

interface Article {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: { url: string };
  author: {
    name: string;
    jobTitle: string;
    profilePhoto: { url: string };
  };
}

async function getArticles(): Promise<Article[]> {
  try {
    const { articles } = await client.request<{ articles: Article[] }>(
      GET_ARTICLE_POSTS
    );
    return articles;
  } catch {
    return [];
  }
}

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Articles"
          subtitle="Thoughts on web development, technology, and the industry."
        />

        {articles.length === 0 ? (
          <p className="text-center text-[var(--color-text-secondary)]">
            No articles available yet. Check back soon!
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]
                           overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1
                           hover:border-[var(--color-primary)]"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={article.coverImage.url}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Image
                      src={article.author.profilePhoto.url}
                      alt={article.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-xs font-medium">
                        {article.author.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)]">
                        {article.author.jobTitle}
                      </p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3">
                    {article.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-sm font-medium text-[var(--color-primary)]">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
