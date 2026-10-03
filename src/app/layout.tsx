import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
    { media: "(prefers-color-scheme: light)", color: "#4f46e5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Daniel Scott | AI Systems and Software Engineer and Technical Training Facilitator",
    template: "%s | Daniel Scott",
  },
  description:
    "Dan Scott has been teaching since 2017. He is an AI Systems and Software Engineer and Technical Training Facilitator with 1000+ trained. He helps tech professionals level up and build agentic AI workflows.",
  keywords: [
    "agentic AI",
    "agentic workflows",
    "AI Systems and Software Engineer",
    "Technical Training Facilitator",
    "tech professionals level up",
    "generative AI training",
    "Daniel Scott",
    "MDJ Studios",
    "AI workflow automation",
    "technical education",
    "software engineering instructor",
    "Fort Worth",
    "Texas",
    "React",
    "Next.js",
    "TypeScript developer",
    "AI-powered solutions",
    "intelligent automation",
    "custom web applications",
  ],
  authors: [{ name: "Daniel Scott", url: "https://mdjstudios.com" }],
  creator: "MDJ Studios",
  metadataBase: new URL("https://mdjstudios.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/feed.xml", title: "MDJ Studios: Articles" },
      ],
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdjstudios.com",
    siteName: "MDJ Studios",
    title: "Daniel Scott | AI Systems and Software Engineer and Technical Training Facilitator",
    description:
      "Dan Scott has been teaching since 2017. He is an AI Systems and Software Engineer and Technical Training Facilitator with 1000+ trained. He helps tech professionals level up and build agentic AI workflows.",
    images: [
      {
        url: "/images/daniel-scott-cropped.jpg",
        width: 1245,
        height: 1198,
        alt: "Daniel Scott, AI Systems and Software Engineer and Technical Training Facilitator",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Scott | AI Systems and Software Engineer and Technical Training Facilitator",
    description:
      "Dan Scott has been teaching since 2017. He is an AI Systems and Software Engineer and Technical Training Facilitator with 1000+ trained. He helps tech professionals level up and build agentic AI workflows.",
    images: [
      {
        url: "/images/daniel-scott-cropped.jpg",
        alt: "Daniel Scott, AI Systems and Software Engineer and Technical Training Facilitator",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Force dark mode */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                document.documentElement.setAttribute('data-theme', 'dark');
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://mdjstudios.com/#organization",
                  name: "MDJ Studios",
                  url: "https://mdjstudios.com",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://mdjstudios.com/images/logo-dark-bg.png",
                    width: 500,
                    height: 500,
                  },
                  founder: {
                    "@id": "https://mdjstudios.com/#person-daniel-scott",
                  },
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "4364 Western Center Blvd PMB 2006",
                    addressLocality: "Fort Worth",
                    addressRegion: "TX",
                    postalCode: "76137",
                    addressCountry: "US",
                  },
                  sameAs: [
                    "https://github.com/myDeveloperJourney",
                    "https://linkedin.com/in/engrdanielscott",
                  ],
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://mdjstudios.com/#service",
                  name: "MDJ Studios",
                  url: "https://mdjstudios.com",
                  description:
                    "AI systems, agentic workflows, and technical training for tech professionals leveling up in the agentic AI era.",
                  priceRange: "$$",
                  areaServed: {
                    "@type": "GeoCircle",
                    geoMidpoint: {
                      "@type": "GeoCoordinates",
                      latitude: 32.7555,
                      longitude: -97.3308,
                    },
                    geoRadius: "50000",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Agentic AI, Training, and Supporting Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Agentic AI Workflows",
                          description:
                            "I help tech professionals get better at designing agentic AI workflows.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Technical Training & Facilitation",
                          description:
                            "Hands-on training and facilitation for tech professionals leveling up in the agentic AI era.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Software & Web Development",
                          description:
                            "Custom applications that support agentic systems, using React, Next.js, and Node.js.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "UX & Creative Support",
                          description:
                            "Supporting UX and creative work that makes AI-enabled solutions accessible and usable.",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://mdjstudios.com/#person-daniel-scott",
                  name: "Daniel Scott",
                  jobTitle: "AI Systems and Software Engineer and Technical Training Facilitator",
                  url: "https://mdjstudios.com/about",
                  image:
                    "https://mdjstudios.com/images/daniel-scott-cropped.jpg",
                  description:
                    "AI Systems and Software Engineer and Technical Training Facilitator. Helps tech professionals level up and build agentic AI workflows. Teaching since 2017 with 1000+ trained. Senior Lead Technical Trainer at General Assembly.",
                  worksFor: {
                    "@id": "https://mdjstudios.com/#organization",
                  },
                  alumniOf: [
                    {
                      "@type": "EducationalOrganization",
                      name: "University of Phoenix",
                    },
                    {
                      "@type": "EducationalOrganization",
                      name: "Coding Dojo",
                    },
                  ],
                  knowsAbout: [
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "UX Design",
                    "Software Engineering Education",
                    "Artificial Intelligence",
                    "Agentic AI",
                    "Generative AI",
                    "AI Automation",
                    "LangChain",
                  ],
                  sameAs: [
                    "https://github.com/myDeveloperJourney",
                    "https://linkedin.com/in/engrdanielscott",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://mdjstudios.com/#website",
                  name: "MDJ Studios",
                  url: "https://mdjstudios.com",
                  publisher: {
                    "@id": "https://mdjstudios.com/#organization",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />

        {/* Crisp Chat */}
        <Script id="crisp-chat-init" strategy="lazyOnload">
          {`
            window.$crisp = [];
            window.CRISP_WEBSITE_ID = "e22665a5-3cc5-4234-bd14-b5fea0d7b279";
          `}
        </Script>
        <Script
          src="https://client.crisp.chat/l.js"
          strategy="lazyOnload"
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
