"use client";

import * as React from "react";
import {
  Archive,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  FileArchive,
  FileImage,
  FileSignature,
  FileText,
  FolderArchive,
  FolderKanban,
  FolderOpen,
  History,
  Landmark,
  LayoutDashboard,
  Link2,
  Lock,
  Mail,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  Palette,
  Pencil,
  Plus,
  Receipt,
  Search,
  Settings as SettingsIcon,
  TrendingUp,
  Trash2,
  Upload,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useInView } from "./engine";
import { type Beat, useCursorChoreography } from "./cursor";

/* ------------------------------------------------------------------ *
 * Hero showcase - the live, labeled, multi-view product demo.
 *
 * Four chapter tabs sit ABOVE a soft-yellow framed video. Inside the frame a
 * human cursor walks the real money flow:
 *  1. Client portal: the client approves the final file in the branded portal.
 *  2. Get paid (0%): the client reviews their invoice, copies the link, and
 *     downloads the PDF. It STAYS "Awaiting payment" (Delivvo never touches the
 *     money, so the portal can't mark it paid for them).
 *  3. Your dashboard: a calm freelancer overview while the cursor hovers each
 *     sidebar nav item in turn, lighting each one up as it passes.
 *  4. Projects: the cursor clicks INTO Projects from the dashboard, opens the
 *     project list, clicks a project, then tours the project's tab strip.
 *
 * The cursor just moves and clicks or hovers, with no per-click zoom. Each
 * screen is a faithful, light-only recreation of the real product, rendered
 * from tokens with real app.delivvo.io URLs and ~0 KB media.
 *
 * Sizing: the frame is ONE fixed desktop canvas (DESIGN_W x DESIGN_H). A
 * ScaleToFit wrapper shrinks that exact canvas to whatever width it has using
 * `transform: scale` (universally consistent, unlike CSS `zoom`, which iOS
 * Safari rendered at native size and clipped — see ScaleToFit). Mobile shows
 * the identical desktop layout sized down, never a reflow. On a 1920 screen
 * the factor is <= 1, so the recreated UI only ever downscales, never upscales.
 * ------------------------------------------------------------------ */

const ACCENT = "#4F46E5"; // demo studio's brand accent = product indigo default
const FREELANCER = "Studio Noor";
const CLIENT = "Maya Haddad";
const CLIENT_COMPANY = "Lumen Hospitality";
const CLIENT_EMAIL = "maya@lumenhospitality.co";
const PORTAL_URL = "app.delivvo.io/portal/c/3f9a2c7e";

// The single fixed design canvas. Every view is laid out for exactly this
// size; ScaleToFit handles every screen by scaling, not by restructuring.
// A wide canvas (1440) means the factor stays <= 1 at 1440 and 1920 (only ever
// downscaled, never upscaled into blur) and mobile is a clean downscale. The
// height is tall enough that the densest view (the invoice, with its full
// line-item table, totals, action bar, and the "Delivvo takes 0%" footer) fits
// top-to-bottom with comfortable padding and nothing is clipped. The wrapper's
// aspect ratio is derived from these two numbers, so they stay in lockstep.
const DESIGN_W = 1440;
const DESIGN_H = 740;

// useLayoutEffect on the server warns; swap to useEffect there. Used so the
// scale is measured BEFORE paint (no flash of the unscaled canvas).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

type View = "portal" | "invoice" | "dashboard" | "project";

// Each tab IS a segment, in play order, with how long it holds before the
// player advances (and loops back to the first). Projects is the longest
// because one segment plays the whole click-in + tab-tour sequence.
const TABS: { view: View; label: string; durationMs: number }[] = [
  // Portal ends by clicking the Invoice tab (so it flows straight into Get
  // paid); Get paid runs the full Stripe pay flow (hover actions, open the
  // card sheet, fill it, pay, mark the invoice paid), so it is the longest
  // alongside Projects, whose tour now hovers every tab without clipping.
  { view: "portal", label: "Client portal", durationMs: 5400 },
  { view: "invoice", label: "Get paid · 0%", durationMs: 15200 },
  { view: "dashboard", label: "Your dashboard", durationMs: 19800 },
  { view: "project", label: "Projects", durationMs: 12600 },
];

const URLS: Record<View, string> = {
  portal: "app.delivvo.io/portal/c/3f9a2c7e",
  invoice: "app.delivvo.io/portal/c/3f9a2c7e",
  dashboard: "app.delivvo.io/dashboard",
  project: "app.delivvo.io/dashboard/projects",
};

// The dashboard sidebar nav, in the order the hover tour walks them.
const NAV_ITEMS: { key: string; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Overview", icon: <LayoutDashboard className="h-3.5 w-3.5" /> },
  { key: "clients", label: "Clients", icon: <Users className="h-3.5 w-3.5" /> },
  { key: "projects", label: "Projects", icon: <FolderKanban className="h-3.5 w-3.5" /> },
  { key: "messages", label: "Messages", icon: <MessageCircle className="h-3.5 w-3.5" /> },
  { key: "calendar", label: "Calendar", icon: <CalendarDays className="h-3.5 w-3.5" /> },
  { key: "invoices", label: "Invoices & contracts", icon: <Receipt className="h-3.5 w-3.5" /> },
  { key: "payments", label: "Payments", icon: <Wallet className="h-3.5 w-3.5" /> },
  // Pro tier shows "Templates" (branding is Agency-only); matches the real
  // plan-aware sidebar label for the Pro studio in this demo.
  { key: "templates", label: "Templates", icon: <Palette className="h-3.5 w-3.5" /> },
  { key: "analytics", label: "Analytics", icon: <BarChart3 className="h-3.5 w-3.5" /> },
];

// The account cluster pinned to the bottom of the dashboard sidebar. Kept lean
// (Settings only) on purpose: Storage is a file-management utility, not a
// feature tab, and the sidebar is already full, so the recreation does not add
// it. The cursor tour reaches Settings here before going back up to Projects.
const DASH_BOTTOM_NAV: { key: string; label: string; icon: React.ReactNode }[] = [
  { key: "settings", label: "Settings", icon: <SettingsIcon className="h-3.5 w-3.5" /> },
];

const NAV_GROUPS: { heading: string | null; keys: string[] }[] = [
  { heading: null, keys: ["overview"] },
  { heading: "Work", keys: ["clients", "projects"] },
  { heading: "Communication", keys: ["messages", "calendar"] },
  { heading: "Get paid", keys: ["invoices", "payments"] },
  { heading: "Grow", keys: ["templates", "analytics"] },
];

// The project detail tab strip, in the order the hover tour walks them.
const PROJECT_TABS = [
  "Deliverables",
  "Client Uploads",
  "Approvals",
  "Messages",
  "Contracts",
  "Invoice",
  "Milestones",
  "Activity",
  "Proposal",
  "Portal",
];

// Where the cursor tip should land on a sidebar nav row: pulled toward the
// icon/label (left) and lifted a touch above centre, so the arrow clearly
// points AT "Clients" instead of resting in the empty middle of the wide row
// (which read "a bit low"). Project-tab targets are small, so they only need
// the slight vertical lift.
const NAV_AIM = { x: 0.18, y: 0.4 } as const;
const TAB_AIM = { x: 0.5, y: 0.4 } as const;

// The projects segment plays a 3-act sub-sequence inside one tab.
type ProjStep = "dashboard" | "list" | "detail";

// The dashboard segment clicks through a few real pages before stepping into
// Projects. Only these get their own page; the rest of the sidebar is real but
// not visited in the tour.
type DashTab = "overview" | "clients" | "calendar" | "invoices" | "payments";

