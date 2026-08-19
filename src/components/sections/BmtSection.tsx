"use client";

import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import Counter from "@/components/ui/Counter";
import Marquee from "@/components/ui/Marquee";
import FitScale from "@/components/ui/FitScale";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/ui/Frame";
import { BmtProductPageMobile, BmtAdmin } from "@/components/mocks/BmtMocks";
import { MapPin, Truck, Calculator, Ruler, Layers, ReceiptText } from "lucide-react";

const STATS = [
  { v: 2, suffix: "", l: "Categories" },
  { v: 43, suffix: "+", l: "Products" },
  { v: 12, suffix: "", l: "Governorates" },
  { v: 82, suffix: "+", l: "Delivery areas" },
];

const PRODUCTS = [
  { img: "/brands/bmt/interlock-1.jpg", name: "Interlock paver, Holland", sku: "INT-HL-06", price: "6.50", unit: "m²", off: "-12%" },
  { img: "/brands/bmt/tiles-1.jpg", name: "Porcelain floor tile", sku: "TIL-PC-60", price: "9.25", unit: "m²" },
  { img: "/brands/bmt/natural-stone-1.jpg", name: "Natural stone cladding", sku: "STN-NT-14", price: "14.00", unit: "m²" },
  { img: "/brands/bmt/cement-1.jpg", name: "Portland cement, 50kg", sku: "CEM-OP-50", price: "3.10", unit: "bag" },
];

const GOVERNORATES = ["Amman", "Irbid", "Zarqa", "Balqa", "Madaba", "Karak", "Mafraq", "Jerash", "Ajloun", "Aqaba", "Ma'an", "Tafilah"];

function Logo() {
  return (
    <span className="inline-flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brands/bmt/logo-icon.png" alt="BMT" className="h-9 w-auto" style={{ background: "#fff", padding: 4 }} />
      <span className="leading-none">
        <span className="type-display block text-xl font-extrabold" style={{ color: "var(--fg)" }}>BMT</span>
        <span className="type-mono block text-[0.58rem] uppercase tracking-[0.2em] text-muted">Building materials</span>
      </span>
    </span>
  );
}

function ProductCard({ p }: { p: (typeof PRODUCTS)[number] }) {
  return (
    <div className="card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Shot src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {p.off && (
          <span className="absolute left-0 top-0 type-mono text-[0.6rem] font-semibold" style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "2px 6px" }}>
            {p.off}
          </span>
        )}
        <span className="absolute right-0 top-0 type-mono text-[0.52rem] uppercase tracking-[0.12em]" style={{ background: "color-mix(in oklab, var(--bg) 82%, transparent)", color: "var(--muted)", padding: "3px 6px" }}>
          {p.sku}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <h4 className="type-body text-[0.82rem] font-semibold leading-snug">{p.name}</h4>
        <span className="type-mono shrink-0 text-[0.78rem] font-semibold" style={{ color: "var(--accent-2)" }}>
          {p.price}<span className="text-muted"> /{p.unit}</span>
        </span>
      </div>
    </div>
  );
}

