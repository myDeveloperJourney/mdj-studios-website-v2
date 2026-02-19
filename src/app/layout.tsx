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
    default: "MDJ Studios | AI-Powered Software Development & Technical Education",
    template: "%s | MDJ Studios",
  },
  description:
    "MDJ Studios is a digital agency founded by Daniel Scott, specializing in AI-powered software development, intelligent automation, web applications, and technical education.",
  keywords: [
    "web development",
    "software development",
    "UX design",
    "digital agency",
    "Fort Worth",
    "Texas",
    "technical instructor",
    "React",
    "Next.js",
    "web development agency Fort Worth",
    "software engineer Texas",
    "custom web applications",
    "Node.js developer",
    "TypeScript developer",
    "technical education",
    "coding workshops",
    "software engineering instructor",
    "small business web development",
    "full stack developer",
    "Daniel Scott developer",
    "AI-powered solutions",
    "agentic AI",
    "AI automation",
    "AI for small business",
    "generative AI training",
    "intelligent automation",
    "AI development agency",
    "AI workflow automation",
    "AI consulting Fort Worth",
  ],
  authors: [{ name: "Daniel Scott", url: "https://mdjstudios.com" }],
  creator: "MDJ Studios",
  metadataBase: new URL("https://mdjstudios.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdjstudios.com",
    siteName: "MDJ Studios",
    title: "MDJ Studios | AI-Powered Software Development & Technical Education",
    description:
      "MDJ Studios is a digital agency founded by Daniel Scott, specializing in AI-powered software development, intelligent automation, web applications, and technical education.",
    images: [
      {
        url: "/images/daniel-scott-cropped.jpg",
        width: 1245,
        height: 1198,
        alt: "Daniel Scott, Founder of MDJ Studios",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MDJ Studios | AI-Powered Software Development & Technical Education",
    description:
      "MDJ Studios is a digital agency founded by Daniel Scott, specializing in AI-powered software development, intelligent automation, web applications, and technical education.",
    images: [
      {
        url: "/images/daniel-scott-cropped.jpg",
        alt: "Daniel Scott, Founder of MDJ Studios",
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
                    "Digital agency specializing in AI-powered software development, intelligent automation, web applications, UX design, and technical education.",
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
                    name: "AI & Web Development Services",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Software & Web Development",
                          description:
                            "Custom web applications using React, Next.js, and Node.js.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "User Experience Design",
                          description:
                            "Intuitive, engaging interface design for websites, web apps, and SaaS products.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Creative & Digital Strategy",
                          description:
                            "Branding, graphic design, content strategy, and social media management.",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "AI-Powered Solutions",
                          description:
                            "Custom AI agents, intelligent automations, and AI-integrated applications that help businesses save time and reduce costs.",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "Person",
                  "@id": "https://mdjstudios.com/#person-daniel-scott",
                  name: "Daniel Scott",
                  jobTitle: "Founder & Senior Application Developer",
                  url: "https://mdjstudios.com/about",
                  image:
                    "https://mdjstudios.com/images/daniel-scott-cropped.jpg",
                  description:
                    "Software developer, AI solutions architect, technical educator, and founder of MDJ Studios. Specializes in agentic AI and intelligent automation. Senior Lead Instructor at General Assembly, training professionals to leverage generative AI.",
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
