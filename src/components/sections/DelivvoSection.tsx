"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import Counter from "@/components/ui/Counter";
import { HeroShowcase } from "@/components/delivvo-showcase/hero-showcase";
import { Link2, FileSignature, History, BellRing, Mail, FileText, Wallet, ShieldCheck } from "lucide-react";

const GATEWAYS = ["Stripe", "PayPal", "Tap", "Telr", "PayTabs", "Checkout.com", "Wise", "Payoneer", "IBAN"];

function Wordmark() {
  return (
    <span className="type-display inline-flex items-center text-3xl font-bold tracking-tight">
      Delivvo
      <span className="relative ml-1.5 inline-flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-50" style={{ background: "var(--accent-2)" }} />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent-2)" }} />
      </span>
    </span>
  );
}

function Underline() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 320 12" className="absolute -bottom-2 left-0 w-full" fill="none" aria-hidden preserveAspectRatio="none">
      <motion.path
        d="M4 7 C 80 3, 150 3, 220 6 S 300 8, 316 6"
        stroke="var(--accent-2)"
        strokeWidth="4"
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
      />
    </svg>
  );
}

export default function DelivvoSection() {
  return (
    <>
      {/* ACT 1 — the pitch */}
      <section data-theme-section="delivvo" className="section relative overflow-hidden">
        <div className="wrap-wide">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-4">
                <Wordmark />
                <span className="chip">delivvo.io</span>
              </div>
              <p className="eyebrow mt-7">Founder · Solo · Live in production</p>
              <h3 className="display mt-5 text-[clamp(2.3rem,5.6vw,4.4rem)] font-medium leading-[1.06]">
                <span className="block">Send your work.</span>
                <span className="block">Get approved.</span>
                <span className="relative inline-block">
                  <span style={{ color: "var(--accent-2)" }}>Get paid.</span>
                  <Underline />
                </span>
              </h3>
              <Reveal delay={0.2} className="mt-8 max-w-lg">
                <p className="text-[1.05rem] leading-relaxed text-muted">
                  One branded link per project. Your client opens it in any browser, no login, and can
                  review deliverables, approve, sign, and pay. The money lands in your own gateway, and
                  Delivvo takes <span className="text-accent">0%</span> of it.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-2">
                {["Next.js", "Supabase", "Stripe", "9 gateways", "AES-256"].map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </Reveal>
              <Reveal delay={0.4} className="mt-9">
                <Magnetic>
                  <a href="https://delivvo.io" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor>
                    Visit Delivvo <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </Reveal>
            </div>
            <Reveal x={0} y={30} delay={0.15} className="hidden lg:block">
              <p className="type-mono max-w-[220px] text-[0.72rem] leading-relaxed text-muted">
                The demo below is the product itself. The cursor moves on its own, clicking through the
                real client portal, payments, and dashboard.
              </p>
            </Reveal>
          </div>

          {/* the real animated product showcase (ported from delivvo.io) */}
          <Reveal delay={0.15} y={40} className="mt-12">
            <div className="dark overflow-hidden rounded-2xl">
              <HeroShowcase />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACT 2 — payments, 0% */}
      <section data-theme-section="delivvo" className="section relative overflow-hidden pt-0">
        <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-5">Payments</p>
            <div className="flex items-end gap-3">
              <span className="display text-[clamp(4rem,11vw,8rem)] font-bold leading-none" style={{ color: "var(--accent-2)" }}>0%</span>
              <span className="mb-3 type-display text-2xl text-muted">platform fee</span>
            </div>
            <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-muted">
              Connect Stripe, PayPal, or a provider you already use. Clients pay through the portal and
              the money goes straight to you. Delivvo never touches it. Wallets and MENA gateways are
              included, and keys are encrypted at rest.
            </p>
          </div>
          <Reveal y={30} className="flex flex-wrap gap-2 lg:justify-end">
            {GATEWAYS.map((g) => (
              <span key={g} className="chip" style={{ fontSize: "0.8rem", padding: "0.5rem 0.85rem" }}>{g}</span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ACT 2.5 — everything the handoff needs */}
      <section data-theme-section="delivvo" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide">
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-5">Beyond the link</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-medium">
              <Words as="span" text="Everything a client handoff actually needs, in one place." />
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Link2, t: "One link, no login", d: "Your client opens a branded URL. Email plus a one-time code and they're in, with no account to create." },
              { icon: FileSignature, t: "Contracts, signed inline", d: "Send a contract for a drawn signature with a full, timestamped audit trail." },
              { icon: History, t: "Version history", d: "Every revision of a deliverable is kept, so nobody argues about which file was final." },
              { icon: BellRing, t: "Automated reminders", d: "Quiet nudges chase the approval and the payment, so you don't have to." },
              { icon: Wallet, t: "Nine gateways, 0% fee", d: "Stripe, PayPal, Tap, and more. The money lands straight in your own account." },
              { icon: Mail, t: "Branded client emails", d: "Every notification your client gets carries your studio's name, not Delivvo's." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) * 0.07} y={30}>
                <div className="card group h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 items-center justify-center" style={{ borderRadius: "calc(var(--radius) * 0.85)", background: "color-mix(in oklab, var(--accent) 16%, transparent)", color: "var(--accent)" }}>
                    <f.icon size={20} strokeWidth={1.75} />
                  </span>
                  <h4 className="type-display mt-5 text-lg font-medium">{f.t}</h4>
                  <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* the flow: send -> client acts -> paid */}
          <Reveal delay={0.1} y={30} className="mt-8">
            <div className="card flex flex-col items-stretch gap-4 p-6 sm:flex-row sm:items-center">
              {[
                { n: "01", t: "You send one link", ic: Link2 },
                { n: "02", t: "They review, approve & sign", ic: ShieldCheck },
                { n: "03", t: "They pay, into your gateway", ic: Wallet },
              ].map((s, i, arr) => (
                <div key={s.n} className="flex flex-1 items-center gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "var(--surface-2)", color: "var(--accent)" }}><s.ic size={18} /></span>
                    <div>
                      <span className="type-mono text-[0.62rem] text-muted">{s.n}</span>
                      <p className="type-body text-[0.9rem] font-medium leading-tight">{s.t}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && <span aria-hidden className="hidden flex-1 text-center text-muted sm:block">→</span>}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ACT 3 — built and run solo */}
      <section data-theme-section="delivvo" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">One founder, the whole surface</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-medium">
              <Words as="span" text="Landing, portal, dashboard, payments, contracts: all shipped and run by one person." />
            </h3>
            <Reveal delay={0.2} className="mt-9">
              <Magnetic>
                <a href="https://delivvo.io" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor>
                  Go to Delivvo <span aria-hidden>↗</span>
                </a>
              </Magnetic>
            </Reveal>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[
              { v: 9, s: "", l: "Payment gateways" },
              { v: 0, s: "%", l: "Platform fee" },
              { v: 7, s: "-day", l: "Free trial" },
            ].map((st) => (
              <Reveal key={st.l}>
                <div className="stat">
                  <div className="n text-3xl"><Counter value={st.v} suffix={st.s} /></div>
                  <div className="l mt-1">{st.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
