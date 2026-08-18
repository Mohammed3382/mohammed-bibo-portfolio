"use client";

import { motion, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  once?: boolean;
  duration?: number;
  className?: string;
}>;

/** One-shot reveal on enter. Falls back to the final, readable state when the
 *  visitor prefers reduced motion. */
export default function Reveal({
  children,
  delay = 0,
  y = 30,
  x = 0,
  blur = false,
  once = true,
  duration = 0.75,
  className,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
