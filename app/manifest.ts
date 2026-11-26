import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site"

// Written to a file at build time (static export).
export const dynamic = "force-static"

/** Name, colors and icons used when a visitor adds the site to their phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    // Relative to the manifest, so it also works from a GitHub Pages sub-folder.
    start_url: "./",
    scope: "./",
    display: "standalone",
    background_color: "#fcfaf6",
    theme_color: "#121519",
    icons: [
      { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
