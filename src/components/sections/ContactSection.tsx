"use client";

import { useState, useCallback } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitting(true);
      setStatus(null);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus({ type: "success", message: data.message });
          setFormState({ name: "", email: "", message: "" });
          setTimeout(() => setStatus(null), 5000);
        } else {
          setStatus({
            type: "error",
            message: data.error || "Something went wrong. Please try again.",
          });
        }
      } catch {
        setStatus({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
    [formState]
  );

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-colors";

  return (
    <section id="contact" className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Let's Work Together"
          subtitle="Have a project in mind? Let's explore how AI can help."
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Left: info */}
          <div className="space-y-6">
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Whether you need an AI-powered application, a new website, or
              help automating your workflows, we&apos;re here to bring your
              vision to life. Fill out the form and we&apos;ll get back to you
              shortly.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  Fort Worth, TX
                </span>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  We typically respond within 24 hours
                </span>
              </div>
            </div>

            <SocialLinks className="pt-2" />
          </div>

          {/* Right: form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {status && (
              <div
                className={`p-3 rounded-lg text-sm text-center ${
                  status.type === "success"
                    ? "bg-green-900/20 border border-green-800 text-green-400"
                    : "bg-red-900/20 border border-red-800 text-red-400"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formState.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formState.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                value={formState.message}
                onChange={handleChange}
                required
                rows={5}
                className={inputClass}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="w-full"
            >
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
