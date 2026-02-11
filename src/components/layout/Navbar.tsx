"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// import ThemeToggle from "@/components/ui/ThemeToggle";
import SocialLinks from "@/components/ui/SocialLinks";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "About Daniel", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const el = document.querySelector(href.replace("/", ""));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-border)]
                 bg-[var(--color-bg)]/80 backdrop-blur-lg"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="MDJ Studios"
              width={40}
              height={40}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors
                  ${
                    pathname === link.href
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* <ThemeToggle /> */}
            <Button href="/#contact" size="sm">
              Get a Quote
            </Button>
          </div>

          {/* Mobile: hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {/* <ThemeToggle /> */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors
                  ${
                    pathname === link.href
                      ? "text-[var(--color-primary)] bg-[var(--color-primary-light)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3">
              <Button href="/#contact" size="lg" className="w-full">
                Get a Quote
              </Button>
            </div>
            <div className="pt-4 flex justify-center">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
