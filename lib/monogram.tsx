import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// "R" monogram in the site's serif with a terracotta microplastic dot; used for the favicon and Apple touch icon.
export async function monogram(px: number) {
  const serif = await readFile(join(process.cwd(), "assets/YoungSerif-Regular.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d2a2e", borderRadius: px * 0.22, color: "#f3f7f3", fontFamily: "Young Serif", fontSize: px * 0.68 }}>
        R
        <div style={{ position: "absolute", right: px * 0.17, bottom: px * 0.2, width: px * 0.14, height: px * 0.14, borderRadius: px, background: "#c8603a" }} />
      </div>
    ),
    { width: px, height: px, fonts: [{ name: "Young Serif", data: serif, style: "normal", weight: 400 }] },
  );
}
