/**
 * Central business configuration.
 * Update contact details, links and pricing constants here — they are used across the whole site.
 */
export const siteConfig = {
  name: "Atlas Adventures",
  /**
   * Public URL of the deployed site, including the sub-folder on GitHub Pages
   * (used for SEO: canonical URLs, sitemap, social previews).
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  description:
    "Unforgettable trekking experiences in Morocco's Atlas Mountains, combining breathtaking landscapes, authentic Berber culture and easy online booking.",
  guideName: "Lahsan",
  contact: {
    phoneDisplay: "+212 653 534 590",
    /** International format without "+" or spaces, as required by wa.me links. */
    whatsappNumber: "212653534590",
    email: "toubkaleguidepro@gmail.com",
    location: "Marrakech, Imlil, Morocco",
    /** Used in the structured data read by Google. */
    address: { locality: "Imlil", region: "Marrakech-Safi", countryCode: "MA" },
  },
  links: {
    facebook: "https://www.facebook.com/ayni.idblid",
    instagram: "https://www.instagram.com/atlas_holiday_tours/",
    tripadvisor:
      "https://www.tripadvisor.fr/Attraction_Review-g488109-d33734404-Reviews-Atlas_Adventures-Imlil_Marrakech_Safi.html",
  },
  pricing: {
    currency: "€",
    /** ISO code of the currency above, for search engines. */
    currencyCode: "EUR",
    /** Added per person when a single traveler books a tour that has group pricing. */
    soloSupplement: 50,
  },
} as const

/** Absolute URL of a page or file of the site, e.g. absoluteUrl("/book/1/"). */
export function absoluteUrl(path: string): string {
  return `${siteConfig.url}${path}`
}

export function formatPrice(amount: number): string {
  return `${siteConfig.pricing.currency}${amount}`
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`
}

/** Pre-filled message for the general "contact us on WhatsApp" buttons. */
export const generalInquiryMessage = `Hello ${siteConfig.name}! I'd like some information about your treks.`
