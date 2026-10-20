import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllTutorials } from "@/lib/bots";
import styles from "../bots.module.css";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "How to set up assistants that stay in their lane. Scope, connectors, routines, and approval rules.",
};

export default function TutorialsPage() {
  const tutorials = getAllTutorials();
  const featured = tutorials[0] ?? null;

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.phead}>
          <div className={styles.crumbs}>
            <Link href="/bots">Home</Link>
            {" / Tutorials"}
          </div>
          <h1>Tutorials</h1>
          <p>
            How to set up assistants that stay in their lane. Start with track
            01 if you are new.
          </p>
        </div>

        <div className={`${styles.toolbar} ${styles.toolbarStatic}`}>
          <div className={styles.chips}>
            <span className={`${styles.chip} ${styles.chipOn}`}>All</span>
            <span className={styles.chip}>01 Foundations</span>
            <span className={styles.chip}>02 Connectors</span>
            <span className={styles.chip}>03 Routines</span>
            <span className={styles.chip}>04 Running a fleet</span>
          </div>
        </div>

        {featured ? (
          <Link
            href={`/bots/tutorials/${featured.slug}`}
            className={styles.featuredTut}
          >
            {featured.cover ? (
              <div className={styles.featuredTutPh}>
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt ?? ""}
                  fill
                  sizes="(max-width: 961px) 100vw, 700px"
                  className={styles.fillImg}
                />
              </div>
            ) : (
              <div
                className={`${styles.ph} ${styles.featuredTutPh}`}
                data-label="Tutorial cover 16:9"
              />
            )}
            <div className={styles.featuredTutBody}>
              <span className={styles.eyebrow}>
                Start here / Tutorial 01
                {featured.readTime ? ` / ${featured.readTime}` : ""}
              </span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className={styles.textlink}>Read tutorial &rarr;</span>
            </div>
          </Link>
        ) : null}

        <div className={styles.tlist}>
          {tutorials.map((tut, i) => (
            <Link
              key={tut.slug}
              className={styles.trow}
              href={`/bots/tutorials/${tut.slug}`}
            >
              <span className={styles.trowN}>
                Tutorial {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{tut.title}</h3>
                <p>{tut.excerpt}</p>
              </div>
              <span className={styles.trowR}>
                {tut.category}
                {tut.readTime ? ` / ${tut.readTime}` : ""}
              </span>
              <span className={styles.trowGo}>&rarr;</span>
            </Link>
          ))}
        </div>
        <div className={styles.dirSpacer} />
      </div>
    </>
  );
}
