import Link from "next/link";
import styles from "@/app/bots/bots.module.css";

export default function BotBayFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.wrap}>
        <div className={styles.fgrid}>
          <div>
            <Link className={`${styles.logo} ${styles.footerLogo}`} href="/bots">
              BOT BAY
            </Link>
            <p className={styles.footerBlurb}>
              Copyable playbooks for tightly scoped AI assistants. One bot, one
              job, clear rules.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link href="/bots/playbooks">Playbooks</Link>
            <Link href="/bots/tutorials">Tutorials</Link>
            <Link href="/bots/newsletter">Newsletter</Link>
            <Link href="/bots/setup">Done-for-you (soon)</Link>
          </div>
          <div>
            <h4>Start here</h4>
            <Link href="/bots/tutorials/why-every-bot-gets-exactly-one-job">
              Why one job
            </Link>
            <Link href="/bots/playbooks/planning-coach">Planning Coach</Link>
            <Link href="/bots/tutorials">Setup basics</Link>
          </div>
          <div>
            <h4>Elsewhere</h4>
            <Link href="/bots/newsletter">The Launch Log</Link>
            <Link href="/bots">Home</Link>
          </div>
        </div>
        <div className={styles.legal}>
          <span>Placeholder content. Not indexed.</span>
          <span>Privacy / Terms (placeholder)</span>
        </div>
      </div>
    </footer>
  );
}
