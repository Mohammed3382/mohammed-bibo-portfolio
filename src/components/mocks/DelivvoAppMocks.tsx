"use client";

import {
  LayoutDashboard, Users, FolderKanban, MessageCircle, CalendarDays,
  Receipt, Wallet, Palette, BarChart3, Settings, ArrowLeft,
  Search, Bell, Moon, ChevronDown, Clock, TrendingUp,
  FolderOpen, FileSignature, ArrowUpRight, Eye, Download,
  MoreHorizontal, Check, Lock,
} from "lucide-react";

/**
 * Premium dark-mode reconstructions of the real Delivvo app (freelancer dashboard
 * + client portal), rebuilt with DUMMY data for a portfolio showcase. Colours are
 * fixed to Delivvo's dark tokens (indigo #6366f1 accent, zinc surfaces, Unbounded /
 * Inter / JetBrains Mono) so the replica reads like the shipping product regardless
 * of the surrounding page theme.
 */

const C = {
  bg: "#09090b",
  surface: "#141416",
  elevated: "#1a1a1e",
  border: "rgba(255,255,255,0.08)",
  text: "#fafafa",
  muted: "#a1a1aa",
  faint: "#71717a",
  indigo: "#6366f1",
  indigoHover: "#4f46e5",
  indigoText: "#c7d2fe",
  indigoTint: "rgba(99,102,241,0.12)",
  amber: "#f0b429",
  emerald: "#34d399",
  rose: "#fb7185",
};

const display = "var(--font-unbounded), sans-serif";
const body = "var(--font-inter), sans-serif";
const mono = "var(--font-jbmono), monospace";

const labelMono: React.CSSProperties = {
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: C.faint,
};
const tnum: React.CSSProperties = { fontVariantNumeric: "tabular-nums" };

/* ============================================================
   COMPONENT 1 — DelivvoDashboard (the freelancer's workspace)
   ============================================================ */

type NavItem = { label: string; icon: React.ElementType; active?: boolean };
const NAV_TOP: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, active: true },
];
const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Work",
    items: [
      { label: "Clients", icon: Users },
      { label: "Projects", icon: FolderKanban },
      { label: "Messages", icon: MessageCircle },
      { label: "Calendar", icon: CalendarDays },
    ],
  },
  {
    title: "Get paid",
    items: [
      { label: "Invoices & contracts", icon: Receipt },
      { label: "Payments", icon: Wallet },
    ],
  },
  {
    title: "Grow",
    items: [
      { label: "Branding & templates", icon: Palette },
      { label: "Analytics", icon: BarChart3 },
    ],
  },
];

function NavRow({ label, icon: Icon, active }: NavItem) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        color: active ? C.indigoText : C.muted,
        background: active ? C.indigoTint : "transparent",
      }}
    >
      {active && (
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: 3,
            height: 18,
            borderRadius: 999,
            background: C.indigo,
          }}
        />
      )}
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 26,
          height: 26,
          borderRadius: 7,
          background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
          color: active ? C.indigoText : C.faint,
          flexShrink: 0,
        }}
      >
        <Icon size={16} />
      </span>
      <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
    </div>
  );
}

type Kpi = { label: string; icon: React.ElementType; value: string; sub: string; valueColor?: string };
const KPIS: Kpi[] = [
  { label: "Active projects", icon: FolderKanban, value: "4", sub: "Nothing waiting on you" },
  { label: "Total clients", icon: Users, value: "5", sub: "Across every project" },
  { label: "Pending approvals", icon: Clock, value: "1", sub: "One to review" },
  { label: "Paid this month", icon: TrendingUp, value: "AED 5,565", sub: "Invoices marked paid", valueColor: C.emerald },
];

function KpiCard({ label, icon: Icon, value, sub, valueColor }: Kpi) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={labelMono}>{label}</span>
        <Icon size={16} color={C.muted} />
      </div>
      <div
        style={{
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginTop: 14,
          color: valueColor ?? C.text,
          ...tnum,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4 }}>{sub}</div>
    </div>
  );
}

const SCHED_CHIPS: { label: string; dot?: string; active?: boolean }[] = [
  { label: "All 4", active: true },
  { label: "Meetings", dot: C.indigo },
  { label: "Projects", dot: C.emerald },
  { label: "Milestones", dot: C.amber },
  { label: "Invoices", dot: C.rose },
  { label: "Recurring", dot: C.muted },
];

const SCHED_ROWS: { dot: string; title: string; sub: string; time: string }[] = [
  { dot: C.indigo, title: "Kickoff call", sub: "Omar Faris", time: "Tomorrow · 2:00 PM" },
  { dot: C.amber, title: "Brand Refresh", sub: "deadline", time: "In 3 days · Jun 17" },
  { dot: C.rose, title: "INV-0042 due", sub: "Maya Haddad", time: "Jun 24" },
];

