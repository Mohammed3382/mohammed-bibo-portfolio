"use client";

import Words from "@/components/ui/Words";
import Reveal from "@/components/ui/Reveal";

export default function WorkIndex() {
  return (
    <section
      id="work"
      data-theme-section="shell"
      className="section relative overflow-hidden pb-0"
    >
      <div className="wrap-wide">
        <div className="flex flex-col justify-between gap-6 border-t hairline pt-6 md:flex-row md:items-baseline">
          <p className="eyebrow">Selected work · 2024 → 2026</p>
          <p className="type-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
            Live in production
          </p>
        </div>

        <h2 className="display mt-10 max-w-5xl text-[clamp(2.2rem,6.5vw,5rem)] font-semibold">
          <Words as="span" text="Three products." />{" "}
          <span className="text-muted">
            <Words as="span" text="Each one takes over the page." delay={0.15} />
          </span>
        </h2>

        <Reveal delay={0.2} className="mt-8 max-w-2xl">
          <p className="text-[1.02rem] leading-relaxed text-muted">
            What follows isn&apos;t a grid of thumbnails. As you scroll into each project, the
            whole site takes on its real identity: the exact colors, typefaces, and details from the
            product itself. Then it hands the room back. Same builder, three different worlds.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
