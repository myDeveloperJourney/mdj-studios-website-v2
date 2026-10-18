import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/bots/SignupForm";
import { getAllPlaybooks, getAllTutorials } from "@/lib/bots";
import styles from "./bots.module.css";

export const metadata: Metadata = {
  title: {
    absolute: "Bot Bay",
  },
};

export default function BotsHomePage() {
  const playbooks = getAllPlaybooks();
  const tutorials = getAllTutorials();

  return (
    <>
      <section className={styles.hero}>
        <div
          className={`${styles.ph} ${styles.heroPh}`}
          data-label="Hero image / looping video 16:9 (dark, cinematic)"
        />
        <div className={styles.shade} />
        <div className={`${styles.wrap} ${styles.heroWrap}`}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>
              Learning in public / Issue #012 out now
            </span>
            <h1>
              One bot.
              <br />
              One job.
              <br />A whole fleet.
            </h1>
            <p className={styles.sub}>
              Copyable playbooks for running tightly scoped AI assistants. What
              each bot does, how to scope it, when it runs, what it can touch,
              and when it must ask first.
            </p>
            <div className={styles.btnRow}>
              <Link
                className={`${styles.btn} ${styles.btnSolid}`}
                href="/bots/playbooks"
              >
                Browse playbooks <span className={styles.arr}>&rarr;</span>
              </Link>
              <Link className={styles.btn} href="/bots/newsletter">
                Get the newsletter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.shead}>
            <div>
              <span className={styles.eyebrow}>How it works</span>
              <h2>
                From blank bot
                <br />
                to trusted teammate
              </h2>
            </div>
            <p>
              Every playbook follows the same shape, so you can copy one, swap
              in your own details, and have a working bot in an afternoon.
            </p>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.num}>01 / Pick</span>
              <h3>Pick a playbook</h3>
              <p>
                Start from a proven pattern: planning, messages, money, writing,
                operations, and more.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>02 / Scope</span>
              <h3>Scope it to one job</h3>
              <p>
                Write a one-line job statement and an anti-jobs list. Narrow bots
                are easier to trust and easier to debug.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>03 / Run</span>
              <h3>Set routines and rules</h3>
              <p>
                Schedule its routines, connect only what it needs, and decide
                exactly which actions need your approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.shead}>
            <div>
              <span className={styles.eyebrow}>Featured</span>
              <h2>Featured playbooks</h2>
            </div>
            <Link className={styles.textlink} href="/bots/playbooks">
              View all playbooks &rarr;
            </Link>
          </div>
          <div className={styles.grid}>
            {playbooks.map((pb, i) => (
              <Link
                key={pb.slug}
                className={styles.card}
                href={`/bots/playbooks/${pb.slug}`}
              >
                <div
                  className={`${styles.ph} ${styles.cardPh}`}
                  data-label="Playbook image"
                />
                <div className={styles.cardBody}>
                  <div className={styles.meta}>
                    <span className={styles.tag}>{pb.category}</span>
                    <span className={`${styles.mono} ${styles.muted}`}>
                      #{String(i + 1).padStart(3, "0")}
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
            ))}
          </div>
        </div>
      </section>

      <section className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.shead}>
            <div>
              <span className={styles.eyebrow}>Tutorials</span>
              <h2>Latest tutorials</h2>
            </div>
            <Link className={styles.textlink} href="/bots/tutorials">
              All tutorials &rarr;
            </Link>
          </div>
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
        </div>
      </section>

      <section className={styles.block}>
        <div className={`${styles.wrap} ${styles.band}`}>
          <div>
            <span className={styles.eyebrow}>The Launch Log</span>
            <h2>
              One new playbook.
              <br />
              Every week.
            </h2>
            <p className={styles.muted} style={{ marginTop: 18, maxWidth: 520 }}>
              A short email with a new bot playbook, one setup lesson learned the
              hard way, and what changed in the fleet this week. No fluff.
            </p>
            <SignupForm list="launch-log" buttonLabel="Subscribe" />
            <p className={styles.fine}>
              Placeholder signup. Free. Unsubscribe anytime.
            </p>
          </div>
          <div className={styles.sponsor}>
            <div
              className={`${styles.ph} ${styles.sponsorPh}`}
              data-label="Logo"
            />
            <div>
              <span className={styles.sponsorLabel}>
                Sponsor slot / placeholder
              </span>
              <h3>Your tool here</h3>
              <p>
                One line about a tool that solo operators actually use. Sponsor
                slots open later.{" "}
                <Link className={styles.textlink} href="/bots/newsletter">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
