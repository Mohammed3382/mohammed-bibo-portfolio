import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Unbounded,
  Fraunces,
  Archivo,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
  Tajawal,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ThemeController from "@/components/providers/ThemeController";
import Cursor from "@/components/chrome/Cursor";
import Nav from "@/components/chrome/Nav";
import ScrollProgress from "@/components/chrome/ScrollProgress";

/* ---- Shell type (Mohammed's own identity) ---- */
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jbmono", display: "swap" });

/* ---- Delivvo ---- */
const unbounded = Unbounded({ subsets: ["latin"], variable: "--font-unbounded", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });

/* ---- BMT Materials ---- */
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-plexsans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plexmono", display: "swap" });

/* ---- MedA+ Academy ---- */
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

/* ---- Arabic (BMT + MedA bilingual proofs) ---- */
const tajawal = Tajawal({ subsets: ["arabic", "latin"], weight: ["400", "500", "700"], variable: "--font-tajawal", display: "swap" });

const fontVars = [
  space.variable, inter.variable, jbmono.variable,
  unbounded.variable, fraunces.variable,
  archivo.variable, plexSans.variable, plexMono.variable,
  jakarta.variable, tajawal.variable,
].join(" ");

const SITE = "https://mohammedbibo.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Mohammed Bibo, software engineer and founder",
    template: "%s · Mohammed Bibo",
  },
  description:
    "I design, ship, and run production software end to end. Founder of Delivvo, tech lead at BMT Materials, and website lead at MedA+ Academy.",
  keywords: [
    "Mohammed Bibo", "full-stack developer", "founder", "Delivvo", "BMT Materials",
    "MedA+ Academy", "Next.js", "product engineer", "Dubai",
  ],
  authors: [{ name: "Mohammed Bibo" }],
  openGraph: {
    title: "Mohammed Bibo, software engineer and founder",
    description:
      "Three shipped products, one builder. Scroll through Delivvo, BMT Materials, and MedA+ Academy. Each one opens in its own brand world.",
    type: "website",
    url: SITE,
    siteName: "Mohammed Bibo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Bibo, software engineer and founder",
    description: "Three shipped products, one builder.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="shell" className={`${fontVars} antialiased`}>
      <body>
        <SmoothScroll>
          <ThemeController />
          <Cursor />
          <ScrollProgress />
          <Nav />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
