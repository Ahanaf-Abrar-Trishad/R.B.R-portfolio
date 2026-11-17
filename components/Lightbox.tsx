"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { project, rubberband, spring } from "@/lib/motion";

// Anything the viewer can show: `file` is its id (matches the thumbnail data-thumb), `src` the full-size image.
export type ViewerItem = { file: string; src: string; title: string; detail: string; alt?: string };

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// The gallery thumbnail for a certificate, if it is on screen (used to open from / close back into it).
function visibleThumb(file: string) {
  const el = document.querySelector<HTMLElement>(`[data-thumb="${file}"]`);
  const r = el?.getBoundingClientRect();
  return r && r.width > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth ? r : null;
}

/**
 * Certificate viewer. Swipe sideways to move between certificates (tracks the finger 1:1, rubber-bands at the ends,
 * flicks carry momentum), drag down to dismiss. Opens out of the tapped thumbnail and shrinks back into it.
 */
export function Lightbox({ list, file, onNavigate, onClosed }: { list: ViewerItem[]; file: string | null; onNavigate: (file: string) => void; onClosed: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const flyer = useRef<HTMLImageElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const stop = useRef(() => {});
  const closing = useRef(false);
  const g = useRef({ id: -1, sx: 0, sy: 0, ox: 0, oy: 0, axis: "" as "" | "x" | "y", hist: [] as { t: number; x: number; y: number }[] });

  const i = list.findIndex((c) => c.file === file);
  const cur = list[i];
  const prev = list[i - 1];
  const next = list[i + 1];

  const render = () => {
    const { x, y } = pos.current;
    if (track.current) track.current.style.transform = `translate3d(calc(-100% + ${x}px), ${y}px, 0) scale(${1 - Math.max(0, y) / 2500})`;
  };
  const currentImg = () => track.current?.children[1]?.querySelector("img") ?? null;

  const settle = (axis: "x" | "y", to: number, v: number, damping: number, done?: () => void) => {
    stop.current();
    if (reduced()) {
      pos.current[axis] = to;
      render();
      return done?.();
    }
    stop.current = spring(pos.current[axis], to, v, (val) => ((pos.current[axis] = val), render()), { damping, response: 0.35 }, done);
  };

  // Move to the previous/next certificate; a bit of bounce only when a flick carried momentum into it.
  const go = (dir: 1 | -1, v = 0) => {
    const target = list[i + dir];
    const w = viewport.current?.clientWidth ?? 0;
    if (!target) return settle("x", 0, v, 1);
    settle("x", -dir * w, v, v ? 0.85 : 1, () => {
      pos.current.x = 0;
      onNavigate(target.file);
    });
  };

  // Fly an image between two rects: placed at `to`, animated from where `from` is.
  const fly = (src: string, from: DOMRect, to: DOMRect, done: () => void) => {
    const f = flyer.current;
    if (!f) return done();
    Object.assign(f.style, { display: "block", left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` });
    f.src = src;
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const s = from.width / to.width;
    f.animate([{ transform: `translate(${dx}px, ${dy}px) scale(${s})` }, { transform: "none" }], { duration: 420, easing: EASE }).onfinish = () => {
      f.style.display = "none";
      done();
    };
  };

  const dismiss = () => {
    const d = dialog.current;
    if (!d || closing.current || !cur) return;
    closing.current = true;
    stop.current();
    d.dataset.state = "closing";
    const img = currentImg();
    const thumb = visibleThumb(cur.file);
    if (!reduced() && img && thumb) {
      const from = img.getBoundingClientRect();
      img.style.visibility = "hidden";
      fly(img.src, from, thumb, () => d.close());
    } else setTimeout(() => d.close(), reduced() ? 0 : 200);
  };

  // Open: show the dialog and grow the certificate out of its thumbnail.
  useEffect(() => {
    const d = dialog.current;
    if (!file || !d || d.open) return;
    d.showModal();
    d.querySelector<HTMLElement>("[data-close]")?.focus(); // React's autoFocus runs before showModal, so focus explicitly
    const thumb = visibleThumb(file);
    const img = currentImg();
    if (reduced() || !thumb || !img) return;
    img.style.visibility = "hidden";
    requestAnimationFrame(() => fly(img.src, thumb, img.getBoundingClientRect(), () => (img.style.visibility = "")));
  }, [file]); // eslint-disable-line react-hooks/exhaustive-deps

  // After navigating, the new slides are in place: snap the track back to centre before paint.
  useLayoutEffect(render, [file]);

  const onClose = () => {
    closing.current = false;
    delete dialog.current?.dataset.state;
    pos.current = { x: 0, y: 0 };
    render();
    const img = currentImg();
    if (img) img.style.visibility = "";
    onClosed();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stop.current(); // grab it mid-flight: continue from where it is now
    Object.assign(g.current, { id: e.pointerId, sx: e.clientX, sy: e.clientY, ox: pos.current.x, oy: pos.current.y, axis: "", hist: [{ t: e.timeStamp, x: e.clientX, y: e.clientY }] });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (e.pointerId !== s.id) return;
    const dx = e.clientX - s.sx;
    const dy = e.clientY - s.sy;
    if (!s.axis) {
      if (Math.hypot(dx, dy) < 10) return; // small dead zone before committing to a direction
      s.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    const w = viewport.current?.clientWidth ?? 1;
    const h = viewport.current?.clientHeight ?? 1;
    if (s.axis === "x") {
      const x = s.ox + dx;
      pos.current.x = (x > 0 && !prev) || (x < 0 && !next) ? Math.sign(x) * rubberband(Math.abs(x), w) : x;
    } else {
      const y = s.oy + dy;
      pos.current.y = y > 0 ? y : -rubberband(-y, h);
    }
    render();
    s.hist.push({ t: e.timeStamp, x: e.clientX, y: e.clientY });
    s.hist = s.hist.filter((p) => e.timeStamp - p.t < 100);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = g.current;
    if (e.pointerId !== s.id) return;
    s.id = -1;
    const a = s.hist[0];
    const b = s.hist[s.hist.length - 1];
    const dt = a && b && b.t > a.t ? (b.t - a.t) / 1000 : 0;
    const vx = dt ? (b.x - a.x) / dt : 0;
    const vy = dt ? (b.y - a.y) / dt : 0;
    const w = viewport.current?.clientWidth ?? 0;
    if (s.axis === "x") {
      const end = pos.current.x + project(vx); // where the flick is heading, not where it was let go
      if (end < -w / 2 && next) go(1, vx);
      else if (end > w / 2 && prev) go(-1, vx);
      else settle("x", 0, vx, 1);
    } else if (s.axis === "y") {
      if (pos.current.y + project(vy) > 160) dismiss();
      else settle("y", 0, vy, 1);
    }
  };

  return (
    <dialog
      ref={dialog}
      aria-label={cur?.title}
      onClose={onClose}
      onCancel={(e) => (e.preventDefault(), dismiss())}
      onClick={(e) => e.target === e.currentTarget && dismiss()}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      className="lightbox m-0 h-dvh max-h-none w-full max-w-none overflow-visible bg-transparent p-0 text-ink sm:open:flex sm:open:items-center sm:open:justify-center"
    >
      {cur && (
        <div className="lb-panel glass glass-thick flex h-full w-full flex-col overflow-hidden sm:h-auto sm:w-[min(1100px,94vw)] sm:rounded-3xl">
          <div
            ref={viewport}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            className="relative min-h-0 flex-1 cursor-grab select-none overflow-hidden [touch-action:pinch-zoom] active:cursor-grabbing sm:h-[72vh] sm:flex-none"
          >
            <div ref={track} className="flex h-full w-full will-change-transform">
              {[prev, cur, next].map((c, slot) => (
                <div key={slot} aria-hidden={slot !== 1} className="h-full w-full shrink-0 p-3 sm:p-5">
                  {c && <img src={c.src} alt={slot === 1 ? (c.alt ?? c.title) : ""} draggable={false} className="h-full w-full object-contain" />}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-start justify-between gap-4 px-4 pb-4 sm:px-5 sm:pb-5">
            <div>
              <p className="font-display text-xl">{cur.title}</p>
              <p className="text-sm text-muted">
                {cur.detail} · {i + 1} / {list.length}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button aria-label="Previous certificate" disabled={!prev} onClick={() => go(-1)} className="press h-10 w-10 rounded-full border border-ink/30 text-lg disabled:opacity-30">
                ←
              </button>
              <button aria-label="Next certificate" disabled={!next} onClick={() => go(1)} className="press h-10 w-10 rounded-full border border-ink/30 text-lg disabled:opacity-30">
                →
              </button>
              <button data-close onClick={() => dismiss()} className="press rounded-full border border-ink px-4 py-2 text-sm font-medium hover:bg-ink hover:text-paper">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {/* src is swapped in at flight time; a blank GIF until then so it's never a broken image */}
      <img ref={flyer} src="data:image/gif;base64,R0lGODlhAQABAAAAACw=" alt="" aria-hidden className="pointer-events-none fixed z-10 hidden object-contain" />
    </dialog>
  );
}
