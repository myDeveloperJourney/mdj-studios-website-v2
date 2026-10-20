"use client";

import { usePathname } from "next/navigation";

/**
 * Hides main-site chrome (Navbar, Footer, ChatWidget) on /bots routes
 * so Bot Bay can render its own header and footer.
 */
export default function HideOnBots({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname === "/bots" || pathname.startsWith("/bots/")) {
    return null;
  }
  return <>{children}</>;
}
