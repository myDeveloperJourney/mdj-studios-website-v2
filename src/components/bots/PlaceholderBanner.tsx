import styles from "@/app/bots/bots.module.css";

/** Visible banner for any Bot Bay page that shows placeholder MDX content. */
export default function PlaceholderBanner() {
  return (
    <div className={styles.placeholderBanner}>
      <div className={styles.wrap}>
        <p>Placeholder copy. Final text coming from the writer.</p>
      </div>
    </div>
  );
}
