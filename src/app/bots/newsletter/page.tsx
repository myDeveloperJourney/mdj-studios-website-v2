import type { Metadata } from "next";
import Link from "next/link";
import SignupForm from "@/components/bots/SignupForm";
import styles from "../bots.module.css";

export const metadata: Metadata = {
  title: "The Launch Log",
  description:
    "A short weekly email with a new bot playbook, one setup lesson, and what changed in the fleet.",
};

export default function NewsletterPage() {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.phead}>
          <div className={styles.crumbs}>
            <Link href="/bots">Home</Link>
            {" / Newsletter"}
          </div>
          <span className={styles.eyebrow}>Weekly / Free / Every Sunday</span>
          <h1>The Launch Log</h1>
          <p>
            One new bot playbook, one setup lesson, and one change to the fleet.
            Every week, in about four minutes of reading.
          </p>
          <SignupForm list="launch-log" buttonLabel="Subscribe" />
          <p className={styles.fine}>
            Placeholder form. No spam. Unsubscribe in one click.
          </p>
        </div>

        <section className={`${styles.block} ${styles.newsletterBlock}`}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.num}>01</span>
              <h3>A new playbook</h3>
              <p>
                A full, copyable bot setup with scope, routines, connectors, and
                rules.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>02</span>
              <h3>A lesson learned</h3>
              <p>
                What broke, what got tightened, and why. Learning in public.
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>03</span>
              <h3>Fleet changelog</h3>
              <p>
                Which bots got added, retired, or rescoped this week.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.block} ${styles.sponsorBlock}`}>
          <div className={styles.sponsorSlot}>
            <span className={styles.sponsorLabel}>
              Sponsorship / Coming later
            </span>
            <h2>Sponsor slot placeholder</h2>
            <p className={styles.muted}>
              Sponsor slot placeholder. Details later.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
