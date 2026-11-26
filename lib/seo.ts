import type { Metadata } from "next"
import { absoluteUrl, siteConfig } from "@/lib/site"

export const defaultTitle = `${siteConfig.name} – Trekking in Morocco's Atlas Mountains`
export const defaultSocialImage = "/img_montagne/Montagne_hd_1.jpg"

/** Absolute URL of the 1200×630 social preview built for a photo of public/ by scripts/optimize-images.mjs. */
export function socialImageUrl(src: string): string {
  return absoluteUrl(`/img-opt/og${src.replace(/\.(jpe?g|png|webp|avif)$/i, "")}.jpg`)
}

/** Shortens a text to fit in search results (~160 characters), cutting between words. */
export function summarize(text: string, max = 160): string {
  if (text.length <= max) return text
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:.—–-]+$/, "")}…`
}

/**
 * Title, description, canonical URL and social preview (Open Graph, X/Twitter) of a page.
 * `path` is the page URL with its trailing slash, e.g. "/book/1/". Leave `title` out for the home page.
 */
export function pageMetadata({
  title,
  description,
  path,
  image = defaultSocialImage,
  imageAlt,
}: {
  title?: string
  description: string
  path: string
  image?: string
  imageAlt?: string
}): Metadata {
  const url = absoluteUrl(path)
  const socialTitle = title ?? defaultTitle
  const summary = summarize(description)
  const images = [{ url: socialImageUrl(image), width: 1200, height: 630, alt: imageAlt ?? socialTitle }]

  return {
    // An explicit `title: undefined` would remove the default title of the layout.
    ...(title ? { title } : {}),
    description: summary,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: "en_US",
      url,
      title: socialTitle,
      description: summary,
      images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description: summary, images: [images[0].url] },
  }
}

/** The business, as described to search engines (schema.org). */
export function organizationJsonLd() {
  const { contact, links } = siteConfig
  return {
    "@type": "TravelAgency",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icons/icon-512.png"),
    image: socialImageUrl(defaultSocialImage),
    telephone: `+${contact.whatsappNumber}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      addressCountry: contact.address.countryCode,
    },
    areaServed: "High Atlas Mountains, Morocco",
    knowsLanguage: ["ar", "fr", "en"],
    sameAs: [links.facebook, links.instagram, links.tripadvisor],
  }
}
