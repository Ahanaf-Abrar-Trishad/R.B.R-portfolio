// Hand-drawn style line illustrations. Strokes use currentColor (set text-river on the parent);
// accent dots are microplastic particles. Every stroked shape has pathLength=1 so CSS can "draw" it in (see .ill in globals.css).

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", pathLength: 1 } as const;

function Particles({ dots }: { dots: [number, number, number][] }) {
  return (
    <g className="particles" fill="var(--accent)">
      {dots.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} style={{ animationDelay: `${i * -0.7}s` }} />
      ))}
    </g>
  );
}

// Nile tilapia over a freshwater pearl mussel, microplastics drifting through the water and caught inside both.
export function FishMussel({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 230" className={`ill ${className}`} role="img" aria-label="Line drawing of a tilapia and a freshwater mussel with microplastic particles">
      <path {...S} d="M8 18 Q 28 10 48 18 T 88 18 T 128 18 T 168 18 T 208 18 T 236 16" opacity={0.5} />
      {/* fish */}
      <path {...S} d="M28 82 C 52 46, 130 40, 172 72 C 180 78, 180 86, 172 92 C 130 124, 52 118, 28 82 Z" />
      <path {...S} d="M172 72 L 206 50 L 196 82 L 206 114 L 172 92" />
      <path {...S} d="M78 54 C 96 30, 140 32, 160 58" />
      <path {...S} d="M92 112 C 104 124, 128 122, 140 108" />
      <path {...S} d="M70 60 C 80 72, 80 92, 70 104" />
      <path {...S} d="M98 70 q 6 6 0 12 M114 66 q 6 7 0 14 M130 68 q 6 7 0 14 M146 72 q 5 6 0 12" opacity={0.6} />
      <circle {...S} cx={50} cy={76} r={4} />
      {/* mussel */}
      <path {...S} d="M30 186 C 40 154, 130 142, 196 164 C 208 168, 206 190, 190 196 C 130 214, 50 214, 30 186 Z" />
      <path {...S} d="M48 186 C 58 166, 124 158, 176 172" opacity={0.6} />
      <path {...S} d="M66 190 C 78 176, 122 170, 158 180" opacity={0.6} />
      <path {...S} d="M30 186 C 70 192, 150 192, 196 176" opacity={0.6} />
      <path {...S} d="M8 222 Q 40 216 72 222 T 136 222 T 200 222 T 236 220" opacity={0.5} />
      <Particles
        dots={[
          [20, 40, 2.2], [214, 30, 1.8], [222, 136, 2.4], [16, 130, 1.8], [120, 140, 2],
          [104, 88, 2.2], [136, 92, 1.8], [94, 188, 2], [140, 184, 1.8],
        ]}
      />
    </svg>
  );
}

// AGRO-FEME's idea: a floating vegetable garden on the pond, filter-feeding fish in the water underneath.
export function FloatingGarden({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 190" className={`ill ${className}`} role="img" aria-label="Line drawing of a floating vegetable garden on a pond with fish swimming underneath">
      {/* plants */}
      <path {...S} d="M110 82 V 44 M110 60 C 96 56, 90 46, 92 36 C 104 40, 110 50, 110 60 M110 52 C 122 46, 130 38, 128 28 C 116 32, 110 42, 110 52" />
      <path {...S} d="M160 82 V 34 M160 50 C 146 44, 140 32, 144 22 C 156 28, 160 40, 160 50 M160 64 C 174 60, 182 50, 180 40 C 168 42, 160 52, 160 64" />
      <path {...S} d="M210 82 V 50 M210 62 C 198 58, 192 50, 194 42 C 204 44, 210 52, 210 62" />
      <circle cx={188} cy={58} r={4.5} fill="var(--accent)" />
      <circle cx={198} cy={68} r={3.5} fill="var(--accent)" />
      {/* raft */}
      <path {...S} d="M84 82 H 236 L 228 96 H 92 Z" />
      <path {...S} d="M104 86 L 100 94 M124 86 L 120 94 M144 86 L 140 94 M164 86 L 160 94 M184 86 L 180 94 M204 86 L 200 94 M224 86 L 220 94" opacity={0.6} />
      {/* water */}
      <path {...S} d="M4 92 Q 24 84 44 92 T 84 92 M236 92 Q 256 84 276 92 T 316 92" />
      <path {...S} d="M20 110 Q 40 104 60 110 M250 116 Q 270 110 290 116" opacity={0.4} />
      {/* fish */}
      <g className="swim">
        <path {...S} d="M70 140 C 84 126, 116 126, 128 138 C 116 152, 84 152, 70 140 Z M128 138 L 142 128 L 140 140 L 144 152 L 128 142" />
        <circle cx={82} cy={137} r={1.8} fill="currentColor" />
      </g>
      <g className="swim swim-2">
        <path {...S} d="M196 160 C 208 150, 232 150, 242 158 C 232 168, 208 168, 196 160 Z M242 158 L 254 150 L 252 160 L 256 170 L 242 162" />
        <circle cx={206} cy={158} r={1.6} fill="currentColor" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth={1.2} opacity={0.5}>
        <circle cx={60} cy={128} r={2.5} />
        <circle cx={54} cy={118} r={1.8} />
        <circle cx={188} cy={150} r={2} />
      </g>
      <path {...S} d="M4 184 Q 60 176 120 184 T 240 182 T 316 184" opacity={0.5} />
    </svg>
  );
}

// A globe with a dotted route from Bangladesh to Rome.
export function GlobeRoute({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 200" className={`ill ${className}`} role="img" aria-label="Line drawing of a globe with a route from Dhaka to Rome">
      <circle {...S} cx={120} cy={110} r={72} />
      <ellipse {...S} cx={120} cy={110} rx={30} ry={72} opacity={0.6} />
      <ellipse {...S} cx={120} cy={110} rx={56} ry={72} opacity={0.4} />
      <path {...S} d="M50 86 H 190 M48 110 H 192 M54 136 H 186" opacity={0.4} />
      <path className="route" d="M164 98 C 150 28, 84 28, 74 82" fill="none" stroke="var(--accent)" strokeWidth={1.8} strokeLinecap="round" pathLength={1} />
      <circle cx={164} cy={98} r={4} fill="var(--accent)" />
      <circle cx={74} cy={82} r={4} fill="var(--accent)" />
      <g fontSize={12} fontWeight={600} fill="currentColor" fontFamily="var(--font-body)" stroke="var(--paper)" strokeWidth={4} paintOrder="stroke">
        <text x={196} y={102}>Dhaka</text>
        <text x={18} y={58}>Rome</text>
      </g>
    </svg>
  );
}
