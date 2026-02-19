import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

const projects = [
  {
    title: "Listing View",
    description:
      "SaaS platform helping Etsy sellers manage their shops with authentication, compliance auditing, and a complete brand refresh.",
    fallbackImage: "/images/listing-view.jpg",
    href: "https://listingview.io",
  },
  {
    title: "Roger's Wildlife",
    description:
      "Non-profit website featuring online donations, an interactive rescue map, and a photo gallery to support bird rescue operations.",
    fallbackImage: "/images/rogers-wildlife.jpg",
    href: "https://rogerswildlife.org",
  },
  {
    title: "The Wright Fence Co.",
    description:
      "Local business website with service showcases, image carousels, live chat integration, and embedded maps for a fencing company.",
    fallbackImage: "/images/the-wright-fence-co.jpg",
    href: "https://thewrightfenceco.com",
  },
];

function getScreenshotUrl(siteUrl: string): string {
  const useScreenshots = !!process.env.SCREENSHOTONE_ACCESS_KEY;
  if (!useScreenshots) return "";
  return `/api/screenshot?url=${encodeURIComponent(siteUrl)}`;
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Our Work"
          subtitle="A selection of projects we've delivered for clients across different industries."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => {
            const screenshotUrl = getScreenshotUrl(project.href);
            const imageSrc = screenshotUrl || project.fallbackImage;

            return (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]
                         overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1
                         hover:border-[var(--color-primary)]"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  unoptimized={!!screenshotUrl}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <svg
                    className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
