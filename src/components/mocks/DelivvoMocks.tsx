"use client";

/**
 * Faithful reconstruction of the real Delivvo client portal, refactored to
 * mobile and rebuilt in the app's dark mode from the current portal components
 * (indigo #4F46E5 active rails, amber #F0B429 spark, rounded-xl surfaces).
 */

const C = {
  bg: "#09090b", surface: "#141416", elevated: "#1a1a1e",
  border: "rgba(255,255,255,0.08)", borderSoft: "rgba(255,255,255,0.05)",
  text: "#fafafa", slate: "#a1a1aa", faint: "#71717a",
  indigo: "#6366f1", indigoDeep: "#4f46e5", amber: "#f0b429",
  emerald: "#34d399", rose: "#fb7185",
};
const body = "var(--font-inter), sans-serif";
const mono = "var(--font-jbmono), monospace";
const display = "var(--font-unbounded), sans-serif";

function Fact({ tint, label, value, sub, glyph }: { tint: string; label: string; value: string; sub: string; glyph: string }) {
  return (
    <div style={{ borderRadius: 14, border: `1px solid ${C.border}`, background: C.surface, padding: 10 }}>
      <span style={{ display: "grid", width: 26, height: 26, placeItems: "center", borderRadius: 8, background: `${tint}22`, color: tint, fontSize: 13 }}>{glyph}</span>
      <p style={{ fontFamily: mono, fontSize: 8.5, textTransform: "uppercase", letterSpacing: "0.12em", color: C.faint, marginTop: 8 }}>{label}</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: C.text, marginTop: 2 }}>{value}</p>
      <p style={{ fontSize: 9.5, color: C.slate, marginTop: 1 }}>{sub}</p>
    </div>
  );
}

export function DelivvoPortalMobile() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: body, fontSize: 13, minHeight: 560 }}>
      {/* mobile top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, borderBottom: `1px solid ${C.border}`, background: C.surface, padding: "13px 18px" }}>
        <span style={{ width: 34, height: 34, borderRadius: 10, border: `1px solid ${C.border}`, display: "grid", placeItems: "center", color: C.slate }}>≡</span>
        <div style={{ flex: 1 }}>
          <p style={{ fontFamily: mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: C.faint, fontWeight: 600 }}>Client portal</p>
          <p style={{ fontSize: 14, fontWeight: 600 }}>Studio Noor</p>
        </div>
        <span style={{ width: 30, height: 30, borderRadius: 8, display: "grid", placeItems: "center", color: C.slate }}>◐</span>
      </div>

      <div style={{ padding: "18px 18px 22px" }}>
        {/* project header */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, borderRadius: 7, background: `${C.indigo}1f`, color: "#c7d2fe", fontSize: 10.5, fontWeight: 600, padding: "4px 9px" }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: C.indigo }} /> In progress
        </span>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.slate, marginLeft: 10 }}>Brand Refresh</span>
        <h2 style={{ fontFamily: display, fontSize: 19, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 12, lineHeight: 1.2 }}>1 file waiting for your review</h2>

        {/* fact cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
          <Fact tint={C.indigo} glyph="▤" label="Deliverables" value="4 files" sub="3 of 4 approved" />
          <Fact tint={C.emerald} glyph="₪" label="Invoice" value="AED 5,565" sub="Unpaid · INV-0042" />
          <Fact tint={C.amber} glyph="✎" label="Contract" value="Signed" sub="Maya · May 31" />
        </div>

        {/* file rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          {/* awaiting */}
          <div style={{ position: "relative", borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: "12px 12px 12px 18px" }}>
            <span style={{ position: "absolute", insetBlock: 10, left: 8, width: 4, borderRadius: 999, background: C.amber }} />
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ display: "grid", width: 42, height: 42, placeItems: "center", borderRadius: 12, background: "rgba(99,102,241,0.18)", color: "#c7d2fe", fontFamily: mono, fontSize: 11, fontWeight: 700 }}>ZIP</span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <p style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>brand-refresh-final.zip</p>
                <p style={{ fontFamily: mono, fontSize: 10.5, color: C.slate }}>v2 · 240 MB · 2 hours ago</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <span style={{ flex: 1, textAlign: "center", borderRadius: 999, background: `${C.amber}1f`, color: "#fbcf6a", fontSize: 12, fontWeight: 500, padding: "6px 0", border: `1px solid ${C.amber}33` }}>Awaiting review</span>
              <button style={{ borderRadius: 10, background: C.indigoDeep, color: "#fff", fontSize: 12.5, fontWeight: 600, padding: "6px 14px", border: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>✓ Approve</button>
              <button style={{ borderRadius: 10, background: "transparent", color: C.slate, fontSize: 12.5, fontWeight: 500, padding: "6px 12px", border: `1px solid ${C.border}` }}>Request changes</button>
            </div>
          </div>

          {/* approved */}
          <div style={{ position: "relative", borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: "12px 12px 12px 18px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ position: "absolute", insetBlock: 10, left: 8, width: 4, borderRadius: 999, background: C.emerald }} />
            <span style={{ display: "grid", width: 42, height: 42, placeItems: "center", borderRadius: 12, background: "rgba(251,113,133,0.16)", color: "#fda4af", fontFamily: mono, fontSize: 11, fontWeight: 700 }}>PDF</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <p style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>brand-guidelines.pdf</p>
              <p style={{ fontFamily: mono, fontSize: 10.5, color: C.slate }}>v1 · 8.4 MB · today</p>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, borderRadius: 999, background: `${C.emerald}1f`, color: "#6ee7b7", fontSize: 11.5, fontWeight: 500, padding: "5px 10px", border: `1px solid ${C.emerald}33` }}>✓ Approved</span>
          </div>
        </div>

        {/* client note */}
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start", borderRadius: 16, border: `1px solid ${C.border}`, background: C.surface, padding: 14, marginTop: 16 }}>
          <span style={{ display: "grid", width: 34, height: 34, placeItems: "center", borderRadius: 999, background: "rgba(251,113,133,0.18)", color: "#fda4af", fontSize: 13, fontWeight: 700 }}>M</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600 }}>Maya Haddad <span style={{ fontWeight: 400, color: C.faint }}>· just now</span></p>
            <p style={{ fontSize: 13, lineHeight: 1.5, color: C.slate, marginTop: 2 }}>This looks fantastic. Approving the final pack.</p>
          </div>
        </div>

        {/* pay footer note */}
        <p style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", fontSize: 11.5, color: C.faint, marginTop: 18 }}>
          <span style={{ color: C.emerald }}>🔒</span> Paid directly to Studio Noor, Delivvo takes 0%
        </p>
      </div>
    </div>
  );
}
