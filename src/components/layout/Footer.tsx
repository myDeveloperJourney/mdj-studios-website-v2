import Link from "next/link";
import Image from "next/image";
import SocialLinks from "@/components/ui/SocialLinks";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About Daniel", href: "/about" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo.svg"
                alt="MDJ Studios"
                width={48}
                height={48}
              />
            </Link>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              Building AI-powered software and training professionals to work smarter with AI.
            </p>
            <SocialLinks iconSize="sm" />
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              <li>Fort Worth, TX</li>
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Ready to Start?
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4">
              Let&apos;s build something great together.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              Get in touch
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--color-text-secondary)]">
            &copy; {currentYear} MDJ Studios. All rights reserved.
          </p>
          <Link
            href="/privacy-policy"
            className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
