/**
 * File-system MDX loader for Bot Bay playbooks and tutorials.
 *
 * Mirrors src/lib/articles.ts: fs + gray-matter, cached, typed.
 * Server-only (uses fs). Designed for static rendering.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type PlaybookCategory =
  | "Productivity"
  | "Communication"
  | "Writing"
  | "Money"
  | "Operations";

export type PlaybookConnector = {
  name: string;
  permission: string;
  required: boolean;
};

export type PlaybookRoutine = {
  name: string;
  schedule: string;
  what: string;
  output: string;
  approval: string;
};

export type PlaybookApproval = {
  free: string[];
  ask: string[];
  never: string[];
};

export type PlaybookFrontmatter = {
  title: string;
  slug?: string;
  excerpt: string;
  category: PlaybookCategory;
  tags?: string[];
  order: number;
  difficulty: string;
  setupTime: string;
  connectorsSummary: string;
  routinesSummary: string;
  whatItDoes: string;
  greatFit: string[];
  notAFit: string[];
  scopeStatement: string;
  inScope: string[];
  antiJobs: string[];
  connectors: PlaybookConnector[];
  routines: PlaybookRoutine[];
  approval: PlaybookApproval;
  setupPrompt: string;
  related?: string[];
  image?: string;
  imageAlt?: string;
  placeholder?: boolean;
};

export type PlaybookMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: PlaybookCategory;
  tags: string[];
  order: number;
  difficulty: string;
  setupTime: string;
  connectorsSummary: string;
  routinesSummary: string;
  whatItDoes: string;
  greatFit: string[];
  notAFit: string[];
  scopeStatement: string;
  inScope: string[];
  antiJobs: string[];
  connectors: PlaybookConnector[];
  routines: PlaybookRoutine[];
  approval: PlaybookApproval;
  setupPrompt: string;
  related: string[];
  image?: string;
  imageAlt?: string;
  placeholder: boolean;
};

export type Playbook = PlaybookMeta & {
  content: string;
};

export type TutorialFrontmatter = {
  title: string;
  slug?: string;
  excerpt: string;
  date: string;
  category: string;
  readTime?: string;
  cover?: string;
  coverAlt?: string;
  placeholder?: boolean;
};

export type TutorialMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime?: string;
  cover?: string;
  coverAlt?: string;
  placeholder: boolean;
};

export type Tutorial = TutorialMeta & {
  content: string;
};

export type Heading = {
  id: string;
  text: string;
  level: 2;
};

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const PLAYBOOKS_DIR = path.join(process.cwd(), "content", "bots", "playbooks");
const TUTORIALS_DIR = path.join(process.cwd(), "content", "bots", "tutorials");
const MDX_EXT = /\.mdx?$/;

// ---------------------------------------------------------------------------
// Slug helpers (github-slugger compatible enough for rehype-slug ids)
// ---------------------------------------------------------------------------

/** Slugify a heading string the way rehype-slug / github-slugger roughly does. */
export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/<[^>]+>/g, "")
    .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extract `## ` headings from MDX source for an auto table of contents.
 * Ids match the slug algorithm used above (aligned with rehype-slug).
 */
export function extractHeadings(source: string): Heading[] {
  const headings: Heading[] = [];
  const re = /^##\s+(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = re.exec(source)) !== null) {
    const text = match[1].trim().replace(/\s+#+\s*$/, "");
    headings.push({
      id: slugifyHeading(text),
      text,
      level: 2,
    });
  }
  return headings;
}

// ---------------------------------------------------------------------------
// Filesystem readers (cached per module instance)
// ---------------------------------------------------------------------------

type RawEntry = { filepath: string; raw: string };

let _playbookEntries: RawEntry[] | null = null;
let _playbooksCache: Playbook[] | null = null;
let _tutorialEntries: RawEntry[] | null = null;
let _tutorialsCache: Tutorial[] | null = null;

function readDirEntries(dir: string): RawEntry[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => MDX_EXT.test(f))
    .map((f) => {
      const filepath = path.join(dir, f);
      return { filepath, raw: fs.readFileSync(filepath, "utf8") };
    });
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

/**
 * gray-matter / js-yaml parse unquoted YAML dates into JS Date objects.
 * Normalize to a calendar date string so consumers never see Date#toString().
 */
function normalizeDateString(value: unknown): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function parsePlaybook({ filepath, raw }: RawEntry): Playbook {
  const { data, content } = matter(raw);
  const fm = data as PlaybookFrontmatter;
  const filenameSlug = path.basename(filepath).replace(MDX_EXT, "");
  const slug = fm.slug ?? filenameSlug;

  if (!fm.title) {
    throw new Error(`[bots] Missing "title" in playbook: ${filepath}`);
  }
  if (!fm.excerpt) {
    throw new Error(`[bots] Missing "excerpt" in playbook: ${filepath}`);
  }
  if (!fm.category) {
    throw new Error(`[bots] Missing "category" in playbook: ${filepath}`);
  }
  if (typeof fm.order !== "number") {
    throw new Error(`[bots] Missing "order" in playbook: ${filepath}`);
  }

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    category: fm.category,
    tags: asStringArray(fm.tags),
    order: fm.order,
    difficulty: fm.difficulty ?? "Beginner",
    setupTime: fm.setupTime ?? "About 30 min",
    connectorsSummary: fm.connectorsSummary ?? "",
    routinesSummary: fm.routinesSummary ?? "",
    whatItDoes: fm.whatItDoes ?? "",
    greatFit: asStringArray(fm.greatFit),
    notAFit: asStringArray(fm.notAFit),
    scopeStatement: fm.scopeStatement ?? "",
    inScope: asStringArray(fm.inScope),
    antiJobs: asStringArray(fm.antiJobs),
    connectors: Array.isArray(fm.connectors) ? fm.connectors : [],
    routines: Array.isArray(fm.routines) ? fm.routines : [],
    approval: fm.approval ?? { free: [], ask: [], never: [] },
    setupPrompt: fm.setupPrompt ?? "",
    related: asStringArray(fm.related),
    image: typeof fm.image === "string" ? fm.image : undefined,
    imageAlt: typeof fm.imageAlt === "string" ? fm.imageAlt : undefined,
    placeholder: Boolean(fm.placeholder),
    content,
  };
}

