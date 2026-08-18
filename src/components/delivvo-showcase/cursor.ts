"use client";

import * as React from "react";
import { clamp, easeInOutCubic, lerp, type Pt } from "./engine";

/* ------------------------------------------------------------------ *
 * Human cursor choreography.
 *
 * The old cursor was hardcoded to container-query percentages, so it
 * drifted off its targets and moved in robotic straight lines. This
 * version does it the way real product sites do:
 *
 *  - ACCURATE: it measures the live `getBoundingClientRect` of the real
 *    target element (minus the frame's rect) right before each hop, so
 *    it lands dead-centre regardless of layout, breakpoint, or RTL flip.
 *  - HUMAN: it travels a slightly curved quadratic-bezier arc (not a
 *    ruler-straight line), with ease-in-out velocity, a small overshoot
 *    on longer reaches that settles back, sub-pixel jitter in flight, a
 *    40-120ms dwell before clicking, and a spring press + ripple.
 *
 * Per-frame transforms are written straight to the DOM (translate3d +
 * scale, compositor-only) so React never re-renders during motion.
 * ------------------------------------------------------------------ */

export type Beat = {
  /** The real element the cursor moves to and "clicks" (or, for a hover beat,
   *  simply rests over without pressing). */
  ref: React.RefObject<HTMLElement | null>;
  /** State change applied at the moment of click (e.g. flip a pill). Ignored
   *  for hover beats. */
  onClick?: () => void;
  /** ms to dwell on this beat AFTER the click (or hover-arrive) before moving on. */
  hold: number;
  /** Optional ms to wait BEFORE moving to this target. */
  preMove?: number;
  /** Hover beat: the cursor moves to the element and rests WITHOUT pressing.
   *  `onArrive` fires once it settles (set the highlight); `onLeave` fires when
   *  the dwell ends, right before the next beat (clear the highlight). No click,
   *  no ripple, no zoom. Used for the nav + project-tab hover tours. */
  hover?: boolean;
  onArrive?: () => void;
  onLeave?: () => void;
  /** Where on the target to land the cursor TIP, as fractions of the element's
   *  box (0 = left/top, 1 = right/bottom). Defaults to dead-centre {0.5, 0.5}.
   *  The pointer arrow's visual mass hangs below + right of its tip, so on a
   *  tall full-width nav row a dead-centre tip reads "a bit low". Aiming a
   *  touch up-and-left (e.g. {x: 0.22, y: 0.4}) puts the tip on the icon/label
   *  so it clearly points at the row. */
  aim?: { x?: number; y?: number };
};

function quad(p0: Pt, p1: Pt, p2: Pt, u: number): Pt {
  const k = 1 - u;
  return {
    x: k * k * p0.x + 2 * k * u * p1.x + u * u * p2.x,
    y: k * k * p0.y + 2 * k * u * p1.y + u * u * p2.y,
  };
}

// Midpoint pushed perpendicular to the line by 8-20% of distance, to ONE
// random side - a clean single-bow human arc (two-sided control points
// produce wonky S-curves).
function controlPoint(a: Pt, b: Pt, rand: () => number): Pt {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const bow = dist * (0.08 + rand() * 0.12) * (rand() < 0.5 ? -1 : 1);
  return { x: (a.x + b.x) / 2 + nx * bow, y: (a.y + b.y) / 2 + ny * bow };
}

