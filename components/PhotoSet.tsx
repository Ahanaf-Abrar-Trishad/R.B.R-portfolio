"use client";

import { useState } from "react";
import type { Photo } from "@/content/site";
import { Lightbox } from "./Lightbox";

// A curated row of photos (first `show`); the last tile reveals how many more there are.
// Every photo opens in the same swipeable viewer as the certificates, growing out of its thumbnail.
export function PhotoSet({ photos, label, show = 3, className = "" }: { photos?: Photo[]; label: string; show?: number; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  if (!photos?.length) return null;
  const items = photos.map((p) => ({ file: p.src, src: p.src, title: p.alt, detail: label, alt: p.alt }));
  const visible = items.slice(0, show);
  const more = items.length - visible.length;

  return (
    <>
      <ul className={`-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 ${className}`}>
        {visible.map((p, i) => {
          const last = i === visible.length - 1 && more > 0;
          return (
            <li key={p.file} className="w-[72%] shrink-0 snap-start scroll-ml-4 sm:w-auto">
              <button
                onClick={() => setOpen(p.file)}
                aria-label={last ? `${p.alt}. Open gallery, ${more} more photos` : `Open photo: ${p.alt}`}
                className="press group relative block w-full overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-river"
              >
                <img
                  data-thumb={p.file}
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-4/3 w-full bg-paper-2 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                {last && (
                  <span className="absolute inset-0 grid place-items-center bg-ink/45 font-display text-2xl text-paper backdrop-blur-[2px]">+{more}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <Lightbox list={items} file={open} onNavigate={setOpen} onClosed={() => setOpen(null)} />
    </>
  );
}
