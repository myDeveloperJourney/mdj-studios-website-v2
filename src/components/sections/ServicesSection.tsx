import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Agentic AI Workflows",
    description:
      "I help tech professionals get better at designing agentic AI workflows. From intelligent agents that handle routine tasks to custom automations that save hours every week, I help people turn agentic AI into practical systems that raise their skillset and free them to focus on higher-value work.",
    // Photo by Matheus Bertelli on Pexels.
    image: "/images/agentic-ai-workflows.jpg",
  },
  {
    title: "Technical Training & Facilitation",
    description:
      "Hands-on training for tech professionals leveling up in the agentic AI era. Clear, accessible facilitation focused on what ships. Teaching since 2017 with 1000+ professionals trained, including work as a Senior Lead Technical Trainer at General Assembly.",
    image: "/images/workshop_banner.jpg",
  },
  {
    title: "Software & Web Development",
    description:
      "Custom applications that support agentic systems and modern workflows. Built with React, Next.js, Node.js, and AI integrations where they add real value, from MVPs to platforms that scale.",
    image: "/images/software-dev.webp",
  },
  {
    title: "UX & Creative Support",
    description:
      "Supporting work that makes agentic products usable and clear: intuitive interfaces, branding, and digital strategy that help teams adopt and ship AI-enabled solutions with confidence.",
    image: "/images/creative-support.webp",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-[var(--color-bg-secondary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="How I Help"
          subtitle="Tech professionals leveling up first. Software, UX, and creative work support that mission."
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
