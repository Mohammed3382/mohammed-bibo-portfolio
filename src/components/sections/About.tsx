"use client";

import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import { Shot } from "@/components/ui/Frame";

const FACTS = [
  { k: "Based in", v: "Dubai, UAE" },
  { k: "Studying", v: "BSc Computer Science · UOWD · 2023 → 2027" },
  { k: "Languages", v: "Arabic (fluent) · English (advanced)" },
  { k: "Right now", v: "Building Delivvo · open to work" },
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
            <Words as="span" text="I build the whole thing, then I keep it running." />
          </h2>

          <Reveal delay={0.2} className="mt-8 flex max-w-2xl flex-col gap-5 text-[1.05rem] leading-relaxed text-muted">
            <p>
              I&apos;m Mohammed, a computer-science student in Dubai who spends most of his time
              building software other people actually depend on. Not demos. Products with real users,
              real payments, and real support messages when something breaks at midnight.
            </p>
            <p>
              I work end to end on purpose. The same day I sketch a screen I&apos;ll write the API
              behind it, design the database, wire the payment gateway, and push it live on its own
              domain. Delivvo is mine from the first commit to the invoices it settles. I lead BMT
              Materials and MedA+ Academy the same way, and Cutroom, a desktop AI video editor, is one
              I shipped on the side.
            </p>
            <p>
              AI is a big part of how I move this fast, and I use it hard. But I read what it writes and
              own every call. That&apos;s the only way I&apos;d put my name on something and hand it to
              a stranger.
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

          <Reveal delay={0.4} className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a href="/resume" className="btn btn-primary" data-cursor>
                Read the full résumé <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="mailto:mohdbibo22@gmail.com" className="btn btn-ghost" data-cursor>
                Get in touch
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
