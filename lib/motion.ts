// Physical motion helpers (Apple's "Designing Fluid Interfaces", via the apple-design skill).

type SpringOpts = { damping?: number; response?: number };

// One spring integration step. damping = ratio (1 = no overshoot), response = seconds (≈ how fast it gets there).
export function stepSpring(x: number, v: number, to: number, dt: number, { damping = 1, response = 0.35 }: SpringOpts = {}) {
  const k = ((2 * Math.PI) / response) ** 2;
  const c = (4 * Math.PI * damping) / response;
  for (let n = 4, h = dt / 4; n--; ) {
    v += (-k * (x - to) - c * v) * h;
    x += v * h;
  }
  return [x, v] as const;
}

// Animate a value with a spring that starts from the current value and velocity, so it can be interrupted any time.
export function spring(from: number, to: number, velocity: number, onUpdate: (x: number) => void, opts: SpringOpts = {}, onDone?: () => void) {
  let x = from, v = velocity, last = performance.now(), raf = 0;
  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    [x, v] = stepSpring(x, v, to, dt, opts);
    if (Math.abs(x - to) < 0.5 && Math.abs(v) < 20) {
      onUpdate(to);
      onDone?.();
      return;
    }
    onUpdate(x);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

// Where a flick would come to rest, like scroll deceleration (px/s in, px out).
export const project = (velocity: number, decelerationRate = 0.998) => ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);

// Resistance past an edge: the further you pull, the less it follows.
export const rubberband = (overshoot: number, dimension: number, constant = 0.55) =>
  (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot));