function parseTutorial({ filepath, raw }: RawEntry): Tutorial {
  const { data, content } = matter(raw);
  const fm = data as TutorialFrontmatter;
  const filenameSlug = path.basename(filepath).replace(MDX_EXT, "");
  const slug = fm.slug ?? filenameSlug;

  if (!fm.title) {
    throw new Error(`[bots] Missing "title" in tutorial: ${filepath}`);
  }
  if (!fm.excerpt) {
    throw new Error(`[bots] Missing "excerpt" in tutorial: ${filepath}`);
  }
  if (!fm.date) {
    throw new Error(`[bots] Missing "date" in tutorial: ${filepath}`);
  }
  if (!fm.category) {
    throw new Error(`[bots] Missing "category" in tutorial: ${filepath}`);
  }

  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    date: normalizeDateString(fm.date),
    category: fm.category,
    readTime: fm.readTime,
    cover: typeof fm.cover === "string" ? fm.cover : undefined,
    coverAlt: typeof fm.coverAlt === "string" ? fm.coverAlt : undefined,
    placeholder: Boolean(fm.placeholder),
    content,
  };
}

function loadPlaybooks(): Playbook[] {
  if (_playbooksCache) return _playbooksCache;
  if (!_playbookEntries) _playbookEntries = readDirEntries(PLAYBOOKS_DIR);
  const parsed = _playbookEntries.map(parsePlaybook);
  parsed.sort((a, b) => a.order - b.order);
  _playbooksCache = parsed;
  return _playbooksCache;
}

function loadTutorials(): Tutorial[] {
  if (_tutorialsCache) return _tutorialsCache;
  if (!_tutorialEntries) _tutorialEntries = readDirEntries(TUTORIALS_DIR);
  const parsed = _tutorialEntries.map(parseTutorial);
  parsed.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  _tutorialsCache = parsed;
  return _tutorialsCache;
}

function stripPlaybookContent(p: Playbook): PlaybookMeta {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    order: p.order,
    difficulty: p.difficulty,
    setupTime: p.setupTime,
    connectorsSummary: p.connectorsSummary,
    routinesSummary: p.routinesSummary,
    whatItDoes: p.whatItDoes,
    greatFit: p.greatFit,
    notAFit: p.notAFit,
    scopeStatement: p.scopeStatement,
    inScope: p.inScope,
    antiJobs: p.antiJobs,
    connectors: p.connectors,
    routines: p.routines,
    approval: p.approval,
    setupPrompt: p.setupPrompt,
    related: p.related,
    image: p.image,
    imageAlt: p.imageAlt,
    placeholder: p.placeholder,
  };
}

function stripTutorialContent(t: Tutorial): TutorialMeta {
  return {
    slug: t.slug,
    title: t.title,
    excerpt: t.excerpt,
    date: t.date,
    category: t.category,
    readTime: t.readTime,
    cover: t.cover,
    coverAlt: t.coverAlt,
    placeholder: t.placeholder,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** All playbooks, ordered by frontmatter `order`. Listing shape (no MDX body). */
export function getAllPlaybooks(): PlaybookMeta[] {
  return loadPlaybooks().map(stripPlaybookContent);
}

/** Full playbook for rendering. Null if slug unknown. */
export function getPlaybookBySlug(slug: string): Playbook | null {
  return loadPlaybooks().find((p) => p.slug === slug) ?? null;
}

/** Unique categories in playbook order of first appearance. */
export function getPlaybookCategories(): PlaybookCategory[] {
  const seen = new Set<PlaybookCategory>();
  const out: PlaybookCategory[] = [];
  for (const p of loadPlaybooks()) {
    if (!seen.has(p.category)) {
      seen.add(p.category);
      out.push(p.category);
    }
  }
  return out;
}

/** Every unique tag across playbooks, sorted A-Z. */
export function getAllPlaybookTags(): string[] {
  const set = new Set<string>();
  for (const p of loadPlaybooks()) {
    for (const tag of p.tags) set.add(tag);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** All tutorials, newest first. Listing shape (no MDX body). */
export function getAllTutorials(): TutorialMeta[] {
  return loadTutorials().map(stripTutorialContent);
}

/** Full tutorial for rendering. Null if slug unknown. */
export function getTutorialBySlug(slug: string): Tutorial | null {
  return loadTutorials().find((t) => t.slug === slug) ?? null;
}
