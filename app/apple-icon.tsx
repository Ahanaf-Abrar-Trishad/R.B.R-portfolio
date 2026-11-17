import { monogram } from "@/lib/monogram";

// Home-screen icon for iPhone / iPad.
export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return monogram(size.width);
}
