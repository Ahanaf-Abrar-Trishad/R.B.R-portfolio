"use client";

// The one Sakuga impact button on the page; navigates (anchor, file or URL) once its burst starts.
export function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return <sakuga-button onClick={() => setTimeout(() => window.location.assign(href), 250)}>{children}</sakuga-button>;
}
