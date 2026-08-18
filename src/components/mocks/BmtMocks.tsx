"use client";

/**
 * Faithful reconstructions of real BMT Materials screens, rebuilt from the
 * current app/website code (radius 0, Archivo/IBM Plex, industrial blue #006CB4,
 * mono numerals). Colors are fixed to the real tokens so the replica reads exactly
 * like the shipping product, independent of the portfolio's theme morph.
 */

const C = {
  ink: "#1A1A1A", inkSoft: "#4A453F", muted: "#6B665F",
  canvas: "#F5F3F0", surface: "#FFFFFF", line: "#B7B0A3", lineSoft: "#E7E3DD",
  brand: "#006CB4", brandDark: "#00538C", brandTint: "#E6F1F9",
  steel: "#2A2825", success: "#2E7D46", danger: "#B3261E",
};
const display = "var(--font-archivo), sans-serif";
const body = "var(--font-plexsans), sans-serif";
const mono = "var(--font-plexmono), monospace";

/* ---------- SCREEN 1: mobile product detail page ---------- */
export function BmtProductPageMobile() {
  const crumbs = ["Home", "All products", "Interlock", "8cm Charcoal"];
  const specs = [
    ["Dimensions", "20 × 10 × 8 cm"],
    ["Material", "Vibro-pressed concrete"],
    ["Finish", "Smooth charcoal"],
    ["Coverage", "50 pcs / m²"],
  ];
  const facts = [
    ["Unit of sale", "m²"], ["Packaging", "1 pallet = 10 m²"],
    ["Minimum order", "10 m²"], ["Weight / unit", "180 kg"],
  ];
  return (
    <div style={{ background: C.canvas, color: C.ink, fontFamily: body, fontSize: 13, lineHeight: 1.5 }}>
      {/* app header */}
      <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: C.surface, borderBottom: `1px solid ${C.line}` }}>
        <span style={{ fontFamily: display, fontWeight: 800, fontSize: 15 }}>BMT</span>
        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>Building materials</span>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 26, height: 26, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", color: C.ink }}>⌕</span>
          <span style={{ width: 26, height: 26, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", color: C.ink }}>▤</span>
        </div>
      </div>

      <div style={{ padding: "14px 16px 20px" }}>
        {/* breadcrumb */}
        <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {crumbs.map((c, i) => (
            <span key={c} style={{ color: i === crumbs.length - 1 ? C.ink : C.muted }}>{c}{i < crumbs.length - 1 ? " ›" : ""}</span>
          ))}
        </div>

        {/* gallery */}
        <div style={{ position: "relative", aspectRatio: "1", border: `1px solid ${C.line}`, background: "#fff", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/bmt/interlock-1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <span style={{ position: "absolute", left: 0, top: 0, background: C.brand, color: "#fff", fontFamily: mono, fontSize: 11, fontWeight: 600, padding: "3px 7px" }}>-12%</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {["interlock-1", "tiles-1", "natural-stone-1"].map((f, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={f} src={`/brands/bmt/${f}.jpg`} alt="" style={{ width: 54, height: 54, objectFit: "cover", border: `1px solid ${i === 0 ? C.ink : C.line}` }} />
          ))}
        </div>

        {/* title + meta */}
        <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 26, lineHeight: 1.1, marginTop: 18 }}>Rectangular Interlock 8cm, Charcoal</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <span style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>SKU: BMT-1001</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, border: `1px solid ${C.success}33`, background: `${C.success}1a`, color: C.success, fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", padding: "2px 7px" }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: C.success }} /> In stock
          </span>
        </div>
        <p style={{ marginTop: 14, color: C.inkSoft, fontSize: 13.5, lineHeight: 1.6 }}>
          Heavy 8cm rectangular paver in deep charcoal, built for driveways, yards, and roads that take real traffic. The dense concrete face resists abrasion and holds its colour under the Jordanian sun.
        </p>

        {/* price */}
        <div style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "16px 0", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5, fontFamily: mono }}>
            <span style={{ fontSize: 30, fontWeight: 600, color: C.ink }}>8.50</span>
            <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>JOD</span>
            <span style={{ fontSize: 14, color: C.muted }}>/ m²</span>
          </div>
          <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.muted, marginTop: 6 }}>Price excludes delivery</p>
        </div>

        {/* variant chips */}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.inkSoft, marginBottom: 8 }}>Thickness</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["6cm", "8cm"].map((v) => (
              <span key={v} style={{ padding: "7px 14px", border: `1px solid ${v === "8cm" ? C.ink : C.line}`, background: v === "8cm" ? C.ink : "transparent", color: v === "8cm" ? "#fff" : C.ink, fontSize: 13, fontWeight: 500 }}>{v}</span>
            ))}
          </div>
        </div>

        {/* bulk tiers */}
        <div style={{ marginTop: 16, border: `1px solid ${C.line}` }}>
          <div style={{ borderBottom: `1px solid ${C.line}`, background: C.canvas, padding: "8px 14px", fontFamily: mono, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.ink }}>Bulk pricing</div>
          {[["10+ m²", "8.50 JOD", C.ink], ["100+ m²", "7.90 JOD", C.brandDark], ["500+ m²", "7.40 JOD", C.brandDark]].map(([q, p, col], i) => (
            <div key={q} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: i < 2 ? `1px solid ${C.lineSoft}` : "none" }}>
              <span style={{ color: C.inkSoft, fontSize: 13 }}>{q}</span>
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: col }}>{p}</span>
            </div>
          ))}
        </div>

        {/* quantity + total */}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.inkSoft, marginBottom: 8 }}>Quantity (m²)</p>
            <div style={{ height: 44, display: "flex", border: `1px solid ${C.line}` }}>
              <span style={{ width: 40, display: "grid", placeItems: "center" }}>−</span>
              <span style={{ width: 54, display: "grid", placeItems: "center", borderLeft: `1px solid ${C.line}`, borderRight: `1px solid ${C.line}`, fontFamily: mono, fontWeight: 600 }}>10</span>
              <span style={{ width: 40, display: "grid", placeItems: "center" }}>+</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>Total</p>
            <div style={{ fontFamily: mono, display: "flex", alignItems: "baseline", gap: 4, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 24, fontWeight: 600 }}>85.00</span><span style={{ fontSize: 13, color: C.muted }}>JOD</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button style={{ flex: 1, height: 44, background: C.ink, color: "#fff", border: `1px solid ${C.ink}`, fontFamily: body, fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>▷ Add to cart</button>
          <button style={{ height: 44, padding: "0 16px", border: `1px solid ${C.line}`, background: C.surface, color: C.ink, fontSize: 14 }}>Share</button>
        </div>

        {/* delivery note */}
        <div style={{ marginTop: 16, display: "flex", gap: 12, border: `1px solid ${C.line}`, background: C.canvas, padding: 14 }}>
          <span style={{ color: C.brandDark, fontSize: 16 }}>⛟</span>
          <div>
            <p style={{ color: C.inkSoft, fontSize: 13, lineHeight: 1.55 }}>Delivery is worked out at checkout, based on the distance from our Sahab yard and how much you order.</p>
            <p style={{ marginTop: 8, color: C.brandDark, fontFamily: body, fontSize: 13, fontWeight: 500 }}>Open the calculator →</p>
          </div>
        </div>

        {/* quick facts */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${C.line}`, borderLeft: `1px solid ${C.line}` }}>
          {facts.map(([k, v]) => (
            <div key={k} style={{ borderRight: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface, padding: 12 }}>
              <p style={{ fontFamily: mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>{k}</p>
              <p style={{ fontWeight: 600, fontSize: 13, marginTop: 3 }}>{v}</p>
            </div>
          ))}
        </div>

        {/* specifications */}
        <h2 style={{ fontFamily: display, fontWeight: 700, fontSize: 20, marginTop: 26 }}>Specifications</h2>
        <div style={{ marginTop: 12, border: `1px solid ${C.line}` }}>
          {specs.map(([k, v], i) => (
            <div key={k} style={{ display: "flex", background: i % 2 ? C.canvas : C.surface, borderBottom: i < specs.length - 1 ? `1px solid ${C.lineSoft}` : "none" }}>
              <div style={{ width: "38%", borderRight: `1px solid ${C.line}`, padding: "10px 12px", color: C.inkSoft, fontWeight: 500 }}>{k}</div>
              <div style={{ flex: 1, padding: "10px 12px" }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div style={{ height: 52, display: "flex", borderTop: `1px solid ${C.line}`, background: C.surface }}>
        {[["⌂", "Home", false], ["▦", "Shop", true], ["▤", "Cart", false], ["◔", "Account", false], ["⋯", "More", false]].map(([ic, l, active]) => (
          <div key={l as string} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, color: active ? C.brand : C.muted, position: "relative" }}>
            {active ? <span style={{ position: "absolute", top: 0, width: 28, height: 2.5, background: C.brand }} /> : null}
            <span style={{ fontSize: 16 }}>{ic as string}</span>
            <span style={{ fontFamily: mono, fontSize: 9 }}>{l as string}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- SCREEN 2: admin dashboard (sidebar 256px + products manager) ---------- */
export function BmtAdmin() {
  const nav = [
    { g: "Overview", items: [["Overview", false, null], ["Revenue", false, null]] },
    { g: "Catalog", items: [["Categories", false, null], ["Products", true, null], ["Pricing & shipping", false, null]] },
    { g: "Operations", items: [["Orders", false, "6"], ["Invoices", false, null], ["Payment verification", false, "3"], ["Quote requests", false, null]] },
    { g: "System", items: [["Payment gateway", false, null], ["Store settings", false, null]] },
  ] as const;
  const rows = [
    ["BMT-1001", "Rectangular Interlock 8cm, Charcoal", "Interlock", "m²", "8.50", "In stock", C.success],
    ["BMT-3001", "Polished Porcelain 60×60, Beige", "Tiles", "m²", "11.50", "In stock", C.success],
    ["BMT-4001", "Ivory Limestone Cladding, Ma'an", "Natural stone", "m²", "16.00", "Low stock", C.brandDark],
    ["BMT-6001", "Portland Cement OPC 42.5, 50kg", "Cement", "bag", "4.50", "In stock", C.success],
  ] as const;
  return (
    <div style={{ display: "flex", background: "#F6F6F6", color: C.ink, fontFamily: body, fontSize: 13, minHeight: 420 }}>
      {/* sidebar 256px */}
      <aside style={{ width: 200, flexShrink: 0, background: C.steel, color: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "14px 16px", fontFamily: display, fontWeight: 800, fontSize: 15 }}>BMT <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: "0.16em", color: "rgba(255,255,255,0.6)" }}>ADMIN</span></div>
        <div style={{ padding: "12px 10px", overflow: "hidden", flex: 1 }}>
          {nav.map((grp) => (
            <div key={grp.g} style={{ marginBottom: 14 }}>
              <p style={{ padding: "0 8px 6px", fontFamily: mono, fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)" }}>{grp.g}</p>
              {grp.items.map(([label, active, badge]) => (
                <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 8, borderLeft: `2px solid ${active ? C.brand : "transparent"}`, background: active ? "rgba(255,255,255,0.06)" : "transparent", padding: "7px 9px", fontSize: 12.5, color: active ? "#fff" : "rgba(255,255,255,0.7)", fontWeight: active ? 500 : 400 }}>
                  <span style={{ width: 14, height: 14, border: "1.4px solid currentColor", opacity: 0.7, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{label as string}</span>
                  {badge ? <span style={{ minWidth: 18, textAlign: "center", background: C.brand, color: "#fff", fontFamily: mono, fontSize: 9.5, fontWeight: 700, padding: "1px 5px" }}>{badge as string}</span> : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* content */}
      <main style={{ flex: 1, minWidth: 0, padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, borderBottom: `1px solid ${C.line}`, paddingBottom: 14, marginBottom: 14, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 24 }}>Products</h1>
            <p style={{ color: C.inkSoft, marginTop: 3, fontSize: 12.5 }}>Changes save to the live store and show up for every visitor right away.</p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.success}4d`, background: `${C.success}1a`, color: C.success, fontFamily: mono, fontSize: 10, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", padding: "6px 10px" }}>◉ Live on storefront</span>
            <span style={{ height: 34, display: "inline-flex", alignItems: "center", background: C.brand, color: "#fff", fontSize: 13, fontWeight: 600, padding: "0 14px" }}>+ Add product</span>
          </div>
        </div>

        {/* KPI tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
          {[["Products", "43", C.ink], ["Low stock", "5", C.brandDark], ["Out of stock", "2", C.danger], ["Turned off", "3", C.muted]].map(([l, v, col]) => (
            <div key={l as string} style={{ border: `1px solid ${C.line}`, background: C.surface, padding: "10px 12px" }}>
              <p style={{ fontFamily: mono, fontSize: 15, fontWeight: 600, color: col as string }}>{v as string}</p>
              <p style={{ fontFamily: mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted, marginTop: 4 }}>{l as string}</p>
            </div>
          ))}
        </div>

        {/* table */}
        <div style={{ border: `1px solid ${C.line}`, background: C.surface, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 0.6fr 0.8fr 1fr 0.7fr", background: C.canvas, borderBottom: `1px solid ${C.line}`, fontFamily: mono, fontSize: 9.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: C.muted }}>
            {["Product", "Category", "Unit", "Price", "Status", "Live"].map((h) => <div key={h} style={{ padding: "9px 10px", textAlign: h === "Price" ? "right" : "left" }}>{h}</div>)}
          </div>
          {rows.map(([sku, name, cat, unit, price, status, col], i) => (
            <div key={sku as string} style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 0.6fr 0.8fr 1fr 0.7fr", borderBottom: i < rows.length - 1 ? `1px solid ${C.lineSoft}` : "none", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center", padding: "9px 10px" }}>
                <span style={{ width: 30, height: 30, border: `1px solid ${C.line}`, background: C.canvas, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontWeight: 500, fontSize: 12, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name as string}</p>
                  <p style={{ fontFamily: mono, fontSize: 9.5, color: C.muted }}>{sku as string}</p>
                </div>
              </div>
              <div style={{ padding: "9px 10px", color: C.inkSoft, fontSize: 12 }}>{cat as string}</div>
              <div style={{ padding: "9px 10px", fontFamily: mono, fontSize: 11 }}>{unit as string}</div>
              <div style={{ padding: "9px 10px", fontFamily: mono, textAlign: "right", fontSize: 12 }}>{price as string}</div>
              <div style={{ padding: "9px 10px" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, border: `1px solid ${col as string}44`, color: col as string, fontFamily: mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.05em", padding: "2px 6px" }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: col as string }} />{status as string}
                </span>
              </div>
              <div style={{ padding: "9px 10px" }}><span style={{ width: 30, height: 16, background: C.brand, display: "inline-block", position: "relative" }}><span style={{ position: "absolute", right: 2, top: 2, width: 12, height: 12, background: "#fff" }} /></span></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
