"use client";

import { useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import Words from "@/components/ui/Words";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

const SOCIAL = [
  { label: "Email", href: "mailto:mohdbibo22@gmail.com" },
  { label: "GitHub", href: "https://github.com/Mohammed3382" },
  { label: "Résumé", href: "/cv/Mohammed-Bibo-CV.pdf" },
];

const LIVE = [
  { label: "Delivvo", href: "https://delivvo.io" },
  { label: "BMT Materials", href: "https://www.bmtmaterials.com" },
  { label: "MedA+ Academy", href: "https://med-aplus.com" },
];

export default function Contact() {
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const top = () =>
    lenis ? lenis.scrollTo(0, { duration: 1.3 }) : window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <section id="contact" data-theme-section="shell" className="relative overflow-hidden pt-24">
      <div className="dotgrid absolute inset-0 opacity-40" aria-hidden />
      <div className="wrap-wide relative z-10">
        <p className="eyebrow mb-8">Contact</p>
        <h2 className="display text-[clamp(2.4rem,9vw,7.5rem)] font-semibold leading-[0.95]">
          <Words as="span" text="Let's build" className="block" />
          <span className="block">
            <Words as="span" text="something that" className="inline" delay={0.1} />{" "}
            <span className="type-serif italic" style={{ fontWeight: 500 }}>ships.</span>
          </span>
        </h2>

        <Reveal delay={0.2} className="mt-10">
          <Magnetic>
            <a
              href="mailto:mohdbibo22@gmail.com"
              className="ulink type-display inline-block text-[clamp(1.2rem,3.5vw,2.2rem)]"
              data-cursor
            >
              mohdbibo22@gmail.com
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.3} className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") || s.href.startsWith("/cv") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="ulink type-mono text-[0.8rem] uppercase tracking-[0.14em]"
              data-cursor
            >
              {s.label} <span aria-hidden className="text-muted">↗</span>
            </a>
          ))}
        </Reveal>

        {/* live products */}
        <div className="mt-20 grid grid-cols-1 gap-4 border-t hairline pt-8 sm:grid-cols-3">
          {LIVE.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b hairline py-4"
              data-cursor
            >
              <span className="type-display text-lg">{l.label}</span>
              <span className="type-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-transform duration-300 group-hover:translate-x-1">
                Live ↗
              </span>
            </a>
          ))}
        </div>

        {/* footer */}
        <footer className="mt-24 flex flex-col gap-6 border-t hairline py-8 md:flex-row md:items-center md:justify-between">
          <p className="type-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            © 2026 Mohammed Bibo
          </p>
          <p className="max-w-md type-mono text-[0.66rem] leading-relaxed tracking-[0.06em] text-muted">
            Every colour and typeface in the three project sections is borrowed from the real
            product it belongs to. Built in Next.js, deployed on Vercel.
          </p>
          <button onClick={top} className="ulink type-mono text-[0.68rem] uppercase tracking-[0.14em]" data-cursor>
            Back to top ↑
          </button>
        </footer>
      </div>
    </section>
  );
}
