import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const services = [
  {
    title: "Software & Web Development",
    description:
      "We create exceptional digital experiences using modern technologies like React, Next.js, and Node.js. From MVPs to enterprise applications, we build solutions that scale.",
    image: "/images/software-dev.webp",
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
          subtitle="We combine technical expertise with creative vision to deliver digital solutions that drive real results."
        />

        <div className="grid md:grid-cols-3 gap-8">
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