function SegBtn({ label, active }: { label: string; active?: boolean }) {
  return (
    <span
      style={{
        padding: "5px 12px",
        borderRadius: 7,
        fontSize: 12.5,
        fontWeight: active ? 600 : 500,
        color: active ? C.text : C.faint,
        background: active ? C.elevated : "transparent",
        border: active ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      {label}
    </span>
  );
}

export function DelivvoDashboard() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: 700,
        background: C.bg,
        color: C.text,
        fontFamily: body,
        fontSize: 13,
      }}
    >
      {/* ---------- SIDEBAR ---------- */}
      <aside
        style={{
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "4px 6px 4px 4px" }}>
          <span
            style={{
              display: "grid",
              placeItems: "center",
              width: 36,
              height: 36,
              borderRadius: 10,
              background: C.indigo,
              color: "#fff",
              fontFamily: display,
              fontWeight: 700,
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            D
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Delivvo HQ</div>
            <span
              style={{
                display: "inline-block",
                marginTop: 4,
                padding: "2px 6px",
                borderRadius: 5,
                background: C.indigoTint,
                color: C.indigoText,
                fontFamily: mono,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Agency
            </span>
          </div>
        </div>

        {/* nav */}
        <nav style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 3 }}>
          {NAV_TOP.map((n) => (
            <NavRow key={n.label} {...n} />
          ))}
          {NAV_GROUPS.map((g) => (
            <div key={g.title} style={{ marginTop: 16 }}>
              <div style={{ ...labelMono, fontSize: 9, letterSpacing: "0.16em", padding: "0 10px", marginBottom: 6 }}>
                {g.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {g.items.map((n) => (
                  <NavRow key={n.label} {...n} />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* bottom */}
        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 3 }}>
            <NavRow label="Settings" icon={Settings} />
            <NavRow label="Back to landing" icon={ArrowLeft} />
          </div>
        </div>
      </aside>

      {/* ---------- MAIN ---------- */}
      <main style={{ background: C.bg, padding: "20px 24px 24px" }}>
        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ ...labelMono, fontSize: 10 }}>Workspace</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>Delivvo HQ</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {[Search, Bell, Moon].map((Ic, i) => (
              <span
                key={i}
                style={{
                  position: "relative",
                  display: "grid",
                  placeItems: "center",
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  border: `1px solid ${C.border}`,
                  background: C.surface,
                  color: C.muted,
                }}
              >
                <Ic size={16} />
                {i === 1 && (
                  <span
                    style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      background: C.rose,
                      border: `1.5px solid ${C.surface}`,
                    }}
                  />
                )}
              </span>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 34,
                padding: "0 10px 0 4px",
                borderRadius: 999,
                border: `1px solid ${C.border}`,
                background: C.surface,
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 26,
                  height: 26,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${C.indigo}, ${C.indigoHover})`,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                M
              </span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Mohammed</span>
              <ChevronDown size={14} color={C.faint} />
            </div>
          </div>
        </div>

        {/* heading */}
        <div style={{ marginTop: 26 }}>
          <h1 style={{ fontFamily: display, fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Hi, Studio.
          </h1>
          <p style={{ color: C.muted, marginTop: 8, fontSize: 14 }}>A snapshot of your workspace today.</p>
        </div>

        {/* getting started */}
        <div
          style={{
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "11px 16px",
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: C.surface,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13 }}>
            <Check size={15} color={C.indigo} />
            <span style={{ fontWeight: 600 }}>Getting started</span>
            <span style={{ color: C.faint }}>· 4 of 5 done</span>
          </div>
          <div style={{ width: 180, height: 4, borderRadius: 999, background: C.elevated, overflow: "hidden", flexShrink: 0 }}>
            <div style={{ width: "80%", height: "100%", borderRadius: 999, background: C.indigo }} />
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {KPIS.map((k) => (
            <KpiCard key={k.label} {...k} />
          ))}
        </div>

        {/* schedule card */}
        <div style={{ marginTop: 16, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
          {/* header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 18px",
              borderBottom: `1px solid ${C.border}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>Schedule</span>
              <span style={{ ...labelMono, fontSize: 10 }}>Next 60 days</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                padding: 3,
                borderRadius: 9,
                background: C.bg,
                border: `1px solid ${C.border}`,
              }}
            >
              <SegBtn label="List" active />
              <SegBtn label="Calendar" />
              <SegBtn label="Timeline" />
            </div>
          </div>

          {/* filter chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "14px 18px" }}>
            {SCHED_CHIPS.map((c) => (
              <span
                key={c.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  height: 28,
                  padding: "0 11px",
                  borderRadius: 999,
                  fontSize: 12.5,
                  fontWeight: c.active ? 600 : 500,
                  color: c.active ? C.text : C.muted,
                  background: c.active ? C.elevated : "transparent",
                  border: `1px solid ${c.active ? C.border : "transparent"}`,
                }}
              >
                {c.dot && <span style={{ width: 7, height: 7, borderRadius: 999, background: c.dot }} />}
                {c.label}
              </span>
            ))}
          </div>

          {/* list rows */}
          <div>
            {SCHED_ROWS.map((r) => (
              <div
                key={r.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 999, background: r.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5 }}>
                  <span style={{ fontWeight: 600 }}>{r.title}</span>
                  <span style={{ color: C.faint }}> · {r.sub}</span>
                </span>
                <span style={{ marginLeft: "auto", fontFamily: mono, fontSize: 11.5, color: C.muted, ...tnum }}>{r.time}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ============================================================
   COMPONENT 2 — DelivvoClientPortal (what the client sees)
   ============================================================ */

type Fact = { icon: React.ElementType; tint: string; label: string; value: string; sub: string };
const FACTS: Fact[] = [
  { icon: FolderOpen, tint: C.indigo, label: "Deliverables", value: "5 files", sub: "50% complete" },
  { icon: Receipt, tint: C.emerald, label: "Invoice", value: "AED 5,565", sub: "Unpaid · INV-0042" },
  { icon: FileSignature, tint: C.amber, label: "Contract", value: "Signed", sub: "Maya · May 31" },
];

function FactCard({ icon: Icon, tint, label, value, sub }: Fact) {
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 34,
            height: 34,
            borderRadius: 9,
            background: `${tint}22`,
            color: tint,
          }}
        >
          <Icon size={17} />
        </span>
        <ArrowUpRight size={15} color={C.faint} />
      </div>
      <div style={{ ...labelMono, marginTop: 16 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, marginTop: 6, ...tnum }}>{value}</div>
      <div style={{ fontSize: 12.5, color: C.muted, marginTop: 3 }}>{sub}</div>
    </div>
  );
}

type Phase = { n: string; status: string; statusColor: string; done: boolean; title: string; due: string };
const PHASES: Phase[] = [
  { n: "1", status: "Done", statusColor: C.emerald, done: true, title: "Design Concepts", due: "Due Mar 15" },
  { n: "2", status: "In progress", statusColor: C.indigoText, done: false, title: "Homepage & Key Pages", due: "Due Apr 20" },
];

function PhaseChip({ n, status, statusColor, done, title, due }: Phase) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 13,
        padding: "14px 16px",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 28,
          height: 28,
          borderRadius: 999,
          flexShrink: 0,
          background: done ? C.emerald : "transparent",
          border: done ? "none" : `1.5px solid ${C.faint}`,
          color: done ? C.bg : C.muted,
          fontSize: 12.5,
          fontWeight: 700,
          fontFamily: mono,
        }}
      >
        {n}
      </span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: mono, fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: statusColor, fontWeight: 700 }}>
          {status}
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 3 }}>{title}</div>
        <div style={{ fontFamily: mono, fontSize: 11, color: C.faint, marginTop: 3, ...tnum }}>{due}</div>
      </div>
    </div>
  );
}

