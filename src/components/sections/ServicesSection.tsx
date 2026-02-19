import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Software & Web Development",
    description:
      "We create exceptional digital experiences using modern technologies like React, Next.js, and Node.js. From MVPs to enterprise platforms, we build solutions that scale — with AI integrations where they add real value.",
    image: "/images/software-dev.webp",
  },
  {
    title: "AI-Powered Solutions",
    description:
      "We help businesses put AI to work — from intelligent agents that handle routine tasks to custom automations that save hours every week. Whether you need smarter workflows, automated customer interactions, or AI-driven tools built for your team, we turn the latest in AI into practical solutions that reduce costs and free you up to focus on growth.",
    image: "/images/ai-solutions.webp",
  },
  {
    title: "User Experience Design",
    description:
      "We design intuitive, engaging interfaces that keep your users coming back. Whether it's a website, web app, or SaaS product, we put the user first.",
    image: "/images/ux-design.webp",
  },
  {
    title: "Creative & Digital Strategy",
    description:
      "We serve as your in-house creative team. From branding and graphic design to content strategy and social media, we tell your story across every channel.",
    image: "/images/creative-support.webp",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="What We Do"
          subtitle="We combine deep technical expertise with AI to deliver digital solutions that save time, cut costs, and drive real results."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]
                         overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
