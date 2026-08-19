"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scales a fixed-width design (e.g. a desktop app reconstruction) down to fit its
 * container width, and collapses the outer box to the scaled height. Never scales
 * above `maxScale`. Pure transform — cheap, GPU-composited.
 */
export default function FitScale({
  designWidth,
  maxScale = 1,
  className,
  children,
}: {
  designWidth: number;
  maxScale?: number;
  className?: string;
  children: ReactNode;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(maxScale);
  const [h, setH] = useState<number | undefined>(undefined);

  useEffect(() => {
    const measure = () => {
      const w = outer.current?.clientWidth ?? designWidth;
      const s = Math.min(maxScale, w / designWidth);
      const ih = inner.current?.offsetHeight ?? 0;
      setScale(s);
      setH(ih * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, [designWidth, maxScale]);

  return (
    <div
      ref={outer}
      className={className}
      style={{ height: h, overflow: "hidden", maxWidth: designWidth, marginInline: "auto" }}
    >
      <div
        ref={inner}
        style={{ width: designWidth, transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
