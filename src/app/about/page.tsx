import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Daniel Scott",
  description:
    "Daniel Scott is an AI Systems and Software Engineer and Technical Training Facilitator. Teaching since 2017 with 1000+ trained. He helps tech professionals level up and build agentic AI workflows.",
  alternates: {
    canonical: "https://mdjstudios.com/about",
  },
  openGraph: {
    url: "https://mdjstudios.com/about",
  },
};

const experience = [
  {
    company: "MDJ Studios",
    role: "AI Systems and Software Engineer and Technical Training Facilitator",
    period: "2014 - Present",
    description:
      "Builds AI-enabled applications, agentic workflows, and custom automations. Helps tech professionals level up their skillset in the agentic AI era. Mentors aspiring developers and AI practitioners through workshops, speaking engagements, and courses.",
  },
  {
    company: "General Assembly",
    role: "Senior Lead Software Engineering Instructor",
    period: "2017 - Present",
    description:
      "Trains professionals to augment their workflows using generative AI tools and has mentored hundreds of students to become junior software engineers through immersive programs. Recognized as a Distinguished Faculty Member for outstanding performance and served on the Product Advisory Board.",
  },
  {
    company: "JPMorgan Chase",
    role: "Private Client Banker",
    period: "2007 - 2017",
    description:
      "Managed client relationships and provided financial services to high-net-worth individuals. Coached junior bankers to improve sales performance and client satisfaction.",
  },
  {
    company: "U.S. Army",
    role: "Wheeled Vehicle Mechanic (Sergeant)",
    period: "2004 - 2010",
    description:
      "Provided security for logistics patrol operations in Iraq, completing dozens of missions and receiving several awards, including the Purple Heart.",
  },
];

const skills = [
  { category: "Languages", items: "Python, JavaScript, TypeScript, HTML5, CSS3" },
  { category: "Frameworks", items: "React, Next.js, Express, Node.js" },
  { category: "AI & Automation", items: "LangChain, CrewAI, AI SDK, OpenAI API, Claude API, Google API, Retrieval-Augmented Generation" },
  { category: "Databases", items: "PostgreSQL, MongoDB, Firebase" },
  { category: "Tools", items: "Git, GitHub Actions, Vercel, AWS" },
  { category: "Testing", items: "Jest, Mocha, Pytest" },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@id": "https://mdjstudios.com/#person-daniel-scott",
            },
          }),
        }}
      />
      <div className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="About Daniel Scott"
          subtitle="AI Systems and Software Engineer and Technical Training Facilitator."
        />

        {/* Bio Section */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="flex justify-center md:justify-start">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/daniel-scott.jpg"
                alt="Daniel Scott"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-[var(--color-text-secondary)] leading-relaxed">
            <p>
              I&apos;m an AI Systems and Software Engineer and Technical
              Training Facilitator. I learn in public, sharing what I&apos;m
              experimenting with and implementing as I go. I also help tech
              professionals level up by making software and AI-enabled solutions
              accessible, with a focus on building agentic workflows.
            </p>
            <p>
              I&apos;ve been teaching since 2017 and have trained 1000+
              professionals. Clear, hands-on, and focused on what ships. If you&apos;re a company
              hiring for training, facilitation, or AI systems work, I&apos;m
              open to that conversation too.
            </p>
            <p>
              Originally from Fort Worth, TX, I earned a Bachelor&apos;s degree
              in Business Science with a concentration in Finance. After a
              decade in the financial industry, I saw software automation
              reshaping the work. I taught myself software development over two
              years while finishing my career in finance. That same instinct
              (recognizing where technology is heading and moving toward it
              early) now drives the focus on agentic AI workflows. Today I also
              serve as a Senior Lead Technical Trainer at General Assembly, where I was
              recognized as a Distinguished Faculty Member.
            </p>
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
          <div className="space-y-8">
            {experience.map((job) => (
              <div
                key={job.company}
                className="relative pl-8 border-l-2 border-[var(--color-primary)]"
              >
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[var(--color-primary)]" />
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-2">
                  <h3 className="text-lg font-semibold">{job.company}</h3>
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {job.period}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--color-primary)] mb-2">
                  {job.role}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">&#8226;</span>
              University of Phoenix - Bachelor of Business Science (Finance) | 2011 - 2015
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">&#8226;</span>
              University of Phoenix - Associate&apos;s Degree (Finance Fundamentals) | 2008 - 2010
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-primary)] mt-1">&#8226;</span>
              Coding Dojo, Dallas - Full-Stack Software Engineering Certificate | 2017
            </li>
          </ul>
        </div>

        {/* Skills */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.category}
                className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <p className="text-sm font-semibold text-[var(--color-primary)] mb-1">
                  {skill.category}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {skill.items}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Resume download */}
        <div className="text-center">
          <Button
            href="/assets/dans_resume.pdf"
            size="lg"
          >
            Download Resume
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}
