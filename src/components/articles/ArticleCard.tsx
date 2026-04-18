import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/lib/articles";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

type Props = {
  article: ArticleMeta;
  /** If false, tag chips below the excerpt are hidden. Defaults to true. */
  showTags?: boolean;
};

/**
 * Article preview card for listing grids (main index + tag pages).
 * Renders a cover image (or gradient fallback), metadata row,
 * title, excerpt, and optional tag chips.
 */
export default function ArticleCard({ article, showTags = true }: Props) {
  return (
    <article className="group flex flex-col">
      <Link
        href={`/articles/${article.slug}`}
        className="block overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-primary)] transition-colors"
      >
        {article.cover ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-surface-hover)]">
            <Image
              src={article.cover}
              alt={article.coverAlt ?? article.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        ) : (
          <div
            aria-hidden
            className="relative aspect-[16/9] w-full bg-gradient-to-br from-[var(--color-primary-light)] to-[var(--color-surface-hover)]"
          />
        )}
      </Link>

      <div className="flex flex-col flex-1 pt-5">
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span>{article.readingTime.text}</span>
        </div>

        <h2 className="mt-2 text-xl font-semibold leading-tight text-balance">
          <Link
            href={`/articles/${article.slug}`}
            className="hover:text-[var(--color-primary)] transition-colors"
          >
            {article.title}
          </Link>
        </h2>

        <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        {showTags && article.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <span className="inline-block rounded-full bg-[var(--color-surface-hover)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-text-secondary)]">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