const PORTAL_TABS: { label: string; count: string; active?: boolean }[] = [
  { label: "All", count: "5", active: true },
  { label: "Pending", count: "1" },
  { label: "Approved", count: "1" },
  { label: "In revision", count: "3" },
];

type Deliverable = {
  badge: string;
  bar: string;
  title: string;
  meta: string;
  status: string;
  statusColor: string;
  statusCheck?: boolean;
  actions?: boolean;
};
const DELIVERABLES: Deliverable[] = [
  {
    badge: "IMG",
    bar: C.amber,
    title: "Homepage mockup v3",
    meta: "V3 · 2.3 MB · 4/18/2026 · 1 CMT",
    status: "Awaiting review",
    statusColor: C.amber,
    actions: true,
  },
  {
    badge: "PDF",
    bar: C.emerald,
    title: "Brand guidelines.pdf",
    meta: "V1 · 8.4 MB · today",
    status: "Approved",
    statusColor: C.emerald,
    statusCheck: true,
  },
];

function StatusPill({ label, color, check }: { label: string; color: string; check?: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 28,
        padding: "0 11px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color,
        background: `${color}1f`,
        border: `1px solid ${color}33`,
        whiteSpace: "nowrap",
      }}
    >
      {check && <Check size={13} />}
      {label}
    </span>
  );
}

