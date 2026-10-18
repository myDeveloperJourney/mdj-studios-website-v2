"use client";

import { useState } from "react";
import styles from "@/app/bots/bots.module.css";

type Props = {
  text: string;
  label?: string;
};

/** Copies `text` via navigator.clipboard and briefly shows a Copied state. */
export default function CopyButton({ text, label = "Copy" }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be unavailable in insecure contexts; stay silent.
    }
  }

  return (
    <button type="button" className={styles.copyBtn} onClick={handleCopy}>
      {copied ? "Copied" : label}
    </button>
  );
}