export function HeroShowcase() {
  const reduced = usePrefersReducedMotion();
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(hostRef);

  // The stage is the cursor's measurement frame. The cursor is a child of it,
  // so its translate is in the stage's unscaled local space, which the
  // ScaleToFit `zoom` factor then scales visually.
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const cursorRef = React.useRef<HTMLDivElement | null>(null);
  const rippleRef = React.useRef<HTMLSpanElement | null>(null);
  const approveRef = React.useRef<HTMLButtonElement | null>(null);
  const copyLinkRef = React.useRef<HTMLButtonElement | null>(null);
  const downloadRef = React.useRef<HTMLButtonElement | null>(null);
  const projectsNavRef = React.useRef<HTMLDivElement | null>(null);
  const projectRowRef = React.useRef<HTMLButtonElement | null>(null);
  // Get-paid (invoice) flow refs: the Invoice tab in the portal sidebar (the
  // portal segment clicks it to flow into Get paid), the Stripe pay option,
  // the card field the cursor rests on while it fills, and the Pay now button.
  const invoiceNavRef = React.useRef<HTMLDivElement | null>(null);
  const stripeOptRef = React.useRef<HTMLButtonElement | null>(null);
  const cardFieldRef = React.useRef<HTMLDivElement | null>(null);
  const payNowRef = React.useRef<HTMLButtonElement | null>(null);

  // Per-nav-item + per-project-tab refs, so a hover beat can target any of them.
  const navRefs = React.useRef<Record<string, HTMLDivElement | null>>({});
  const tabRefs = React.useRef<Record<string, HTMLSpanElement | null>>({});

  // The demo is an ordered list of SEGMENTS (= the chapter tabs). A phase
  // timer plays the active segment for its duration, then advances and loops.
  // Clicking a tab JUMPS to that segment and keeps playing.
  const [seg, setSeg] = React.useState(0);
  const [approved, setApproved] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = React.useState<string | null>(null);
  const [projStep, setProjStep] = React.useState<ProjStep>("dashboard");
  // Which dashboard page the cursor has clicked into during the dashboard tour.
  const [dashTab, setDashTab] = React.useState<DashTab>("overview");
  // Get-paid (invoice) sub-state. `payOpen` = the Stripe card sheet is up;
  // `cardFilled` = the fields have auto-populated (Link-style); `invoicePaid`
  // = the payment went through and the invoice flipped to Paid.
  const [portalInvoiceHot, setPortalInvoiceHot] = React.useState(false);
  const [payOpen, setPayOpen] = React.useState(false);
  const [cardFilled, setCardFilled] = React.useState(false);
  const [invoicePaid, setInvoicePaid] = React.useState(false);
  const advTimer = React.useRef(0);
  const stepTimers = React.useRef<number[]>([]);

  const view = TABS[seg].view;

  const clearStepTimers = React.useCallback(() => {
    stepTimers.current.forEach((t) => window.clearTimeout(t));
    stepTimers.current = [];
  }, []);

  // Per-segment cursor beats. Click beats fire a state change; hover beats
  // light a nav row or project tab and clear it. No zoom: the cursor just
  // moves and presses.
  const segBeats = React.useMemo<Beat[]>(() => {
    if (view === "portal")
      return [
        {
          ref: approveRef,
          hold: 1400,
          preMove: 350,
          onClick: () => setApproved(true),
        },
        // Then click the Invoice tab in the sidebar, so the portal flows
        // straight into the Get paid view (which shows the same sidebar with
        // Invoice active). The highlight lingers across the segment cut.
        {
          ref: invoiceNavRef,
          hold: 900,
          preMove: 650,
          aim: NAV_AIM,
          onClick: () => setPortalInvoiceHot(true),
        },
      ];

    if (view === "invoice")
      return [
        // Hover the review actions (these never mark it paid).
        { ref: copyLinkRef, hover: true, hold: 1000, preMove: 450 },
        { ref: downloadRef, hover: true, hold: 1000, preMove: 320 },
        // Click the connected Stripe gateway → the card sheet opens, then the
        // fields auto-fill (Link-style) a beat later.
        {
          ref: stripeOptRef,
          hold: 1100,
          preMove: 480,
          onClick: () => {
            setPayOpen(true);
            const t = window.setTimeout(() => setCardFilled(true), 820);
            stepTimers.current.push(t);
          },
        },
        // Rest on the card field while it fills in.
        { ref: cardFieldRef, hover: true, hold: 1700, preMove: 700 },
        // Click Pay now → the payment goes through, the sheet shows success
        // and closes, and the invoice behind it flips to Paid.
        {
          ref: payNowRef,
          hold: 1500,
          preMove: 460,
          onClick: () => {
            setInvoicePaid(true);
            const t = window.setTimeout(() => setPayOpen(false), 1100);
            stepTimers.current.push(t);
          },
        },
      ];

    if (view === "dashboard") {
      // The cursor CLICKS through the freelancer's key pages (each swaps the
      // content), works down to Settings, then goes back up and clicks Projects
      // to step into the in-depth Projects segment. The ref reads navRefs live.
      const liveRef = (key: string) =>
        ({
          get current() {
            return navRefs.current[key] ?? null;
          },
        }) as React.RefObject<HTMLElement | null>;
      const clickTab = (key: string, tab: DashTab): Beat => ({
        ref: liveRef(key),
        hold: 1250,
        preMove: 360,
        aim: NAV_AIM,
        onClick: () => setDashTab(tab),
      });
      return [
        clickTab("clients", "clients"),
        clickTab("calendar", "calendar"),
        clickTab("invoices", "invoices"),
        clickTab("payments", "payments"),
        // Reach the bottom of the sidebar (Settings)...
        {
          ref: liveRef("settings"),
          hover: true,
          hold: 600,
          preMove: 320,
          aim: NAV_AIM,
          onArrive: () => setHoveredNav("settings"),
          onLeave: () => setHoveredNav(null),
        },
        // ...then go back UP and click Projects to enter the Projects segment.
        // The click itself drives the advance (~900ms later) instead of
        // waiting for the segment's full duration timer — otherwise the cursor
        // sat frozen on the highlighted Projects row for several seconds after
        // clicking before the view changed.
        {
          ref: liveRef("projects"),
          hold: 1100,
          preMove: 560,
          aim: NAV_AIM,
          onClick: () => {
            setHoveredNav("projects");
            const t = window.setTimeout(
              () => setSeg((s) => (s + 1) % TABS.length),
              900,
            );
            stepTimers.current.push(t);
          },
        },
      ];
    }

    if (view === "project") {
      // The dashboard already clicked Projects, so this segment opens on the
      // project LIST. Click the Brand Refresh row to open the detail page.
      const beats: Beat[] = [
        {
          ref: projectRowRef,
          hold: 1300,
          preMove: 700,
          onClick: () => {
            const t = window.setTimeout(() => setProjStep("detail"), 460);
            stepTimers.current.push(t);
          },
        },
      ];
      // Act 3 - tour the project tab strip. Same live-ref pattern as the nav.
      PROJECT_TABS.forEach((tab, i) => {
        beats.push({
          ref: {
            get current() {
              return tabRefs.current[tab] ?? null;
            },
          } as React.RefObject<HTMLElement | null>,
          hover: true,
          hold: 480,
          preMove: i === 0 ? 700 : 40,
          aim: TAB_AIM,
          onArrive: () => setHoveredTab(tab),
          onLeave: () => setHoveredTab(null),
        });
      });
      return beats;
    }

    return [];
    // navRefs/tabRefs are stable refs; deps only need the inputs that change beats.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // Settle each segment's view state the moment it becomes active.
  React.useEffect(() => {
    setHoveredNav(null);
    setHoveredTab(null);
    setPortalInvoiceHot(false);
    setPayOpen(false);
    setCardFilled(false);
    setInvoicePaid(false);
    setDashTab("overview");
    clearStepTimers();
    if (view === "portal") {
      setApproved(false);
      setProjStep("list");
    } else if (view === "invoice") {
      setApproved(true);
      setProjStep("list");
    } else if (view === "dashboard") {
      setApproved(true);
      setProjStep("list");
    } else {
      // Project segment opens straight on the list (the dashboard already
      // clicked Projects), then the cursor clicks a row into the detail.
      setApproved(true);
      setProjStep("list");
    }
  }, [view, clearStepTimers]);

  // Phase timer: hold the active segment for its duration, then advance + loop.
  // Paused while off-screen or for reduced-motion.
  React.useEffect(() => {
    if (reduced || !inView) return;
    window.clearTimeout(advTimer.current);
    advTimer.current = window.setTimeout(
      () => setSeg((s) => (s + 1) % TABS.length),
      TABS[seg].durationMs,
    );
    return () => window.clearTimeout(advTimer.current);
  }, [seg, reduced, inView]);

  useCursorChoreography({
    frameRef: stageRef,
    cursorRef,
    rippleRef,
    beats: segBeats,
    reset: () => {},
    loop: false,
    restartKey: seg,
    enabled: inView && !reduced,
    startAt: { x: 90, y: 110 },
    designW: DESIGN_W,
  });

  // Reduced-motion: park on the invoice review card, no animation.
  React.useEffect(() => {
    if (reduced) {
      setSeg(1);
      setApproved(true);
      setProjStep("list");
    }
    const timers = stepTimers.current;
    return () => {
      window.clearTimeout(advTimer.current);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [reduced]);

  const activeTab = seg;
  const jump = (v: View) => {
    const i = TABS.findIndex((t) => t.view === v);
    if (i >= 0) setSeg(i);
  };

  return (
    <div className="relative mx-auto w-full max-w-[96rem] 2xl:max-w-[108rem]" ref={hostRef}>
      {/* Chapter tabs ABOVE the frame, grouped so it's obvious where the CLIENT
          experience (portal + get paid) ends and YOUR experience (dashboard +
          projects) begins - the two halves of the story. A divider + an eyebrow
          label over each pair makes the switch impossible to miss. */}
      <div className="mb-5 flex flex-wrap items-start justify-center gap-x-7 gap-y-4 sm:gap-x-10">
        {[
          { label: "What your client sees", tone: "amber" as const, from: 0, to: 1 },
          { label: "What you see", tone: "amber" as const, from: 2, to: 3 },
        ].map((group, gi) => (
          <React.Fragment key={group.label}>
            {gi > 0 ? (
              <span aria-hidden className="hidden h-10 w-px self-center bg-slate-200 sm:block dark:bg-white/10" />
            ) : null}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "text-[9px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]",
                  group.tone === "amber"
                    ? "text-amber-600 dark:text-amber-300"
                    : "text-indigo-600 dark:text-indigo-300",
                )}
              >
                {group.label}
              </span>
              <div className="mt-2 flex items-center gap-x-6 border-b border-slate-200/80 dark:border-white/10 sm:gap-x-9">
                {TABS.slice(group.from, group.to + 1).map((t) => {
                  const i = TABS.indexOf(t);
                  const active = i === activeTab;
                  return (
                    <button
                      key={t.view}
                      type="button"
                      onClick={() => jump(t.view)}
                      aria-current={active ? "true" : undefined}
                      className={cn(
                        "group relative -mb-px flex items-center gap-2 border-b-2 px-1 pb-2.5 pt-1 text-[13px] font-semibold transition-colors sm:text-sm",
                        active
                          ? "border-amber-500 text-slate-900 dark:border-amber-400 dark:text-white"
                          : "border-transparent text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
                      )}
                    >
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-colors",
                          active
                            ? "bg-amber-500"
                            : i < activeTab
                              ? "bg-emerald-400"
                              : "bg-slate-300",
                        )}
                      />
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Soft-yellow frame wraps ONLY the video now (the tabs moved out). */}
      <div className="rounded-md bg-[#FCFBF7] p-2 ring-1 ring-black/20 sm:rounded-[1.75rem] sm:p-5 lg:p-6 dark:bg-brand-dark-surface dark:ring-white/15">
        <ScaleToFit w={DESIGN_W} h={DESIGN_H}>
          <div
            style={{ "--la": ACCENT } as React.CSSProperties}
            className="relative h-full w-full overflow-hidden rounded-[6px] border border-slate-200 bg-white sm:rounded-2xl dark:border-white/10 dark:bg-brand-dark-bg"
          >
            {/* Browser chrome - real URL per view */}
            <div className="flex h-11 items-center gap-2.5 border-b border-slate-100 bg-slate-50/80 px-4 dark:border-white/[0.06] dark:bg-brand-dark-surface">
              <span aria-hidden className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-200 dark:bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-slate-200 dark:bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-slate-200 dark:bg-white/15" />
              </span>
              <span className="mx-auto inline-flex max-w-[70%] items-center gap-2 truncate rounded-md bg-white px-3 py-1 text-[12px] font-medium text-slate-500 ring-1 ring-slate-200/80 dark:bg-brand-dark-surface dark:text-slate-400 dark:ring-white/10">
                <Lock className="h-3 w-3 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
                <span className="truncate">{URLS[view]}</span>
              </span>
            </div>

            {/* The STAGE - the cursor's measurement frame. Cursor + view layers
                are its children. No zoom: the ScaleToFit `zoom` factor on the
                canvas above handles the only sizing. */}
            <div
              ref={stageRef}
              className="relative h-[calc(100%-2.75rem)] overflow-hidden bg-[#FCFCFD] dark:bg-brand-dark-bg"
            >
              <Layer show={view === "portal"}>
                <PortalView
                  approved={approved}
                  approveRef={approveRef}
                  invoiceNavRef={invoiceNavRef}
                  invoiceHot={portalInvoiceHot}
                />
              </Layer>
              <Layer show={view === "invoice"}>
                <InvoiceView
                  copyLinkRef={copyLinkRef}
                  downloadRef={downloadRef}
                  stripeOptRef={stripeOptRef}
                  cardFieldRef={cardFieldRef}
                  payNowRef={payNowRef}
                  payOpen={payOpen}
                  cardFilled={cardFilled}
                  paid={invoicePaid}
                />
              </Layer>
              <Layer show={view === "dashboard"}>
                <DashboardView
                  dashTab={dashTab}
                  hoveredNav={hoveredNav}
                  navRefs={navRefs}
                  projectsNavRef={null}
                />
              </Layer>
              <Layer show={view === "project"}>
                <ProjectsView
                  step={projStep}
                  hoveredNav={hoveredNav}
                  hoveredTab={hoveredTab}
                  navRefs={navRefs}
                  projectsNavRef={projectsNavRef}
                  projectRowRef={projectRowRef}
                  tabRefs={tabRefs}
                />
              </Layer>

              {/* Human cursor - a DIRECT child of the stage so its offset
                  parent is the SAME element the cursor measures target rects
                  against. */}
              {!reduced ? (
                <div
                  ref={cursorRef}
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 z-50 block opacity-0 transition-opacity duration-300 will-change-transform"
                >
                  {/* Click ring - expands + fades on each press. */}
                  <span
                    ref={rippleRef}
                    className="absolute -left-3 -top-3 block h-12 w-12 rounded-full border-2 border-indigo-500/70"
                    style={{ opacity: 0 }}
                  />
                  {/* Standard pointer arrow. */}
                  <svg width="26" height="26" viewBox="0 0 24 24" className="-ml-1 -mt-0.5 [filter:drop-shadow(0_1px_3px_rgba(15,23,42,0.35))]">
                    <path d="M4 2l5.2 14.5 2.2-5.9 5.9-2.2L4 2z" fill="#0f172a" />
                    <path d="M4 2l5.2 14.5 2.2-5.9 5.9-2.2L4 2z" fill="none" stroke="#fff" strokeWidth="0.8" />
                  </svg>
                </div>
              ) : null}
            </div>
          </div>
        </ScaleToFit>
      </div>
    </div>
  );
}

/**
 * Renders ONE fixed-size design canvas (w x h) and shrinks that EXACT canvas to
 * fit whatever width it is given, using `transform: scale`. This is the
 * identical desktop frame scaled down, the same on every device. We use
 * `transform` rather than CSS `zoom` because mobile engines (iOS Safari in
 * particular) render `zoom` inconsistently: the 1440 canvas stayed at native
 * size and got clipped, so mobile saw a "zoomed-in" crop instead of the whole
 * frame shrunk. `transform: scale` is universally supported and behaves the
 * same everywhere. The factor never exceeds ~1 on real screens (the hero caps
 * the container near 1440), so this is always a downscale, which is crisp
 * minification (you only ever throw detail away, never invent it), never a
 * blurry upscale. The wrapper reserves the design's aspect ratio so the box is
 * correct from first paint (no layout shift). The cursor lives inside this
 * scaled box and its `center()` math reads `frameRect.width / designW`, which
 * is identical under `transform` and `zoom`, so it still lands dead-centre.
 */
function ScaleToFit({
  w,
  h,
  children,
}: {
  w: number;
  h: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [factor, setFactor] = React.useState(1);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const cw = el.clientWidth;
      if (cw > 0) setFactor(cw / w);
    };
    measure();
    // A second measure on the next frame catches mobile browsers that report a
    // stale/zero width on first layout (before fonts + viewport settle), so the
    // factor is never left at 1 (which would show the canvas at native size).
    const raf = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [w]);
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      {/* `transform: scale` shrinks the fixed canvas to the wrapper width
          (factor = cw / w, anchored top-left). Its effective height is
          h * factor, which matches the aspect-ratio box exactly. */}
      <div
        style={{
          width: w,
          height: h,
          transform: `scale(${factor})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Layer({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        show ? "z-10 translate-y-0 opacity-100" : "pointer-events-none z-0 translate-y-3 opacity-0",
      )}
    >
      {children}
    </div>
  );
}

/* ── Client portal (deliverables + approve) ──────────────────────── */
function PortalView({
  approved,
  approveRef,
  invoiceNavRef,
  invoiceHot,
}: {
  approved: boolean;
  approveRef: React.RefObject<HTMLButtonElement | null>;
  invoiceNavRef?: React.RefObject<HTMLDivElement | null>;
  invoiceHot?: boolean;
}) {
  return (
    <div className="flex h-full">
      <PortalSidebar active="Deliverables" invoiceRowRef={invoiceNavRef} invoiceHot={invoiceHot} />
      <div className="flex min-w-0 flex-1 flex-col px-7 py-5">
        {/* Branded project header - mirrors the real portal */}
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> In progress
              </span>
              <span className="truncate text-[12px] font-medium text-slate-500 dark:text-slate-400">Brand Refresh · {FREELANCER}</span>
            </div>
            <h3 className="mt-1.5 text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">
              {approved ? "You're all caught up, thank you" : "1 file waiting for your review"}
            </h3>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Fact tint="indigo" icon={<FolderOpen className="h-4 w-4" />} k="Deliverables" v="4 files" s={approved ? "100% approved" : "3 of 4 approved"} />
          <Fact tint="emerald" icon={<Receipt className="h-4 w-4" />} k="Invoice" v="AED 5,565" s="Unpaid · INV-0042" />
          <Fact tint="amber" icon={<FileSignature className="h-4 w-4" />} k="Contract" v="Signed" s="Maya · May 31" />
        </div>
        <div className="mt-4 space-y-3">
          <FileRow tone="zip" badge="ZIP" name="brand-refresh-final.zip" meta="v2 · 240 MB · 2 hours ago" approved={approved} approveRef={approveRef} />
          <FileRow tone="pdf" badge="PDF" name="brand-guidelines.pdf" meta="v1 · 8.4 MB · today" approved />
        </div>
        {/* Client approval note - the real thread, in the client's own words */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 dark:border-white/[0.08] dark:bg-brand-dark-surface">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-rose-100 text-[13px] font-bold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">M</span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-slate-900 dark:text-white">
              {CLIENT} <span className="font-normal text-slate-400 dark:text-slate-500">· just now</span>
            </p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">
              {approved
                ? "Love it, approved. Sending payment now. Thank you, Studio Noor."
                : "This looks fantastic. Approving the final pack."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const PORTAL_NAV: { icon: React.ReactNode; label: string; badge?: number }[] = [
  { icon: <FolderOpen className="h-4 w-4" />, label: "Deliverables", badge: 1 },
  { icon: <Upload className="h-4 w-4" />, label: "Files" },
  { icon: <MessageCircle className="h-4 w-4" />, label: "Messages" },
  { icon: <FileSignature className="h-4 w-4" />, label: "Contract" },
  { icon: <Receipt className="h-4 w-4" />, label: "Invoice", badge: 1 },
];

/** The client-portal sidebar. `active` is the highlighted page (Deliverables in
 *  the portal view, Invoice in the Get paid view). `invoiceRowRef` + `invoiceHot`
 *  let the portal segment's cursor click the Invoice row to flow into Get paid. */
function PortalSidebar({
  active = "Deliverables",
  invoiceRowRef,
  invoiceHot,
}: {
  active?: string;
  invoiceRowRef?: React.RefObject<HTMLDivElement | null>;
  invoiceHot?: boolean;
}) {
  return (
    <aside className="flex w-[26%] max-w-[236px] flex-shrink-0 flex-col border-r border-slate-100 bg-white/60 px-4 py-4 dark:border-white/[0.06] dark:bg-brand-dark-surface">
      <div className="flex items-center gap-2.5 px-1">
        <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-base font-bold text-white" style={{ backgroundColor: "var(--la)" }}>
          N
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[15px] font-semibold text-slate-900 dark:text-white">{FREELANCER}</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">Client portal</p>
        </div>
      </div>
      <div className="mx-1 mt-4 h-px bg-slate-100 dark:bg-white/10" />
      <nav className="mt-4 min-h-0 flex-1 space-y-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PORTAL_NAV.map((n) => {
          const isInvoice = n.label === "Invoice";
          return (
            <NavRow
              key={n.label}
              icon={n.icon}
              label={n.label}
              active={active === n.label}
              hovered={isInvoice ? invoiceHot : undefined}
              badge={n.badge}
              rowRef={isInvoice ? invoiceRowRef : undefined}
            />
          );
        })}
      </nav>
      <div className="space-y-1 pt-4">
        <div className="mx-1 mb-2 h-px bg-slate-100 dark:bg-white/10" />
        <NavRow icon={<SettingsIcon className="h-4 w-4" />} label="Settings" />
      </div>
    </aside>
  );
}

/** Shared sidebar row - matches the real portal + dashboard nav exactly:
 *  indigo-600 icon tile + indigo-700 text + indigo-500/10 bg + indigo-600
 *  rail when active; neutral tile otherwise. `hovered` paints a soft
 *  pass-over highlight (the nav hover tour). */
function NavRow({
  icon,
  label,
  active,
  hovered,
  badge,
  rowRef,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hovered?: boolean;
  badge?: number;
  rowRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={rowRef}
      className={cn(
        "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[14px] font-medium transition-colors duration-200",
        active
          ? "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300"
          : hovered
            ? "bg-slate-900/[0.045] text-slate-700 dark:bg-brand-dark-elevated dark:text-slate-200"
            : "text-slate-500 dark:text-slate-400",
      )}
    >
      {active ? <span className="absolute start-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-e-full bg-indigo-600 dark:bg-indigo-500" /> : null}
      <span
        className={cn(
          "grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg transition-colors duration-200",
          active
            ? "bg-indigo-600 text-white dark:bg-indigo-500"
            : hovered
              ? "bg-slate-900/[0.06] text-slate-600 dark:bg-brand-dark-elevated dark:text-slate-300"
              : "bg-black/[0.04] text-slate-400 dark:bg-brand-dark-elevated dark:text-slate-500",
        )}
      >
        {icon}
      </span>
      <span className="flex-1 truncate">{label}</span>
      {badge ? <span className="grid h-5 min-w-5 place-items-center rounded-full bg-indigo-600 px-1 text-[10px] font-bold text-white dark:bg-indigo-500">{badge}</span> : null}
    </div>
  );
}

function Fact({ tint, icon, k, v, s }: { tint: string; icon: React.ReactNode; k: string; v: string; s: string }) {
  const tints: Record<string, string> = {
    indigo: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300",
    amber: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/65 p-3 text-start dark:border-white/[0.08] dark:bg-brand-dark-surface">
      <span className={cn("grid h-9 w-9 place-items-center rounded-lg", tints[tint])}>{icon}</span>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{k}</p>
      <p className="text-[15px] font-semibold tracking-tight text-slate-900 dark:text-white">{v}</p>
      <p className="text-[11px] text-slate-500 dark:text-slate-400">{s}</p>
    </div>
  );
}

function FileRow({
  tone,
  badge,
  name,
  meta,
  approved,
  approveRef,
}: {
  tone: string;
  badge: string;
  name: string;
  meta: string;
  approved: boolean;
  approveRef?: React.RefObject<HTMLButtonElement | null>;
}) {
  const tones: Record<string, string> = {
    image: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    pdf: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300",
    zip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  };
  return (
    <div className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white py-3 pe-3 ps-5 dark:border-white/[0.08] dark:bg-brand-dark-surface">
      <span className={cn("absolute inset-y-2.5 start-2 w-1 rounded-full transition-colors duration-500", approved ? "bg-emerald-500" : "bg-amber-500")} />
      <span className={cn("grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl text-[12px] font-bold", tones[tone])}>{badge}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-semibold text-slate-900 dark:text-white">{name}</p>
        <p className="truncate font-mono text-[11px] text-slate-500 dark:text-slate-400">{meta}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium ring-1 transition-all duration-500", approved ? "bg-emerald-500/[0.12] text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25" : "bg-amber-500/[0.12] text-amber-700 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25")}>
          {approved ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
          {approved ? "Approved" : "Awaiting review"}
        </span>
        {approveRef && !approved ? (
          <button ref={approveRef} type="button" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white" style={{ backgroundColor: "var(--la)" }}>
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Approve
          </button>
        ) : null}
      </div>
    </div>
  );
}

/* ── Invoice review card (client side) - faithful to the real portal ─ */
const INV_LINES: { description: string; qty: number; unit: number }[] = [
  { description: "Logo design", qty: 1, unit: 3000 },
  { description: "Brand guidelines", qty: 1, unit: 1500 },
  { description: "Social templates", qty: 1, unit: 800 },
  { description: "VAT 5%", qty: 1, unit: 265 },
];
const INV_TOTAL = "AED 5,565";

function InvoiceView({
  copyLinkRef,
  downloadRef,
  stripeOptRef,
  cardFieldRef,
  payNowRef,
  payOpen,
  cardFilled,
  paid,
}: {
  copyLinkRef: React.RefObject<HTMLButtonElement | null>;
  downloadRef: React.RefObject<HTMLButtonElement | null>;
  stripeOptRef: React.RefObject<HTMLButtonElement | null>;
  cardFieldRef: React.RefObject<HTMLDivElement | null>;
  payNowRef: React.RefObject<HTMLButtonElement | null>;
  payOpen: boolean;
  cardFilled: boolean;
  paid: boolean;
}) {
  return (
    <div className="relative flex h-full">
      {/* Same portal sidebar as the Client portal view, now with Invoice active
          (the cursor navigated here from the portal). */}
      <PortalSidebar active="Invoice" />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden px-6 py-4">
        {/* Page header - kicker + title + status pill. The pill flips to Paid
            the moment the Stripe payment goes through. */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Invoice · for review</p>
            <h3 className="mt-1 text-[20px] font-semibold tracking-tight text-slate-900 dark:text-white">Amount due to {FREELANCER}</h3>
          </div>
          <span
            className={cn(
              "inline-flex flex-shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ring-1 transition-colors duration-500",
              paid
                ? "bg-emerald-500/[0.12] text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25"
                : "bg-amber-500/[0.12] text-amber-700 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25",
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", paid ? "bg-emerald-500" : "bg-amber-500")} />
            {paid ? "Paid" : "Awaiting payment"}
          </span>
        </div>

        {/* The invoice document - accent bar + faint diagonal watermark (both
            flip from indigo/Unpaid to emerald/Paid on payment). */}
        <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
          <span className={cn("absolute inset-y-0 left-0 w-1.5 transition-colors duration-500", paid ? "bg-emerald-500" : "bg-indigo-600 dark:bg-indigo-500")} />
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[24deg] select-none text-[70px] font-black tracking-tight transition-colors duration-500",
              paid ? "text-emerald-500/[0.08] dark:text-emerald-400/[0.09]" : "text-slate-900/[0.05] dark:text-white/[0.06]",
            )}
          >
            {paid ? "Paid" : "Unpaid"}
          </span>

          <div className="relative px-5 pt-3 pb-3">
            {/* Letterhead */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-2 dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className="grid h-8 w-8 place-items-center rounded-lg text-[13px] font-bold text-white" style={{ backgroundColor: "var(--la)" }}>N</span>
                <div className="leading-tight">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">Invoice</span>
                  <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">{FREELANCER}</span>
                </div>
              </div>
              <div className="text-end leading-tight">
                <span className="block font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Invoice №</span>
                <span className="block font-mono text-[13px] font-bold tracking-[0.08em] text-slate-700 dark:text-slate-200">INV-0042</span>
              </div>
            </div>

            {/* Hero - amount due on the left, bill-to + issued on the right */}
            <div className="mt-2.5 grid grid-cols-[1fr_auto] items-start gap-6">
              <div>
                <p className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Amount due</p>
                <p className="mt-0.5 text-[26px] font-semibold leading-none tracking-tight tabular-nums text-slate-900 dark:text-white">{INV_TOTAL}</p>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">From {CLIENT} to {FREELANCER}.</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-end">
                <div>
                  <dt className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Bill to</dt>
                  <dd className="mt-0.5 text-[13px] font-medium text-slate-900 dark:text-white">{CLIENT}</dd>
                  <dd className="text-[11px] text-slate-500 dark:text-slate-400">{CLIENT_COMPANY}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Issued</dt>
                  <dd className="mt-0.5 text-[13px] font-medium tabular-nums text-slate-900 dark:text-white">May 24, 2026</dd>
                </div>
              </dl>
            </div>

            {/* Line-item table */}
            <table className="mt-2.5 w-full border-t border-slate-100 text-[12px] dark:border-white/[0.06]">
              <thead>
                <tr className="border-b border-slate-100 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
                  <th scope="col" className="py-1 text-start">Description</th>
                  <th scope="col" className="py-1 text-end">Qty</th>
                  <th scope="col" className="py-1 text-end">Unit price</th>
                  <th scope="col" className="py-1 text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {INV_LINES.map((l) => (
                  <tr key={l.description} className="border-b border-slate-50 last:border-0 dark:border-white/[0.04]">
                    <td className="py-1 text-slate-700 dark:text-slate-200">{l.description}</td>
                    <td className="py-1 text-end tabular-nums text-slate-600 dark:text-slate-300">{l.qty}</td>
                    <td className="py-1 text-end tabular-nums text-slate-600 dark:text-slate-300">AED {l.unit.toLocaleString("en-US")}</td>
                    <td className="py-1 text-end font-semibold tabular-nums text-slate-900 dark:text-white">AED {(l.qty * l.unit).toLocaleString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total */}
            <div className="mt-1.5 flex items-baseline justify-end gap-4">
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Amount due</span>
              <span className="text-[16px] font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">{INV_TOTAL}</span>
            </div>
        </div>

        {/* Action bar - Copy link + Download PDF (the cursor clicks both, as
            review actions; neither marks the invoice paid). */}
        <div className="flex items-center justify-end gap-2.5 border-t border-slate-100 bg-indigo-500/[0.03] px-7 py-3 dark:border-white/[0.06] dark:bg-indigo-500/[0.06]">
          <span className="flex items-center gap-1.5 text-[12px] text-slate-400 dark:text-slate-500">
            <Lock className="h-3 w-3 text-emerald-500 dark:text-emerald-400" /> Paid directly to {FREELANCER}, Delivvo takes 0%
          </span>
          <span className="mx-1 flex-1" />
          <button
            ref={copyLinkRef}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-200"
          >
            <Link2 className="h-3.5 w-3.5" /> Copy link
          </button>
          <button
            ref={downloadRef}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[13px] font-semibold text-white"
            style={{ backgroundColor: "var(--la)" }}
          >
            <Download className="h-3.5 w-3.5" /> Download PDF
          </button>
        </div>
        </div>

        {/* PAY THIS INVOICE - only rendered because the freelancer has a
            connected gateway (no test-mode banner: this is the live recreation). */}
        <PaySection stripeOptRef={stripeOptRef} paid={paid} />
      </div>

      {/* Stripe card sheet - opens when the Stripe option is clicked, fills in
          Link-style, then closes on Pay now while the invoice flips to Paid. */}
      {payOpen ? (
        <StripePaySheet
          cardFieldRef={cardFieldRef}
          payNowRef={payNowRef}
          cardFilled={cardFilled}
          paid={paid}
        />
      ) : null}

      {/* The freelancer's "you got paid" alert. It is the in-app + email
          notification Studio Noor receives the moment the payment clears,
          surfaced here as a small toast at the top so the story closes on the
          outcome (the money landed). Wording mirrors the real
          invoicePaidNotify email. Slides in only when paid. */}
      <PaidToast paid={paid} />
    </div>
  );
}

/* The "you got paid" alert — styled as the actual invoice-paid EMAIL the
 * freelancer receives (sender row with name + address, subject, body), landing
 * at the top of the Get paid view the instant the invoice clears. It drops in
 * from above like a new mail notification. */
function PaidToast({ paid }: { paid: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-3 z-30 w-[24rem] max-w-[88%] -translate-x-1/2 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        paid ? "translate-y-0 opacity-100" : "-translate-y-16 opacity-0",
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_30px_70px_-22px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.02] dark:border-white/10 dark:bg-brand-dark-elevated dark:ring-white/[0.04]">
        {/* Mail-client header bar — makes it read as an arriving email. */}
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/70 px-3.5 py-1.5 dark:border-white/[0.06] dark:bg-brand-dark-surface">
          <Mail className="h-3 w-3 text-slate-400 dark:text-slate-500" />
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">New email</span>
          <span className="ms-auto text-[10px] font-medium text-slate-400 dark:text-slate-500">now</span>
        </div>
        {/* Sender row — avatar, name, verified-payment chip, from/to line. */}
        <div className="flex items-start gap-2.5 px-4 pt-3">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[14px] font-bold text-white" style={{ backgroundColor: "var(--la)" }}>D</span>
          <div className="min-w-0 flex-1 leading-tight">
            <div className="flex items-center gap-1.5">
              <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">Delivvo</p>
              <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300">
                <Check className="h-2.5 w-2.5" strokeWidth={3} /> Payment
              </span>
            </div>
            <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">
              notifications@delivvo.io · to {FREELANCER}
            </p>
          </div>
        </div>
        {/* Subject + body — the real invoice-paid email copy. */}
        <div className="px-4 pb-3.5 pt-2">
          <p className="text-[13px] font-semibold text-slate-900 dark:text-white">
            {FREELANCER}, you just got paid
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-slate-600 dark:text-slate-300">
            {CLIENT} paid {INV_TOTAL} on the Brand Refresh invoice. The money
            landed straight in your connected gateway, and Delivvo took 0%.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Get paid - the "Pay this invoice" gateway block + the Stripe card sheet ─ */
function PaySection({
  stripeOptRef,
  paid,
}: {
  stripeOptRef: React.RefObject<HTMLButtonElement | null>;
  paid: boolean;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-2 dark:border-white/[0.06]">
        <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          <Wallet className="h-3.5 w-3.5" /> Pay this invoice
        </span>
        <span className="font-mono text-[12px] font-semibold tabular-nums text-slate-700 dark:text-slate-200">{INV_TOTAL}</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 px-5 py-3">
        {/* Stripe - the connected gateway the cursor clicks. */}
        <button
          ref={stripeOptRef}
          type="button"
          className={cn(
            "group flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 text-start transition-all dark:bg-brand-dark-surface",
            paid
              ? "border-emerald-300/70 dark:border-emerald-400/30"
              : "border-slate-200 ring-1 ring-indigo-500/25 dark:border-white/[0.08] dark:ring-indigo-400/30",
          )}
        >
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-[#635BFF] text-[15px] font-bold text-white">S</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-slate-900 dark:text-white">Stripe</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">{paid ? "Paid · card" : "Pay securely"}</span>
          </span>
          {paid ? (
            <Check className="h-4 w-4 flex-shrink-0 text-emerald-500" strokeWidth={3} />
          ) : (
            <ChevronRight className="h-4 w-4 flex-shrink-0 rtl-flip text-slate-400" />
          )}
        </button>
        {/* PayPal - also connected, shown for choice (not clicked in the demo). */}
        <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/[0.08] dark:bg-brand-dark-surface">
          <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-[#003087] text-[14px] font-bold text-white">P</span>
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-slate-900 dark:text-white">PayPal</span>
            <span className="block text-[11px] text-slate-500 dark:text-slate-400">Pay securely</span>
          </span>
          <ChevronRight className="h-4 w-4 flex-shrink-0 rtl-flip text-slate-400" />
        </div>
      </div>
      <p className="border-t border-slate-100 px-5 py-2 text-[10px] leading-relaxed text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
        Payment goes directly to {FREELANCER}&apos;s connected gateway. Delivvo provides the software only. It never sees your card or banking details, is not the seller or merchant of record, and is not a party to this transaction. Refunds and disputes are handled directly with {FREELANCER}.
      </p>
    </div>
  );
}

/* The Stripe-style card sheet the cursor fills + pays. Recreated from tokens
 * (no screenshot, no test mode). `cardFilled` populates the fields Link-style;
 * `paid` swaps the form for a success state before the sheet closes. */
function StripePaySheet({
  cardFieldRef,
  payNowRef,
  cardFilled,
  paid,
}: {
  cardFieldRef: React.RefObject<HTMLDivElement | null>;
  payNowRef: React.RefObject<HTMLButtonElement | null>;
  cardFilled: boolean;
  paid: boolean;
}) {
  const fieldBox =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 dark:border-white/[0.14] dark:bg-brand-dark-elevated";
  const filledText = (on: boolean) =>
    on ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500";
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-slate-900/45 px-6 backdrop-blur-[1.5px] dark:bg-black/65">
      <div className="w-[440px] max-w-full overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-20px_rgba(15,23,42,0.55)] dark:bg-brand-dark-elevated dark:ring-1 dark:ring-white/10">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-white/[0.06]">
          <p className="text-[15px] font-semibold text-slate-900 dark:text-white">Complete your payment</p>
          <X className="h-4 w-4 text-slate-400" />
        </div>

        {paid ? (
          <div className="flex flex-col items-center justify-center px-6 py-11 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
              <Check className="h-7 w-7" strokeWidth={3} />
            </span>
            <p className="mt-4 text-[17px] font-semibold text-slate-900 dark:text-white">Payment successful</p>
            <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">{INV_TOTAL} paid to {FREELANCER}.</p>
          </div>
        ) : (
          <>
            <div className="px-5 py-4">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold text-[#635BFF]">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500">
                  <Lock className="h-2.5 w-2.5 text-white" />
                </span>
                Secure, fast checkout with Link
                <ChevronDown className="h-3.5 w-3.5" />
              </p>

              <label className="mt-3 block text-[11px] font-medium text-slate-500 dark:text-slate-400">Card number</label>
              <div ref={cardFieldRef} className={cn("mt-1 flex items-center gap-2", fieldBox)}>
                <span className={cn("flex-1 text-[13px] tabular-nums tracking-wide", filledText(cardFilled))}>
                  {cardFilled ? "4242 4242 4242 4242" : "1234 1234 1234 1234"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="rounded bg-[#1434CB] px-1 py-0.5 text-[7px] font-bold italic leading-none text-white">VISA</span>
                  <span className="flex items-center">
                    <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
                    <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#F79E1B]/90" />
                  </span>
                </span>
              </div>

              <div className="mt-2.5 grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Expiry date</label>
                  <div className={cn("mt-1", fieldBox)}>
                    <span className={cn("text-[13px] tabular-nums", filledText(cardFilled))}>{cardFilled ? "12 / 28" : "MM / YY"}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">Security code</label>
                  <div className={cn("mt-1 flex items-center justify-between", fieldBox)}>
                    <span className={cn("text-[13px] tabular-nums", filledText(cardFilled))}>{cardFilled ? "123" : "CVC"}</span>
                    <CreditCard className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600" />
                  </div>
                </div>
              </div>

              <label className="mt-2.5 block text-[11px] font-medium text-slate-500 dark:text-slate-400">Country/Territory</label>
              <div className={cn("mt-1 flex items-center justify-between text-[13px] text-slate-900 dark:text-white", fieldBox)}>
                United Arab Emirates
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </div>

              {/* Optional save info - fills with the same Link checkout. */}
              <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50/60 p-3 dark:border-white/[0.08] dark:bg-brand-dark-surface">
                <span className="inline-flex rounded bg-white px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-500 ring-1 ring-slate-200 dark:bg-brand-dark-elevated dark:text-slate-400 dark:ring-white/10">
                  Optional
                </span>
                <p className="mt-1.5 text-[12px] font-medium text-slate-700 dark:text-slate-200">Save my information for faster checkout</p>
                <div className="mt-2 grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400">Email</label>
                    <div className="mt-0.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 dark:border-white/[0.14] dark:bg-brand-dark-elevated">
                      <span className={cn("block truncate text-[12px]", filledText(cardFilled))}>{cardFilled ? CLIENT_EMAIL : "you@example.com"}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400">Mobile number</label>
                    <div className="mt-0.5 flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 dark:border-white/[0.14] dark:bg-brand-dark-elevated">
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">+971</span>
                      <span className={cn("text-[12px] tabular-nums", filledText(cardFilled))}>050 123 4567</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                <Lock className="h-3 w-3 flex-shrink-0" /> Card details are entered into a Stripe-hosted iframe. Delivvo never sees them.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-3 dark:border-white/[0.06] dark:bg-brand-dark-surface">
              <span className="text-[13px] font-medium text-slate-500 dark:text-slate-400">Cancel</span>
              <button
                ref={payNowRef}
                type="button"
                className="rounded-lg bg-[#635BFF] px-4 py-2 text-[13px] font-semibold text-white shadow-sm"
              >
                Pay now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Freelancer dashboard sidebar (shared across freelancer views) ──── *
 * The dashboard + projects views share this sidebar so the hover/click tour
 * targets the SAME nav rows. Each row registers its node in `navRefs` by key,
 * `hoveredKey` paints the pass-over highlight, and `activeKey` is the current
 * page. `projectsNavRef` (optional) tags the Projects row so a click beat can
 * navigate into it. */
function DashSidebar({
  activeKey,
  hoveredKey,
  navRefs,
  projectsNavRef,
}: {
  activeKey: string;
  hoveredKey: string | null;
  navRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  projectsNavRef: React.RefObject<HTMLDivElement | null> | null;
}) {
  return (
    <aside className="flex w-[24%] max-w-[228px] flex-shrink-0 flex-col border-r border-slate-100 bg-white/60 px-3 py-4 dark:border-white/[0.06] dark:bg-brand-dark-surface">
      <div className="flex items-center gap-2.5 px-1">
        <span className="grid h-10 w-10 place-items-center rounded-xl text-base font-bold text-white" style={{ backgroundColor: "var(--la)" }}>N</span>
        <div className="leading-tight">
          <p className="text-[15px] font-semibold text-slate-900 dark:text-white">{FREELANCER}</p>
          <span className="inline-flex rounded-full bg-indigo-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300">Pro</span>
        </div>
      </div>
      <div className="mx-1 mt-4 h-px bg-slate-100 dark:bg-white/10" />
      <nav className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_GROUPS.map((g, gi) => (
          <div key={g.heading ?? `g-${gi}`}>
            {g.heading ? <p className="px-2 pb-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{g.heading}</p> : null}
            <div className="space-y-1">
              {g.keys.map((key) => {
                const item = NAV_ITEMS.find((n) => n.key === key);
                if (!item) return null;
                const isProjects = key === "projects" && projectsNavRef;
                return (
                  <NavRow
                    key={key}
                    icon={item.icon}
                    label={item.label}
                    active={key === activeKey}
                    hovered={key === hoveredKey}
                    rowRef={
                      isProjects
                        ? projectsNavRef
                        : (node: HTMLDivElement | null) => {
                            navRefs.current[key] = node;
                          }
                    }
                  />
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="space-y-1 pt-3">
        <div className="mx-1 mb-2 h-px bg-slate-100 dark:bg-white/10" />
        {DASH_BOTTOM_NAV.map((item) => (
          <NavRow
            key={item.key}
            icon={item.icon}
            label={item.label}
            active={item.key === activeKey}
            hovered={item.key === hoveredKey}
            rowRef={(node: HTMLDivElement | null) => {
              navRefs.current[item.key] = node;
            }}
          />
        ))}
      </div>
    </aside>
  );
}

/* ── Freelancer dashboard - the cursor clicks through these pages ─────── */
function DashboardView({
  dashTab,
  hoveredNav,
  navRefs,
  projectsNavRef,
}: {
  dashTab: DashTab;
  hoveredNav: string | null;
  navRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  projectsNavRef: React.RefObject<HTMLDivElement | null> | null;
}) {
  return (
    <div className="relative flex h-full">
      <DashSidebar activeKey={dashTab} hoveredKey={hoveredNav} navRefs={navRefs} projectsNavRef={projectsNavRef} />
      <div className="min-w-0 flex-1 overflow-hidden px-7 py-5">
        {/* The clicked page swaps in. key forces a clean fade per tab so the
            click reads as a real navigation. */}
        <div key={dashTab} className="h-full animate-[fade-in_280ms_ease-out]">
          {dashTab === "overview" ? <DashOverviewPane /> : null}
          {dashTab === "clients" ? <DashClientsPane /> : null}
          {dashTab === "calendar" ? <DashCalendarPane /> : null}
          {dashTab === "invoices" ? <DashInvoicesPane /> : null}
          {dashTab === "payments" ? <DashPaymentsPane /> : null}
        </div>
      </div>
    </div>
  );
}

/* ── Shared dashboard chrome — recreated 1:1 from the real pages
 *    (PageHeader, the StatCard primitive, the Support-pattern filter bar)
 *    so each clicked tab is a faithful, scaled-down copy of the app, not an
 *    invented layout. Example data only (no real client PII). ───────────── */
function DashHead({
  kicker,
  title,
  sub,
  serif,
  actions,
}: {
  kicker?: string;
  title: string;
  sub?: string;
  serif?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0">
        {kicker ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--la)] dark:text-indigo-300">
            {kicker}
          </p>
        ) : null}
        <h3 className={cn("text-[26px] font-semibold tracking-tight text-slate-900 dark:text-white", serif && "font-serif font-medium")}>
          {title}
        </h3>
        {sub ? <p className="mt-1 max-w-[44rem] text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{sub}</p> : null}
      </div>
      {actions ? <div className="flex flex-shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  );
}

function HeadBtn({ icon, children, primary }: { icon?: React.ReactNode; children: React.ReactNode; primary?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold",
        primary
          ? "text-white"
          : "border border-slate-200 bg-white text-slate-700 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-200",
      )}
      style={primary ? { backgroundColor: "var(--la)" } : undefined}
    >
      {icon}
      {children}
    </span>
  );
}

function FilterBar({ children }: { children: React.ReactNode }) {
  return <div className="mb-3 flex items-end gap-2.5">{children}</div>;
}

function FilterField({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="mb-1 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      {children}
    </div>
  );
}

function FakeSearch({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-white/[0.1] dark:bg-brand-dark-surface">
      <Search className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
      <span className="truncate text-[12px] text-slate-400 dark:text-slate-500">{placeholder}</span>
    </div>
  );
}

function FakeSelect({ value, muted }: { value: string; muted?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 dark:border-white/[0.1] dark:bg-brand-dark-surface",
        muted && "opacity-60",
      )}
    >
      <span className={cn("truncate text-[12px]", muted ? "text-slate-400 dark:text-slate-500" : "text-slate-600 dark:text-slate-300")}>{value}</span>
      <ChevronDown className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
    </div>
  );
}

type StatTone = "slate" | "indigo" | "amber" | "emerald" | "blue";
const STAT_TILE: Record<StatTone, string> = {
  slate: "bg-slate-500/10 text-slate-600 dark:text-slate-300",
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  blue: "bg-blue-500/10 text-blue-600 dark:text-blue-300",
};
const STAT_NUM: Record<StatTone, string> = {
  slate: "text-slate-900 dark:text-white",
  indigo: "text-indigo-700 dark:text-indigo-300",
  amber: "text-amber-700 dark:text-amber-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  blue: "text-blue-700 dark:text-blue-300",
};

function DashStat({ icon, label, value, hint, tone = "slate" }: { icon: React.ReactNode; label: string; value: string; hint?: string; tone?: StatTone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.08] dark:bg-brand-dark-surface">
      <div className="flex items-start gap-3">
        <span className={cn("grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl", STAT_TILE[tone])}>{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
          <p className={cn("mt-0.5 text-[24px] font-semibold tabular-nums tracking-tight", STAT_NUM[tone])}>{value}</p>
          {hint ? <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{hint}</p> : null}
        </div>
      </div>
    </div>
  );
}

function ViewChip({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium", active ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-500 dark:text-slate-400")}>
      {children}
    </span>
  );
}

function SchedulePill({ active, dot, children }: { active?: boolean; dot?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium",
        active
          ? "border-transparent bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          : "border-slate-200 bg-white text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-300",
      )}
    >
      {dot ? <span className={cn("h-1.5 w-1.5 rounded-full", dot)} /> : null}
      {children}
    </span>
  );
}

function ScheduleItem({ dot, title, when }: { dot: string; title: string; when: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-black/[0.04] bg-white px-3 py-2.5 dark:border-white/[0.06] dark:bg-brand-dark-surface">
      <span className={cn("h-2 w-2 flex-shrink-0 rounded-full", dot)} />
      <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-800 dark:text-slate-100">{title}</p>
      <span className="flex-shrink-0 text-[12px] tabular-nums text-slate-500 dark:text-slate-400">{when}</span>
    </div>
  );
}

function DashOverviewPane() {
  return (
    <>
      <DashHead kicker="Your workspace" serif title={`Hi, ${FREELANCER.split(" ")[0]}.`} sub="A snapshot of your workspace today." />
      <div className="grid grid-cols-4 gap-3">
        <DashStat tone="indigo" icon={<FolderKanban className="h-4 w-4" />} label="Active projects" value="4" hint="Nothing waiting on you" />
        <DashStat tone="blue" icon={<Users className="h-4 w-4" />} label="Total clients" value="5" hint="Across every project" />
        <DashStat tone="amber" icon={<Clock className="h-4 w-4" />} label="Pending approvals" value="1" hint="One to review" />
        <DashStat tone="emerald" icon={<TrendingUp className="h-4 w-4" />} label="Paid this month" value={INV_TOTAL} hint="Invoices marked paid" />
      </div>
      {/* Schedule widget — the same aggregated next-60-days card the real
          overview renders below the KPI strip (List / Calendar / Timeline
          toggle + filter chips). */}
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
              <CalendarDays className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[14px] font-semibold text-slate-900 dark:text-white">Schedule</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Next 60 days</p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/[0.1] dark:bg-brand-dark-surface">
            <ViewChip active>List</ViewChip>
            <ViewChip>Calendar</ViewChip>
            <ViewChip>Timeline</ViewChip>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <SchedulePill active>All 4</SchedulePill>
          <SchedulePill dot="bg-indigo-500">Meetings</SchedulePill>
          <SchedulePill dot="bg-violet-500">Projects</SchedulePill>
          <SchedulePill dot="bg-cyan-500">Milestones</SchedulePill>
          <SchedulePill dot="bg-emerald-500">Invoices</SchedulePill>
          <SchedulePill>Recurring</SchedulePill>
        </div>
        <div className="mt-3 space-y-2">
          <ScheduleItem dot="bg-indigo-500" title="Kickoff call · Omar Faris" when="Tomorrow · 2:00 PM" />
          <ScheduleItem dot="bg-violet-500" title="Brand Refresh · deadline" when="In 3 days · Jun 17" />
          <ScheduleItem dot="bg-emerald-500" title="INV-0042 due · Maya Haddad" when="Jun 24" />
        </div>
      </div>
    </>
  );
}

/* ── Dashboard · Clients (real /dashboard/clients table) ─────────────── */
const DASH_CLIENTS: { mark: string; tint: string; name: string; company: string; email: string; projects: number; added: string }[] = [
  { mark: "M", tint: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300", name: CLIENT, company: CLIENT_COMPANY, email: CLIENT_EMAIL, projects: 2, added: "May 26, 2026" },
  { mark: "O", tint: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300", name: "Omar Faris", company: "Café Mirage", email: "omar@cafemirage.ae", projects: 1, added: "May 24, 2026" },
  { mark: "S", tint: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300", name: "Sara Nasr", company: "Nasr & Co", email: "sara@nasrco.com", projects: 1, added: "May 19, 2026" },
  { mark: "K", tint: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300", name: "Khalid Aziz", company: "Aziz Group", email: "khalid@azizgroup.ae", projects: 0, added: "May 12, 2026" },
];

function DashClientsPane() {
  return (
    <>
      <DashHead
        title="Clients"
        sub="Everyone you've ever worked with."
        actions={
          <>
            <HeadBtn icon={<Upload className="h-3.5 w-3.5" />}>Import</HeadBtn>
            <HeadBtn primary icon={<Plus className="h-3.5 w-3.5" />}>Add client</HeadBtn>
          </>
        }
      />
      <FilterBar>
        <FilterField label="Search" className="flex-1"><FakeSearch placeholder="Name or email" /></FilterField>
        <FilterField label="View" className="w-[150px]"><FakeSelect value="Active clients" /></FilterField>
        <FilterField label="Activity" className="w-[150px]"><FakeSelect value="All clients" /></FilterField>
        <FilterField label="Sort" className="w-[150px]"><FakeSelect value="Last updated" /></FilterField>
      </FilterBar>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">Name</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Company</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Email</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Projects</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Working on it</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Client added</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {DASH_CLIENTS.map((c) => (
              <tr key={c.name}>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2.5">
                    <span className={cn("grid h-8 w-8 flex-shrink-0 place-items-center rounded-full text-[12px] font-bold", c.tint)}>{c.mark}</span>
                    <span className="text-[14px] font-semibold text-slate-900 dark:text-white">{c.name}</span>
                  </span>
                </td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300">{c.company}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300">{c.email}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-slate-900/[0.05] px-2 text-[12px] font-semibold text-slate-700 dark:bg-white/10 dark:text-white">{c.projects}</span>
                </td>
                <td className="px-4 py-3 text-[13px] text-slate-300 dark:text-slate-600">—</td>
                <td className="px-4 py-3 text-[13px] tabular-nums text-slate-600 dark:text-slate-300">{c.added}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center justify-end gap-0.5 text-slate-400 dark:text-slate-500">
                    <span className="grid h-7 w-7 place-items-center rounded-lg"><Link2 className="h-3.5 w-3.5" /></span>
                    <span className="grid h-7 w-7 place-items-center rounded-lg"><Pencil className="h-3.5 w-3.5" /></span>
                    <span className="grid h-7 w-7 place-items-center rounded-lg"><Archive className="h-3.5 w-3.5" /></span>
                    <span className="grid h-7 w-7 place-items-center rounded-lg text-red-400 dark:text-red-400/80"><Trash2 className="h-3.5 w-3.5" /></span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Dashboard · Calendar (real /dashboard/calendar canvas) ──────────── *
 * June 2026: the 1st is a Monday, so the Sun→Sat grid opens with May 31 in
 * the Sunday slot. Today (Jun 14) is a Sunday and carries the indigo marker,
 * matching the live "Today" highlight. */
function DashCalendarPane() {
  type Cell = { n: number; muted?: boolean; today?: boolean };
  const cells: Cell[] = [
    { n: 31, muted: true },
    ...Array.from({ length: 30 }, (_, i) => ({ n: i + 1, today: i + 1 === 14 })),
    ...Array.from({ length: 4 }, (_, i) => ({ n: i + 1, muted: true })),
  ];
  const events: Record<number, { label: string; tone: "meeting" | "project" | "milestone" | "invoice" }> = {
    9: { label: "Call · Omar", tone: "meeting" },
    17: { label: "Brand v2 due", tone: "project" },
    20: { label: "Phase 2", tone: "milestone" },
    24: { label: "INV-0042", tone: "invoice" },
  };
  const toneCls: Record<string, string> = {
    meeting: "bg-indigo-500/15 text-indigo-700 dark:bg-indigo-400/20 dark:text-indigo-200",
    project: "bg-violet-500/15 text-violet-700 dark:bg-violet-400/20 dark:text-violet-200",
    milestone: "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/20 dark:text-cyan-200",
    invoice: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200",
  };
  return (
    <>
      <DashHead title="Calendar" sub="Your full schedule: deadlines, meetings, milestones and invoices on one canvas. Click a day to add an event." />
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[12px] text-slate-500 dark:text-slate-400">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300">
            <CalendarDays className="h-3.5 w-3.5" />
          </span>
          4 items in the next 60 days
        </span>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-white p-0.5 dark:border-white/[0.1] dark:bg-brand-dark-surface">
            <ViewChip active>Month</ViewChip>
            <ViewChip>Timeline</ViewChip>
          </div>
          <HeadBtn primary icon={<Plus className="h-3.5 w-3.5" />}>New event</HeadBtn>
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-1.5">
        <SchedulePill active>All 4</SchedulePill>
        <SchedulePill dot="bg-indigo-500">Meetings</SchedulePill>
        <SchedulePill dot="bg-violet-500">Projects</SchedulePill>
        <SchedulePill dot="bg-cyan-500">Milestones</SchedulePill>
        <SchedulePill dot="bg-emerald-500">Invoices</SchedulePill>
        <SchedulePill>Recurring</SchedulePill>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-2.5 dark:border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-md text-slate-400 dark:text-slate-500"><ChevronLeft className="h-3.5 w-3.5" /></span>
            <p className="text-[14px] font-semibold text-slate-900 dark:text-white">June 2026</p>
            <span className="grid h-6 w-6 place-items-center rounded-md text-slate-400 dark:text-slate-500"><ChevronRight className="h-3.5 w-3.5" /></span>
          </div>
          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-300">Today</span>
        </div>
        <div className="grid grid-cols-7 border-b border-slate-100 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d} className="py-1.5">{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((c, i) => {
            const ev = !c.muted ? events[c.n] : undefined;
            return (
              <div key={i} className="min-h-[3rem] border-b border-r border-slate-100 px-1.5 pt-1 last:border-r-0 dark:border-white/[0.05]">
                {c.today ? (
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-[10px] font-bold tabular-nums text-white dark:bg-indigo-500">{c.n}</span>
                ) : (
                  <span className={cn("text-[11px] font-semibold tabular-nums", c.muted ? "text-slate-300 dark:text-slate-600" : "text-slate-600 dark:text-slate-300")}>{c.n}</span>
                )}
                {ev ? <span className={cn("mt-1 block truncate rounded px-1 py-0.5 text-[9px] font-semibold", toneCls[ev.tone])}>{ev.label}</span> : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ── Dashboard · Invoices & contracts (real /dashboard/invoices) ─────── */
const DASH_INVOICES: { project: string; no: string; client: string; amount: string; status: "Unpaid" | "Viewed" | "Paid"; ago: string }[] = [
  { project: "Brand Refresh", no: "INV-0042", client: CLIENT, amount: INV_TOTAL, status: "Paid", ago: "2 days ago" },
  { project: "Café Launch", no: "INV-T6G7KJ", client: "Omar Faris", amount: "AED 1,000", status: "Viewed", ago: "19d ago" },
  { project: "Site Redesign", no: "INV-IYKV1S", client: "Sara Nasr", amount: "AED 1,200", status: "Viewed", ago: "15d ago" },
];

function DashInvoicesPane() {
  const pill: Record<string, string> = {
    Unpaid: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    Viewed: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    Paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  };
  return (
    <>
      <DashHead title="Invoices & Contracts" sub="Track every bill you've sent and every contract waiting on a signature." />
      {/* Tab strip — Invoices active (indigo underline), Contracts with the
          "N awaiting" badge, Archive. */}
      <div className="mb-4 flex items-center gap-1 border-b border-slate-100 dark:border-white/[0.06]">
        <span className="relative inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-slate-900 dark:text-white">
          <Receipt className="h-3.5 w-3.5" /> Invoices <span className="text-[11px] tabular-nums text-slate-400 dark:text-slate-500">3</span>
          <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-indigo-600 dark:bg-indigo-400" />
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          <CheckCircle2 className="h-3.5 w-3.5" /> Contracts <span className="text-[11px] tabular-nums text-slate-400 dark:text-slate-500">2</span>
          <span className="ml-1 inline-flex h-4 items-center rounded-full bg-amber-100 px-1.5 text-[9px] font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">1 awaiting</span>
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
          <FolderArchive className="h-3.5 w-3.5" /> Archive
        </span>
      </div>
      <div className="mb-3 grid grid-cols-3 gap-3">
        <DashStat tone="amber" icon={<DollarSign className="h-4 w-4" />} label="Total outstanding" value="AED 2,200" hint="Awaiting payment" />
        <DashStat tone="emerald" icon={<TrendingUp className="h-4 w-4" />} label="Paid this month" value={INV_TOTAL} hint="Invoices marked paid" />
        <DashStat tone="indigo" icon={<Receipt className="h-4 w-4" />} label="Invoices sent" value="3" hint="3 total" />
      </div>
      <FilterBar>
        <FilterField label="Search" className="flex-1"><FakeSearch placeholder="Client, project, or invoice #" /></FilterField>
        <FilterField label="Status" className="w-[120px]"><FakeSelect value="All statuses" /></FilterField>
        <FilterField label="Date range" className="w-[120px]"><FakeSelect value="All time" /></FilterField>
        <FilterField label="Client" className="w-[130px]"><FakeSelect value="All clients" /></FilterField>
        <FilterField label="Project" className="w-[140px]"><FakeSelect value="Pick a client first" muted /></FilterField>
      </FilterBar>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <table className="w-full text-left">
          <thead className="border-b border-slate-100 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:border-white/[0.06] dark:text-slate-500">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">Project</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Client</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">Amount</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Status</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Due</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
            {DASH_INVOICES.map((inv) => (
              <tr key={inv.no}>
                <td className="px-4 py-3">
                  <p className="text-[14px] font-semibold text-slate-900 dark:text-white">{inv.project}</p>
                  <p className="text-[11px] font-mono tabular-nums text-slate-400 dark:text-slate-500">{inv.no}</p>
                </td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300">{inv.client}</td>
                <td className="px-4 py-3 text-right text-[14px] font-semibold tabular-nums text-slate-900 dark:text-white">{inv.amount}</td>
                <td className="px-4 py-3">
                  <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium", pill[inv.status])}>{inv.status}</span>
                  <p className="mt-0.5 text-[10px] tabular-nums text-slate-400 dark:text-slate-500">{inv.ago}</p>
                </td>
                <td className="px-4 py-3 text-[13px] text-slate-300 dark:text-slate-600">—</td>
                <td className="px-4 py-3">
                  <span className="flex items-center justify-end gap-0.5 text-slate-400 dark:text-slate-500">
                    <span className="grid h-7 w-7 place-items-center rounded-lg"><Download className="h-3.5 w-3.5" /></span>
                    <span className="grid h-7 w-7 place-items-center rounded-lg"><CheckCircle2 className="h-3.5 w-3.5" /></span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── Dashboard · Payments (real /dashboard/payments) ─────────────────── */
const CONNECTED_GATEWAYS: { mark: React.ReactNode; color: string; name: string; meta: string; light?: boolean }[] = [
  { mark: "S", color: "#635BFF", name: "Stripe", meta: "Global · Verified May 24, 2026" },
  { mark: "P", color: "#003087", name: "PayPal", meta: "Global · Verified May 24, 2026" },
];
const ADD_GATEWAYS: { mark: React.ReactNode; color: string; name: string; meta: string; light?: boolean }[] = [
  { mark: "tap", color: "#2CC6C6", name: "Tap Payments", meta: "MENA · API" },
  { mark: "T", color: "#2E7D32", name: "Telr", meta: "UAE · API" },
  { mark: "PT", color: "#1A3FA0", name: "PayTabs", meta: "MENA · API" },
  { mark: "C", color: "#0B0B0B", name: "Checkout.com", meta: "Global · API" },
  { mark: "MF", color: "#1565C0", name: "MyFatoorah", meta: "MENA · API" },
  { mark: "Mo", color: "#111827", name: "Moyasar", meta: "Saudi Arabia · API" },
  { mark: "N", color: "#E5341E", name: "N-Genius", meta: "UAE · API" },
  { mark: <Landmark className="h-4 w-4" />, color: "#0B1220", name: "Bank transfer (IBAN)", meta: "Global · Display only" },
  { mark: "W", color: "#9FE870", name: "Wise", meta: "Global · Display only", light: true },
  { mark: "Pa", color: "#FF4800", name: "Payoneer", meta: "Global · Display only" },
];

function GatewayMark({ mark, color, light }: { mark: React.ReactNode; color: string; light?: boolean }) {
  return (
    <span className={cn("grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-[12px] font-bold", light ? "text-slate-900" : "text-white")} style={{ backgroundColor: color }}>
      {mark}
    </span>
  );
}

function DashPaymentsPane() {
  return (
    <>
      <DashHead title="Payments" sub="Connect Stripe, PayPal, or another provider you already use, and let clients pay through the portal. Money goes straight to you. Delivvo never touches it and never takes a cut." />
      <div className="mb-3 flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Payments active
        </span>
        <span className="text-[12px] text-slate-500 dark:text-slate-400">Clients see Pay Now on every sent invoice.</span>
      </div>
      {/* Tab strip — Payment methods active. */}
      <div className="mb-4 flex items-center gap-1 overflow-hidden border-b border-slate-100 dark:border-white/[0.06]">
        {["Payment methods", "Defaults", "Per-client", "Payment links", "Recurring", "Reminders", "Activity"].map((tb, i) => (
          <span key={tb} className={cn("relative whitespace-nowrap px-3 py-2 text-[13px] font-medium", i === 0 ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400")}>
            {tb}
            {i === 0 ? <span className="absolute inset-x-2 bottom-0 h-[2px] rounded-full bg-indigo-600 dark:bg-indigo-400" /> : null}
          </span>
        ))}
      </div>
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Connected gateways</p>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">2 active</span>
      </div>
      <div className="space-y-2">
        {CONNECTED_GATEWAYS.map((g) => (
          <div key={g.name} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 dark:border-white/[0.08] dark:bg-brand-dark-surface">
            <GatewayMark mark={g.mark} color={g.color} light={g.light} />
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-[13px] font-semibold text-slate-900 dark:text-white">
                {g.name}
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">Live</span>
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.meta}</p>
            </div>
            <span className="grid h-7 w-7 place-items-center text-slate-300 dark:text-slate-500"><MoreHorizontal className="h-4 w-4" /></span>
          </div>
        ))}
      </div>
      <div className="mb-1.5 mt-4 flex items-center justify-between">
        <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Add a gateway</p>
        <span className="text-[11px] text-slate-400 dark:text-slate-500">10 available</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {ADD_GATEWAYS.map((g) => (
          <div key={g.name} className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/[0.08] dark:bg-brand-dark-surface">
            <GatewayMark mark={g.mark} color={g.color} light={g.light} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-slate-900 dark:text-white">{g.name}</p>
              <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">{g.meta}</p>
            </div>
            <Plus className="h-3.5 w-3.5 flex-shrink-0 text-slate-400 dark:text-slate-500" />
          </div>
        ))}
      </div>
    </>
  );
}

function DashProjectRow({
  mark,
  markTint,
  title,
  client,
  meta,
  status,
  ok,
}: {
  mark: string;
  markTint: string;
  title: string;
  client: string;
  meta: string;
  status: string;
  ok?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-black/[0.04] px-3 py-2.5 dark:border-white/[0.06]">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className={cn("grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-[12px] font-bold", markTint)}>{mark}</span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-slate-900 dark:text-white">{title} · {client}</p>
          <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">{meta}</p>
        </div>
      </div>
      <span className={cn("inline-flex flex-shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold", ok ? "bg-emerald-500/[0.12] text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-indigo-500/10 text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300")}>
        {ok ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />}
        {status}
      </span>
    </div>
  );
}


function Kpi({ tone, icon, label, value }: { tone: string; icon: React.ReactNode; label: string; value: string }) {
  const tones: Record<string, { t: string; v: string }> = {
    indigo: { t: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300", v: "text-indigo-700 dark:text-indigo-300" },
    blue: { t: "bg-blue-500/10 text-blue-600 dark:bg-blue-400/15 dark:text-blue-300", v: "text-blue-700 dark:text-blue-300" },
    emerald: { t: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300", v: "text-emerald-700 dark:text-emerald-300" },
    amber: { t: "bg-amber-500/10 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300", v: "text-amber-700 dark:text-amber-300" },
  };
  const c = tones[tone];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/[0.08] dark:bg-brand-dark-surface">
      <span className={cn("grid h-9 w-9 place-items-center rounded-lg", c.t)}>{icon}</span>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className={cn("text-[18px] font-bold tabular-nums tracking-tight", c.v)}>{value}</p>
    </div>
  );
}

/* ── Freelancer dashboard - Projects (click-in + tab tour) ──────────── *
 * One segment plays the whole sequence via a 3-act sub-step:
 *   "dashboard" → the overview, cursor clicks the Projects nav row
 *   "list"      → the projects list, cursor clicks the Brand Refresh row
 *   "detail"    → the project page, cursor tours the tab strip
 */
// Projects list — grouped by client, exactly like the real /dashboard/projects
// page (one card per client with the portal actions in the header, then the
// project rows underneath). Example data only.
const PROJECT_GROUPS: {
  mark: string;
  tint: string;
  client: string;
  count: string;
  dot: boolean;
  projects: { title: string; newActivity: boolean; cue: string; docs: number; msgs: number; date: string }[];
}[] = [
  {
    mark: "M",
    tint: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    client: CLIENT,
    count: "2 projects",
    dot: true,
    projects: [
      { title: "Brand Refresh", newActivity: true, cue: "Your turn, keep shipping", docs: 18, msgs: 4, date: "May 26" },
      { title: "Logo Suite", newActivity: true, cue: "Your turn, keep shipping", docs: 5, msgs: 1, date: "May 26" },
    ],
  },
  {
    mark: "O",
    tint: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    client: "Omar Faris",
    count: "1 project",
    dot: false,
    projects: [{ title: "Café Launch", newActivity: false, cue: "Your turn, keep shipping", docs: 6, msgs: 2, date: "May 24" }],
  },
];

function ProjectsView({
  step,
  hoveredNav,
  hoveredTab,
  navRefs,
  projectsNavRef,
  projectRowRef,
  tabRefs,
}: {
  step: ProjStep;
  hoveredNav: string | null;
  hoveredTab: string | null;
  navRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
  projectsNavRef: React.RefObject<HTMLDivElement | null>;
  projectRowRef: React.RefObject<HTMLButtonElement | null>;
  tabRefs: React.RefObject<Record<string, HTMLSpanElement | null>>;
}) {
  // The sidebar's active page is Overview while we're still on the dashboard,
  // then Projects once we've navigated in.
  const activeKey = step === "dashboard" ? "overview" : "projects";
  return (
    <div className="flex h-full">
      <DashSidebar activeKey={activeKey} hoveredKey={hoveredNav} navRefs={navRefs} projectsNavRef={projectsNavRef} />
      <div className="relative min-w-0 flex-1">
        {/* Act 1 - the dashboard overview (cursor clicks Projects). */}
        <ProjPane show={step === "dashboard"} dir={step === "dashboard" ? "in" : "out"}>
          <ProjDashboardPane />
        </ProjPane>
        {/* Act 2 - the projects list (cursor clicks Brand Refresh). */}
        <ProjPane show={step === "list"} dir={step === "list" ? "in" : step === "dashboard" ? "right" : "out"}>
          <ProjectListPane projectRowRef={projectRowRef} />
        </ProjPane>
        {/* Act 3 - the project detail + tab tour. */}
        <ProjPane show={step === "detail"} dir={step === "detail" ? "in" : "right"}>
          <ProjectDetailPane hoveredTab={hoveredTab} tabRefs={tabRefs} />
        </ProjPane>
      </div>
    </div>
  );
}

function ProjPane({ show, dir, children }: { show: boolean; dir: "in" | "out" | "right"; children: React.ReactNode }) {
  const off = dir === "in" ? "translate-x-0 opacity-100" : dir === "out" ? "-translate-x-3 opacity-0" : "translate-x-3 opacity-0";
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col px-7 py-5 transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        show ? "translate-x-0 opacity-100" : cn("pointer-events-none", off),
      )}
    >
      {children}
    </div>
  );
}

// Act 1 reuses the same overview content as the dashboard tab (minus the
// activity column, to keep the pane focused on what the cursor clicks).
function ProjDashboardPane() {
  return (
    <>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--la)] dark:text-indigo-300">Your workspace</p>
      <h3 className="text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">Hi, Studio Noor.</h3>
      <p className="mt-0.5 text-[13px] text-slate-500 dark:text-slate-400">Open Projects from the sidebar to step into a project.</p>
      <div className="mt-4 grid grid-cols-4 gap-3">
        <Kpi tone="indigo" icon={<FolderKanban className="h-4 w-4" />} label="Active projects" value="4" />
        <Kpi tone="blue" icon={<Users className="h-4 w-4" />} label="Clients" value="12" />
        <Kpi tone="amber" icon={<Receipt className="h-4 w-4" />} label="Awaiting payment" value="1" />
        <Kpi tone="emerald" icon={<Wallet className="h-4 w-4" />} label="Paid this month" value="AED 18.0k" />
      </div>
      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Recent projects</p>
          <span className="text-[12px] font-medium text-[color:var(--la)] dark:text-indigo-300">View all</span>
        </div>
        <div className="mt-3 space-y-2">
          <DashProjectRow mark="M" markTint="bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300" title="Brand Refresh" client={CLIENT} meta="4 deliverables · INV-0042" status="In progress" />
          <DashProjectRow mark="O" markTint="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" title="Café Launch" client="Omar Faris" meta="3 deliverables · INV-0040" status="Paid" ok />
        </div>
      </div>
    </>
  );
}

function ProjectListPane({ projectRowRef }: { projectRowRef: React.RefObject<HTMLButtonElement | null> }) {
  // The cursor clicks the very first project row to open the detail, so only
  // that one carries the ref + is a <button>.
  let rowIndex = 0;
  return (
    <>
      <DashHead
        title="Projects"
        sub="Every active client engagement in one place."
        actions={<HeadBtn primary icon={<Plus className="h-3.5 w-3.5" />}>New Project</HeadBtn>}
      />
      <FilterBar>
        <FilterField label="Search" className="flex-1"><FakeSearch placeholder="Projects or clients" /></FilterField>
        <FilterField label="Client" className="w-[150px]"><FakeSelect value="All clients" /></FilterField>
        <FilterField label="Status" className="w-[130px]"><FakeSelect value="All" /></FilterField>
        <FilterField label="Sort" className="w-[150px]"><FakeSelect value="Last updated" /></FilterField>
      </FilterBar>
      <div className="space-y-4">
        {PROJECT_GROUPS.map((g) => (
          <div key={g.client} className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 dark:border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <span className={cn("grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[13px] font-bold", g.tint)}>{g.mark}</span>
                <div className="leading-tight">
                  <p className="flex items-center gap-1.5 text-[14px] font-semibold text-slate-900 dark:text-white">
                    {g.client}
                    {g.dot ? <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> : null}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{g.count}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-200">
                  <Copy className="h-3 w-3" /> Copy link
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold text-white" style={{ backgroundColor: "var(--la)" }}>
                  <ExternalLink className="h-3 w-3" /> Open portal
                </span>
              </div>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {g.projects.map((p) => {
                const isFirst = rowIndex === 0;
                rowIndex += 1;
                const inner = (
                  <>
                    <span aria-hidden className="absolute inset-y-2.5 start-2 w-1 rounded-full bg-blue-500/70" />
                    <span className="grid h-4 w-4 flex-shrink-0 place-items-center rounded-[5px] border border-slate-300 dark:border-white/25" />
                    <span className="min-w-0 flex-1 text-start">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-[14px] font-semibold text-slate-900 dark:text-white">{p.title}</span>
                        {p.newActivity ? (
                          <span className="inline-flex flex-shrink-0 items-center gap-1 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-blue-600 dark:bg-blue-400/15 dark:text-blue-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" /> New activity
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] italic text-slate-500 dark:text-slate-500">{p.cue}</span>
                    </span>
                    <span className="flex flex-shrink-0 items-center gap-3 text-[12px] text-slate-500 dark:text-slate-400">
                      <span className="inline-flex items-center gap-1 tabular-nums"><FileText className="h-3.5 w-3.5" />{p.docs}</span>
                      <span className="inline-flex items-center gap-1 tabular-nums"><MessageCircle className="h-3.5 w-3.5" />{p.msgs}</span>
                      <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:bg-blue-400/15 dark:text-blue-300">In progress</span>
                      <span className="tabular-nums">{p.date}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </span>
                  </>
                );
                const cls = "relative flex w-full items-center gap-2.5 ps-5 pe-4 py-3 text-start";
                return isFirst ? (
                  <button key={p.title} ref={projectRowRef} type="button" className={cls}>
                    {inner}
                  </button>
                ) : (
                  <div key={p.title} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProjectDetailPane({
  hoveredTab,
  tabRefs,
}: {
  hoveredTab: string | null;
  tabRefs: React.RefObject<Record<string, HTMLSpanElement | null>>;
}) {
  return (
    <>
      <p className="text-[13px] font-medium text-slate-400 dark:text-slate-500">
        Projects <span className="text-slate-300 dark:text-slate-600">/</span> <span className="text-slate-600 dark:text-slate-300">Brand Refresh</span>
      </p>
      <div className="mt-1.5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <h3 className="text-[22px] font-semibold tracking-tight text-slate-900 dark:text-white">Brand Refresh</h3>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-500/[0.12] dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> In progress
            </span>
          </div>
          <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">Client: {CLIENT} · {CLIENT_COMPANY}</p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-200">
            <Copy className="h-3 w-3" /> Copy client portal
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-600 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-200">
            <Mail className="h-3 w-3" /> Email portal link
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-400">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        </div>
      </div>
      {/* Portal URL chip */}
      <div className="mt-2.5 inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-slate-500 dark:border-white/[0.1] dark:bg-brand-dark-surface dark:text-slate-400">
        <Lock className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
        <span className="font-mono">{PORTAL_URL}</span>
      </div>
      {/* Tab strip - Deliverables active, each tab a hover-tour target */}
      <div className="mt-3 flex items-center gap-4 overflow-hidden border-b border-slate-200 dark:border-white/[0.08]">
        {PROJECT_TABS.map((tb, i) => {
          const active = i === 0;
          const hovered = tb === hoveredTab;
          return (
            <span
              key={tb}
              ref={(node) => {
                tabRefs.current[tb] = node;
              }}
              className={cn(
                "-mb-px whitespace-nowrap border-b-2 pb-2 text-[12px] transition-colors duration-200",
                active
                  ? "border-indigo-600 font-semibold text-slate-900 dark:border-indigo-400 dark:text-white"
                  : hovered
                    ? "border-slate-300 font-medium text-slate-700 dark:border-white/25 dark:text-slate-200"
                    : "border-transparent font-medium text-slate-400 dark:text-slate-500",
              )}
            >
              {tb}
            </span>
          );
        })}
      </div>
      {/* Account storage bar + Upload files */}
      <div className="mt-3 flex items-center gap-4">
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">Account storage</p>
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-40 overflow-hidden rounded-full bg-black/[0.04] dark:bg-brand-dark-elevated">
              <span className="block h-full w-[5%] rounded-full bg-indigo-600 dark:bg-indigo-500" />
            </div>
            <span className="whitespace-nowrap text-[12px] text-slate-500 dark:text-slate-400">12.4 GB of 250 GB · shared across projects</span>
          </div>
        </div>
        <span className="ms-auto inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-semibold text-white" style={{ backgroundColor: "var(--la)" }}>
          <Upload className="h-3.5 w-3.5" /> Upload files
        </span>
      </div>
      {/* Grouped deliverable card */}
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-white/[0.08] dark:bg-brand-dark-surface">
        <div className="flex items-baseline justify-between border-b border-black/[0.04] bg-indigo-500/[0.04] px-4 py-2.5 dark:border-white/[0.06] dark:bg-indigo-500/[0.08]">
          <p className="text-[13px] font-semibold text-slate-900 dark:text-white">Final delivery</p>
          <p className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500">4 files</p>
        </div>
        <div className="divide-y divide-black/[0.04] dark:divide-white/[0.06]">
          <ProjFile icon={<FileArchive className="h-5 w-5" />} tint="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" name="brand-refresh-final.zip" ver={2} meta="240 MB · 6h ago" status="Approved" ok />
          <ProjFile icon={<FileImage className="h-5 w-5" />} tint="bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300" name="logo-suite.ai" ver={2} meta="64 MB · 6h ago" status="Approved" ok />
          <ProjFile icon={<FileText className="h-5 w-5" />} tint="bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-300" name="brand-guidelines.pdf" ver={1} meta="8.4 MB · 6h ago" status="Approved" ok />
          <ProjFile icon={<FileArchive className="h-5 w-5" />} tint="bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300" name="social-templates.zip" ver={1} meta="42 MB · 1h ago" status="Pending" />
        </div>
      </div>
    </>
  );
}

function ProjFile({
  icon,
  tint,
  name,
  ver,
  meta,
  status,
  ok,
}: {
  icon: React.ReactNode;
  tint: string;
  name: string;
  ver: number;
  meta: string;
  status: string;
  ok?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5">
      <span className={cn("grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg", tint)}>{icon}</span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[14px] font-medium text-slate-900 dark:text-white">{name}</p>
          <span className="inline-flex h-4 items-center rounded-full bg-indigo-500/10 px-1.5 text-[8px] font-semibold uppercase text-indigo-600 dark:bg-indigo-500/[0.15] dark:text-indigo-300">v{ver}</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{meta}</p>
      </div>
      <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1", ok ? "bg-emerald-500/[0.12] text-emerald-700 ring-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/25" : "bg-amber-500/[0.12] text-amber-700 ring-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:ring-amber-500/25")}>
        {ok ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
        {status}
      </span>
      <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
        <span className="grid h-7 w-7 place-items-center rounded-md"><MessageSquare className="h-3.5 w-3.5" /></span>
        <span className="grid h-7 w-7 place-items-center rounded-md"><History className="h-3.5 w-3.5" /></span>
        <span className="grid h-7 w-7 place-items-center rounded-md"><Download className="h-3.5 w-3.5" /></span>
        <span className="grid h-7 w-7 place-items-center rounded-md text-red-500 dark:text-red-400"><Trash2 className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}
