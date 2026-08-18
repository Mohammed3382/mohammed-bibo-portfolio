"use client";

import { useEffect } from "react";

/**
 * Flips the active brand world on <html data-theme>. Every color/type/radius
 * token is a registered custom property with a CSS transition, so changing this
 * single attribute morphs the ENTIRE page across ~0.9s. A thin band at the
 * viewport center decides which world owns the screen.
 */
export default function ThemeController() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-theme-section]")
    );
    if (sections.length === 0) return;

    const root = document.documentElement;
    let current = root.dataset.theme ?? "shell";

    const setTheme = (theme: string) => {
      if (theme === current) return;
      current = theme;
      root.dataset.theme = theme;
      window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTheme(e.target.getAttribute("data-theme-section") || "shell");
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
