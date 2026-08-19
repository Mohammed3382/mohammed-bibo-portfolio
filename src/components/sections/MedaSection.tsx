"use client";

import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";
import { BrowserFrame, PhoneFrame, Shot } from "@/components/ui/Frame";
import FitScale from "@/components/ui/FitScale";
import { MedaLessonPlayer, MedaMyCoursesMobile } from "@/components/mocks/MedaMocks";

/* --- small clinical line icons (lucide-style, 1.6 stroke) --- */
function Icon({ name }: { name: "heart" | "pill" | "scope" | "bone" | "scan" | "book" }) {
  const paths: Record<string, React.ReactNode> = {
    heart: <path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z" />,
    pill: <><rect x="3" y="8" width="18" height="8" rx="4" /><path d="M12 8v8" /></>,
    scope: <><path d="M6 3v6a4 4 0 0 0 8 0V3" /><path d="M10 15a6 6 0 0 0 6 6 4 4 0 0 0 4-4v-2" /><circle cx="20" cy="13" r="1.6" /></>,
    bone: <path d="M7 17a2.5 2.5 0 1 1-2-4 2.5 2.5 0 0 1 2-4l8 8a2.5 2.5 0 0 1 2 4 2.5 2.5 0 0 1-2 4l-8-8Z" />,
    scan: <><path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" /><path d="M4 12h16" /></>,
    book: <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2V5Zm2 13h12" />,
  };
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

const COURSES = [
  { spec: "Cardiology", icon: "heart", level: "Beginner", title: "The heart, case by case", meta: "14 lectures · 5.2 hrs · 4.9★", by: "Layla, MD-4" },
  { spec: "Pharmacology", icon: "pill", level: "Intermediate", title: "Drugs you'll actually prescribe", meta: "12 lectures · 4.4 hrs · 4.9★", by: "Sara, MD-4" },
  { spec: "Clinical skills", icon: "scope", level: "Beginner", title: "Reading a patient at the bedside", meta: "10 lectures · 3.8 hrs · 4.8★", by: "Omar, MD-5" },
] as const;

const STEPS = [
  { n: "01", t: "Find your course", d: "Browse courses run by students a year or two ahead of you, sorted by specialty and level." },
  { n: "02", t: "Ask for access", d: "There's no checkout. You reach out, we enrol you directly, and your account unlocks." },
  { n: "03", t: "Watch the lessons", d: "Ordered, case-based video you can follow at your own pace, on any device." },
  { n: "04", t: "Keep your progress", d: "Everything you've watched is saved, so you always pick up where you left off." },
];

const SPECIALTIES = [
  { s: "Anatomy", icon: "bone" }, { s: "Clinical skills", icon: "scope" }, { s: "Pathology", icon: "scan" },
  { s: "Pharmacology", icon: "pill" }, { s: "Radiology", icon: "scan" }, { s: "Surgery", icon: "book" },
] as const;

function PlusField() {
  const marks = [
    { l: 8, t: 18, s: 20, d: 0 }, { l: 30, t: 62, s: 14, d: 1.2 }, { l: 52, t: 12, s: 16, d: 2.1 },
    { l: 71, t: 40, s: 22, d: 0.6 }, { l: 88, t: 20, s: 14, d: 1.8 }, { l: 94, t: 66, s: 18, d: 0.3 },
    { l: 16, t: 78, s: 16, d: 2.4 }, { l: 62, t: 82, s: 14, d: 1.0 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {marks.map((m, i) => (
        <span key={i} className="plus-mark type-display" style={{ left: `${m.l}%`, top: `${m.t}%`, fontSize: m.s, opacity: 0.16, animationDelay: `${m.d}s` }}>+</span>
      ))}
    </div>
  );
}

function CourseCard({ c }: { c: (typeof COURSES)[number] }) {
  return (
    <div className="card group overflow-hidden transition-transform duration-300 hover:-translate-y-1.5" style={{ boxShadow: "0 1px 2px rgba(15,26,46,.05), 0 14px 30px -20px rgba(15,26,46,.20)" }}>
      <div className="relative flex items-center gap-2.5 p-4" style={{ background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--surface)", color: "var(--accent)", border: "1px solid var(--border)" }}>
          <Icon name={c.icon} />
        </span>
        <span className="type-mono text-[0.64rem] uppercase tracking-[0.16em]" style={{ color: "var(--accent)" }}>{c.spec}</span>
        <span className="type-display pointer-events-none absolute -right-1 -top-3 text-5xl font-bold" style={{ color: "var(--accent)", opacity: 0.06 }}>+</span>
      </div>
      <div className="p-5">
        <span className="chip">{c.level}</span>
        <h4 className="type-display mt-3 text-lg font-semibold leading-snug">{c.title}</h4>
        <p className="mt-3 type-mono text-[0.68rem] text-muted">{c.meta}</p>
        <div className="mt-4 flex items-center justify-between border-t hairline pt-3">
          <span className="flex items-center gap-2 type-mono text-[0.66rem] text-muted">
            <span className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "var(--surface-2)", color: "var(--accent)" }}>{c.by[0]}</span>
            {c.by}
          </span>
          <span className="ulink type-mono text-[0.66rem] uppercase tracking-[0.12em]" style={{ color: "var(--accent)" }}>View course →</span>
        </div>
      </div>
    </div>
  );
}

export default function MedaSection() {
  return (
    <>
      {/* ACT 1 — clinical hero (light, illustration-forward) */}
      <section data-theme-section="meda" className="relative flex min-h-[92svh] items-center overflow-hidden py-24">
        <div className="reticle absolute inset-0" aria-hidden />
        <PlusField />
        <div className="wrap-wide relative z-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brands/meda/logo.png" alt="MedA+ Academy" className="h-9 w-auto" />
            <p className="eyebrow mt-6">Clinical education · By students, for students</p>
            <h3 className="display mt-5 text-[clamp(2.2rem,5.8vw,4.4rem)] font-bold leading-[1.06]">
              <Words as="span" text="Study medicine the way it's actually learned." />
            </h3>
            <Reveal delay={0.2} className="mt-6 max-w-lg">
              <p className="text-[1.05rem] leading-relaxed text-muted">
                Clinical courses built and taught by students who&apos;ve already been through it. Real
                cases, plain explanations, none of the filler.
              </p>
            </Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap gap-3">
              <Magnetic><a href="https://med-aplus.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor>Request access <span aria-hidden>→</span></a></Magnetic>
              <Magnetic><button className="btn btn-ghost" data-cursor>Browse courses</button></Magnetic>
            </Reveal>
            <Reveal delay={0.4} className="mt-8 flex flex-wrap gap-2">
              {["Taught by students", "Case-based", "Learn anywhere", "EN · AR"].map((t) => <span key={t} className="chip">{t}</span>)}
            </Reveal>
          </div>

          <Reveal x={0} y={40} delay={0.15}>
            <BrowserFrame url="med-aplus.com">
              <Shot src="/brands/meda/live-hero.jpg" alt="MedA+ Academy landing page" />
            </BrowserFrame>
          </Reveal>
        </div>
      </section>

      {/* ACT 2 — the courses */}
      <section data-theme-section="meda" className="section relative overflow-hidden">
        <div className="wrap-wide">
          <div className="mb-10 flex flex-col gap-4 border-t hairline pt-6 md:flex-row md:items-baseline md:justify-between">
            <div>
              <p className="eyebrow mb-4">The library</p>
              <h3 className="display max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
                <Words as="span" text="Real courses, run by someone who just sat your exams." />
              </h3>
            </div>
            <p className="type-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">12 student instructors</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {COURSES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} y={36}><CourseCard c={c} /></Reveal>
            ))}
          </div>

          {/* specialty rail */}
          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
            {SPECIALTIES.map((s) => (
              <span key={s.s} className="chip" style={{ color: "var(--muted)" }}>
                <span style={{ color: "var(--accent)" }}><Icon name={s.icon} /></span>
                {s.s}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ACT 2.5 — inside a lesson (the real player + curriculum + watermark) */}
      <section data-theme-section="meda" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide">
          <div className="mb-10 flex flex-col gap-4 border-t hairline pt-6 md:flex-row md:items-baseline md:justify-between">
            <h3 className="display max-w-2xl text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
              <Words as="span" text="Inside a lesson: ordered video, saved progress, and a watermark tied to you." />
            </h3>
            <p className="type-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">Case-based · Protected</p>
          </div>
          <Reveal y={40}>
            <FitScale designWidth={1040} className="rounded-2xl">
              <BrowserFrame url="med-aplus.com/app/courses">
                <MedaLessonPlayer />
              </BrowserFrame>
            </FitScale>
          </Reveal>
        </div>
      </section>

      {/* ACT 2.7 — specialties + instructors */}
      <section data-theme-section="meda" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-5">Specialties</p>
            <h3 className="display text-[clamp(1.7rem,3.8vw,2.6rem)] font-bold">
              <Words as="span" text="Organised the way medicine is." />
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {SPECIALTIES.map((s, i) => (
                <Reveal key={s.s} delay={i * 0.05}>
                  <div className="card flex h-full items-center gap-3 p-4 transition-transform duration-300 hover:-translate-y-1" style={{ borderRadius: 12 }}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ background: "var(--surface-2)", color: "var(--accent)", border: "1px solid var(--border)" }}>
                      <Icon name={s.icon} />
                    </span>
                    <span className="type-body text-[0.92rem] font-medium">{s.s}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-5">The instructors</p>
            <h3 className="display text-[clamp(1.7rem,3.8vw,2.6rem)] font-bold">
              <Words as="span" text="A year or two ahead, and still in it." />
            </h3>
            <div className="mt-8 flex flex-col gap-3">
              {[
                { name: "Layla", spec: "Cardiology", year: "MD-4", n: 3 },
                { name: "Omar", spec: "Emergency medicine", year: "MD-5", n: 2 },
                { name: "Sara", spec: "Pharmacology", year: "MD-4", n: 4 },
                { name: "Yousef", spec: "Radiology", year: "MD-5", n: 2 },
              ].map((ins, i) => (
                <Reveal key={ins.name} delay={i * 0.06}>
                  <div className="card flex items-center gap-3 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full type-display font-semibold" style={{ background: "color-mix(in oklab, var(--accent) 12%, var(--surface))", color: "var(--accent)" }}>{ins.name[0]}</span>
                    <div className="min-w-0 flex-1">
                      <p className="type-display text-[0.98rem] font-semibold">{ins.name} <span className="type-mono text-[0.66rem] text-muted">· {ins.year}</span></p>
                      <p className="type-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">{ins.spec}</p>
                    </div>
                    <span className="chip">{ins.n} courses</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3 — how access works (matches the real 4-step) */}
      <section data-theme-section="meda" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide">
          <div className="mb-10 flex items-baseline justify-between border-t hairline pt-6">
            <p className="eyebrow">How it works</p>
            <p className="type-mono text-[0.66rem] uppercase tracking-[0.16em] text-muted">Learning that fits your life</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="card h-full p-6">
                  <span className="type-display text-3xl font-bold" style={{ color: "var(--accent)" }}>{s.n}</span>
                  <h4 className="type-display mt-3 text-lg font-semibold">{s.t}</h4>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-10">
            <BrowserFrame url="med-aplus.com/courses">
              <Shot src="/brands/meda/live-courses.jpg" alt="MedA+ course library" />
            </BrowserFrame>
          </Reveal>
        </div>
      </section>

      {/* ACT 4 — shipped, secure, bilingual */}
      <section data-theme-section="meda" className="section relative overflow-hidden pt-0">
        <div className="wrap-wide grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-5">Shipped · Secure · Bilingual</p>
            <h3 className="display text-[clamp(1.8rem,4.4vw,3rem)] font-bold">
              <Words as="span" text="A real platform, with real protection." />
            </h3>
            <ul className="mt-6 flex flex-col gap-3">
              {[
                "Gated, expiring video links with a moving per-user watermark",
                "One active device per account, a real single-session lock",
                "Student, instructor, and admin sides, each behind its own auth",
                "Full Arabic and English, written natively rather than translated",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-muted">
                  <span className="mt-1 type-display font-bold" style={{ color: "var(--accent)" }}>+</span>
                  {t}
                </li>
              ))}
            </ul>
            <Reveal delay={0.2} className="mt-8">
              <Magnetic><a href="https://med-aplus.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-cursor>Visit MedA+ Academy <span aria-hidden>↗</span></a></Magnetic>
            </Reveal>
          </div>
          <Reveal y={40}>
            <div className="flex justify-center lg:justify-end">
              <PhoneFrame className="w-[clamp(260px,80vw,320px)]"><MedaMyCoursesMobile /></PhoneFrame>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
