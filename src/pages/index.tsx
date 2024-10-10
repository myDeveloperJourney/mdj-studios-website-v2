import localFont from "next/font/local";
import Layout from "@/components/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-1 py-16 text-gray-800">
        {/* Section title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
          Our Promise
        </h1>

        {/* Section content */}
        <p className="text-lg md:text-xl leading-relaxed">
          At MDJ Studios, we are committed to excellence in every digital
          endeavor. Our team promises to deliver top-tier software and web
          development solutions that optimize efficiency and enhance your
          digital presence. We prioritize user experience by creating engaging
          and motivating digital interfaces for your websites, applications, and
          SaaS products. With a robust in-house marketing team, we also provide
          comprehensive creative support, from graphic design to content
          production, ensuring your digital communication is impactful and
          effective. Trust us to bring your digital aspirations to life, saving
          time and captivating your audience.
        </p>
      </section>

      <style jsx global>
        {`
          :root {
            ${geistSans}
            ${geistMono}
          }
          body {
            font-family: var(--font-geist-sans);
          }
          code {
            font-family: var(--font-geist-mono);
          }
        `}
      </style>
    </Layout>
  );
}
