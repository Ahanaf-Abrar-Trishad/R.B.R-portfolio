import type { Metadata } from "next";
import { Young_Serif, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const display = Young_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const body = Schibsted_Grotesk({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rubya Binte Rezanur — Fisheries & Aquatic Ecotoxicology",
  description:
    "Portfolio of Rubya Binte Rezanur: M.Sc. in Fisheries Management (BAU), microplastic ecotoxicology research, AGRO-FEME SEPTET founder, FAO World Food Forum 2026 speaker.",
};

// Sakuga effects only where they earn it: the hero call to action and the certificate tabs.
const sakuga = ["button", "tabs"];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen font-sans leading-relaxed">
        {children}
        {sakuga.map((n) => (
          <Script key={n} src={`/sakuga-vfx/${n}.js`} strategy="afterInteractive" />
        ))}
      </body>
    </html>
  );
}
