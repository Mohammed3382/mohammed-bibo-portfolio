"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import "lenis/dist/lenis.css";
import { frame, cancelFrame, useReducedMotion } from "motion/react";
import { useEffect, useRef, type PropsWithChildren } from "react";

/**
 * One scroll engine (Lenis), one clock (Motion's frame loop).
 * We disable Lenis' own RAF and drive it from Motion so scroll-linked
 * animations and the smooth scroll stay perfectly in phase.
 * When the visitor asks for reduced motion, we don't mount smoothing at all.
 */
export default function SmoothScroll({ children }: PropsWithChildren) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    if (reduce) return;
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }
    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