export function useCursorChoreography(opts: {
  frameRef: React.RefObject<HTMLElement | null>;
  cursorRef: React.RefObject<HTMLElement | null>;
  rippleRef: React.RefObject<HTMLElement | null>;
  beats: Beat[];
  /** Reset all demo state to the start of the loop. */
  reset: () => void;
  /** Run only when in view + motion allowed. */
  enabled: boolean;
  /** Frame-local start point. */
  startAt?: Pt;
  /** When false, run the beats ONCE then call onDone (segment mode) instead of
   *  looping forever. The showcase's phase timer advances + loops segments. */
  loop?: boolean;
  /** Called after a single (loop:false) run completes. */
  onDone?: () => void;
  /** Change this to force the effect to restart (e.g. on a segment jump). */
  restartKey?: number | string;
  /** The frame's design width in CSS px (DESIGN_W). The frame is rendered via
   *  `transform: scale`, so the live factor is `frameRect.width / designW`. We
   *  divide measured offsets by this factor to land the cursor (whose translate
   *  is in the frame's pre-scale local space) dead-centre at any screen size. */
  designW: number;
}) {
  const { frameRef, cursorRef, rippleRef, enabled, restartKey, designW } = opts;
  // Keep the latest beats/reset without restarting the loop.
  const latest = React.useRef(opts);
  latest.current = opts;

  React.useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const frame = frameRef.current;
    if (!cursor || !frame) return;

    let cancelled = false;
    const rafs: number[] = [];
    const timers: number[] = [];
    // Deterministic-ish PRNG seeded per mount so SSR/build stays stable
    // and the motion still feels varied. (Math.random isn't available in
    // some build contexts; this avoids it entirely.)
    let seed = 0x2f6e2b1;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };

    const start: Pt = latest.current.startAt ?? { x: 56, y: 60 };
    let pos: Pt = { ...start };

    const draw = (p: Pt, scale = 1) => {
      cursor.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${scale})`;
    };
    draw(pos);
    cursor.style.opacity = "1";

    const center = (el: HTMLElement, aim?: { x?: number; y?: number }): Pt => {
      const t = el.getBoundingClientRect();
      const f = frame.getBoundingClientRect();
      // The frame is rendered with `transform: scale`, so getBoundingClientRect
      // returns post-scale screen coordinates. The cursor's translate is
      // written in the frame's PRE-scale local space, which the parent scale
      // then shrinks visually. The live factor is frameRect.width / designW, so
      // dividing the measured offset by it lands the cursor dead-centre at any
      // size (factor === 1 at exactly designW px wide). `aim` shifts the target
      // point within the box (default centre) so tall nav rows can pull the
      // tip onto the label instead of the empty middle.
      const factor = designW > 0 ? f.width / designW : 1;
      const ax = aim?.x ?? 0.5;
      const ay = aim?.y ?? 0.5;
      return {
        x: (t.left - f.left + t.width * ax) / factor,
        y: (t.top - f.top + t.height * ay) / factor,
      };
    };

    const wait = (ms: number) =>
      new Promise<void>((res) => {
        const id = window.setTimeout(res, ms);
        timers.push(id);
      });

    const hop = (from: Pt, to: Pt) =>
      new Promise<void>((res) => {
        const cp = controlPoint(from, to, rand);
        const dist = Math.hypot(to.x - from.x, to.y - from.y);
        const dur = clamp(260 + dist * 0.9, 320, 1000);
        const t0 = performance.now();
        const loop = (now: number) => {
          if (cancelled) return res();
          const lin = clamp((now - t0) / dur, 0, 1);
          const u = easeInOutCubic(lin);
          const p = quad(from, cp, to, u);
          const j = (1 - lin) * 0.7;
          const jp = { x: p.x + (rand() - 0.5) * j, y: p.y + (rand() - 0.5) * j };
          draw(jp);
          pos = jp;
          if (lin < 1) rafs.push(requestAnimationFrame(loop));
          else {
            pos = { ...to };
            draw(to);
            res();
          }
        };
        rafs.push(requestAnimationFrame(loop));
      });

    const press = () =>
      new Promise<void>((res) => {
        const ripple = latest.current.rippleRef.current;
        if (ripple) {
          ripple.style.animation = "none";
          void ripple.offsetWidth; // reflow to restart
          ripple.style.animation = "cursor-click 0.5s ease-out";
        }
        const t0 = performance.now();
        const dur = 170;
        const loop = (now: number) => {
          if (cancelled) return res();
          const t = clamp((now - t0) / dur, 0, 1);
          const s = t < 0.5 ? lerp(1, 0.8, t * 2) : lerp(0.8, 1, (t - 0.5) * 2);
          draw(pos, s);
          if (t < 1) rafs.push(requestAnimationFrame(loop));
          else {
            draw(pos, 1);
            res();
          }
        };
        rafs.push(requestAnimationFrame(loop));
      });

    const moveAndClick = async (el: HTMLElement, onClick?: () => void, aim?: { x?: number; y?: number }) => {
      // Travelling between targets → show the ARROW (data-over="0"). Apple/
      // macOS style: the moment the pointer settles over an interactive
      // element it swaps to the pointing HAND, then presses.
      cursor.dataset.over = "0";
      const dest = center(el, aim);
      const dx = dest.x - pos.x;
      const dy = dest.y - pos.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 130) {
        const over: Pt = {
          x: dest.x + (dx / dist) * (8 + rand() * 6),
          y: dest.y + (dy / dist) * (8 + rand() * 6),
        };
        await hop(pos, over);
        if (cancelled) return;
        await hop(over, dest);
      } else {
        await hop(pos, dest);
      }
      if (cancelled) return;
      cursor.dataset.over = "1"; // arrived over the button → pointing hand
      await wait(60 + rand() * 60); // dwell before click
      if (cancelled) return;
      await press();
      onClick?.();
    };

    // Hover beat: travel to the element and settle over it WITHOUT pressing.
    // `onArrive` paints the highlight the moment the cursor lands.
    const moveAndHover = async (el: HTMLElement, onArrive?: () => void, aim?: { x?: number; y?: number }) => {
      cursor.dataset.over = "0";
      const dest = center(el, aim);
      await hop(pos, dest);
      if (cancelled) return;
      cursor.dataset.over = "1";
      onArrive?.();
    };

    const runOnce = async () => {
      latest.current.reset();
      cursor.dataset.over = "0";
      pos = { ...start };
      draw(pos);
      await wait(latest.current.loop === false ? 320 : 700);
      for (const beat of latest.current.beats) {
        if (cancelled) return;
        if (beat.preMove) await wait(beat.preMove);
        if (cancelled) return;
        const el = beat.ref.current;
        if (el) {
          if (beat.hover) await moveAndHover(el, beat.onArrive, beat.aim);
          else await moveAndClick(el, beat.onClick, beat.aim);
        }
        if (cancelled) return;
        await wait(beat.hold);
        if (cancelled) return;
        beat.onLeave?.();
      }
    };

    (async () => {
      if (latest.current.loop === false) {
        // Segment mode: play this segment's beats once, then hand back to the
        // phase timer (which advances + loops). The cursor rests until the
        // next segment restarts the effect via `restartKey`.
        await runOnce();
        if (!cancelled) latest.current.onDone?.();
      } else {
        while (!cancelled) {
          await runOnce();
          if (cancelled) break;
          await wait(1500);
        }
      }
    })();

    return () => {
      cancelled = true;
      rafs.forEach((r) => cancelAnimationFrame(r));
      timers.forEach((t) => window.clearTimeout(t));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, frameRef, cursorRef, rippleRef, restartKey, designW]);
}
