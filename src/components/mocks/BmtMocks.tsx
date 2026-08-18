"use client";

import {
  LayoutDashboard, Coins, LayoutGrid, Package, MapPin, CalendarClock,
  ShoppingBag, ReceiptText, CreditCard, FileText, Undo2, Users, Star,
  Store, LogOut, TrendingUp, Clock, PackageX, Wallet, Download, Search, Menu,
} from "lucide-react";

/**
 * Faithful reconstructions of real BMT Materials screens, rebuilt from the live
 * app + code with DUMMY data (radius 0, Archivo/IBM Plex, industrial blue #006CB4,
 * mono numerals). Colours are fixed to the real tokens so the replica reads like
 * the shipping product independent of the portfolio's theme.
 */

const C = {
  ink: "#1A1A1A", inkSoft: "#4A453F", muted: "#6B665F",
  canvas: "#F5F3F0", adminBg: "#F6F6F6", surface: "#FFFFFF",
  line: "#B7B0A3", lineSoft: "#E7E3DD",
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
    ["Dimensions", "20 × 10 × 8 cm"], ["Material", "Vibro-pressed concrete"],
    ["Finish", "Smooth charcoal"], ["Coverage", "50 pcs / m²"],
  ];
  const facts = [
    ["Unit of sale", "m²"], ["Packaging", "1 pallet = 10 m²"],
    ["Minimum order", "10 m²"], ["Weight / unit", "180 kg"],
  ];
  return (
    <div style={{ background: C.canvas, color: C.ink, fontFamily: body, fontSize: 13, lineHeight: 1.5 }}>
      <div style={{ height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", background: C.surface, borderBottom: `1px solid ${C.line}` }}>
        <span style={{ fontFamily: display, fontWeight: 800, fontSize: 15 }}>BMT</span>
        <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: "0.16em", color: C.muted, textTransform: "uppercase" }}>Building materials</span>
        <div style={{ display: "flex", gap: 6 }}>
          <span style={{ width: 26, height: 26, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", color: C.ink }}><Search size={14} /></span>
          <span style={{ width: 26, height: 26, border: `1px solid ${C.line}`, display: "grid", placeItems: "center", color: C.ink }}><Menu size={14} /></span>
        </div>
      </div>
      <div style={{ padding: "14px 16px 20px" }}>
        <div style={{ fontFamily: mono, fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {crumbs.map((c, i) => <span key={c} style={{ color: i === crumbs.length - 1 ? C.ink : C.muted }}>{c}{i < crumbs.length - 1 ? " ›" : ""}</span>)}
        </div>
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
        <div style={{ borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "16px 0", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 5, fontFamily: mono }}>
            <span style={{ fontSize: 30, fontWeight: 600, color: C.ink }}>8.50</span>
            <span style={{ fontSize: 14, color: C.muted, fontWeight: 500 }}>JOD</span>
            <span style={{ fontSize: 14, color: C.muted }}>/ m²</span>
          </div>
          <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: C.muted, marginTop: 6 }}>Price excludes delivery</p>
        </div>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.inkSoft, marginBottom: 8 }}>Thickness</p>
          <div style={{ display: "flex", gap: 8 }}>
            {["6cm", "8cm"].map((v) => (
              <span key={v} style={{ padding: "7px 14px", border: `1px solid ${v === "8cm" ? C.ink : C.line}`, background: v === "8cm" ? C.ink : "transparent", color: v === "8cm" ? "#fff" : C.ink, fontSize: 13, fontWeight: 500 }}>{v}</span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 16, border: `1px solid ${C.line}` }}>
          <div style={{ borderBottom: `1px solid ${C.line}`, background: C.canvas, padding: "8px 14px", fontFamily: mono, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: C.ink }}>Bulk pricing</div>
          {[["10+ m²", "8.50 JOD", C.ink], ["100+ m²", "7.90 JOD", C.brandDark], ["500+ m²", "7.40 JOD", C.brandDark]].map(([q, p, col], i) => (
            <div key={q} style={{ display: "flex", justifyContent: "space-between", padding: "9px 14px", borderBottom: i < 2 ? `1px solid ${C.lineSoft}` : "none" }}>
              <span style={{ color: C.inkSoft, fontSize: 13 }}>{q}</span>
              <span style={{ fontFamily: mono, fontSize: 13, fontWeight: 600, color: col }}>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
          <button style={{ flex: 1, height: 44, background: C.ink, color: "#fff", border: `1px solid ${C.ink}`, fontFamily: body, fontWeight: 500, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>Add to cart</button>
          <button style={{ height: 44, padding: "0 16px", border: `1px solid ${C.line}`, background: C.surface, color: C.ink, fontSize: 14 }}>Share</button>
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12, border: `1px solid ${C.line}`, background: C.canvas, padding: 14 }}>
          <MapPin size={16} color={C.brandDark} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ color: C.inkSoft, fontSize: 13, lineHeight: 1.55 }}>Delivery is worked out at checkout, based on the distance from our Sahab yard and how much you order.</p>
            <p style={{ marginTop: 8, color: C.brandDark, fontFamily: body, fontSize: 13, fontWeight: 500 }}>Open the calculator →</p>
          </div>
        </div>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: `1px solid ${C.line}`, borderLeft: `1px solid ${C.line}` }}>
          {facts.map(([k, v]) => (
            <div key={k} style={{ borderRight: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, background: C.surface, padding: 12 }}>
              <p style={{ fontFamily: mono, fontSize: 9.5, textTransform: "uppercase", letterSpacing: "0.08em", color: C.muted }}>{k}</p>
              <p style={{ fontWeight: 600, fontSize: 13, marginTop: 3 }}>{v}</p>
            </div>
          ))}
        </div>
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
    </div>
  );
}

