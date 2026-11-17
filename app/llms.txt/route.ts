import { conferences, education, leadership, profile, publications, research, siteUrl } from "@/content/site";

// llms.txt (llmstxt.org): a plain-text summary for AI assistants, built from the same content as the page.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.description}`,
    "",
    "## Profile",
    `- [Home](${siteUrl}/): ${profile.role}; ${profile.affiliation}; ${profile.location}`,
    ...profile.highlights.map((h) => `- ${h.title}: ${h.detail}`),
    "",
    "## Education",
    ...education.map((e) => `- ${e.degree}, ${e.school} (${e.period}), ${e.grade}`),
    "",
    "## Research",
    ...research.map((r) => `- [${r.short}](${siteUrl}/#research): ${r.role}; ${r.title}; ${r.lab}`),
    "",
    "## Publications",
    ...[...publications.published, ...publications.inPrep].map((p) => `- ${p.authors} (${p.year}). ${p.title}${p.venue ? ` ${p.venue}.` : ""}`),
    "",
    "## Leadership",
    `- [${leadership.name}](${leadership.url || `${siteUrl}/#leadership`}): ${leadership.role}, ${leadership.period}. ${leadership.about}`,
    "",
    "## Conferences & talks",
    ...conferences.map((c) => `- ${c.title}: ${c.kind}, ${c.where}, ${c.date}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
