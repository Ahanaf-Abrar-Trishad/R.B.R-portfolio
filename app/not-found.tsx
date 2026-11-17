import type { Metadata } from "next";
import { profile } from "@/content/site";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

// Served as out/404.html; nginx is configured with `error_page 404 /404.html`.
export default function NotFound() {
  const links = [
    ["#research", "Research"],
    ["#publications", "Publications"],
    ["#leadership", "AGRO-FEME SEPTET"],
    ["#certificates", "Certificates"],
  ];
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-river">404 · Page not found</p>
      <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.02]">This one swam off.</h1>
      <p className="mt-6 max-w-[48ch] text-lg text-muted">The page you followed doesn&apos;t exist. Everything on {profile.name}&apos;s site is on the home page:</p>
      <ul className="mt-8 flex flex-wrap gap-3">
        <li>
          <a href="/" className="press inline-block rounded-full bg-ink px-5 py-2.5 font-medium text-paper">
            Home
          </a>
        </li>
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={`/${href}`} className="press inline-block rounded-full border border-ink/30 px-5 py-2.5 font-medium hover:border-ink">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
