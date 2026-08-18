"use client";

import { BookOpen, Play, Home as HomeIcon, Search, User, Menu, Heart, Activity, Pill } from "lucide-react";

/**
 * Faithful reconstruction of the real MedA+ lesson player + curriculum rail,
 * rebuilt from the current portal components (light clinical system, teal
 * #116c90 primary, Plus Jakarta / Inter / IBM Plex Mono, 16px cards, 8px buttons,
 * the drifting per-user watermark, and the 340px lecture rail).
 */

const C = {
  bg: "#f8fafc", surface: "#ffffff", surface2: "#f1f5f9",
  ink: "#0f172a", muted: "#475569", faint: "#64748b", border: "#e2e8f0",
  primary: "#116c90", primaryLight: "#1684ac", success: "#16a34a", warning: "#f59e0b",
};
const display = "var(--font-jakarta), sans-serif";
const body = "var(--font-inter), sans-serif";
const mono = "var(--font-plexmono), monospace";

const LECTURES = [
  { n: "01", t: "Approach to any ECG", done: true },
  { n: "02", t: "Rate, rhythm, and axis", active: true },
  { n: "03", t: "The P wave and PR interval" },
  { n: "04", t: "QRS morphology" },
  { n: "05", t: "ST segments and ischemia" },
  { n: "06", t: "Putting it together: 12 cases" },
];

function Watermark() {
  const tiles = Array.from({ length: 18 });
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", transform: "rotate(-24deg) scale(1.4)" }} aria-hidden>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "26px 18px", opacity: 0.9 }}>
        {tiles.map((_, i) => (
          <span key={i} style={{ fontFamily: mono, fontSize: 10, color: "rgba(255,255,255,0.14)", whiteSpace: "nowrap", textShadow: "0 1px 2px rgba(0,0,0,0.45)" }}>
            layla@med-aplus.com · a1b2c3d4 · 2026-08-18 22:20:14
          </span>
        ))}
      </div>
    </div>
  );
}

