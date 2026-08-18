"use client";

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
