# Mohammed Bibo — Portfolio

Live: **https://mohammed-bibo-portfolio.vercel.app**

A single long-scroll portfolio where the whole page becomes each product as you scroll. Colors, typefaces, radius, buttons, and even the nav all morph from one brand world to the next, staying in dark mode except where the brand itself is light.

Three live products, each in its own world:

- **Delivvo** ([delivvo.io](https://delivvo.io)) — a client-portal SaaS for freelancers. One branded link to review, approve, sign, and pay, with zero platform fee.
- **BMT Materials** ([bmtmaterials.com](https://www.bmtmaterials.com)) — a bilingual Jordanian building-materials store, priced by measurement and delivered by governorate.
- **MedA+ Academy** ([med-aplus.com](https://med-aplus.com)) — a bilingual clinical education platform where senior students teach the ones coming up behind them.

Each section pairs real, current screenshots of the live product with code-accurate reconstructions of its actual screens (product page, admin dashboard, client portal, lesson player), rebuilt in the brand's real design system.

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · [motion](https://motion.dev) (Framer Motion) · [Lenis](https://lenis.darkroom.engineering) smooth scroll. The theme morph is driven by registered `@property` color custom properties on `:root`, flipped per section by an IntersectionObserver. Deployed on Vercel.

## Develop

```bash
npm install
npm run dev
```

Built by Mohammed Bibo.
