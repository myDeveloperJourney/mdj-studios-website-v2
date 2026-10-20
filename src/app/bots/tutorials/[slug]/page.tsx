import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import {
  extractHeadings,
  getAllTutorials,
  getTutorialBySlug,
} from "@/lib/bots";
import styles from "../../bots.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.excerpt,
  };
}

function formatMonthYear(iso: string): string {
  const day = iso.slice(0, 10);
  const d = new Date(`${day}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const all = getAllTutorials();
  const index = all.findIndex((t) => t.slug === tutorial.slug);
  const headings = extractHeadings(tutorial.content);

  return (
    <>
      <div className={styles.wrap}>
        <div className={`${styles.phead} ${styles.tutHead}`}>
          <div className={styles.crumbs}>
            <Link href="/bots">Home</Link>
            {" / "}
            <Link href="/bots/tutorials">Tutorials</Link>
            {` / ${tutorial.category}`}
          </div>
          <span className={styles.eyebrow}>
            Tutorial {String(index + 1).padStart(2, "0")} / {tutorial.category}
            {tutorial.readTime ? ` / ${tutorial.readTime} read` : ""}
            {` / Updated ${formatMonthYear(tutorial.date)}`}
          </span>
          <h1 className={styles.tutTitle}>{tutorial.title}</h1>
          <p>{tutorial.excerpt}</p>
        </div>

        {tutorial.cover ? (
          <div className={styles.tutHeroPh}>
            <Image
              src={tutorial.cover}
              alt={tutorial.coverAlt ?? ""}
              fill
              priority
              sizes="(max-width: 961px) 100vw, 1200px"
              className={`${styles.fillImg} ${styles.imgCenter40}`}
            />
          </div>
        ) : (
          <div
            className={`${styles.ph} ${styles.tutHeroPh}`}
            data-label="Article hero image 21:9"
          />
        )}

        <div className={`${styles.pbLayout} ${styles.articleLayout}`}>
          <nav className={styles.toc} aria-label="Contents">
            {headings.map((h, i) => (
              <a
                key={h.id}
                href={`#${h.id}`}
                className={i === 0 ? styles.tocCur : undefined}
              >
                {h.text}
              </a>
            ))}
          </nav>

          <article className={styles.article}>
            <div className={styles.articleProse}>
              <MDXRemote
                source={tutorial.content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </div>

            <div className={styles.pager}>
              <Link href="/bots/tutorials">
                <span className={styles.mono}>&larr; All tutorials</span>
                <h3>Back to index</h3>
              </Link>
              <Link href="/bots/playbooks">
                <span className={styles.mono}>Related &rarr;</span>
                <h3>Browse playbooks</h3>
              </Link>
            </div>
          </article>
        </div>
        <div className={styles.dirSpacer} />
      </div>
    </>
  );
}
