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
      <h1>Home</h1>
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
