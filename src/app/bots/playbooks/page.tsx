import type { Metadata } from "next";
import Link from "next/link";
import PlaybookDirectory from "@/components/bots/PlaybookDirectory";
import {
  getAllPlaybookTags,
  getAllPlaybooks,
  getPlaybookCategories,
} from "@/lib/bots";
import styles from "../bots.module.css";

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "Copyable setups for one-job assistants. Scope, routines, connectors, and approval rules.",
};

export default function PlaybooksPage() {
  const playbooks = getAllPlaybooks();
  const categories = getPlaybookCategories();
  const tags = getAllPlaybookTags();

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.phead}>
          <div className={styles.crumbs}>
            <Link href="/bots">Home</Link>
            {" / Playbooks"}
          </div>
          <h1>Playbooks</h1>
          <p>
            Copyable setups for one-job assistants. Each one covers the job, the
            anti-jobs, the routines, the connectors, and the approval rules.
          </p>
        </div>
        <PlaybookDirectory
          playbooks={playbooks}
          categories={categories}
          tags={tags}
        />
        <div className={styles.dirSpacer} />
      </div>
    </>
  );
}
