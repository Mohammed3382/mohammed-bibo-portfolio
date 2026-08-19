import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";

export const metadata: Metadata = {
  title: "Résumé",
  description: "The full résumé of Mohammed Bibo — founder, full-stack builder, and the person behind Delivvo, BMT Materials, and MedA+ Academy.",
};

/* brand-styled names, each in its own typeface */
function Delivvo() {
  return (
    <span style={{ fontFamily: "var(--font-unbounded)" }} className="font-bold tracking-tight">
      Delivvo<span className="ml-1 inline-block h-[0.4em] w-[0.4em] translate-y-[-0.05em] rounded-full align-baseline" style={{ background: "#f0b429" }} />
    </span>
  );
}
function Bmt() {
  return <span style={{ fontFamily: "var(--font-archivo)", color: "#4aa3e0" }} className="font-extrabold">BMT Materials</span>;
}
function Meda() {
  return <span style={{ fontFamily: "var(--font-jakarta)", color: "#3bb6d6" }} className="font-bold">MedA+ Academy</span>;
}
function Cutroom() {
  return <span style={{ fontFamily: "var(--font-space)", letterSpacing: "0.02em" }} className="font-semibold">Cut<span style={{ color: "#f0b429" }}>room</span></span>;
}

type Exp = {
  when: string; role: string; brand: React.ReactNode; href?: string;
  points: string[];
};

const EXPERIENCE: Exp[] = [
  {
    when: "2026 → Now", role: "Founder", brand: <Delivvo />, href: "https://delivvo.io",
    points: [
      "Built and shipped a client-portal SaaS for freelancers: clients, projects, contracts, and invoices, live in production.",
      "Integrated nine global payment gateways with encrypted credential storage and per-client overrides.",
      "Designed the whole product and UI system solo in Next.js, Tailwind, and shadcn/ui.",
    ],
  },
  {
    when: "2026 → Now", role: "Tech Lead", brand: <Bmt />, href: "https://www.bmtmaterials.com",
    points: [
      "Sole technical owner. Built and shipped the storefront in Next.js on a custom domain.",
      "Built a full-stack business app with database design and Google sign-in, plus an Expo mobile app.",
      "Ran the whole deploy pipeline on Vercel, including domain and DNS.",
    ],
  },
  {
    when: "2026 → Now", role: "Website Lead", brand: <Meda />, href: "https://med-aplus.com",
    points: [
      "Complete full-stack build with backend and security to standard, on Supabase.",
      "Shipped auth for student, instructor, and administrator roles, fully functional in production.",
      "Handled the database, domain, and DNS end to end.",
    ],
  },
  {
    when: "2025", role: "UI/UX Design Intern", brand: <span className="type-display">Pitchmatter</span>,
    points: [
      "Designed wireframes and prototypes to improve usability and flow.",
      "Worked with developers to align the visuals with real product behaviour.",
    ],
  },
  {
    when: "2024", role: "Freelance Consultant", brand: <span className="type-display">Application strategy & digital support</span>,
    points: [
      "Introduced digital tools that streamlined operations.",
      "Delivered recommendations that improved design and performance.",
    ],
  },
];

const PROJECTS = [
  { name: <Cutroom />, tag: "Electron · TypeScript · React", href: "https://delivvo.io/cutroom",
    d: "A local AI video editor for Windows that edits, transcribes, and captions on-device, drivable by AI over MCP." },
  { name: <span className="type-display font-semibold">Skyline Forecast</span>, tag: "Python · Streamlit", href: "https://skylineforecast.streamlit.app",
    d: "A real-time multi-city weather app with insights, scoring, and a “what to wear” feature.", gh: "https://github.com/Mohammed3382/python-weather-app" },
  { name: <span className="type-display font-semibold">Smart File Organizer</span>, tag: "Python · Vercel", href: "https://smart-file-organizer.vercel.app",
    d: "A safe file-organising tool with smart renaming and cleanup, behind a clean web front.", gh: "https://github.com/Mohammed3382/file_organizer_utility" },
];

