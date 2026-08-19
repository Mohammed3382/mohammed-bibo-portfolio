"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import Counter from "@/components/ui/Counter";
import FitScale from "@/components/ui/FitScale";
import { BrowserFrame } from "@/components/ui/Frame";
import { HeroShowcase } from "@/components/delivvo-showcase/hero-showcase";
import { DelivvoDashboard, DelivvoClientPortal } from "@/components/mocks/DelivvoAppMocks";

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

      {/* ACT 2 — two sides of one link (freelancer workspace + client portal) */}
      <section data-theme-section="delivvo" className="relative overflow-hidden pb-[clamp(4rem,10vh,8rem)] pt-0">
        <div className="wrap-bleed">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow mb-5">Two sides of one link</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-medium">
              <Words as="span" text="You run the workspace. Your client just opens a page." />
            </h3>
            <Reveal delay={0.15} className="mt-5">
              <p className="max-w-xl text-[1rem] leading-relaxed text-muted">
                Both screens below are rebuilt from the live product with stand-in data. On the left is
                what the freelancer works in every day. On the right is the single page a client lands on
                to review and pay.
              </p>
            </Reveal>
          </div>

          {/* freelancer workspace */}
          <Reveal y={40} className="mt-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="type-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">01 — The freelancer&apos;s workspace</span>
              <span className="hidden h-px flex-1 sm:block" style={{ background: "var(--border)" }} />
            </div>
            <FitScale designWidth={1200} className="rounded-2xl">
              <BrowserFrame url="delivvo.io/dashboard">
                <DelivvoDashboard />
              </BrowserFrame>
            </FitScale>
          </Reveal>

          {/* client portal */}
          <Reveal y={40} className="mt-16">
            <div className="mb-3 flex items-center gap-3">
              <span className="type-mono text-[0.66rem] uppercase tracking-[0.16em] text-accent">02 — What your client opens</span>
              <span className="hidden h-px flex-1 sm:block" style={{ background: "var(--border)" }} />
            </div>
            <FitScale designWidth={1000} className="rounded-2xl">
              <BrowserFrame url="studio-noor.delivvo.io">
                <DelivvoClientPortal />
              </BrowserFrame>
            </FitScale>
          </Reveal>
        </div>
      </section>

      {/* ACT 3 — payments, 0% */}
      <section data-theme-section="delivvo" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
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

      {/* ACT 4 — built and run solo */}
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
