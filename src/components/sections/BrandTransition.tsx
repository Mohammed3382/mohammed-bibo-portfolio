"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Props = {
  id: string;
  theme: string;
  index: string;
  name: string;
  kind: string;
  tagline: string;
  /** overrides the default "World X / 03 · kind" eyebrow */
  eyebrow?: string;
  /** curtain fill (the incoming brand's signature colour) */
  curtain: string;
  /** text colour on the curtain */
  ink: string;
};

/**
 * A cinematic split-curtain wipe between worlds. Two panels in the incoming
 * brand's colour slide in to cover the viewport, the page theme snaps behind
 * them (one frame, invisible), then they part to reveal the new world. Pure
 * transform/opacity — 60fps regardless of DOM size. It owns the theme flip via
 * data-theme-section.
 */
export default function BrandTransition({ id, theme, index, name, kind, tagline, curtain, ink, eyebrow }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const topY = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], ["-101%", "0%", "0%", "-101%"]);
  const botY = useTransform(scrollYProgress, [0, 0.42, 0.58, 1], ["101%", "0%", "0%", "101%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.3, 0.44, 0.58, 0.72], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.3, 0.7], [reduce ? 0 : 46, reduce ? 0 : -46]);
  const ghostScale = useTransform(scrollYProgress, [0.3, 0.5, 0.72], [0.86, 1, 1.14]);
  const rule = useTransform(scrollYProgress, [0.44, 0.6], [0, 1]);

  const darker = `color-mix(in oklab, ${curtain} 64%, #000)`;

  return (
    <section id={id} ref={ref} data-theme-section={theme} className="pin-tall" style={{ height: "190vh" }}>
      <div className="pin-stage" style={{ background: "var(--bg)" }}>
        {/* the two curtain panels */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[51%]"
          style={{ y: topY, willChange: "transform", background: `linear-gradient(180deg, ${darker}, ${curtain})` }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[51%]"
          style={{ y: botY, willChange: "transform", background: `linear-gradient(0deg, ${darker}, ${curtain})` }}
        />

        {/* title, sitting on the curtain */}
        <motion.div style={{ opacity: titleOpacity, y: titleY }} className="relative z-10 px-6 text-center">
          <motion.span
            aria-hidden
            className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-bold"
            style={{ scale: ghostScale, fontSize: "min(46vw, 30rem)", lineHeight: 1, color: ink, opacity: 0.12, willChange: "transform" }}
          >
            {index}
          </motion.span>

          <p
            className="type-mono relative mb-6 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase"
            style={{ color: ink, letterSpacing: "0.24em", opacity: 0.9 }}
          >
            <span style={{ width: "1.75rem", height: 1, background: ink, opacity: 0.6 }} />
            {eyebrow ?? `World ${index} / 03 · ${kind}`}
          </p>

          <h2 className="display relative font-semibold" style={{ color: ink, fontSize: "clamp(3rem, 12vw, 10.5rem)", letterSpacing: "-0.02em", lineHeight: 0.98 }}>
            {name}
          </h2>

          <motion.div
            aria-hidden
            className="relative mx-auto mt-8 h-[2px] w-[min(560px,72vw)] origin-left"
            style={{ scaleX: rule, background: ink, opacity: 0.7 }}
          />

          <p className="relative mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed" style={{ color: ink, opacity: 0.82 }}>
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