const SKILLS = [
  { g: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui", "Framer Motion"] },
  { g: "Backend & data", items: ["Node.js", "PostgreSQL", "Prisma", "Supabase", "Firebase"] },
  { g: "Payments & auth", items: ["Stripe", "9 global gateways", "Google OAuth", "AES-256"] },
  { g: "Desktop & AI", items: ["Electron", "MCP", "AI agents"] },
  { g: "Ship & run", items: ["Vercel", "Custom domains", "DNS", "CI/CD"] },
];

const CV_FILE = "/cv/Mohammed-Bibo-CV-2026-08-19.pdf";
const CV_UPDATED = "Updated August 2026";

function DownloadBtn({ className }: { className?: string }) {
  return (
    <Magnetic>
      <a href={CV_FILE} target="_blank" rel="noopener noreferrer" className={`btn btn-primary ${className ?? ""}`} data-cursor>
        Download résumé (PDF) <span aria-hidden>↓</span>
      </a>
    </Magnetic>
  );
}

export default function ResumePage() {
  return (
    <main id="top" className="pb-24 pt-28">
      {/* hero */}
      <section className="section pt-4">
        <div className="wrap-wide">
          <div className="flex flex-col justify-between gap-6 border-b hairline pb-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow mb-6">Résumé · Mohammed Bibo</p>
              <h1 className="display text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.95]">
                <Words as="span" text="The work," className="block" />
                <span className="block">
                  <Words as="span" text="in" className="inline" delay={0.1} />{" "}
                  <span className="type-serif italic" style={{ fontWeight: 500 }}>full.</span>
                </span>
              </h1>
            </div>
            <Reveal delay={0.2} className="flex flex-col items-start gap-2 md:items-end">
              <DownloadBtn />
              <span className="type-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">{CV_UPDATED} · PDF · 56 KB</span>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
            <p className="type-body text-[1.08rem] leading-relaxed text-muted">
              I&apos;m a computer-science student at the University of Wollongong in Dubai, and a
              full-stack builder who ships and runs production software solo. I design the product,
              write the frontend and backend, wire up the payments and auth, and handle the deploy,
              the custom domain, and the support afterwards. Three of my products are live and in
              real use right now. I lean on AI heavily while keeping every decision under my own
              control, because that&apos;s how you move fast and still trust what you put in front of
              people.
            </p>
            <div className="grid grid-cols-1 gap-px self-start sm:grid-cols-2">
              {[
                ["Based in", "Dubai, UAE"],
                ["Studying", "BSc Computer Science · UOWD · 2023 → 2027"],
                ["Languages", "Arabic (fluent) · English (advanced)"],
                ["Email", "mohdbibo22@gmail.com"],
              ].map(([k, v]) => (
                <div key={k} className="border-t hairline py-4">
                  <p className="type-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{k}</p>
                  <p className="type-body mt-1 text-[0.95rem]">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* experience */}
      <section className="section pt-0">
        <div className="wrap-wide">
          <p className="eyebrow mb-10">Experience</p>
          <div>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={i} delay={(i % 2) * 0.05}>
                <div className="grid grid-cols-1 gap-5 border-t hairline py-9 md:grid-cols-[0.85fr_2.15fr]">
                  <div>
                    <p className="type-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">{e.when}</p>
                    <h2 className="mt-3 text-[1.7rem] leading-tight">
                      <span className="type-display text-muted">{e.role}</span>
                    </h2>
                    <div className="mt-1 text-[1.7rem] leading-tight">{e.brand}</div>
                    {e.href && (
                      <a href={e.href} target="_blank" rel="noopener noreferrer" className="ulink mt-3 inline-block type-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent" data-cursor>
                        {e.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} ↗
                      </a>
                    )}
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[1rem] leading-relaxed text-muted">
                        <span className="mt-2.5 h-1 w-3.5 shrink-0" style={{ background: "var(--accent)" }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* projects */}
      <section className="section pt-0">
        <div className="wrap-wide">
          <p className="eyebrow mb-10">Also built</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="card group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1.5" data-cursor>
                  <div className="text-2xl">{p.name}</div>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted">{p.d}</p>
                  <div className="mt-6 flex items-center justify-between border-t hairline pt-4">
                    <span className="chip">{p.tag}</span>
                    <span className="type-mono text-[0.64rem] uppercase tracking-[0.12em] text-accent transition-transform duration-300 group-hover:translate-x-1">Visit ↗</span>
                  </div>
                  {p.gh && (
                    <span className="mt-3 type-mono text-[0.62rem] text-muted">{p.gh.replace("https://", "")}</span>
                  )}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* skills + education */}
      <section className="section pt-0">
        <div className="wrap-wide grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-8">Skills</p>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {SKILLS.map((s) => (
                <Reveal key={s.g}>
                  <div className="border-t hairline pt-4">
                    <p className="type-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{s.g}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.items.map((it) => <span key={it} className="chip">{it}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow mb-8">Education & certifications</p>
            <Reveal>
              <div className="card p-6">
                <h3 className="type-display text-lg">University of Wollongong, Dubai</h3>
                <p className="mt-1 text-[0.92rem] text-muted">BSc Computer Science · 2023 → 2027</p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="mt-4 flex flex-col gap-2">
              {[
                "Business Analysis & Process Management · Coursera · Aug 2024",
                "Code Generation & Optimization with IBM Granite · IBM · Mar 2025",
                "Fundamentals of Digital Marketing · Google · Feb 2025",
                "C++ Programming, Beginner to Beyond · Udemy · Dec 2025",
                "Python 3 Programming · University of Michigan · in progress",
              ].map((c) => (
                <div key={c} className="flex items-start gap-3 text-[0.92rem] text-muted">
                  <span className="mt-1 text-accent">✦</span>{c}
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* download CTA */}
      <section className="pt-0">
        <div className="wrap-wide">
          <Reveal>
            <div className="card flex flex-col items-center gap-6 p-12 text-center">
              <h2 className="display text-[clamp(1.8rem,5vw,3.2rem)] font-semibold">
                <Words as="span" text="Take the whole thing with you." />
              </h2>
              <DownloadBtn className="mt-2" />
              <a href="/" className="ulink type-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted" data-cursor>← Back to the portfolio</a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
