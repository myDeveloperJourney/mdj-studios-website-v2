"use client";

import { useState, type FormEvent } from "react";
import styles from "@/app/bots/bots.module.css";

export type SignupList = "launch-log" | "setup-waitlist";

type Status = "idle" | "submitting" | "error" | "notice" | "success";

type Props = {
  list: SignupList;
  buttonLabel?: string;
  placeholder?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm({
  list,
  buttonLabel = "Subscribe",
  placeholder = "you@example.com",
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim().toLowerCase();

    if (!trimmed || trimmed.length > 200 || !EMAIL_RE.test(trimmed)) {
      setError("Enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/bots-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, list }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        connected?: boolean;
        error?: string;
        message?: string;
      };

      if (data.connected === false) {
        setStatus("notice");
        return;
      }

      if (res.ok && data.ok === true) {
        setStatus("success");
        return;
      }

      if (res.status === 400 && data.error) {
        setError(data.error);
        setStatus("error");
        return;
      }

      setError("Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const locked = status === "submitting" || status === "success";

  return (
    <div className={styles.signupForm}>
      <form className={styles.signup} onSubmit={onSubmit} noValidate>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error" || status === "notice") {
              setStatus("idle");
              setError("");
            }
          }}
          placeholder={placeholder}
          aria-label="Email"
          disabled={locked}
          maxLength={200}
          autoComplete="email"
        />
        <button
          type="submit"
          className={`${styles.btn} ${styles.btnSolid}`}
          disabled={locked}
        >
          {status === "submitting" ? "Sending..." : buttonLabel}
        </button>
      </form>
      {status === "error" && error ? (
        <p className={styles.signupError} role="alert">
          {error}
        </p>
      ) : null}
      {status === "notice" ? (
        <p className={styles.signupNotice} role="status">
          Signups open soon. Thanks for your interest.
        </p>
      ) : null}
      {status === "success" ? (
        <p className={styles.signupNotice} role="status">
          {/* Placeholder copy: final success text from the writer. */}
          You&apos;re on the list.
        </p>
      ) : null}
    </div>
  );
}
