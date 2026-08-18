"use client";

import Words from "@/components/ui/Words";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

const STACK = [
  "Next.js", "React", "TypeScript", "Tailwind", "Node.js", "PostgreSQL",
  "Prisma", "Supabase", "Stripe", "Firebase", "Electron", "Vercel", "MCP / AI",
];

const PILLARS = [
  {
    k: "01",
    t: "Product & interface",
    d: "I design the whole surface: flows, the UI system, the copy. It should read like a real product, not a prototype.",
  },
  {
    k: "02",
    t: "Full-stack engineering",
    d: "Databases, auth, payments, APIs. I wire the parts that have to be correct: money, access, and data.",
  },
  {
    k: "03",
    t: "Ship & operate",
    d: "Deploys, custom domains, DNS, and the support afterwards. I run what I build, live and in production.",
  },
];

export default function Manifesto() {
  return (
    <section data-theme-section="shell" className="section relative overflow-hidden">
      <div className="wrap">
        <h2 className="display max-w-4xl text-[clamp(1.9rem,5vw,3.6rem)] font-semibold">
          <Words as="span" text="I take a product from an empty folder to a customer who pays for it," />{" "}
          <span className="text-muted">
            <Words as="span" text="and then I keep it running." delay={0.2} />
          </span>
        </h2>
      </div>

      {/* stack marquee */}
      <Reveal className="mt-14 border-y hairline py-5" y={0}>
        <Marquee duration={40}>
          {STACK.map((s) => (
            <span key={s} className="flex items-center gap-6 pr-6">
              <span className="type-display text-2xl text-muted">{s}</span>
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </Reveal>

      {/* pillars */}
      <div className="wrap mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <Reveal key={p.k} delay={i * 0.08}>
            <div className="h-full border-t-2 pt-5" style={{ borderColor: "var(--accent)" }}>
              <span className="type-mono text-[0.7rem] text-muted">{p.k}</span>
              <h3 className="type-display mt-3 text-xl">{p.t}</h3>
              <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
