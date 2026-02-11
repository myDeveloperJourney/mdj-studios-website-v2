import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: {
    default: "MDJ Studios | Web Development Agency & Technical Education",
    template: "%s | MDJ Studios",
  },
  description:
    "MDJ Studios is a digital agency founded by Daniel Scott, specializing in software development, web applications, UX design, and technical education.",
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
  ],
  authors: [{ name: "Daniel Scott", url: "https://mdjstudios.com" }],
  creator: "MDJ Studios",
  metadataBase: new URL("https://mdjstudios.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdjstudios.com",
    siteName: "MDJ Studios",
    title: "MDJ Studios | Web Development Agency & Technical Education",
    description:
      "MDJ Studios is a digital agency founded by Daniel Scott, specializing in software development, web applications, UX design, and technical education.",
    images: [
      {
        url: "/images/logo.svg",
        width: 375,
        height: 375,
        alt: "MDJ Studios Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MDJ Studios | Web Development Agency & Technical Education",
    description:
      "MDJ Studios is a digital agency founded by Daniel Scott, specializing in software development, web applications, UX design, and technical education.",
    images: ["/images/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/logo-dark-bg.png",
  },
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
                  name: "MDJ Studios",
                  url: "https://mdjstudios.com",
                  logo: "https://mdjstudios.com/images/logo.svg",
                  founder: {
                    "@type": "Person",
                    name: "Daniel Scott",
                    jobTitle: "Founder & Senior Application Developer",
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
                  "@type": "WebSite",
                  name: "MDJ Studios",
                  url: "https://mdjstudios.com",
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
