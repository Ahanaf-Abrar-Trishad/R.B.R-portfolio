"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Floating pill nav: marks the section in view with a highlight that slides between links.
export function Nav({ items, brand }: { items: readonly (readonly [string, string])[]; brand: string }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [clip, setClip] = useState<{ path: string; width: number } | null>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }, // a section is "current" when it crosses the middle of the screen
    );
    // "intro" (the hero) has no link, so reaching it clears the highlight.
    [...items.map(([id]) => id), "intro"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [items]);

  // Move the highlight (a clip-path, so nothing reflows) under the active link, and on phones scroll that link into view.
  useLayoutEffect(() => {
    const place = () => {
      const ul = list.current;
      // Measure the link's <li>: it is positioned relative to the list, the link itself to its <li>.
      const item = ul?.querySelector<HTMLElement>('[aria-current="true"]')?.parentElement;
      if (!ul || !item) return setClip(null);
      const right = ul.scrollWidth - item.offsetLeft - item.offsetWidth;
      setClip({ path: `inset(0 ${right}px 0 ${item.offsetLeft}px round 999px)`, width: ul.scrollWidth });
    };
    place();
    const ul = list.current;
    const item = ul?.querySelector<HTMLElement>('[aria-current="true"]')?.parentElement;
    ul?.scrollTo({ left: item ? item.offsetLeft - ul.clientWidth / 2 + item.offsetWidth / 2 : 0, behavior: "smooth" });
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  return (
    <>
      <span aria-hidden className="progress fixed inset-x-0 top-0 z-50 h-0.5 bg-accent" />
      <header
        className={`glass sticky top-3 z-40 mx-auto mt-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full transition-[transform,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
          scrolled ? "glass-raised scale-[0.97]" : ""
        }`}
      >
        <nav aria-label="Sections" className="flex items-center gap-3 py-1.5 pl-5 pr-1.5 sm:gap-6">
          <a href="#top" className="shrink-0 font-display text-base sm:text-lg">
            {brand}
          </a>
          <ul
            ref={list}
            className="relative flex min-w-0 overflow-x-auto text-sm font-medium tracking-[0.01em] text-ink/75 [mask-image:linear-gradient(to_right,black_80%,transparent)] [scrollbar-width:none] sm:[mask-image:none]"
          >
            <li
              aria-hidden
              className={`absolute inset-y-0 left-0 rounded-full bg-ink transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${clip ? "opacity-100" : "opacity-0"}`}
              style={{ clipPath: clip?.path, width: clip?.width }}
            />
            {items.map(([id, label]) => (
              <li key={id} className="relative">
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="press block whitespace-nowrap rounded-full px-3.5 py-2 hover:text-ink aria-[current=true]:text-paper aria-[current=true]:hover:text-paper"
                >
                  {label}
                </a>
              </li>
            ))}
            <li aria-hidden className="w-6 shrink-0 sm:hidden" />
          </ul>
        </nav>
      </header>
    </>
  );
}
