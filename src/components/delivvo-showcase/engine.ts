"use client";

import * as React from "react";

/* ------------------------------------------------------------------ *
 * Motion engine — dependency-free core for the coded product demos.
 *
 * Two concerns live here: a scroll-pin hook (the "stuck in front of you"
 * product walk) and shared easing/geometry helpers. The human cursor
 * lives in ./cursor. Everything animates transform/opacity only and
 * runs in a single requestAnimationFrame loop per concern, so motion is
 * at the panel's native refresh rate — there is no frame cap.
 * ------------------------------------------------------------------ */

export const clamp = (v: number, lo = 0, hi = 1) =>
  v < lo ? lo : v > hi ? hi : v;
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

export type Pt = { x: number; y: number };

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Pause a callback when the element leaves the viewport (perf + LCP). */
export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin = "200px",
): boolean {
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

export type ScrollPin = { stepIndex: number; intra: number; progress: number };

/**
 * Scroll-pin driver. The outer section is a tall runway (sized in PIXELS,
 * not vh, so mobile URL-bar resize never shifts the math); an inner
 * `sticky top-0` stage stays glued while its content advances. Returns
 * the active step, the 0..1 progress WITHIN that step, and overall
 * progress. One rAF loop; React state only updates when the quantised
 * value changes.
 *
 * runwayPx = innerHeight * (1 + stepCount * vhPerStep). 0.85 vh/step is
 * the researched sweet spot — brisk but readable.
 */
export function useScrollPin(
  outerRef: React.RefObject<HTMLElement | null>,
  stepCount: number,
  vhPerStep = 0.85,
): { state: ScrollPin; runwayPx: number; reduced: boolean } {
  const reduced = usePrefersReducedMotion();
  const [runwayPx, setRunwayPx] = React.useState(0);
  const [state, setState] = React.useState<ScrollPin>({
    stepIndex: 0,
    intra: 0,
    progress: 0,
  });

  React.useEffect(() => {
    const compute = () =>
      setRunwayPx(Math.round(window.innerHeight * (1 + stepCount * vhPerStep)));
    compute();
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(compute, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, [stepCount, vhPerStep]);

  React.useEffect(() => {
    if (reduced) return;
    const el = outerRef.current;
    if (!el) return;
    let raf = 0;
    let lastKey = -1;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const denom = r.height - vh;
      const progress = clamp(denom > 0 ? -r.top / denom : 0, 0, 1);
      const raw = progress * stepCount;
      const stepIndex = clamp(Math.floor(raw), 0, stepCount - 1);
      const intra = raw - stepIndex;
      const key = stepIndex * 1000 + Math.round(intra * 100);
      if (key !== lastKey) {
        lastKey = key;
        setState({ stepIndex, intra, progress });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [outerRef, stepCount, reduced]);

  return { state, runwayPx, reduced };
}
