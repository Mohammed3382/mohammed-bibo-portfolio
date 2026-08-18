"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import Words from "@/components/ui/Words";

type Props = {
  id: string;
  theme: string;
  index: string;
  name: string;
  kind: string;
  tagline: string;
};

/** A full-viewport title card that carries you between worlds. It owns the
 *  theme flip (data-theme-section), so as it crosses the viewport centre the
 *  entire page morphs to the incoming brand. */
export default function BrandTransition({ id, theme, index, name, kind, tagline }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const ghostY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 160, reduce ? 0 : -160]);
  const ghostX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -40, reduce ? 0 : 40]);
  const rule = useTransform(scrollYProgress, [0.18, 0.55], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, reduce ? 0 : -60]);
  const opacity = useTransform(scrollYProgress, [0.12, 0.34, 0.7, 0.92], [0, 1, 1, 0]);

  return (
    <section
      id={id}
      ref={ref}
      data-theme-section={theme}
      className="pin-tall"
      style={{ height: "175vh" }}
    >
      <div className="pin-stage grain">
        <div className="spotlight" aria-hidden />

        {/* giant ghost index */}
        <motion.span
          aria-hidden
          className="display pointer-events-none absolute select-none font-bold"
          style={{
            y: ghostY,
            x: ghostX,
            fontSize: "min(52vw, 40rem)",
            lineHeight: 1,
            color: "var(--accent)",
            opacity: 0.08,
          }}
        >
          {index}
        </motion.span>

        <motion.div style={{ y: contentY, opacity }} className="wrap relative z-10 text-center">
          <p className="eyebrow mb-6 justify-center">
            World {index} / 03 · {kind}
          </p>

          <h2 className="display font-semibold" style={{ fontSize: "clamp(3rem, 12vw, 11rem)" }}>
            <Words as="span" text={name} stagger={0.06} />
          </h2>

          {/* accent rule that draws across on entry */}
          <motion.div
            aria-hidden
            className="mx-auto mt-8 h-[2px] w-[min(560px,72vw)] origin-left"
            style={{ scaleX: rule, background: "var(--accent)" }}
          />

          <p className="mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed text-muted">
            {tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
