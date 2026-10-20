"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/bots/bots.module.css";

const DRAWER_ID = "bot-bay-drawer";

const NAV: {
  href: string;
  label: string;
  match: string;
  soon?: boolean;
}[] = [
  { href: "/bots/playbooks", label: "Playbooks", match: "/bots/playbooks" },
  { href: "/bots/tutorials", label: "Tutorials", match: "/bots/tutorials" },
  { href: "/bots/newsletter", label: "Newsletter", match: "/bots/newsletter" },
  {
    href: "/bots/setup",
    label: "Done-for-you setup",
    match: "/bots/setup",
    soon: true,
  },
];

function isActive(pathname: string, match: string) {
  return pathname === match || pathname.startsWith(`${match}/`);
}

export default function BotBayHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`${styles.siteHeader}${open ? ` ${styles.siteHeaderOpen}` : ""}`}
      >
        <div className={styles.nav}>
          <Link className={styles.logo} href="/bots" onClick={close}>
            BOT BAY
          </Link>
          <nav className={styles.navLinks} aria-label="Bot Bay">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(pathname, item.match) ? styles.navActive : undefined
                }
              >
                {item.label}
                {item.soon ? <span className={styles.soon}>SOON</span> : null}
              </Link>
            ))}
          </nav>
          <Link
            className={`${styles.btn} ${styles.btnSolid} ${styles.navSubscribe}`}
            href="/bots/newsletter"
          >
            Subscribe
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-label="Menu"
            aria-expanded={open}
            aria-controls={DRAWER_ID}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
            <i />
          </button>
        </div>
      </header>
      <div
        id={DRAWER_ID}
        className={open ? styles.drawerOpen : styles.drawer}
        onClick={close}
        role="presentation"
      >
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.drawerLink}
            onClick={close}
          >
            {item.label}
            {item.soon ? <span className={styles.soon}>SOON</span> : null}
          </Link>
        ))}
        <div className={styles.drawerCta}>
          <Link
            className={`${styles.btn} ${styles.btnSolid}`}
            href="/bots/newsletter"
            onClick={close}
          >
            Get the newsletter
          </Link>
        </div>
      </div>
    </>
  );
}
