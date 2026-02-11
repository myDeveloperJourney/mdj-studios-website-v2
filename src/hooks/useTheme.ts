"use client";

import { useSyncExternalStore, useCallback } from "react";

type Theme = "light" | "dark";

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  if (typeof document !== "undefined") {
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
  }
  return () => observer.disconnect();
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);

  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const current = document.documentElement.getAttribute("data-theme") as Theme;
    setTheme(current === "light" ? "dark" : "light");
  }, [setTheme]);

  // mounted is true when the client snapshot differs from server snapshot,
  // meaning we're on the client
  const mounted = typeof window !== "undefined";

  return { theme, setTheme, toggleTheme, mounted };
}
