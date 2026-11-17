import { Cta } from "@/components/Cta";
import { CopyEmail } from "@/components/CopyEmail";
import { CertificateGallery } from "@/components/CertificateGallery";
import { Nav } from "@/components/Nav";
import { FishMussel, FloatingGarden, GlobeRoute } from "@/components/Illustrations";
import {
  siteUrl, profile, contact, education, awards, pathway, research, me, publications, skills,
  leadership, conferences, training, community, languages, certificates,
} from "@/content/site";

const nav = [
  ["about", "Education"],
  ["research", "Research"],
  ["publications", "Publications"],
  ["leadership", "Leadership"],
  ["conferences", "Conferences"],
  ["certificates", "Certificates"],
  ["contact", "Contact"],
] as const;

// Editorial section: title in a left column on wide screens, content on the right.
function Section({ id, title, art, children }: { id: string; title: string; art?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="mx-auto grid max-w-6xl gap-8 border-t border-line px-4 py-14 sm:gap-10 sm:px-6 sm:py-28 lg:grid-cols-[15rem_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display text-3xl leading-tight sm:text-4xl">{title}</h2>
        {/* Illustrations only where the empty title column has room (desktop). */}
        {art && <div className="mt-10 hidden text-river lg:block">{art}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold tracking-wide text-river">{children}</p>;
}

// Bold "Rezanur, R. B." wherever it appears in an author list.
function Authors({ text }: { text: string }) {
  const [before, ...rest] = text.split(me);
  return rest.length ? (
    <>
      {before}
      <strong className="font-semibold text-ink">{me}</strong>
      {rest.join(me)}
    </>
  ) : (
    <>{text}</>
  );
}

// Stagger step for the hero's load animation (see .rise in globals.css).
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

// Italicise species binomials written in parentheses, e.g. "(Oreochromis niloticus)".
function Sci({ text }: { text: string }) {
  return (
    <>
      {text.split(/\(([A-Z][a-z]+ [a-z]+)\)/).map((part, i) => (i % 2 ? <span key={i}>(<i>{part}</i>)</span> : part))}
    </>
  );
}

function CertLink({ file, children = "View certificate" }: { file: string; children?: React.ReactNode }) {
  return file ? (
    <a href={`#cert=${file}`} className="text-sm font-medium text-river underline decoration-line underline-offset-4 hover:decoration-river">
      {children}
    </a>
  ) : null;
}

export default function Home() {
  const links = [
    ["LinkedIn", contact.linkedin],
    ["Google Scholar", contact.scholar],
    ["ORCID", contact.orcid],
    ["ResearchGate", contact.researchgate],
  ].filter(([, url]) => url);
  const words = profile.name.split(" ");
  const groups = [...new Set(skills.map((s) => s.group))];
  const pictured = skills.filter((s) => s.image);
  // Until contact details exist, don't send visitors to an empty section.
  const hasContact = Boolean(contact.email || links.length);
  const second = contact.cv
    ? { href: contact.cv, label: "Download CV" }
    : hasContact
      ? { href: "#contact", label: "Get in touch" }
      : { href: "#publications", label: "See publications" };

  // Structured data (schema.org Person) so search engines understand who this page is about.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`, // static export writes generated images without an extension
    description: profile.description,
    jobTitle: "Researcher, Aquatic Ecotoxicology",
    address: { "@type": "PostalAddress", addressLocality: "Mymensingh", addressCountry: "BD" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Bangladesh Agricultural University" },
    memberOf: [
      { "@type": "Organization", name: leadership.name, ...(leadership.url && { url: leadership.url }) },
      { "@type": "Organization", name: "Fisheries Society of Bangladesh" },
    ],
    award: awards.map((a) => `${a.title}, ${a.by} (${a.date})`),
    knowsAbout: ["Aquatic ecotoxicology", "Microplastics", "Fisheries management", ...skills.map((s) => s.title)],
    knowsLanguage: languages.map((l) => l.name),
    ...(links.length && { sameAs: links.map(([, url]) => url) }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
      <a href="#top" className="sr-only z-50 bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <Nav items={hasContact ? nav : nav.filter(([id]) => id !== "contact")} brand="Rubya B. Rezanur" />

      <main id="top" tabIndex={-1}>
        {/* Hero */}
        <section id="intro" className="relative isolate mx-auto grid max-w-6xl gap-12 px-4 pb-16 pt-10 sm:gap-16 sm:px-6 sm:pb-24 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div>
            <div className="rise" style={d(0)}>
              <Label>{profile.role}</Label>
            </div>
            <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,5.25rem)] leading-[0.98] tracking-tight">
              {[words.slice(0, -1).join(" "), words.at(-1)].map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.08em]">
                  <span className="rise-line" style={d(i + 1)}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p className="rise mt-6 text-lg font-medium" style={d(3)}>
              {profile.affiliation}
            </p>
            <p className="rise mt-4 max-w-[58ch] text-lg text-muted" style={d(4)}>
              {profile.tagline}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={d(5)}>
              <Cta href="#research">Explore my research</Cta>
              <a href={second.href} className="font-medium underline decoration-line underline-offset-[6px] hover:decoration-ink">
                {second.label} →
              </a>
            </div>
          </div>

          {/* Soft light behind the glass, so the material has something to refract. */}
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="ambient absolute -right-10 top-4 h-80 w-80 rounded-full bg-river/25 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
            <div className="ambient-2 absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-accent/20 blur-3xl sm:h-80 sm:w-80" />
          </div>

          <aside aria-label="Highlights" className="glass self-start rounded-3xl p-6 sm:p-8 lg:mt-10">
            {profile.photo && <img src={profile.photo} alt={profile.name} className="mb-10 aspect-[4/5] w-full max-w-sm object-cover" />}
            <div className="rise flex items-center gap-3" style={d(4)}>
              <span aria-hidden className="draw h-px w-8 bg-accent" style={d(6)} />
              <p className="text-sm font-semibold tracking-wide">Highlights</p>
            </div>
            <ol className="mt-4 divide-y divide-line border-y border-line">
              {profile.highlights.map((h, i) => (
                <li key={h.title} className="rise" style={d(5 + i)}>
                  <a href={h.href} className="group block py-4">
                    <span className="block font-display text-lg leading-snug group-hover:text-river">
                      {h.title} <span aria-hidden className="inline-block text-river opacity-0 transition-opacity group-hover:opacity-100">→</span>
                    </span>
                    <span className="mt-1 block text-sm text-muted">{h.detail}</span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <Section id="about" title="Education & awards">
          {profile.bio && <p className="reveal mb-14 max-w-[62ch] text-xl">{profile.bio}</p>}
          <div className="space-y-10">
            {education.map((e) => (
              <article key={e.degree} className="reveal grid gap-2 sm:grid-cols-[8rem_1fr]">
                <p className="text-sm text-muted">{e.period}</p>
                <div>
                  <h3 className="font-display text-2xl leading-snug">{e.degree}</h3>
                  <p className="mt-1 text-muted">
                    {e.school} · <span className="font-semibold text-ink">{e.grade}</span>
                  </p>
                  {e.note && <p className="mt-3 max-w-[62ch] text-sm text-muted">{e.note}</p>}
                </div>
              </article>
            ))}
          </div>

          <h3 className="mt-14 text-sm font-semibold tracking-wide text-river sm:mt-20">Awards & recognition</h3>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {awards.map((a) => (
              <li key={a.title} className="reveal grid gap-1 py-6 sm:grid-cols-[8rem_1fr] sm:gap-2">
                <span className="text-sm text-muted">{a.date}</span>
                <div>
                  <p className="font-display text-xl leading-snug">{a.title}</p>
                  <p className="text-muted">{a.by}</p>
                  {a.note && <p className="mt-2 max-w-[62ch] text-sm text-muted">{a.note}</p>}
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-12 text-muted">
            <span className="font-semibold text-ink">Speaks</span>{" "}
            {languages.map((l, i) => (
              <span key={l.name}>
                {i > 0 && " · "}
                {l.name} <span className="text-sm">({l.level})</span>
              </span>
            ))}
          </p>
        </Section>

        <Section id="research" title="Research" art={<FishMussel className="w-full" />}>
          <ol aria-label="From river to tissue" className="relative mb-14 grid grid-cols-2 gap-px border-y border-ink bg-line sm:mb-20 sm:grid-cols-4">
            <span aria-hidden className="particle pointer-events-none absolute inset-x-0 -top-[5px] hidden sm:block">
              <span className="block h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent" />
            </span>
            {pathway.map((p, i) => (
              <li key={p.step} className="step relative bg-paper p-4 sm:px-5 sm:py-5" style={{ "--i": i } as React.CSSProperties}>
                <span className="font-display text-sm text-accent">0{i + 1}</span>
                <p className="mt-1 font-display text-xl leading-tight">{p.step}</p>
                <p className="mt-1 text-sm text-muted">{p.detail}</p>
                {i < pathway.length - 1 && (
                  <span aria-hidden className="absolute right-4 top-5 hidden text-river sm:block">
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="space-y-12 sm:space-y-16">
            {research.map((r) => (
              <article key={r.title} className="reveal">
                <Label>{r.role}</Label>
                <h3 className="mt-2 max-w-[30ch] font-display text-[1.4rem] leading-snug sm:text-3xl">{r.short}</h3>
                <p className="mt-3 max-w-[70ch] text-sm text-muted">
                  <span className="italic">{r.title}</span> · {r.lab}
                </p>
                {r.points.length > 0 && (
                  <ul className="mt-5 max-w-[65ch] space-y-2">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-river" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <h3 className="mt-16 font-display text-2xl sm:mt-24 sm:text-3xl">Methods & skills</h3>
          {pictured.length > 0 && (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {pictured.map((s) => (
                <figure key={s.title}>
                  <img src={s.image} alt="" loading="lazy" className="aspect-4/3 w-full object-cover" />
                  <figcaption className="mt-2 text-sm">{s.title}</figcaption>
                </figure>
              ))}
            </div>
          )}
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {groups.map((g) => (
              <div key={g} className="reveal">
                <p className="border-b border-ink pb-2 text-sm font-semibold">{g}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {skills.filter((s) => s.group === g).map((s) => (
                    <li key={s.title} className="rounded-full border border-line bg-paper px-3 py-1 text-sm">
                      {s.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="publications" title="Publications">
          {/* Published / in-press papers get a featured block; manuscripts stay a compact list. */}
          <h3 className="text-sm font-semibold tracking-wide text-river">Published & in press</h3>
          <div className="mt-4 space-y-6">
            {publications.published.map((p) => (
              <article key={p.title} className="reveal border border-ink bg-paper-2 p-6 sm:p-10">
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-xl sm:text-2xl">{p.venue}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">{p.year}</span>
                </p>
                <p className="mt-5 max-w-[48ch] font-display text-2xl leading-snug sm:text-[2rem]">
                  <Sci text={p.title} />
                </p>
                <p className="mt-5 max-w-[75ch] text-sm text-muted">
                  <Authors text={p.authors} />
                </p>
                {p.link && (
                  <a href={p.link} target="_blank" className="mt-5 inline-block font-medium text-river underline underline-offset-4">
                    Read the paper ↗
                  </a>
                )}
              </article>
            ))}
          </div>

          <h3 className="mt-14 text-sm font-semibold tracking-wide text-river">Manuscripts in preparation</h3>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {publications.inPrep.map((p) => (
              <li key={p.title} className="reveal py-5">
                <p className="max-w-[70ch] font-semibold leading-snug">
                  <Sci text={p.title} />
                </p>
                <p className="mt-2 max-w-[75ch] text-sm text-muted">
                  <Authors text={p.authors} /> ({p.year})
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Leadership: a full-width feature spread */}
        <section id="leadership" className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-28">
            <Label>Leadership & entrepreneurship</Label>
            <h2 className="drift-in mt-4 font-display text-[clamp(2.6rem,7vw,5.5rem)] leading-none tracking-tight">{leadership.name}</h2>
            <p className="mt-5 text-muted">
              <span className="font-semibold text-ink">{leadership.role}</span> · {leadership.period} · {leadership.org}
            </p>

            <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-14 lg:grid-cols-[1.2fr_1fr]">
              <div className="reveal space-y-5">
                <p className="max-w-[55ch] text-lg leading-relaxed sm:text-xl">{leadership.about}</p>
                <p className="max-w-[60ch] text-muted">{leadership.win}</p>
                <p className="max-w-[60ch] text-muted">{leadership.myRole}</p>
                {leadership.url && (
                  <a href={leadership.url} target="_blank" className="inline-block font-medium text-river underline underline-offset-4">
                    Visit the team website ↗
                  </a>
                )}
              </div>
              <div className="reveal">
                <div className="border border-ink bg-paper p-6 sm:p-8">
                  <p className="text-sm font-semibold tracking-wide text-accent">Our innovation</p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{leadership.innovation.title}</h3>
                  <p className="mt-3 text-muted">{leadership.innovation.text}</p>
                  <FloatingGarden className="mt-6 w-full text-river" />
                </div>
                <ul className="mt-8 divide-y divide-line">
                  {leadership.impact.map((i) => (
                    <li key={i.text} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 py-4">
                      {/^\d+$/.test(i.figure) ? (
                        <span className="count font-display text-4xl text-river" style={{ "--to": Number(i.figure) } as React.CSSProperties}>
                          <span className="sr-only">{i.figure}</span>
                        </span>
                      ) : (
                        <span className="font-display text-4xl text-river">{i.figure}</span>
                      )}
                      <span>{i.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <h3 className="mt-16 font-display text-2xl sm:mt-24 sm:text-3xl">Community service</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {community.map((c) => (
                <li key={c.name} className="reveal grid gap-1 py-5 sm:grid-cols-[16rem_1fr] sm:gap-6">
                  <div>
                    <p className="font-display text-xl">{c.name}</p>
                    <p className="text-sm text-river">{c.role}</p>
                  </div>
                  {c.text && <p className="max-w-[60ch] text-muted">{c.text}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Section id="conferences" title="Conferences & talks" art={<GlobeRoute className="w-full" />}>
          <ol className="relative ml-1.5 border-l border-line pl-8">
            <li aria-hidden className="rail absolute -left-px top-0 h-full w-0.5 bg-accent" />
            {conferences.map((c) => (
              <li key={c.title} className="slide-in relative pb-9 last:pb-0 sm:pb-12">
                <span aria-hidden className="pop absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full border-2 border-paper bg-accent" />
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <span>{c.date}</span>
                  <span className="rounded-full bg-river/10 px-2.5 py-0.5 text-xs font-semibold text-river">{c.kind}</span>
                </p>
                <h3 className="mt-2 max-w-[40ch] font-display text-xl leading-snug sm:text-2xl">{c.title}</h3>
                <p className="mt-1 text-sm text-muted">{c.where}</p>
                {c.text && <p className="mt-3 max-w-[62ch] text-muted">{c.text}</p>}
                {c.cert && (
                  <p className="mt-3">
                    <CertLink file={c.cert} />
                  </p>
                )}
              </li>
            ))}
          </ol>

          <h3 className="mt-16 font-display text-2xl sm:mt-24 sm:text-3xl">Professional training</h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {training.map((t) => (
              <li key={t.title} className="reveal flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
                <div>
                  <p className="font-display text-lg leading-snug">{t.title}</p>
                  <p className="text-sm text-muted">{t.by}</p>
                </div>
                <div className="flex items-baseline gap-4 text-sm text-muted">
                  {t.date && <span>{t.date}</span>}
                  <CertLink file={t.cert}>Certificate</CertLink>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <section id="certificates" className="mx-auto max-w-6xl border-t border-line px-4 py-14 sm:px-6 sm:py-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 sm:mb-10">
            <h2 className="font-display text-3xl sm:text-4xl">Certificates</h2>
            <p className="text-muted">The paper behind the claims. Open any one to see it full size.</p>
          </div>
          <CertificateGallery certs={certificates} />
        </section>

        {/* Contact: inverted ending */}
        <section id={hasContact ? "contact" : undefined} className="bg-ink text-paper">
          {hasContact && (
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-32">
            <h2 className="max-w-[18ch] font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.05]">
              Let&apos;s talk about cleaner water.
            </h2>
            <p className="mt-6 max-w-[50ch] text-lg text-paper/75">A project, a collaboration, or a question about microplastics. I&apos;d like to hear it.</p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              {contact.email && (
                <>
                  <a href={`mailto:${contact.email}`} className="mr-2 text-xl underline decoration-paper/40 underline-offset-[6px] hover:decoration-paper">
                    {contact.email}
                  </a>
                  <CopyEmail email={contact.email} />
                </>
              )}
              {links.map(([label, url]) => (
                <a key={label} href={url} target="_blank" className="rounded-full border border-paper/40 px-5 py-2.5 hover:border-paper">
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
          )}
          <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 border-t border-paper/15 px-4 py-8 text-sm text-paper/70 sm:px-6">
            {contact.email && <a href={`mailto:${contact.email}`} className="w-full hover:text-paper">{contact.email}</a>}
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <span>{profile.location}</span>
          </footer>
        </section>
      </main>
    </>
  );
}
