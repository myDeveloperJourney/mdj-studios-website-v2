import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono } from "next/font/google";
import BotBayHeader from "@/components/bots/BotBayHeader";
import BotBayFooter from "@/components/bots/BotBayFooter";
import PlaceholderBanner from "@/components/bots/PlaceholderBanner";
import styles from "./bots.module.css";

const dDin = localFont({
  src: [
    {
      path: "../../../public/fonts/d-din/D-DIN.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/d-din/D-DIN-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-botbay-sans",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-botbay-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bot Bay",
    template: "%s | Bot Bay",
  },
  description:
    "Copyable playbooks for tightly scoped AI assistants. One bot, one job, clear rules.",
  // Remove noindex at launch.
  robots: {
    index: false,
    follow: false,
  },
};

export default function BotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${styles.root} ${dDin.variable} ${robotoMono.variable}`}
    >
      <BotBayHeader />
      <PlaceholderBanner />
      {children}
      <BotBayFooter />
    </div>
  );
}
