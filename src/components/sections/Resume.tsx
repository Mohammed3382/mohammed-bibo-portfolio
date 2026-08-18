"use client";

import Reveal from "@/components/ui/Reveal";
import Words from "@/components/ui/Words";
import Magnetic from "@/components/ui/Magnetic";

const EXPERIENCE = [
  {
    when: "2026 → Now",
    role: "Founder",
    org: "Delivvo",
    points: [
      "Built and shipped a client-portal SaaS for freelancers: clients, projects, contracts, and invoices, live in production.",
      "Integrated 9 global payment gateways with encrypted credential storage and per-client overrides.",
      "Designed the entire product and UI system solo in Next.js, Tailwind, and shadcn/ui.",
    ],
  },
  {
    when: "2026 → Now",
    role: "Tech Lead",
    org: "BMT Materials",
    points: [
      "Sole technical owner. Built and shipped the storefront in Next.js on a custom domain.",
      "Built a full-stack business app with database design and Google sign-in, plus an Expo mobile app.",
      "Ran the whole deploy pipeline on Vercel, including domain and DNS.",
    ],
  },
  {
    when: "2026 → Now",
    role: "Website Lead",
    org: "MedA+ Academy",
    points: [
      "Complete full-stack build with backend and security to standard, on Supabase.",
      "Shipped auth for student, instructor, and administrator roles, fully functional in production.",
      "Handled the database, domain, and DNS end to end.",
    ],
  },
  {
    when: "2025",
    role: "UI/UX Design Intern",
    org: "Pitchmatter",
    points: [
      "Designed wireframes and prototypes to improve usability and flow.",
      "Worked with developers to align the visuals with real product behavior.",
    ],
  },
  {
    when: "2024",
    role: "Freelance Consultant",
    org: "Application Strategy & Digital Support",
    points: [
      "Introduced digital tools that streamlined operations.",
      "Delivered recommendations that improved design and performance.",
    ],
  },
];

const PROJECTS = [
  { t: "Cutroom", d: "A local AI video editor for Windows that edits, transcribes, and captions on-device, drivable by AI over MCP.", tag: "Electron · TypeScript" },
  { t: "Skyline Forecast", d: "A real-time multi-city weather app with insights, scoring, and a “what to wear” feature.", tag: "Python · Streamlit" },
  { t: "Smart File Organizer", d: "A safe file-organizing tool with smart renaming and cleanup, behind a clean web front.", tag: "Python · Vercel" },
];

const SKILLS = [
  { g: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui"] },
  { g: "Backend & data", items: ["Node.js", "PostgreSQL", "Prisma", "Supabase"] },
  { g: "Payments & auth", items: ["Stripe", "Global gateways", "Google OAuth"] },
  { g: "Desktop & AI", items: ["Electron", "MCP", "AI agents"] },
  { g: "Ship", items: ["Vercel", "Custom domains", "DNS"] },
];

export default function Resume() {
  return (
    <section data-theme-section="shell" className="section relative overflow-hidden">
      <div className="wrap-wide">
        <div className="flex flex-col gap-6 border-t hairline pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Résumé</p>
            <h2 className="display text-[clamp(2rem,5.5vw,4rem)] font-semibold">
              <Words as="span" text="Experience" />
            </h2>
          </div>
          <Magnetic>
            <a href="/cv/Mohammed-Bibo-CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" data-cursor>
              Download résumé (PDF)
            </a>
          </Magnetic>
        </div>

        {/* experience rows */}
        <div className="mt-12">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.org} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-4 border-b hairline py-8 md:grid-cols-[0.8fr_2.2fr]">
                <div>
                  <p className="type-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">{e.when}</p>
                  <h3 className="type-display mt-2 text-2xl">
                    {e.role} <span className="text-muted">·</span> <span className="text-accent">{e.org}</span>
                  </h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-3 shrink-0" style={{ background: "var(--accent)" }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* projects + education/skills */}
        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-6">Also built</p>
            <div className="flex flex-col gap-4">
              {PROJECTS.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.07}>
                  <div className="card flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="max-w-md">
                      <h4 className="type-display text-lg">{p.t}</h4>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{p.d}</p>
                    </div>
                    <span className="chip shrink-0">{p.tag}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow mb-6">Education</p>
            <Reveal>
              <div className="card p-5">
                <h4 className="type-display text-lg">University of Wollongong, Dubai</h4>
                <p className="mt-1 text-[0.92rem] text-muted">BSc Computer Science · 2023 → 2027</p>
              </div>
            </Reveal>

            <p className="eyebrow mb-6 mt-10">Skills</p>
            <div className="flex flex-col gap-4">
              {SKILLS.map((s) => (
                <Reveal key={s.g}>
                  <div className="border-t hairline pt-3">
                    <p className="type-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{s.g}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <span key={it} className="chip">{it}</span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
