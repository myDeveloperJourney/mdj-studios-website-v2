import type { Metadata } from "next";
import SignupForm from "@/components/bots/SignupForm";
import styles from "../bots.module.css";

export const metadata: Metadata = {
  title: "Done-for-you setup",
  description:
    "Coming soon. A future offer where your first few one-job bots get scoped, connected, and handed over with written rules.",
};

export default function SetupPage() {
  return (
    <>
      <section className={styles.soonHero}>
        <div
          className={`${styles.ph} ${styles.soonHeroPh}`}
          data-label="Background image (placeholder)"
        />
        <div className={styles.soonShade} />
        <div className={`${styles.wrap} ${styles.soonHeroWrap}`}>
          <span className={styles.status}>
            <i /> Status: Coming soon
          </span>
          <h1 className={styles.soonTitle}>
            Done-for-you
            <br />
            bot fleet setup
          </h1>
          <p className={styles.soonLead}>
            A future offer where your first few one-job bots get scoped,
            connected, and handed over with written rules. Not available yet.
          </p>
          <SignupForm
            list="setup-waitlist"
            buttonLabel="Join the waitlist"
          />
          <p className={styles.fine}>
            Placeholder. Joining the waitlist is not a commitment.
          </p>
        </div>
      </section>

      <section className={`${styles.block} ${styles.setupBlock}`}>
        <div className={styles.wrap}>
          <div className={styles.shead}>
            <div>
              <span className={styles.eyebrow}>
                Planned scope / subject to change
              </span>
              <h2>What it might include</h2>
            </div>
          </div>
          <div className={`${styles.steps} ${styles.stepsFour}`}>
            <div className={styles.step}>
              <span className={styles.num}>01</span>
              <h3>Scoping call</h3>
              <p className={styles.muted}>
                Map the jobs you want off your plate. [Placeholder]
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>02</span>
              <h3>Fleet design</h3>
              <p className={styles.muted}>
                One bot per job, with anti-jobs and handoffs. [Placeholder]
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>03</span>
              <h3>Setup</h3>
              <p className={styles.muted}>
                Routines, connectors, and approval rules configured.
                [Placeholder]
              </p>
            </div>
            <div className={styles.step}>
              <span className={styles.num}>04</span>
              <h3>Handover</h3>
              <p className={styles.muted}>
                Written playbooks for every bot you own. [Placeholder]
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