export default function BmtSection() {
  return (
    <>
      {/* ACT 1 — the storefront hero (dark steel, blueprint grid, crop-marks) */}
      <section data-theme-section="bmt" className="relative flex min-h-[92svh] items-center overflow-hidden py-24">
        <div className="grid-blueprint absolute inset-0 opacity-70" aria-hidden />
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <Shot src="/brands/bmt/hero-main.jpg" alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0" aria-hidden style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--bg) 55%, transparent), var(--bg) 88%)" }} />
        <div className="spotlight" aria-hidden />

        <div className="wrap-wide relative z-10">
          <div className="mb-10 flex items-center justify-between">
            <Logo />
            <span className="chip">bmtmaterials.com</span>
          </div>

          <div className="crop max-w-4xl p-6">
            <p className="eyebrow mb-6">Building materials · Jordan</p>
            <h3 className="display text-[clamp(2.2rem,6.4vw,5.2rem)] font-extrabold leading-[1.03]">
              <Words as="span" text="The building materials your project runs on, from foundation to finish." />
            </h3>
            <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              Interlock, concrete blocks, tiles, natural and manufactured stone, and cement. It&apos;s
              all in stock, priced in Jordanian dinars, and delivered to your governorate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Magnetic><button className="btn btn-primary" data-cursor>Shop now <span aria-hidden>→</span></button></Magnetic>
              <Magnetic><button className="btn btn-ghost" data-cursor>Request a bulk quote</button></Magnetic>
            </div>
          </div>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="stat">
                <div className="n text-3xl"><Counter value={s.v} suffix={s.suffix} /></div>
                <div className="l mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACT 2 — the catalog (compact, real materials) */}
      <section data-theme-section="bmt" className="section relative overflow-hidden">
        <div className="wrap-wide">
          <div className="mb-8 flex flex-col gap-4 border-t hairline pt-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="eyebrow mb-4">In stock · priced by the metre</p>
              <h3 className="display max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
                <Words as="span" text="A catalog measured, not rounded." />
              </h3>
            </div>
            <Magnetic><button className="btn btn-primary shrink-0" data-cursor>Bulk quote for contractors</button></Magnetic>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.sku} delay={i * 0.06} y={30}><ProductCard p={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACT 2.5 — every product page is a spec sheet (feature the mobile mock) */}
      <section data-theme-section="bmt" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="eyebrow mb-5">The product page</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
              <Words as="span" text="Every product page reads like a spec sheet." />
            </h3>
            <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-muted">
              Dimensions, coverage, weight, and a live bulk-pricing table. Delivery is calculated from the
              Sahab yard to your pin, so the number you see is the number you pay.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { ic: Ruler, t: "Full specs", d: "Size, finish, coverage" },
                { ic: Layers, t: "Bulk tiers", d: "Cheaper by the pallet" },
                { ic: ReceiptText, t: "Live totals", d: "Delivery in the price" },
              ].map((r) => (
                <div key={r.t} className="card p-4" style={{ borderInlineStart: "2px solid var(--accent)" }}>
                  <r.ic size={18} style={{ color: "var(--accent)" }} />
                  <p className="type-body mt-3 text-[0.92rem] font-semibold">{r.t}</p>
                  <p className="type-mono mt-1 text-[0.62rem] uppercase tracking-[0.1em] text-muted">{r.d}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal y={40} className="justify-self-center lg:justify-self-end">
            <PhoneFrame className="w-[clamp(260px,80vw,340px)]">
              <div className="relative" style={{ maxHeight: 660, overflow: "hidden" }}>
                <BmtProductPageMobile />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20" style={{ background: "linear-gradient(transparent, #F5F3F0)" }} />
              </div>
            </PhoneFrame>
          </Reveal>
        </div>
      </section>

      {/* ACT 3 — bilingual, RTL-first (real mobile site, EN vs AR) — big phones */}
      <section data-theme-section="bmt" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 items-center gap-x-12 gap-y-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-5">Bilingual · RTL-first</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
              <Words as="span" text="Arabic isn't a translation. It's the default." />
            </h3>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted">
              Every layout mirrors with logical CSS, numerals switch to Arabic-Indic, and the copy is
              written natively in both languages. The same store, flipped.
            </p>
            <div className="mt-8 card p-5" dir="rtl" style={{ fontFamily: "var(--font-tajawal)" }}>
              <p className="text-xl font-bold" style={{ color: "var(--fg)" }}>مواد البناء التي يقوم عليها مشروعك</p>
              <div className="mt-3 inline-block spec-tag" dir="rtl">١٢٫٥٠ دينار <span className="text-muted">/ م²</span></div>
            </div>
          </div>
          <Reveal y={40}>
            <div className="flex items-start justify-center gap-5 sm:gap-8">
              <div className="w-[clamp(150px,40%,320px)]">
                <PhoneFrame><Shot src="/brands/bmt/mobile-en.png" alt="BMT storefront on mobile, English" /></PhoneFrame>
                <p className="mt-3 type-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">English · LTR</p>
              </div>
              <div className="mt-10 w-[clamp(150px,40%,320px)]">
                <PhoneFrame><Shot src="/brands/bmt/mobile-ar.png" alt="BMT storefront on mobile, Arabic" /></PhoneFrame>
                <p className="mt-3 type-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted" dir="rtl" style={{ fontFamily: "var(--font-tajawal)" }}>عربي · RTL</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACT 3.5 — coverage (full-bleed steel band + governorate ticker) */}
      <section data-theme-section="bmt" className="relative overflow-hidden py-[clamp(4rem,10vh,8rem)]">
        <div className="bleed relative" style={{ background: "var(--bg-2)", borderBlock: "1px solid var(--border)" }}>
          <div className="grid-blueprint absolute inset-0 opacity-40" aria-hidden />
          <div className="wrap-bleed relative py-14">
            <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="eyebrow mb-5">Coverage</p>
                <h3 className="display text-[clamp(2rem,5.2vw,4rem)] font-extrabold leading-[1.02]">
                  <Words as="span" text="Delivered across all twelve governorates." />
                </h3>
              </div>
              <p className="max-w-md text-[1.02rem] leading-relaxed text-muted md:pb-2">
                Pick your governorate, drop a pin, and delivery is worked out by the exact distance from
                the Sahab yard. The total on the screen is the total you hand over at the door.
              </p>
            </div>
          </div>

          {/* governorate ticker */}
          <div className="relative border-y hairline py-5">
            <Marquee duration={40}>
              {GOVERNORATES.map((g) => (
                <span key={g} className="flex items-center gap-5 px-5">
                  <span className="type-display text-[clamp(1.4rem,3vw,2.4rem)] font-extrabold" style={{ color: "var(--fg)" }}>{g}</span>
                  <span className="h-2 w-2 rounded-full" style={{ background: "var(--accent)" }} />
                </span>
              ))}
            </Marquee>
          </div>

          <div className="wrap-bleed relative py-14">
            <div className="grid grid-cols-1 gap-px sm:grid-cols-3" style={{ background: "var(--border)" }}>
              {[
                { ic: Truck, t: "Delivered by your city", d: "A truck routed to your governorate, not a courier." },
                { ic: MapPin, t: "Priced to your pin", d: "Exact distance from the yard, not a flat guess." },
                { ic: Calculator, t: "No surprises", d: "The delivery fee is shown before you pay a dinar." },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-4 p-6" style={{ background: "var(--bg)" }}>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center" style={{ background: "color-mix(in oklab, var(--accent) 16%, transparent)", color: "var(--accent)" }}><r.ic size={20} /></span>
                  <div>
                    <p className="type-body text-[1rem] font-semibold">{r.t}</p>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-muted">{r.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACT 4 — the live storefront, built end to end */}
      <section data-theme-section="bmt" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-5">Full-stack, one system</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
              <Words as="span" text="The storefront customers see, and the admin that runs it." />
            </h3>
          </div>
          <Reveal y={40}>
            <FitScale designWidth={1000} className="rounded-2xl">
              <BrowserFrame url="bmtmaterials.com/admin">
                <BmtAdmin />
              </BrowserFrame>
            </FitScale>
            <p className="mt-3 type-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">Products, orders, quotes, and delivery zones, in one dashboard</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <Magnetic>
              <a href="https://www.bmtmaterials.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor>
                Visit BMT Materials <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  );
}
