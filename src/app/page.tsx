import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://mdjstudios.com",
  },
  openGraph: {
    url: "https://mdjstudios.com",
  },
};
import SocialProof from "@/components/sections/SocialProof";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import ContactSection from "@/components/sections/ContactSection";
import CTABanner from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 sm:py-28 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-[var(--color-primary)] shadow-xl">
                <Image
                  src="/images/daniel-scott-cropped.jpg"
                  alt="Daniel Scott, AI Systems and Software Engineer and Technical Training Facilitator"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-center md:text-left">
              <p className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">
                Hi, I&apos;m Daniel Scott
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                AI Systems and Software Engineer and{" "}
                <span className="text-[var(--color-primary)]">
                  Technical Training Facilitator
                </span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                Helping tech professionals level up their skillset in the
                agentic AI era.
              </p>
              <p className="mt-3 text-base text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                I&apos;ve been teaching since 2017 and have trained 1000+
                professionals. I make software and AI-enabled solutions
                accessible, with a focus on building agentic workflows you can
                actually run. Work runs through MDJ Studios.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button href="/#contact" size="lg">
                  Level Up Your Skillset
                </Button>
                <Button href="/about" variant="secondary" size="lg">
                  Learn About Me
                </Button>
              </div>
              <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                Companies hiring for training, facilitation, or AI systems work:{" "}
                <a
                  href="/#contact"
                  className="text-[var(--color-primary)] hover:underline font-medium"
                >
                  get in touch
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof />

      {/* Services */}
      <ServicesSection />

      {/* Portfolio */}
      <PortfolioSection />

      {/* About Teaser */}
      <section className="py-20 bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[var(--color-primary)] font-semibold text-sm uppercase tracking-wider mb-2">
                About Daniel
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                From the Military to Tech to Agentic AI
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                My journey took me from serving as an Army mechanic, to a career
                in private banking at JPMorgan Chase, to building through MDJ
                Studios since 2014. Today I work as an AI Systems and Software
                Engineer and Technical Training Facilitator. I help tech
                professionals level up and build agentic AI workflows, and I also
                serve as a Senior Lead Instructor at General Assembly.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                I learn in public: I share what I&apos;m trying and implementing
                as I go, because that is how I work. Clear, hands-on, and focused
                on what ships. MDJ Studios is the backbone behind the work.
              </p>
              <Button href="/about" variant="secondary">
                Read My Full Story
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/daniel-scott.jpg"
                  alt="Daniel Scott"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title="Ready to level up in the agentic AI era?"
        description="I help tech professionals build agentic AI workflows they can actually run. Clear, hands-on, and focused on what ships. Companies hiring for training, facilitation, or AI systems work are welcome too."
        buttonText="Level Up Your Skillset"
        buttonHref="/#contact"
      />

      {/* Contact */}
      <ContactSection />
    </>
  );
}
