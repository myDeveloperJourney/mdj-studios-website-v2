import Image from "next/image";
import Button from "@/components/ui/Button";
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
                  src="/images/daniel-scott.jpg"
                  alt="Daniel Scott, Founder of MDJ Studios"
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Founder of{" "}
                <span className="text-[var(--color-primary)]">MDJ Studios</span>
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                I build digital products and teach the next generation of
                developers. Let&apos;s create something remarkable together.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button href="/#contact" size="lg">
                  Get a Free Quote
                </Button>
                <Button href="/about" variant="secondary" size="lg">
                  Learn About Me
                </Button>
              </div>
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
                About the Founder
              </p>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                From the Military to Tech
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                My journey took me from serving as an Army mechanic, to a career
                in private banking at JPMorgan Chase, to founding MDJ Studios in
                2014. Today I lead a digital agency while also serving as a
                Senior Lead Instructor at General Assembly, where I&apos;ve
                taught over 1,000 students the craft of software engineering.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                I believe in building software with purpose and empowering others
                to do the same.
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
        title="Ready to bring your idea to life?"
        description="Let's discuss your project and find the perfect solution for your business."
        buttonText="Start a Conversation"
        buttonHref="/#contact"
      />

      {/* Contact */}
      <ContactSection />
    </>
  );
}
