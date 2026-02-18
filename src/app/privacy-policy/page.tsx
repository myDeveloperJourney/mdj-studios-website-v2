import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "MDJ Studios privacy policy — how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://mdjstudios.com/privacy-policy",
  },
  openGraph: {
    url: "https://mdjstudios.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-center text-sm text-[var(--color-text-secondary)] mb-12">
          Effective Date: <strong>10/17/24</strong> | Last Updated:{" "}
          <strong>10/17/24</strong>
        </p>

        <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
          <p>
            At MDJ Studios, we respect your privacy and are committed to
            protecting the personal information you share with us. This Privacy
            Policy outlines how we collect, use, and protect your personal data
            when you interact with us through our website, services, products,
            and communications.
          </p>

          <p>
            If you have any questions or concerns about this policy, contact us
            at:
          </p>
          <address className="text-sm not-italic">
            <p>MDJ Studios</p>
            <p>4364 Western Center Blvd PMB 2006</p>
            <p>Fort Worth, TX 76137</p>
            <br />
            <Link
              href="/#contact"
              className="text-[var(--color-primary)] underline"
            >
              Click to Send a Message
            </Link>
          </address>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information such as your name, email address,
            and contact preferences when you engage with us as a customer,
            student, or prospect.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            2. How We Use Your Information
          </h2>
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-[var(--color-text)]">
              A. Customer Data
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Shared internally with employees and partners responsible for service delivery.</li>
              <li>Used to provide updates on the status of your service or product.</li>
              <li>We may follow up to ensure satisfaction and suggest improvements.</li>
            </ul>

            <h3 className="text-lg font-medium text-[var(--color-text)]">
              B. Student Data
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Shared internally with instructors to facilitate courses and workshops.</li>
              <li>Used to provide course updates, materials, and relevant notifications.</li>
              <li>We may notify you of new courses or products that may interest you.</li>
            </ul>

            <h3 className="text-lg font-medium text-[var(--color-text)]">
              C. Prospect Data
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Used to follow up on your inquiries about our offerings.</li>
              <li>We may contact you with additional information related to your interests.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell, rent, or share your personal information with third
            parties for marketing purposes. Data is shared only with employees
            and partners responsible for fulfilling services, with strict
            confidentiality.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            4. Communication Preferences
          </h2>
          <p>
            If you no longer wish to receive communications from us, please
            reply to your most recent email from us with the phrase
            &quot;Unsubscribe.&quot;
          </p>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            5. Data Security
          </h2>
          <p>
            We take reasonable measures to protect your personal data from
            unauthorized access, loss, or misuse. However, no online system can
            guarantee 100% security.
          </p>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            6. Your Rights
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Request access to your personal information.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Request deletion of your personal data, subject to legal exceptions.</li>
          </ul>
          <p>
            To exercise your rights,{" "}
            <Link
              href="/#contact"
              className="text-[var(--color-primary)] underline"
            >
              contact us
            </Link>
            .
          </p>

          <h2 className="text-2xl font-semibold text-[var(--color-text)]">
            7. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy to reflect changes in our
            practices or legal obligations. If we make significant changes, we
            will notify you through email or our website.
          </p>

          <p className="text-center pt-4">
            Thank you for trusting MDJ Studios with your personal information.
            We are committed to respecting your privacy and using your data
            responsibly.
          </p>
        </div>
      </div>
    </div>
  );
}
