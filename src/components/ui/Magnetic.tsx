"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import type { PropsWithChildren } from "react";
import { useRef } from "react";

/** Pulls its child toward the cursor within its bounds, springs back on leave.
 *  Desktop pointers only — disabled for touch / reduced motion. */
export default function Magnetic({
  children,
  strength = 0.35,
  className,
}: PropsWithChildren<{ strength?: number; className?: string }>) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 16, mass: 0.4 });

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}
