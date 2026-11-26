import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight, Clock, ExternalLink, MapPin, Mountain, Phone, User, Users } from "lucide-react"
import { BookingBar } from "@/components/booking/booking-bar"
import { BookingForm } from "@/components/booking/booking-form"
import { OfferDetails } from "@/components/booking/offer-details"
import { DifficultyMeter } from "@/components/difficulty-meter"
import { JsonLd } from "@/components/json-ld"
import { OfferCard } from "@/components/offer-card"
import { pillButton } from "@/components/pill-button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Stars } from "@/components/stars"
import { Eyebrow, sectionTitle } from "@/components/typography"
import { getAllOffers, getOfferById, getOfferGroup, type Offer } from "@/lib/data"
import { getStartingPrice } from "@/lib/pricing"
import { organizationJsonLd, pageMetadata } from "@/lib/seo"
import { absoluteUrl, formatPrice, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type BookingPageProps = {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getAllOffers().map((offer) => ({ id: String(offer.id) }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: BookingPageProps): Promise<Metadata> {
  const offer = getOfferById((await params).id)
  if (!offer) return {}

  return pageMetadata({
    title: offer.name,
    description: offer.description,
    path: offerPath(offer),
    image: offer.image,
  })
}

function offerPath(offer: Offer): string {
  return `/book/${offer.id}/`
}

/** The tour and its place in the site, as described to search engines (schema.org). */
function offerJsonLd(offer: Offer) {
  const url = absoluteUrl(offerPath(offer))
  const photos = [offer.image, ...(offer.gallery ?? []).map((photo) => (typeof photo === "string" ? photo : photo.src))]
  const { "@id": _id, ...provider } = organizationJsonLd()

  return {
    "@graph": [
      {
        "@type": "TouristTrip",
        name: offer.name,
        description: offer.description,
        url,
        image: photos.map(absoluteUrl),
        provider,
        offers: {
          "@type": "Offer",
          url,
          price: getStartingPrice(offer),
          priceCurrency: siteConfig.pricing.currencyCode,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: offer.name, item: url },
        ],
      },
    ],
  }
}

const RELATED_COUNT = 3

/** Other treks to suggest: same group first, then the rest of the catalogue. */
function getRelatedOffers(offer: Offer): Offer[] {
  const groupIds = getOfferGroup(offer)?.offerIds ?? []
  const others = getAllOffers().filter((other) => other.id !== offer.id)
  return [
    ...others.filter((other) => groupIds.includes(other.id)),
    ...others.filter((other) => !groupIds.includes(other.id)),
  ].slice(0, RELATED_COUNT)
}

export default async function BookingPage({ params }: BookingPageProps) {
  const offer = getOfferById((await params).id)
  if (!offer) notFound()

  const group = getOfferGroup(offer)
  const lastSpace = offer.name.lastIndexOf(" ")
  const titleStart = offer.name.slice(0, lastSpace)
  const titleEnd = offer.name.slice(lastSpace + 1)
  const sidePhotos = (offer.gallery ?? [])
    .slice(0, 2)
    .map((photo) => (typeof photo === "string" ? { src: photo, position: undefined } : photo))

  const facts: { icon: typeof Clock; label: string; value: string; meter?: boolean }[] = [
    { icon: Clock, label: "Duration", value: offer.duration },
    { icon: Mountain, label: "Difficulty", value: offer.difficulty, meter: true },
    { icon: Users, label: "Group size", value: `Max ${offer.maxGroupSize}` },
    ...(offer.minAge !== undefined ? [{ icon: User, label: "Minimum age", value: `Age ${offer.minAge}+` }] : []),
    { icon: MapPin, label: "Location", value: "Morocco" },
  ]

  return (
    <>
      <JsonLd data={offerJsonLd(offer)} />
      <SiteHeader active="Treks" />

      <main>
        <div className="shell">
          <nav aria-label="Breadcrumb" className="flex items-center justify-between py-5 lg:py-7">
            <Link href="/#offers" className="flex items-center gap-2 text-sm font-semibold hover:text-clay">
              <ArrowLeft aria-hidden className="size-[18px]" />
              All treks
            </Link>
            <ol className="hidden items-center gap-2.5 text-sm text-stone md:flex">
              <li>
                <Link href="/#offers" className="hover:text-ink">
                  Treks
                </Link>
              </li>
              {group && (
                <>
                  <li aria-hidden>/</li>
                  <li>{group.title}</li>
                </>
              )}
              <li aria-hidden>/</li>
              <li aria-current="page" className="font-medium text-ink">
                {offer.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-5 pb-8 pt-2 lg:flex-row lg:items-end lg:justify-between lg:pb-10 lg:pt-6">
            <div className="lg:max-w-[860px]">
              <Eyebrow>{[group?.title, offer.duration].filter(Boolean).join(" · ")}</Eyebrow>
              <h1 className="accent mt-4 font-serif text-[40px] font-normal leading-[1.04] tracking-[-0.025em] md:text-[56px] lg:mt-[22px] lg:text-[72px] lg:leading-[1.02]">
                {titleStart} <em>{titleEnd}</em>
              </h1>
            </div>
            <a
              href={siteConfig.links.tripadvisor}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center gap-3 text-sm text-stone hover:text-ink"
            >
              <Stars />
              <span>
                See our reviews on <strong className="font-semibold text-ink">TripAdvisor</strong>
              </span>
              <ArrowUpRight aria-hidden className="size-4 text-ink" />
            </a>
          </div>

          <div
            className={cn(
              "grid gap-3 lg:h-[540px] lg:gap-4",
              sidePhotos.length > 0 && "lg:grid-cols-[840fr_424fr]",
            )}
          >
            <div className="relative h-[300px] overflow-hidden rounded-lg md:h-[440px] lg:h-auto">
              <Image
                src={offer.image}
                alt={offer.name}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 840px"
                className="object-cover"
                style={offer.imagePosition ? { objectPosition: offer.imagePosition } : undefined}
              />
            </div>
            {sidePhotos.length > 0 && (
              <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col lg:gap-4">
                {sidePhotos.map((photo) => (
                  <div
                    key={photo.src}
                    className={cn(
                      "relative h-[140px] overflow-hidden rounded-lg md:h-[220px] lg:h-auto lg:flex-1",
                      sidePhotos.length === 1 && "col-span-2",
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 424px"
                      className="object-cover"
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <dl
            className={cn(
              "mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 lg:mt-6",
              facts.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
            )}
          >
            {facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  "flex items-center gap-3 bg-paper p-4 lg:gap-3.5 lg:px-7 lg:py-6",
                  index === facts.length - 1 && facts.length % 2 === 1 && "col-span-2 lg:col-span-1",
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sand-light text-clay lg:size-11">
                  <fact.icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone lg:text-xs">
                    {fact.label}
                  </dt>
                  <dd className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[15px] font-semibold lg:text-[17px]">
                    {fact.value}
                    {fact.meter && <DifficultyMeter difficulty={offer.difficulty} />}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="grid gap-12 pb-[72px] pt-12 lg:grid-cols-[minmax(0,1fr)_436px] lg:gap-16 lg:pb-[140px] lg:pt-[88px]">
            <OfferDetails offer={offer} />

            <aside className="flex flex-col gap-5 lg:self-start">
              <BookingForm offer={offer} />
              <a
                href={siteConfig.links.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-paper px-6 py-[22px] hover:border-ink/25"
              >
                <span className="flex items-center gap-3.5">
                  <Stars />
                  <span>
                    <span className="block text-[15px] font-semibold">Our reviews on TripAdvisor</span>
                    <span className="text-[13px] text-stone">See what travelers say</span>
                  </span>
                </span>
                <ExternalLink aria-hidden className="size-[18px] shrink-0" />
              </a>
              <a
                href={`tel:+${siteConfig.contact.whatsappNumber}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-paper px-6 py-[22px] hover:border-ink/25"
              >
                <span className="flex items-center gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clay-light text-clay">
                    <Phone aria-hidden className="size-5" strokeWidth={1.75} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold">Questions before booking?</span>
                    <span className="text-[13px] text-stone">{siteConfig.contact.phoneDisplay}</span>
                  </span>
                </span>
                <ArrowRight aria-hidden className="size-[18px] shrink-0" />
              </a>
            </aside>
          </div>
        </div>

        <section aria-labelledby="more-title" className="pb-[72px] lg:pb-[140px]">
          <div className="shell">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between lg:mb-10">
              <div>
                <Eyebrow>Keep exploring</Eyebrow>
                <h2 id="more-title" className={cn(sectionTitle, "mt-4 lg:mt-5 lg:text-[52px]")}>
                  More <em>adventures</em>
                </h2>
              </div>
              <Link href="/#offers" className={cn(pillButton({ tone: "outline", size: "sm" }), "self-start md:self-auto")}>
                All treks
                <ArrowRight aria-hidden />
              </Link>
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 lg:gap-8">
              {getRelatedOffers(offer).map((related) => (
                <OfferCard key={related.id} offer={related} className="w-[300px] shrink-0 snap-start md:w-auto" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Room for the booking bar below the footer. */}
      <div aria-hidden className="h-[76px] bg-night" />
      <BookingBar name={offer.name} price={formatPrice(getStartingPrice(offer))} />
    </>
  )
}
