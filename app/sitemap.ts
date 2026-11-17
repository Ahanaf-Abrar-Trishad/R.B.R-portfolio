import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

// One-page site: the home page is the only URL (section anchors are not separate pages).
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
