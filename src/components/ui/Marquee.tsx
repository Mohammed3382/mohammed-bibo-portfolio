"use client";

import type { ReactNode } from "react";

/** Seamless looping marquee. Two identical tracks so the loop never gaps. */
export default function Marquee({
  children,
  reverse = false,
  duration = 34,
  className,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
  className?: string;
}) {
  const style = {
    animationDuration: `${duration}s`,
    animationDirection: reverse ? ("reverse" as const) : ("normal" as const),
  };
  return (
    <div className={`marquee ${className ?? ""}`}>
      <div className="marquee__track" style={style}>
        {children}
      </div>
      <div className="marquee__track" style={style} aria-hidden>
        {children}
      </div>
    </div>
  );
}
