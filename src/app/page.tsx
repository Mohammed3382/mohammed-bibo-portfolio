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
        curtain="#6366f1"
        ink="#ffffff"
      />
      <DelivvoSection />

      <BrandTransition
        id="bmt"
        theme="bmt"
        index="02"
        name="BMT Materials"
        kind="Building-materials commerce"
        tagline="A bilingual Jordanian storefront, mobile app, and admin. Priced by the exact metre, delivered by governorate."
        curtain="#006cb4"
        ink="#ffffff"
      />
      <BmtSection />

      <BrandTransition
        id="meda"
        theme="meda"
        index="03"
        name="MedA+ Academy"
        kind="Clinical education platform"
        tagline="Case-based medical courses built by the students a year ahead. Invite-based, bilingual, and properly protected."
        curtain="#116c90"
        ink="#ffffff"
      />
      <MedaSection />

      {/* return to the shell before the personal chapters */}
      <BrandTransition
        id="about-lead"
        theme="shell"
        index="00"
        name="One builder."
        kind="The person behind them"
        eyebrow="Same builder"
        tagline="Three products, three worlds, one person who designed, built, and runs all of it."
        curtain="#101014"
        ink="#f4f4f5"
      />

      <About />
      <Resume />
      <Contact />
    </main>
  );
}
