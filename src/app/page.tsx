import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import WorkIndex from "@/components/sections/WorkIndex";
import BrandTransition from "@/components/sections/BrandTransition";
import DelivvoSection from "@/components/sections/DelivvoSection";
import BmtSection from "@/components/sections/BmtSection";
import MedaSection from "@/components/sections/MedaSection";
import About from "@/components/sections/About";
import Resume from "@/components/sections/Resume";
import Contact from "@/components/sections/Contact";
import Words from "@/components/ui/Words";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Manifesto />
      <WorkIndex />

      <BrandTransition
        id="delivvo"
        theme="delivvo"
        index="01"
        name="Delivvo"
        kind="Client-portal SaaS"
        tagline="One link between a freelancer and their client, where they review, approve, sign, and pay. Delivvo takes zero platform fee."
      />
      <DelivvoSection />

      <BrandTransition
        id="bmt"
        theme="bmt"
        index="02"
        name="BMT Materials"
        kind="Building-materials commerce"
        tagline="A bilingual Jordanian storefront, mobile app, and admin. Priced by the exact metre, delivered by governorate."
      />
      <BmtSection />

      <BrandTransition
        id="meda"
        theme="meda"
        index="03"
        name="MedA+ Academy"
        kind="Clinical education platform"
        tagline="Case-based medical courses built by the students a year ahead. Invite-based, bilingual, and properly protected."
      />
      <MedaSection />

      {/* return to the shell before the personal chapters */}
      <section
        data-theme-section="shell"
        className="relative flex min-h-[80svh] items-center justify-center overflow-hidden text-center"
      >
        <div className="dotgrid absolute inset-0 opacity-40" aria-hidden />
        <div className="wrap relative z-10">
          <p className="eyebrow mb-6 justify-center">Same builder</p>
          <h2 className="display text-[clamp(2rem,6vw,4.5rem)] font-semibold">
            <Words as="span" text="Three worlds." />{" "}
            <span className="text-muted">
              <Words as="span" text="One person behind them." delay={0.15} />
            </span>
          </h2>
        </div>
      </section>

      <About />
      <Resume />
      <Contact />
    </main>
  );
}
