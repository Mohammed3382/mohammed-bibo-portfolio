"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Magnetic from "@/components/ui/Magnetic";

type NavLink = { label: string; hash: string } | { label: string; page: string };

const LINKS: NavLink[] = [
  { label: "Work", hash: "#work" },
  { label: "About", hash: "#about" },
  { label: "Résumé", page: "/resume" },
  { label: "Contact", hash: "#contact" },
];

const WORLD: Record<string, { n: string; name: string }> = {
  shell: { n: "00", name: "Index" },
  delivvo: { n: "01", name: "Delivvo" },
  bmt: { n: "02", name: "BMT Materials" },
  meda: { n: "03", name: "MedA+ Academy" },
};

export default function Nav() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [world, setWorld] = useState("shell");

  useEffect(() => {
    const onTheme = (e: Event) => setWorld((e as CustomEvent<string>).detail);
    window.addEventListener("themechange", onTheme as EventListener);
    return () => window.removeEventListener("themechange", onTheme as EventListener);
  }, []);

  const goHash = (hash: string) => {
    setOpen(false);
    if (pathname !== "/") {
      router.push("/" + hash);
      return;
    }
    const el = document.querySelector(hash) as HTMLElement | null;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.25 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const top = () => {
    setOpen(false);
    if (pathname !== "/") {
      router.push("/");
      return;
    }
    if (lenis) lenis.scrollTo(0, { duration: 1.25 });
    else window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const w = WORLD[world] ?? WORLD.shell;

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[150]"
        style={{ background: "linear-gradient(to bottom, color-mix(in oklab, var(--bg) 78%, transparent), transparent)" }}
      >
        <div className="wrap-wide flex items-center justify-between py-4 md:py-5">
          <button onClick={top} className="group flex items-center gap-3" aria-label="Home">
            <span className="type-mono text-[0.72rem] tracking-[0.22em] uppercase font-medium" style={{ color: "var(--fg)" }}>
              Mohammed<span className="text-accent"> Bibo</span>
            </span>
            <span className="hidden sm:flex items-center gap-2 type-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              {w.n} / {w.name}
            </span>
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) =>
              "page" in l ? (
                <Magnetic key={l.label}>
                  <Link href={l.page} className="ulink type-mono text-[0.78rem] tracking-[0.12em] uppercase" data-cursor>
                    {l.label}
                  </Link>
                </Magnetic>
              ) : (
                <Magnetic key={l.label}>
                  <button onClick={() => goHash(l.hash)} className="ulink type-mono text-[0.78rem] tracking-[0.12em] uppercase" data-cursor>
                    {l.label}
                  </button>
                </Magnetic>
              )
            )}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="type-mono text-[0.75rem] tracking-[0.14em] uppercase md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[140] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "var(--bg)" }}
          >
            <div className="flex h-full flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) =>
                "page" in l ? (
                  <motion.div key={l.label} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}>
                    <Link href={l.page} onClick={() => setOpen(false)} className="display block py-2 text-5xl">{l.label}</Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={l.label}
                    onClick={() => goHash(l.hash)}
                    className="display py-2 text-left text-5xl"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {l.label}
                  </motion.button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
