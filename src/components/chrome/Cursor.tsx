"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { useMounted } from "@/lib/useMounted";

/** A lerped cursor ring that grows over interactive targets. Desktop pointers
 *  only; never rendered on touch or under reduced-motion. Uses mix-blend so it
 *  reads on both the dark worlds and MedA's light one. */
export default function Cursor() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!fine || reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setActive(!!t?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [fine, reduce, x, y]);

  if (!mounted || !fine || reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        x: sx,
        y: sy,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        color: "var(--accent)",
      }}
    >
      <motion.div
        animate={{ scale: active ? 2.1 : 1, opacity: active ? 1 : 0.75 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          width: 26,
          height: 26,
          marginLeft: -13,
          marginTop: -13,
          borderRadius: 999,
          border: "1.5px solid currentColor",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: 999,
          background: "currentColor",
        }}
      />
    </motion.div>
  );
}
