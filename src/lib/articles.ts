/**
 * File-system MDX article loader.
 *
 * Reads posts from `content/articles/*.mdx`, parses YAML frontmatter,
 * and exposes typed helpers for listing, detail, and tag pages.
 *
 * This module is server-only (uses `fs`) and is designed to run at build
 * time via Next.js `generateStaticParams` / static rendering.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ArticleAuthor = {
  name: string;
  title?: string;
  avatar?: string;
};

/** Shape of frontmatter as authored in an MDX file (all optional-safe). */
export type ArticleFrontmatter = {
  title: string;
  slug?: string;
  date: string; // ISO date (YYYY-MM-DD) or full ISO timestamp
  updated?: string;
  excerpt: string;
  tags?: string[];
  cover?: string;
  coverAlt?: string;
  author?: ArticleAuthor;
  draft?: boolean;
  /**
   * Hard-skip this file as if it didn't exist: no listing, no detail route,
   * no sitemap entry, no RSS item, not even in dev. Stronger than `draft`,
   * which hides only in production. Intended as a soft-delete marker for
   * files the sandbox can't unlink; the file should still be removed from
   * the repo when convenient.
   */
  deleted?: boolean;
};

/** Normalized article metadata (slug guaranteed, author defaulted). */
export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt: string;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  author: ArticleAuthor;
  draft: boolean;
  readingTime: {
    text: string;
    minutes: number;
    words: number;
  };
};

/** Full article (metadata + raw MDX source body). */
export type Article = ArticleMeta & {
  /** Raw MDX source; compile with next-mdx-remote/rsc in the page. */
  content: string;
};

export type TagSummary = {
  /** Human-readable tag as authored, e.g. "Agentic AI". */
  tag: string;
  /** URL-safe slug, e.g. "agentic-ai". */
  slug: string;
  /** How many non-draft articles carry this tag. */
  count: number;
};

// ---------------------------------------------------------------------------
// Defaults & config
// ---------------------------------------------------------------------------

/** Default author used when a post omits its own `author:` frontmatter. */
export const DEFAULT_AUTHOR: ArticleAuthor = {
  name: "Dan Scott",
  title: "Founder, MDJ Studios",
};

const CONTENT_DIR = path.join(process.cwd(), "content", "articles");
const MDX_EXT = /\.mdx?$/;

// ---------------------------------------------------------------------------
// Slug helpers
// ---------------------------------------------------------------------------

/**
 * Convert a human tag ("Agentic AI") to a URL-safe slug ("agentic-ai").
 * Keeps behavior identical to many slugify libs without pulling one in.
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ---------------------------------------------------------------------------
// Filesystem readers (cached per module instance)
// ---------------------------------------------------------------------------

type RawEntry = { filepath: string; raw: string };

let _entriesCache: RawEntry[] | null = null;
let _articlesCache: Article[] | null = null;

function readAllEntries(): RawEntry[] {
  if (_entriesCache) return _entriesCache;
  if (!fs.existsSync(CONTENT_DIR)) {
    _entriesCache = [];
    return _entriesCache;
  }
  _entriesCache = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => MDX_EXT.test(f))
    .map((f) => {
      const filepath = path.join(CONTENT_DIR, f);
      return { filepath, raw: fs.readFileSync(filepath, "utf8") };
    });
  return _entriesCache;
}

function parseEntry({ filepath, raw }: RawEntry): Article | null {
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;

  // Soft delete: skip before we validate anything else. This lets removed
  // posts keep minimal frontmatter without triggering the missing-field
  // errors below.
  if (fm.deleted === true) return null;

  const filenameSlug = path.basename(filepath).replace(MDX_EXT, "");
  const slug = fm.slug ?? filenameSlug;

  if (!fm.title) {
    throw new Error(`[articles] Missing "title" in frontmatter: ${filepath}`);
  }
  if (!fm.date) {
    throw new Error(`[articles] Missing "date" in frontmatter: ${filepath}`);
  }
  if (!fm.excerpt) {
    throw new Error(`[articles] Missing "excerpt" in frontmatter: ${filepath}`);
  }

  const rt = readingTime(content);

  return {
    slug,
    title: fm.title,
    date: fm.date,
    updated: fm.updated,
    excerpt: fm.excerpt,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    cover: fm.cover,
    coverAlt: fm.coverAlt,
    author: fm.author
      ? { ...DEFAULT_AUTHOR, ...fm.author }
      : DEFAULT_AUTHOR,
    draft: Boolean(fm.draft),
    readingTime: {
      text: rt.text,
      minutes: rt.minutes,
      words: rt.words,
    },
    content,
  };
}

function loadAll(): Article[] {
  if (_articlesCache) return _articlesCache;
  const parsed = readAllEntries()
    .map(parseEntry)
    .filter((a): a is Article => a !== null);
  parsed.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  _articlesCache = parsed;
  return _articlesCache;
}

/**
 * In production we hide drafts; in dev we show them so authors can preview.
 * `NODE_ENV === "development"` is set by `next dev`.
 */
function isVisible(a: Article): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return !a.draft;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All visible articles, newest first. Does NOT include MDX body content. */
export function getAllArticles(): ArticleMeta[] {
  return loadAll().filter(isVisible).map(stripContent);
}

/** Strip the MDX body from an article so listings stay lean. */
function stripContent(a: Article): ArticleMeta {
  return {
    slug: a.slug,
    title: a.title,
    date: a.date,
    updated: a.updated,
    excerpt: a.excerpt,
    tags: a.tags,
    cover: a.cover,
    coverAlt: a.coverAlt,
    author: a.author,
    draft: a.draft,
    readingTime: a.readingTime,
  };
}

/** Full article for rendering. Returns null if unknown slug or draft in prod. */
export function getArticleBySlug(slug: string): Article | null {
  const match = loadAll().find((a) => a.slug === slug) ?? null;
  if (!match) return null;
  if (!isVisible(match)) return null;
  return match;
}

/** Every unique tag across visible articles, with post counts. */
export function getAllTags(): TagSummary[] {
  const map = new Map<string, { tag: string; count: number }>();
  for (const a of loadAll().filter(isVisible)) {
    for (const tag of a.tags) {
      const slug = tagToSlug(tag);
      const existing = map.get(slug);
      if (existing) existing.count += 1;
      else map.set(slug, { tag, count: 1 });
    }
  }
  return Array.from(map.entries())
    .map(([slug, { tag, count }]) => ({ slug, tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** Articles carrying a given tag slug, newest first. */
export function getArticlesByTag(tagSlug: string): ArticleMeta[] {
  return getAllArticles().filter((a) =>
    a.tags.some((t) => tagToSlug(t) === tagSlug),
  );
}

/** Small helper for tag pages that need the human-readable tag from a slug. */
export function getTagBySlug(tagSlug: string): TagSummary | null {
  return getAllTags().find((t) => t.slug === tagSlug) ?? null;
}
