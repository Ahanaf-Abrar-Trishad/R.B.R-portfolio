import type { Metadata } from "next";
import { Young_Serif, Schibsted_Grotesk } from "next/font/google";
import Script from "next/script";
import { profile, siteUrl } from "@/content/site";
import "./globals.css";

const display = Young_Serif({ variable: "--font-display", subsets: ["latin"], weight: "400" });
const body = Schibsted_Grotesk({ variable: "--font-body", subsets: ["latin"] });

const title = `${profile.name} — Aquatic Ecotoxicology & Microplastics`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s · ${profile.name}` },
  description: profile.description,
  authors: [{ name: profile.name, url: siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description: profile.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title, description: profile.description },
  robots: { index: true, follow: true },
};

// Sakuga effects only where they earn it: the hero call to action and the certificate tabs.
// lazyOnload keeps their ~90 KB out of the initial load; until they upgrade, CSS styles the plain elements.
const sakuga = ["button", "tabs"];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-screen font-sans leading-relaxed">
        {children}
        {sakuga.map((n) => (
          <Script key={n} src={`/sakuga-vfx/${n}.js`} strategy="lazyOnload" />
        ))}
      </body>
    </html>
  );
}
