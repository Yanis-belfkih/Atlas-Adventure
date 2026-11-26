import type { Offer, PricingTier } from "@/lib/data"
import { siteConfig } from "@/lib/site"

/** Tiers sorted by group size, smallest first. */
export function sortedTiers(offer: Offer) {
  return [...(offer.pricingTiers ?? [])].sort((a, b) => a.people - b.people)
}

/**
 * Price per person for a given group size.
 * - Without group pricing: the base price applies to everyone.
 * - With group pricing: the largest tier not exceeding the group size applies
 *   (the last tier covers "N or more"). Solo travelers pay the smallest tier plus the solo supplement.
 */
export function getPricePerPerson(offer: Offer, participants: number): number {
  const tiers = sortedTiers(offer)
  if (tiers.length === 0) return offer.price

  if (participants < tiers[0].people) {
    return tiers[0].pricePerPerson + siteConfig.pricing.soloSupplement
  }

  const tier = tiers.filter((t) => t.people <= participants).at(-1) ?? tiers[0]
  return tier.pricePerPerson
}

/** Lowest per-person price available, used for "From …" labels. */
export function getStartingPrice(offer: Offer): number {
  const tiers = offer.pricingTiers ?? []
  return tiers.length > 0 ? Math.min(...tiers.map((t) => t.pricePerPerson)) : offer.price
}

/** Human-readable label for a tier of a sorted list: "2 people", "2–4 people", or "11+ people" for the last one. */
export function getTierLabel(tiers: PricingTier[], index: number): string {
  const from = tiers[index].people
  const next = tiers[index + 1]
  if (!next) return `${from}+ people`

  const to = next.people - 1
  return to === from ? `${from} people` : `${from}–${to} people`
}
