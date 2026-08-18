"use client";

import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import { Shot } from "@/components/ui/Frame";

const FACTS = [
  { k: "Based in", v: "Dubai, UAE" },
  { k: "Studying", v: "BSc Computer Science · UOWD" },
  { k: "Languages", v: "Arabic (fluent) · English (advanced)" },
  { k: "Status", v: "Open to work" },
];

export default function About() {
  return (
    <section id="about" data-theme-section="shell" className="section relative overflow-hidden">
      <div className="wrap-wide grid grid-cols-1 items-start gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* portrait */}
        <Reveal y={30}>
          <div className="crop">
            <div className="frame grain relative">
              <div className="aspect-[4/5] overflow-hidden">
                <Shot src="/me.png" alt="Mohammed Bibo" className="h-full w-full object-cover" />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <span className="type-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: "#f4f4f5" }}>
                  Mohammed Bibo
                </span>
                <span className="type-mono text-[0.62rem] uppercase tracking-[0.18em]" style={{ color: "#f4f4f5" }}>
                  Dubai · 2026
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* text */}
        <div>
          <p className="eyebrow mb-6">About</p>
          <h2 className="display text-[clamp(1.9rem,5vw,3.6rem)] font-semibold">
            <Words as="span" text="I like the part where an idea becomes something people rely on." />
          </h2>

          <Reveal delay={0.2} className="mt-8 flex max-w-2xl flex-col gap-5 text-[1.05rem] leading-relaxed text-muted">
            <p>
              I&apos;m a computer-science student at the University of Wollongong in Dubai, and a
              hands-on full-stack builder. I design, ship, and run production software end to end:
              product, interface, database, payments, authentication, and deployment.
            </p>
            <p>
              Delivvo is my own SaaS, live and taking payments. Alongside it I lead the build at
              BMT Materials and MedA+ Academy, and I&apos;ve shipped Cutroom, a desktop AI video
              editor. I lean on AI heavily, but I keep everything under my own control. That&apos;s
              how you move fast and still trust what you put in front of people.
            </p>
          </Reveal>

          <Reveal delay={0.3} className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-2">
            {FACTS.map((f) => (
              <div key={f.k} className="border-t hairline py-4">
                <p className="type-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{f.k}</p>
                <p className="type-body mt-1 text-[0.98rem]">{f.v}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
