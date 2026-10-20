"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PlaybookCategory, PlaybookMeta } from "@/lib/bots";
import styles from "@/app/bots/bots.module.css";

type Props = {
  playbooks: PlaybookMeta[];
  categories: PlaybookCategory[];
  tags: string[];
};

export default function PlaybookDirectory({
  playbooks,
  categories,
  tags,
}: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PlaybookCategory | "All">("All");
  const [tag, setTag] = useState<string | "All">("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return playbooks.filter((pb) => {
      if (category !== "All" && pb.category !== category) return false;
      if (tag !== "All" && !pb.tags.includes(tag)) return false;
      if (!q) return true;
      const hay = [pb.title, pb.excerpt, ...pb.tags].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [playbooks, query, category, tag]);

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.search}>
          <input
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search playbooks, e.g. calendar, receipts, travel"
            aria-label="Search playbooks"
          />
        </div>
        <div className={styles.chips} role="group" aria-label="Categories">
          <button
            type="button"
            className={`${styles.chip}${category === "All" ? ` ${styles.chipOn}` : ""}`}
            onClick={() => setCategory("All")}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.chip}${category === c ? ` ${styles.chipOn}` : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        {tags.length > 0 && (
          <div className={styles.chips} role="group" aria-label="Tags">
            <button
              type="button"
              className={`${styles.chip}${tag === "All" ? ` ${styles.chipOn}` : ""}`}
              onClick={() => setTag("All")}
            >
              All tags
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.chip}${tag === t ? ` ${styles.chipOn}` : ""}`}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className={styles.count}>
        Showing {filtered.length} of {playbooks.length} playbooks
      </p>

      {filtered.length === 0 ? (
        <p className={styles.empty}>
          No playbooks match. Try another search or clear the filters.
        </p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((pb) => {
            const idx = playbooks.findIndex((p) => p.slug === pb.slug);
            return (
              <Link
                key={pb.slug}
                className={styles.card}
                href={`/bots/playbooks/${pb.slug}`}
              >
                {pb.image ? (
                  <div className={styles.cardPh}>
                    <Image
                      src={pb.image}
                      alt={pb.imageAlt ?? ""}
                      fill
                      sizes="(max-width: 961px) 100vw, 400px"
                      className={`${styles.fillImg} ${styles.imgCenter35}`}
                    />
                  </div>
                ) : (
                  <div
                    className={`${styles.ph} ${styles.cardPh}`}
                    data-label="Playbook image"
                  />
                )}
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.tag}>{pb.category}</span>
                    <span className={`${styles.mono} ${styles.muted}`}>
                      #{String(idx + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <h3>{pb.title}</h3>
                  <p>{pb.excerpt}</p>
                  <div className={styles.foot}>
                    <span>{pb.connectorsSummary}</span>
                    <span>{pb.routinesSummary}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
