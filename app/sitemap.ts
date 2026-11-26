import type { MetadataRoute } from "next"
import { getAllOffers } from "@/lib/data"
import { absoluteUrl } from "@/lib/site"

// Written to a file at build time (static export).
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const offers = getAllOffers().map((offer) => ({
    url: absoluteUrl(`/book/${offer.id}/`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    ...offers,
    ...["/terms/", "/privacy/", "/legal/"].map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ]
}
