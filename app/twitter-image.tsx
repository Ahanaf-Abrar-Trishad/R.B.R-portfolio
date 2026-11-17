import OpenGraphImage from "./opengraph-image";

// X (Twitter) uses the same card as Open Graph.
export const dynamic = "force-static";
export { alt, size, contentType } from "./opengraph-image";

export default function TwitterImage() {
  return OpenGraphImage();
}