export function MedaLessonPlayer() {
  return (
    <div style={{ background: C.bg, color: C.ink, fontFamily: body, fontSize: 13, padding: "18px 20px" }}>
      {/* back link */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: C.muted, marginBottom: 12 }}>
        ‹ Clinical ECG Essentials
      </div>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "minmax(0,1fr) 320px", alignItems: "start" }}>
        {/* MAIN */}
        <div style={{ minWidth: 0 }}>
          {/* video */}
          <div style={{ position: "relative", aspectRatio: "16 / 9", width: "100%", borderRadius: 12, overflow: "hidden", background: "#0b1220" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 40%, #14283a, #070d15)" }} />
            <Watermark />
            {/* center play */}
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
              <span style={{ display: "grid", width: 58, height: 58, placeItems: "center", borderRadius: 999, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 22 }}>▶</span>
            </div>
            {/* control bar */}
            <div style={{ position: "absolute", insetInline: 0, bottom: 0, padding: "26px 14px 10px", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
              <div style={{ position: "relative", height: 5, borderRadius: 999, background: "rgba(255,255,255,0.25)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "34%", borderRadius: 999, background: C.primaryLight }} />
                <span style={{ position: "absolute", left: "34%", top: "50%", width: 11, height: 11, borderRadius: 999, background: "#fff", transform: "translate(-50%,-50%)" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, color: "rgba(255,255,255,0.9)" }}>
                <span style={{ fontSize: 16 }}>⏸</span>
                <span style={{ fontSize: 14 }}>↺</span>
                <span style={{ fontSize: 14 }}>↻</span>
                <span style={{ fontSize: 15 }}>🔊</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: "rgba(255,255,255,0.85)" }}>4:58 / 14:32</span>
                <span style={{ flex: 1 }} />
                <span style={{ fontFamily: mono, fontSize: 11.5, color: "#7fd4ea" }}>1×</span>
                <span style={{ fontSize: 14 }}>⛶</span>
              </div>
            </div>
          </div>

          {/* meta */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, border: `1px solid ${C.success}33`, background: `${C.success}14`, color: "#15803d", fontSize: 11, fontWeight: 500, padding: "2px 8px" }}>Free preview</span>
              <span style={{ fontSize: 12, color: C.muted }}>14:32</span>
            </div>
            <h1 style={{ fontFamily: display, fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", marginTop: 8 }}>Rate, rhythm, and axis</h1>
            <p style={{ marginTop: 10, maxWidth: 560, fontSize: 13.5, lineHeight: 1.6, color: C.muted }}>
              A repeatable first-thirty-seconds routine for any strip: work out the rate two ways, name the rhythm, then place the axis. We run it on three real cases before you move on.
            </p>
          </div>

          {/* prev/next */}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: 16, marginTop: 18 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.ink, fontSize: 13.5, fontWeight: 600 }}>‹ Previous</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 40, padding: "0 16px", borderRadius: 8, background: C.primary, color: "#fff", fontSize: 13.5, fontWeight: 600 }}>Next ›</span>
          </div>
        </div>

        {/* CURRICULUM RAIL */}
        <aside style={{ borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: 16, boxShadow: "0 1px 2px rgba(15,26,46,.04), 0 12px 28px -18px rgba(15,26,46,.18)" }}>
          <p style={{ fontSize: 13, fontWeight: 600, padding: "0 4px", marginBottom: 12 }}>Lectures</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {LECTURES.map((l) => {
              const active = l.active;
              return (
                <div key={l.n} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 10, padding: "9px 12px", fontSize: 13, background: active ? `${C.primary}14` : "transparent", color: active ? C.primary : C.muted, fontWeight: active ? 600 : 400 }}>
                  <span style={{ fontFamily: mono, width: 20, fontSize: 11.5, color: active ? C.primary : C.faint }}>{l.n}</span>
                  <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.t}</span>
                  {l.done ? <span style={{ color: C.success }}>✓</span> : active ? <span style={{ color: C.primary }}>▶</span> : <span style={{ color: C.faint }}>🔒</span>}
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- student "My learning" — mobile ---------- */
const M = {
  bg: "#f8fafc", surface: "#ffffff", surface2: "#f1f5f9",
  ink: "#0f172a", muted: "#475569", faint: "#64748b", border: "#e2e8f0",
  primary: "#116c90", success: "#16a34a",
};
const mdisplay = "var(--font-jakarta), sans-serif";
const mbody = "var(--font-inter), sans-serif";
const mmono = "var(--font-plexmono), monospace";

const MY_COURSES = [
  { spec: "Cardiology", icon: Heart, title: "The heart, case by case", done: 7, total: 18, pct: 39 },
  { spec: "Emergency medicine", icon: Activity, title: "Airway management, step by step", done: 12, total: 20, pct: 60 },
  { spec: "Pharmacology", icon: Pill, title: "Drugs you'll actually prescribe", done: 2, total: 12, pct: 17 },
] as const;

export function MedaMyCoursesMobile() {
  return (
    <div style={{ background: M.bg, color: M.ink, fontFamily: mbody, fontSize: 13, minHeight: 560, display: "flex", flexDirection: "column" }}>
      {/* header */}
      <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: `${M.surface}d9`, borderBottom: `1px solid ${M.border}`, backdropFilter: "blur(6px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brands/meda/logo.png" alt="MedA+" style={{ height: 22, width: "auto" }} />
        <span style={{ width: 34, height: 34, display: "grid", placeItems: "center", color: M.muted }}><Menu size={18} /></span>
      </div>

      <div style={{ padding: "18px 16px", flex: 1 }}>
        <p style={{ fontFamily: mmono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: M.primary }}>Student</p>
        <h1 style={{ fontFamily: mdisplay, fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", marginTop: 4 }}>My learning</h1>
        <p style={{ color: M.muted, marginTop: 4, fontSize: 13 }}>Pick up where you left off.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 18 }}>
          {MY_COURSES.map((c) => (
            <div key={c.title} style={{ borderRadius: 16, border: `1px solid ${M.border}`, background: M.surface, overflow: "hidden", boxShadow: "0 1px 2px rgba(15,26,46,.04), 0 10px 24px -18px rgba(15,26,46,.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${M.border}`, background: `color-mix(in oklab, ${M.primary} 7%, ${M.surface})` }}>
                <span style={{ display: "grid", width: 34, height: 34, placeItems: "center", borderRadius: 10, background: M.surface, border: `1px solid ${M.border}`, color: M.primary }}><c.icon size={17} /></span>
                <span style={{ fontFamily: mmono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: M.primary }}>{c.spec}</span>
              </div>
              <div style={{ padding: 14 }}>
                <h3 style={{ fontFamily: mdisplay, fontWeight: 600, fontSize: 15, lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ fontFamily: mmono, fontSize: 10.5, color: M.muted, marginTop: 8 }}>{c.done}/{c.total} lectures · {c.pct}%</p>
                <div style={{ height: 6, borderRadius: 999, background: M.surface2, marginTop: 8, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, borderRadius: 999, background: M.primary }} />
                </div>
                <button style={{ marginTop: 12, width: "100%", height: 40, borderRadius: 8, background: M.primary, color: "#fff", border: "none", fontFamily: mbody, fontWeight: 600, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                  <Play size={15} /> Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      <div style={{ height: 56, display: "flex", borderTop: `1px solid ${M.border}`, background: M.surface }}>
        {[[HomeIcon, "Home", false], [BookOpen, "Courses", true], [Search, "Search", false], [User, "Profile", false]].map(([Ic, l, active]) => (
          <div key={l as string} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, color: active ? M.primary : M.faint }}>
            {(() => { const I = Ic as React.ElementType; return <I size={18} />; })()}
            <span style={{ fontFamily: mmono, fontSize: 8.5 }}>{l as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
