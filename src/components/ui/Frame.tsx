"use client";

import type { ReactNode } from "react";

/** A browser-window frame around a screenshot or live mock. */
export function BrowserFrame({
  url,
  children,
  className,
}: {
  url?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`frame shadow-2xl ${className ?? ""}`}>
      <div className="browserbar">
        <i />
        <i />
        <i />
        {url && (
          <span className="type-mono ml-3 truncate text-[0.68rem] text-muted">{url}</span>
        )}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

/** A phone frame for mobile app / storefront screenshots. */
export function PhoneFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden border ${className ?? ""}`}
      style={{
        borderRadius: 34,
        borderColor: "var(--border)",
        background: "var(--surface)",
        padding: 8,
        boxShadow: "0 40px 80px -40px rgba(0,0,0,0.55)",
      }}
    >
      <div className="overflow-hidden" style={{ borderRadius: 26 }}>
        {children}
      </div>
    </div>
  );
}

/** A plain screenshot, lazy + non-distorting. */
export function Shot({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`block h-auto w-full ${className ?? ""}`}
    />
  );
}