function IconBtn({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <span
      style={{
        display: "grid",
        placeItems: "center",
        width: 36,
        height: 36,
        borderRadius: 8,
        border: `1px solid ${C.border}`,
        background: "transparent",
        color: C.muted,
      }}
    >
      <Icon size={16} />
    </span>
  );
}

function DeliverableRow({ badge, bar, title, meta, status, statusColor, statusCheck, actions }: Deliverable) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <span style={{ width: 4, background: bar, flexShrink: 0 }} />
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", minWidth: 0 }}>
        {/* file-type badge */}
        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 44,
            height: 44,
            borderRadius: 9,
            background: C.elevated,
            border: `1px solid ${C.border}`,
            fontFamily: mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: C.muted,
            flexShrink: 0,
          }}
        >
          {badge}
        </span>
        {/* title + meta */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {title}
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: C.faint, marginTop: 4, ...tnum }}>{meta}</div>
        </div>
        {/* status + actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <StatusPill label={status} color={statusColor} check={statusCheck} />
          {actions && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <IconBtn icon={Eye} />
              <IconBtn icon={Download} />
              <IconBtn icon={MoreHorizontal} />
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  height: 36,
                  padding: "0 15px",
                  borderRadius: 8,
                  border: "none",
                  background: C.indigo,
                  color: "#fff",
                  fontFamily: body,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Check size={15} /> Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function DelivvoClientPortal() {
  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: body, fontSize: 13, minHeight: 700, padding: "26px 0" }}>
      <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 28px" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 36,
                height: 36,
                borderRadius: 10,
                background: C.indigo,
                color: "#fff",
                fontFamily: display,
                fontWeight: 700,
                fontSize: 17,
              }}
            >
              N
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>Studio Noor</div>
              <div style={{ ...labelMono, fontSize: 10, marginTop: 3 }}>Client portal</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                display: "grid",
                placeItems: "center",
                width: 34,
                height: 34,
                borderRadius: 9,
                border: `1px solid ${C.border}`,
                background: C.surface,
                color: C.muted,
              }}
            >
              <Moon size={16} />
            </span>
            <button
              style={{
                height: 34,
                padding: "0 14px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.muted,
                fontFamily: body,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        {/* status line */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 28 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              height: 24,
              padding: "0 10px",
              borderRadius: 999,
              background: C.indigoTint,
              color: C.indigoText,
              fontSize: 11.5,
              fontWeight: 600,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: C.indigo }} />
            In progress
          </span>
          <span style={{ color: C.muted, fontSize: 13 }}>Brand Refresh · Studio Noor</span>
        </div>

        {/* heading */}
        <h1 style={{ fontFamily: display, fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12, marginTop: 14 }}>
          1 file is waiting for you.
        </h1>
        <p style={{ color: C.muted, marginTop: 10, fontSize: 14, lineHeight: 1.55, maxWidth: 560 }}>
          Open, approve, or request changes inline. Studio Noor gets notified automatically.
        </p>

        {/* fact cards */}
        <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {FACTS.map((f) => (
            <FactCard key={f.label} {...f} />
          ))}
        </div>

        {/* project phases */}
        <div style={{ marginTop: 26 }}>
          <div style={{ ...labelMono, marginBottom: 10 }}>Project phases</div>
          <div style={{ display: "flex", gap: 14 }}>
            {PHASES.map((p) => (
              <PhaseChip key={p.n} {...p} />
            ))}
          </div>
        </div>

        {/* filter tabs */}
        <div style={{ marginTop: 26, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {PORTAL_TABS.map((t) => (
            <span
              key={t.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                height: 30,
                padding: "0 13px",
                borderRadius: 999,
                fontSize: 12.5,
                fontWeight: t.active ? 600 : 500,
                color: t.active ? C.text : C.muted,
                background: t.active ? C.elevated : "transparent",
                border: `1px solid ${t.active ? C.border : "transparent"}`,
              }}
            >
              {t.label}
              <span style={{ fontFamily: mono, fontSize: 11, color: t.active ? C.muted : C.faint, ...tnum }}>{t.count}</span>
            </span>
          ))}
        </div>

        {/* deliverable rows */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
          {DELIVERABLES.map((d) => (
            <DeliverableRow key={d.title} {...d} />
          ))}
        </div>

        {/* closing note */}
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginTop: 22, color: C.muted, fontSize: 12.5 }}>
          <Lock size={14} color={C.emerald} />
          Paid directly to Studio Noor, Delivvo takes 0%.
        </div>
      </div>
    </div>
  );
}
