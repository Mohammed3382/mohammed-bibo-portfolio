"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import Words from "@/components/ui/Words";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const INDEX = [
  { n: "01", name: "Delivvo", blurb: "Client-portal SaaS", target: "#delivvo", dot: "#6366f1" },
  { n: "02", name: "BMT Materials", blurb: "Building-materials commerce", target: "#bmt", dot: "#006cb4" },
  { n: "03", name: "MedA+ Academy", blurb: "Clinical education platform", target: "#meda", dot: "#116c90" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBlur = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -110]);
  const opacity = useTransform(scrollYProgress, [0.45, 0.95], [1, 0]);

  const go = (t: string) => {
    const el = document.querySelector(t) as HTMLElement | null;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.3 });
    else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      ref={ref}
      data-theme-section="shell"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* ambient monochrome backdrop */}
      <div className="dotgrid absolute inset-0 opacity-[0.5]" aria-hidden />
      <div className="spotlight" aria-hidden />
      <div
        aria-hidden
        className="drift absolute -z-10"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 720,
          maxHeight: 720,
          top: "-10%",
          right: "-8%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 60%)",
          filter: "blur(20px)",
        }}
      />

      <motion.div style={{ y: yBlur, opacity }} className="wrap-wide relative z-10 w-full pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          {/* thesis */}
          <div>
            <Reveal y={0} duration={0.8}>
              <p className="eyebrow mb-7">Software engineer · Founder · Dubai</p>
            </Reveal>

            <h1 className="display text-[clamp(2.1rem,5.6vw,4.6rem)] font-semibold">
              <Words as="span" text="Full-stack, from the" className="block md:whitespace-nowrap" />
              <Words as="span" text="first commit to the" className="block md:whitespace-nowrap" delay={0.1} />
              <span className="block md:whitespace-nowrap">
                <Words as="span" text="live" className="inline" delay={0.2} />{" "}
                <span className="type-serif italic" style={{ fontWeight: 500 }}>
                  <Words as="span" text="domain." className="inline" delay={0.26} />
                </span>
              </span>
            </h1>

            <Reveal delay={0.35} className="mt-8 max-w-xl">
              <p className="type-body text-[1.05rem] leading-relaxed text-muted">
                I&apos;m Mohammed Bibo. I build and run production software on my own: the product,
                the interface, the database, the payments, the deploy. Three of them are live right
                now. Keep scrolling and this page turns into each one.
              </p>
            </Reveal>

            <Reveal delay={0.45} className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button onClick={() => go("#work")} className="btn btn-primary" data-cursor>
                  See the work
                  <span aria-hidden>↓</span>
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href="/cv/Mohammed-Bibo-CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  data-cursor
                >
                  Résumé
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* contents index — the only color in the shell, teasing the worlds */}
          <Reveal delay={0.4} x={0} y={20}>
            <div className="border-t hairline pt-5">
              <p className="type-mono mb-4 text-[0.62rem] uppercase tracking-[0.22em] text-muted">
                Contents
              </p>
              <ul className="flex flex-col">
                {INDEX.map((it) => (
                  <li key={it.n}>
                    <button
                      onClick={() => go(it.target)}
                      className="group flex w-full items-center gap-4 border-b hairline py-4 text-left"
                      data-cursor
                    >
                      <span className="type-mono text-[0.7rem] text-muted">{it.n}</span>
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-150"
                        style={{ background: it.dot }}
                      />
                      <span className="flex flex-1 flex-col gap-1">
                        <span className="ulink type-display text-lg leading-tight">
                          {it.name}
                        </span>
                        <span className="type-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
                          {it.blurb}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="translate-x-0 text-muted transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </motion.div>

      {/* scroll cue */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
          style={{ opacity }}
        >
          <span className="type-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
            Scroll
          </span>
        </motion.div>
      )}
    </section>
  );
}