/* ---------- SCREEN 2: admin dashboard overview (light, charts, real logo) ---------- */
function NavItem({ icon: Icon, label, active, badge }: { icon: React.ElementType; label: string; active?: boolean; badge?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, borderLeft: `2px solid ${active ? C.brand : "transparent"}`, background: active ? "#EEF1F4" : "transparent", padding: "7px 10px", fontSize: 12.5, color: active ? C.ink : C.inkSoft, fontWeight: active ? 600 : 400 }}>
      <Icon size={15} color={active ? C.brand : C.muted} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge ? <span style={{ minWidth: 18, textAlign: "center", background: C.brand, color: "#fff", fontFamily: mono, fontSize: 9.5, fontWeight: 700, padding: "1px 5px" }}>{badge}</span> : null}
    </div>
  );
}

function Kpi({ label, value, sub, icon: Icon, accent }: { label: string; value: string; sub: string; icon: React.ElementType; accent?: boolean }) {
  return (
    <div style={{ border: `1px solid ${C.line}`, borderLeft: accent ? `2px solid ${C.brand}` : `1px solid ${C.line}`, background: C.surface, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted }}>{label}</span>
        <Icon size={13} color={C.muted} />
      </div>
      <p style={{ fontFamily: mono, fontSize: 22, fontWeight: 600, color: C.ink, marginTop: 8 }}>{value}</p>
      <p style={{ fontFamily: mono, fontSize: 9.5, color: C.muted, marginTop: 3 }}>{sub}</p>
    </div>
  );
}

