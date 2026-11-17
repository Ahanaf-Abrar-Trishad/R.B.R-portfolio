"use client";

import { useEffect, useRef, useState } from "react";
import type { CertCategory } from "@/content/site";
import { Lightbox } from "./Lightbox";

type Cert = { file: string; title: string; detail: string; category: CertCategory };
const tabs = ["All", "Events", "Training", "Service"] as const;

// Any link to "#cert=<file>" on the page opens that certificate here.
export function CertificateGallery({ certs }: { certs: Cert[] }) {
  const [filter, setFilter] = useState<(typeof tabs)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = tabsRef.current;
    const onChange = (e: Event) => setFilter((e as CustomEvent<{ value: (typeof tabs)[number] }>).detail.value);
    const fromHash = () => {
      const file = decodeURIComponent(location.hash).match(/^#cert=(.+)$/)?.[1];
      if (file && certs.some((c) => c.file === file)) setOpen(file);
    };
    fromHash();
    el?.addEventListener("change", onChange);
    window.addEventListener("hashchange", fromHash);
    return () => {
      el?.removeEventListener("change", onChange);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [certs]);

  const shown = filter === "All" ? certs : certs.filter((c) => c.category === filter);
  // Browse within the visible tab; certificates opened from elsewhere on the page browse the full set.
  const list = (open && shown.some((c) => c.file === open) ? shown : certs).map((c) => ({ ...c, src: `/certificates/${c.file}.jpg`, alt: `Certificate: ${c.title}` }));
  const setHash = (file: string | null) => history.replaceState(null, "", location.pathname + location.search + (file ? `#cert=${file}` : ""));

  return (
    <div>
      <sakuga-tabs ref={tabsRef} label="Certificate categories">
        {tabs.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </sakuga-tabs>

      <p className="mt-6 text-sm text-muted sm:hidden">Swipe to see more →</p>
      {/* Phones: one swipeable row. Larger screens: grid. */}
      <ul
        key={filter} // remount on tab change so the items replay their fade-in
        role="tabpanel"
        aria-label={`${filter} certificates`}
        className="-mx-4 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {shown.map((c, i) => (
          <li key={c.file} className="stagger w-[78%] shrink-0 snap-start scroll-ml-4 sm:w-auto" style={{ "--i": i } as React.CSSProperties}>
            <a href={`#cert=${c.file}`} className="press group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-river">
              <img
                data-thumb={c.file}
                src={`/certificates/${c.file}.jpg`}
                alt={`Certificate: ${c.title}`}
                loading="lazy"
                className="aspect-4/3 w-full border border-line bg-white object-contain p-1.5 transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-[6px_8px_0_var(--line)]"
              />
              <span className="mt-4 block font-display text-lg leading-snug group-hover:text-river">{c.title}</span>
              <span className="block text-sm text-muted">{c.detail}</span>
            </a>
          </li>
        ))}
      </ul>

      <Lightbox
        list={list}
        file={open}
        onNavigate={(file) => (setOpen(file), setHash(file))}
        onClosed={() => (setOpen(null), setHash(null))}
      />
    </div>
  );
}
