import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, siteUrl } from "@/content/site";

// Social share card (Open Graph / X), generated once at build time.
export const dynamic = "force-static";
export const alt = `${profile.name} — aquatic ecotoxicology and microplastics researcher`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Site palette in hex (the OG renderer has no OKLCH).
const C = { paper: "#f3f7f3", ink: "#0d2a2e", muted: "#4d6466", river: "#22675f", accent: "#c8603a" };

export default async function Image() {
  const serif = await readFile(join(process.cwd(), "assets/YoungSerif-Regular.ttf"));
  const words = profile.name.split(" ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: C.paper, color: C.ink, fontFamily: "Young Serif" }}>
        <div style={{ display: "flex", fontSize: 30, color: C.river }}>{profile.role}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -3 }}>{words.slice(0, -1).join(" ")}</div>
          <div style={{ fontSize: 112, lineHeight: 1, letterSpacing: -3 }}>{words.at(-1)}</div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 32, color: C.muted }}>{profile.affiliation}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 28, color: C.river }}>
          <div style={{ width: 56, height: 4, background: C.accent, marginRight: 20 }} />
          {siteUrl.replace("https://", "")}
        </div>
        {/* microplastic particles */}
        {[[1010, 120, 14], [1080, 210, 9], [960, 300, 11], [1100, 380, 7], [1030, 470, 12]].map(([x, y, r], i) => (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, borderRadius: r, background: C.accent, opacity: 0.85 }} />
        ))}
      </div>
    ),
    { ...size, fonts: [{ name: "Young Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
