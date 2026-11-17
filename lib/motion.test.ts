// Self-check: node --experimental-strip-types lib/motion.test.ts
import assert from "node:assert/strict";
import { project, rubberband, stepSpring } from "./motion.ts";

// A critically damped spring settles on target without overshooting.
let x = 0, v = 0, peak = 0;
for (let i = 0; i < 120; i++) {
  [x, v] = stepSpring(x, v, 100, 1 / 60, { damping: 1, response: 0.35 });
  peak = Math.max(peak, x);
}
assert.ok(Math.abs(x - 100) < 0.5, `settles at target, got ${x}`);
assert.ok(peak <= 100.5, `no overshoot at damping 1, peak ${peak}`);

// An under-damped spring does overshoot.
x = 0; v = 0; peak = 0;
for (let i = 0; i < 120; i++) {
  [x, v] = stepSpring(x, v, 100, 1 / 60, { damping: 0.6, response: 0.35 });
  peak = Math.max(peak, x);
}
assert.ok(peak > 100.5, "overshoots below damping 1");

// A 1000 px/s flick projects ~499 px; no velocity, no travel.
assert.ok(Math.abs(project(1000) - 499) < 1);
assert.equal(project(0), 0);

// Rubber-band: always less than the pull, grows monotonically, keeps sign.
assert.ok(rubberband(100, 300) < 100 && rubberband(100, 300) > 0);
assert.ok(rubberband(200, 300) > rubberband(100, 300));
assert.ok(rubberband(-100, 300) < 0);

console.log("motion: all checks passed");