export function BmtAdmin() {
  const bars = [30, 22, 41, 28, 35, 52, 44, 38, 60, 48, 55, 96];
  const maxBar = Math.max(...bars);
  return (
    <div style={{ display: "flex", background: C.adminBg, color: C.ink, fontFamily: body, fontSize: 13, minHeight: 460 }}>
      {/* sidebar */}
      <aside style={{ width: 210, flexShrink: 0, background: C.surface, borderRight: `1px solid ${C.lineSoft}`, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 14px", borderBottom: `1px solid ${C.lineSoft}` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brands/bmt/logo-icon.png" alt="BMT" style={{ height: 28, width: "auto" }} />
          <span style={{ lineHeight: 1 }}>
            <span style={{ fontFamily: display, fontWeight: 800, fontSize: 15, display: "block", color: C.ink }}>BMT</span>
            <span style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: "0.18em", color: C.muted, textTransform: "uppercase" }}>Building materials</span>
          </span>
        </div>
        <div style={{ padding: "10px 8px", overflow: "hidden", flex: 1 }}>
          {[
            { g: "Overview", items: [[LayoutDashboard, "Overview", true, null], [Coins, "Revenue", false, null]] },
            { g: "Catalog", items: [[LayoutGrid, "Categories", false, null], [Package, "Products", false, null], [Coins, "Pricing & shipping", false, null]] },
            { g: "Operations", items: [[ShoppingBag, "Orders", false, "3"], [ReceiptText, "Invoices", false, null], [CreditCard, "Payment verification", false, "2"], [FileText, "Quote requests", false, null], [Undo2, "Returns & refunds", false, null]] },
            { g: "Customers", items: [[Users, "Customers", false, null], [Star, "Reviews", false, null]] },
          ].map((grp) => (
            <div key={grp.g} style={{ marginBottom: 12 }}>
              <p style={{ padding: "0 10px 5px", fontFamily: mono, fontSize: 8.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.16em", color: C.muted }}>{grp.g}</p>
              {(grp.items as [React.ElementType, string, boolean, string | null][]).map(([Icon, label, active, badge]) => (
                <NavItem key={label} icon={Icon} label={label} active={active} badge={badge ?? undefined} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.lineSoft}`, padding: "8px" }}>
          <NavItem icon={Store} label="View storefront" />
          <NavItem icon={LogOut} label="Sign out" />
        </div>
      </aside>

      {/* content */}
      <main style={{ flex: 1, minWidth: 0, padding: "18px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <h1 style={{ fontFamily: display, fontWeight: 800, fontSize: 24 }}>Overview</h1>
            <p style={{ color: C.inkSoft, marginTop: 3, fontSize: 12.5 }}>Your store at a glance: orders, revenue, and what needs attention.</p>
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${C.line}`, background: C.surface, fontSize: 12.5, fontWeight: 500, padding: "7px 12px", color: C.ink }}><Download size={13} /> Export</span>
        </div>

        {/* KPI tiles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 10, marginBottom: 16 }}>
          <Kpi label="Orders today" value="4" sub="+2 vs yesterday" icon={ShoppingBag} accent />
          <Kpi label="Revenue today" value="640" sub="JOD" icon={Wallet} accent />
          <Kpi label="This month" value="3,809" sub="JOD" icon={TrendingUp} />
          <Kpi label="Pending" value="3" sub="orders" icon={Clock} />
          <Kpi label="New quotes" value="1" sub="to review" icon={FileText} />
          <Kpi label="Low stock" value="0" sub="items" icon={PackageX} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 12 }}>
          {/* sales over time */}
          <div style={{ border: `1px solid ${C.line}`, background: C.surface }}>
            <div style={{ borderBottom: `1px solid ${C.line}`, padding: "10px 14px", fontFamily: mono, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: C.ink }}>Sales over time</div>
            <div style={{ padding: "18px 14px 10px", display: "flex", alignItems: "flex-end", gap: 6, height: 170 }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ width: "100%", height: `${(b / maxBar) * 120}px`, background: i === bars.length - 1 ? C.brand : "#CFE0EE" }} />
                  <span style={{ fontFamily: mono, fontSize: 7, color: C.muted }}>W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* revenue by category */}
          <div style={{ border: `1px solid ${C.line}`, background: C.surface }}>
            <div style={{ borderBottom: `1px solid ${C.line}`, padding: "10px 14px", fontFamily: mono, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: C.ink }}>Revenue by category</div>
            <div style={{ padding: 16 }}>
              {[["Tiles", 2725, "100%"], ["Interlock", 207, "18%"]].map(([name, val, w]) => (
                <div key={name as string} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                    <span style={{ color: C.ink }}>{name as string}</span>
                    <span style={{ fontFamily: mono, color: C.ink }}>{(val as number).toLocaleString()} JOD</span>
                  </div>
                  <div style={{ height: 8, background: C.lineSoft }}><div style={{ height: "100%", width: w as string, background: C.brand }} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* payment mix + aggregates */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr", gap: 12, marginTop: 12 }}>
          <div style={{ border: `1px solid ${C.line}`, background: C.surface, padding: 16, display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="88" height="88" viewBox="0 0 42 42" aria-hidden>
              <circle cx="21" cy="21" r="15.9" fill="none" stroke={C.brand} strokeWidth="7" strokeDasharray="67 33" transform="rotate(-90 21 21)" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke={C.steel} strokeWidth="7" strokeDasharray="33 67" strokeDashoffset="-67" transform="rotate(-90 21 21)" />
            </svg>
            <div>
              <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted, marginBottom: 10 }}>Payment method mix</p>
              <p style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}><span style={{ width: 9, height: 9, background: C.brand }} /> CliQ <span style={{ fontFamily: mono, color: C.muted, marginLeft: "auto" }}>67%</span></p>
              <p style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 7 }}><span style={{ width: 9, height: 9, background: C.steel }} /> Bank transfer <span style={{ fontFamily: mono, color: C.muted, marginLeft: "auto" }}>33%</span></p>
            </div>
          </div>
          <div style={{ border: `1px solid ${C.line}`, background: C.surface, padding: 16 }}>
            <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted }}>Orders</p>
            <p style={{ fontFamily: mono, fontSize: 24, fontWeight: 600, marginTop: 8 }}>3</p>
          </div>
          <div style={{ border: `1px solid ${C.line}`, background: C.surface, padding: 16 }}>
            <p style={{ fontFamily: mono, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: C.muted }}>Avg order value</p>
            <p style={{ fontFamily: mono, fontSize: 24, fontWeight: 600, marginTop: 8 }}>1,269 <span style={{ fontSize: 13, color: C.muted }}>JOD</span></p>
          </div>
        </div>
      </main>
    </div>
  );
}
