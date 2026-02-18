import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Workshops",
  description:
    "Join MDJ Studios workshops and learn web development skills from industry professionals.",
  alternates: {
    canonical: "https://mdjstudios.com/workshops",
  },
  openGraph: {
    url: "https://mdjstudios.com/workshops",
  },
};

const speakers = [
  {
    name: "Daniel Scott",
    role: "Senior Application Developer",
    image: "/images/daniel.jpg",
  },
  {
    name: "Ian Mckain",
    role: "React Native/Mobile App Developer",
    image: "/images/ian_mckain.jpeg",
  },
];

const learningObjectives = [
  "Introduction to JavaScript and TypeScript",
  "How to declare variables and use different types",
  "Building and calling functions",
  "Best practices for writing clean, maintainable code",
  "Practical coding exercises with real-time feedback",
];

export default function WorkshopsPage() {
  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeading
          title="From JavaScript to TypeScript"
          subtitle="A Fast-Track Workshop"
        />

        {/* Event details */}
        <div className="text-center mb-10 space-y-1 text-[var(--color-text-secondary)]">
          <p>
            <strong className="text-[var(--color-text)]">Date:</strong> October
            24, 2024
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Time:</strong> 6 PM -
            8 PM CST
          </p>
          <p>
            <strong className="text-[var(--color-text)]">Location:</strong>{" "}
            Online (Zoom)
          </p>
        </div>

        {/* Banner */}
        <div className="relative w-full h-64 mb-12 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/images/workshop_banner.jpg"
            alt="From JavaScript to TypeScript Workshop"
            fill
            className="object-cover"
          />
        </div>

        {/* Overview */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-bold">Workshop Overview</h2>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Jumpstart your coding journey with this interactive, hands-on
            workshop! In just two hours, you&apos;ll learn the fundamentals of
            JavaScript and TypeScript, exploring key concepts such as variables,
            functions, and types.
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed">
            Whether you&apos;re new to coding or refreshing your knowledge,
            you&apos;ll have the chance to code along with us in real-time.
          </p>
        </div>

        {/* What you'll learn */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
          <ul className="space-y-3">
            {learningObjectives.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[var(--color-text-secondary)]"
              >
                <svg
                  className="w-5 h-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Speakers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Meet the Speakers</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="flex flex-col items-center text-center p-6 rounded-xl
                           border border-[var(--color-border)] bg-[var(--color-surface)]"
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={96}
                  height={96}
                  className="rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold">{speaker.name}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {speaker.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Registration closed */}
        <div className="text-center p-8 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
          <p className="text-lg font-semibold mb-2">Registration Closed</p>
          <p className="text-[var(--color-text-secondary)]">
            Stay tuned for future workshops! Follow us on social media for
            updates.
          </p>
        </div>
      </div>
    </div>
  );
}
