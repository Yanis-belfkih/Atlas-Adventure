import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CalendarDays,
  Facebook,
  Instagram,
  Languages,
  Mail,
  MapPin,
  MessageCircle,
  Mountain,
  Phone,
  Route,
} from "lucide-react"
import { JsonLd } from "@/components/json-ld"
import { pillButton } from "@/components/pill-button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Stars } from "@/components/stars"
import { Testimonials } from "@/components/testimonials"
import { TrekExplorer } from "@/components/trek-explorer"
import { Eyebrow, sectionTitle } from "@/components/typography"
import { getOfferById, offerGroups } from "@/lib/data"
import { organizationJsonLd, pageMetadata } from "@/lib/seo"
import { absoluteUrl, generalInquiryMessage, siteConfig, whatsappUrl } from "@/lib/site"
import { testimonials } from "@/lib/testimonials"
import { cn } from "@/lib/utils"

export const metadata: Metadata = pageMetadata({ description: siteConfig.description, path: "/" })

const heroStats = [
  { value: "4,167 m", label: "Mount Toubkal, the Roof of North Africa" },
  { value: "10+ years", label: "Guiding adventurers through the Atlas" },
  { value: "500+", label: "Successful expeditions" },
  { value: "3 languages", label: "Arabic · French · English" },
]

const bookingSteps = [
  {
    icon: Route,
    title: "Choose your adventure",
    text: "From a 6-hour walk to the sacred shrine of Sidi Chamharouch to a 5-day crossing of the High Atlas.",
  },
  {
    icon: CalendarDays,
    title: "Pick your date & group",
    text: "Transparent per-person prices that adapt to the size of your group.",
  },
  {
    icon: MessageCircle,
    title: "Confirm on WhatsApp",
    text: "Your request goes straight to your guide, who confirms availability.",
  },
]

const guideFacts = [
  { icon: Award, value: "Certified", label: "Mountain Guide" },
  { icon: Mountain, value: "500+", label: "Successful Expeditions" },
  { icon: Languages, value: "Fluent", label: "Arabic, French, English" },
]

/** "Follow us" mosaic: grid placement on large screens, swipeable strip on mobile. */
const galleryPhotos = [
  { src: "/img_guide/guide_16.jpg", alt: "Two trekkers celebrating under the Toubkal summit marker", area: "lg:row-span-2" },
  { src: "/img_montagne/Montagne_hd_8.jpg", alt: "A man in a blue robe and white turban in front of a kasbah", area: "lg:col-span-2" },
  { src: "/img_guide/guide_09.jpg", alt: "Guide Lahsan standing on a snowy ridge with trekking poles", area: "" },
  { src: "/img_guide/guide_07.jpg", alt: "Guide Lahsan on a rocky summit above the clouds", area: "" },
  { src: "/img_guide/guide_10.jpg", alt: "Guide Lahsan smiling on a snowy summit", area: "lg:col-start-4 lg:row-span-2 lg:row-start-1" },
]

export default function HomePage() {
  const groups = offerGroups.map((group) => ({
    ...group,
    offers: group.offerIds.map((id) => getOfferById(String(id))).filter((offer) => offer !== undefined),
  }))
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length

  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            organizationJsonLd(),
            { "@type": "WebSite", name: siteConfig.name, url: absoluteUrl("/"), publisher: { "@id": absoluteUrl("/#organization") } },
          ],
        }}
      />
      <SiteHeader variant="overlay" />

      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-night text-white">
          <Image
            src="/img_montagne/Montagne_hd_1.jpg"
            alt="A trekker on a snowy ridge of the High Atlas, below Mount Toubkal"
            fill
            fetchPriority="high"
            sizes="100vw"
            className="-z-10 object-cover object-[58%_center]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,13,16,.64)_0%,rgba(10,13,16,.3)_42%,rgba(10,13,16,0)_70%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,13,16,.5)_0%,rgba(10,13,16,0)_20%,rgba(10,13,16,0)_45%,rgba(10,13,16,.88)_100%)]"
          />

          <div className="shell flex min-h-[clamp(640px,100svh,960px)] flex-col pt-[72px] lg:min-h-[clamp(860px,100svh,1000px)] lg:pt-24">
            <div className="flex flex-1 flex-col justify-end pb-9 lg:justify-center lg:pb-16">
              <Eyebrow tone="light">Guided treks · Imlil, High Atlas · Morocco</Eyebrow>
              <h1 className="accent-light mb-[18px] mt-[18px] max-w-[900px] font-serif text-[50px] font-normal leading-none tracking-[-0.025em] md:text-[68px] lg:mb-7 lg:mt-[26px] lg:text-[80px] lg:leading-[0.98]">
                Discover Morocco&apos;s
                <br />
                <em>Majestic Mountains</em>
              </h1>
              <p className="mb-7 max-w-[500px] text-base leading-normal text-white/85 lg:mb-10 lg:text-xl">
                Expert-guided trekking adventures through the Atlas, Sahara, and beyond
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <Link href="#offers" className={pillButton({ tone: "clay" })}>
                  Explore Our Treks
                  <ArrowRight aria-hidden />
                </Link>
                <Link href="#about" className={pillButton({ tone: "ghost" })}>
                  Meet Your Guide
                </Link>
              </div>
            </div>

            <dl className="-mx-5 grid grid-cols-2 bg-night px-5 pb-7 pt-2 md:mx-0 md:grid-cols-4 md:border-t md:border-white/20 md:bg-transparent md:px-0 md:pb-11 md:pt-0">
              {heroStats.map((stat, index) => (
                <div
                  key={stat.value}
                  className={cn(
                    "flex flex-col-reverse pt-5 md:pb-0 md:pt-[30px]",
                    index > 0 && "md:border-l md:border-white/20 md:pl-6 lg:pl-9",
                  )}
                >
                  <dt className="text-[13px] text-white/70 lg:text-sm">{stat.label}</dt>
                  <dd className="mb-1 font-serif text-[30px] leading-[1.1] lg:mb-3 lg:text-[44px] lg:leading-none">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Intro + booking steps */}
        <section className="py-[72px] lg:pb-[140px] lg:pt-[150px]">
          <div className="shell">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-20">
              <Eyebrow className="shrink-0 lg:w-60 lg:pt-4">{siteConfig.name}</Eyebrow>
              <h2 className="accent max-w-[960px] font-serif text-[28px] font-light leading-[1.25] tracking-[-0.015em] md:text-[38px] lg:text-[46px] lg:leading-[1.2]">
                Unforgettable trekking experiences in Morocco&apos;s Atlas Mountains, combining{" "}
                <em>breathtaking landscapes</em>, authentic Berber culture and easy online booking.
              </h2>
            </div>

            <ol className="mt-9 md:grid md:grid-cols-3 md:border-t md:border-ink/14 lg:mt-[100px]">
              {bookingSteps.map((step, index) => (
                <li
                  key={step.title}
                  className={cn(
                    "flex gap-4 border-t border-ink/12 py-5 md:block md:border-t-0 md:py-0 md:pr-8 md:pt-9 lg:pr-12",
                    index > 0 && "md:border-l md:border-ink/14 md:pl-8 lg:pl-12",
                  )}
                >
                  <div className="md:mb-8 md:flex md:items-center md:justify-between">
                    <span className="hidden font-serif text-[15px] text-clay md:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-11 items-center justify-center rounded-full bg-sand-light text-clay md:size-12">
                      <step.icon aria-hidden className="size-[22px]" strokeWidth={1.75} />
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-1 font-serif text-[21px] leading-[1.2] md:mb-3 lg:text-[27px]">{step.title}</h3>
                    <p className="text-sm text-stone md:text-base">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Treks */}
        <section id="offers" className="scroll-mt-20 pb-[72px] lg:scroll-mt-24 lg:pb-[60px]">
          <div className="shell">
            <div className="mb-6 flex flex-col gap-4 lg:mb-11 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Our treks</Eyebrow>
                <h2 className={cn(sectionTitle, "mt-4 lg:mt-[22px]")}>
                  Our Trekking <em>Adventures</em>
                </h2>
              </div>
              <p className="max-w-[440px] text-[15px] leading-relaxed text-stone lg:text-lg">
                Choose from our carefully crafted mountain expeditions, each offering unique landscapes and cultural
                experiences
              </p>
            </div>
            <TrekExplorer groups={groups} />
          </div>
        </section>

        {/* Guide */}
        <section id="about" className="scroll-mt-20 bg-night py-[72px] text-white lg:scroll-mt-24 lg:py-[150px]">
          <div className="shell flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16 xl:gap-[110px]">
            <div className="relative aspect-[600/740] w-full max-w-[600px] shrink-0 max-lg:mx-auto lg:w-auto lg:flex-1">
              <div className="absolute left-0 top-0 h-[86.5%] w-[86.7%] overflow-hidden rounded-lg">
                <Image
                  src="/img_guide/guide_26.jpg"
                  alt={`${siteConfig.guideName}, certified mountain guide, on a snowy summit`}
                  fill
                  sizes="(max-width: 1024px) 86vw, 520px"
                  className="object-cover"
                />
              </div>
              <span className="absolute left-4 top-4 flex h-9 items-center gap-2 rounded-full bg-night/70 px-4 text-[13px] font-semibold backdrop-blur-sm lg:left-6 lg:top-6">
                <MapPin aria-hidden className="size-[15px] text-peach" />
                Imlil, High Atlas
              </span>
              <div className="absolute left-[56.7%] top-[56.8%] h-[43.2%] w-[43.3%] overflow-hidden rounded-lg border-[6px] border-night lg:border-8">
                <Image
                  src="/img_guide/guide_12.jpg"
                  alt="Trekkers celebrating at the Toubkal summit at sunrise"
                  fill
                  sizes="(max-width: 1024px) 43vw, 260px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 lg:max-w-[570px] lg:flex-1">
              <Eyebrow tone="light">Your guide</Eyebrow>
              <h2 className={cn(sectionTitle, "accent-light mb-5 mt-4 lg:mb-7 lg:mt-[22px]")}>
                Meet Your Expert Guide <em>{siteConfig.guideName}</em>
              </h2>
              <p className="mb-8 text-base leading-relaxed text-white/75 lg:mb-[52px] lg:text-xl">
                With over 10 years of experience guiding adventurers through Morocco&apos;s most spectacular landscapes,
                I am passionate about sharing the beauty and culture of my homeland.
              </p>

              <ul className="mb-9 grid grid-cols-3 border-t border-white/14 lg:mb-[52px]">
                {guideFacts.map((fact, index) => (
                  <li
                    key={fact.label}
                    className={cn("pr-3 pt-6 lg:pr-5 lg:pt-[30px]", index > 0 && "border-l border-white/14 pl-3 lg:pl-6")}
                  >
                    <span className="mb-4 flex size-10 items-center justify-center rounded-full bg-peach/12 text-peach lg:mb-[22px] lg:size-[46px]">
                      <fact.icon aria-hidden className="size-5 lg:size-[22px]" strokeWidth={1.75} />
                    </span>
                    <p className="mb-1.5 font-serif text-xl leading-[1.1] lg:text-[26px]">{fact.value}</p>
                    <p className="text-[13px] text-white/65 lg:text-sm">{fact.label}</p>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
                <a
                  href={whatsappUrl(generalInquiryMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillButton({ tone: "light" })}
                >
                  <MessageCircle aria-hidden />
                  Talk to {siteConfig.guideName} on WhatsApp
                </a>
                <a
                  href={siteConfig.links.tripadvisor}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillButton({ tone: "ghost" })}
                >
                  TripAdvisor reviews
                  <ArrowUpRight aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pt-[72px] lg:pt-[150px]">
          <div className="shell">
            <div className="mb-8 flex flex-col gap-5 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Follow us</Eyebrow>
                <h2 className={cn(sectionTitle, "mt-4 lg:mt-[22px]")}>
                  Stay updated with our <em>latest adventures</em>
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillButton({ tone: "outline", size: "sm" })}
                >
                  <Instagram aria-hidden />@atlas_holiday_tours
                </a>
                <a
                  href={siteConfig.links.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={pillButton({ tone: "outline", size: "sm" })}
                >
                  <Facebook aria-hidden />
                  Facebook
                </a>
              </div>
            </div>

            <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 lg:grid lg:grid-cols-[360fr_252fr_252fr_368fr] lg:grid-rows-[280px_280px] lg:gap-4 lg:overflow-visible">
              {galleryPhotos.map((photo) => (
                <li
                  key={photo.src}
                  className={cn(
                    "relative h-[340px] w-[260px] shrink-0 snap-start overflow-hidden rounded-lg lg:h-auto lg:w-auto",
                    photo.area,
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1024px) 260px, 520px"
                    className="object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Reviews */}
        <section id="testimonials" className="scroll-mt-20 py-[72px] lg:scroll-mt-24 lg:py-[150px]">
          <div className="shell">
            <div className="mb-8 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Eyebrow>Reviews</Eyebrow>
                <h2 className={cn(sectionTitle, "mb-3 mt-4 lg:mb-4 lg:mt-[22px]")}>
                  What Our Adventurers <em>Say</em>
                </h2>
                <p className="text-[15px] text-stone lg:text-lg">Real experiences from real travelers</p>
              </div>
              <div className="flex items-center gap-5 self-start rounded-lg border border-ink/10 bg-paper px-6 py-5 lg:gap-[22px] lg:self-auto lg:px-7 lg:py-[22px]">
                <p className="font-serif text-[44px] leading-none lg:text-[54px]">{averageRating.toFixed(1)}</p>
                <div className="flex flex-col gap-1.5 text-sm text-stone">
                  <Stars rating={Math.round(averageRating)} className="[&_svg]:size-[18px]" />
                  <span>{testimonials.length} traveler reviews</span>
                  <a
                    href={siteConfig.links.tripadvisor}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-semibold text-ink hover:text-clay"
                  >
                    See our reviews on TripAdvisor
                    <ArrowUpRight aria-hidden className="size-4" />
                  </a>
                </div>
              </div>
            </div>
            <Testimonials testimonials={testimonials} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="relative isolate scroll-mt-20 overflow-hidden text-white lg:scroll-mt-24">
          <Image
            src="/img_montagne/Montagne_hd_imlil.jpg"
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,13,16,.78)_0%,rgba(10,13,16,.6)_100%)] lg:bg-[linear-gradient(90deg,rgba(10,13,16,.86)_0%,rgba(10,13,16,.62)_45%,rgba(10,13,16,.2)_100%)]"
          />
          <div className="shell flex flex-col gap-10 py-[72px] lg:min-h-[760px] lg:flex-row lg:items-center lg:justify-between lg:py-24">
            <div className="lg:max-w-[600px]">
              <Eyebrow tone="light">Contact</Eyebrow>
              <h2 className={cn(sectionTitle, "accent-light my-4 lg:my-[22px] lg:text-[72px]")}>
                Ready for Your <em>Adventure?</em>
              </h2>
              <p className="mb-8 max-w-[460px] text-base text-white/85 lg:mb-10 lg:text-xl">
                Get in touch to plan your perfect Moroccan mountain experience
              </p>
              <a
                href={whatsappUrl(generalInquiryMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(pillButton({ tone: "juniper" }), "w-full sm:w-[300px]")}
              >
                <MessageCircle aria-hidden />
                Message us on WhatsApp
              </a>
            </div>

            <ul className="rounded-[10px] bg-paper px-6 py-2 text-ink lg:w-[480px] lg:px-8 lg:py-3">
              <ContactRow
                icon={Phone}
                label="Call Us"
                value={siteConfig.contact.phoneDisplay}
                href={`tel:+${siteConfig.contact.whatsappNumber}`}
              />
              <ContactRow
                icon={Mail}
                label="Email Us"
                value={siteConfig.contact.email}
                href={`mailto:${siteConfig.contact.email}`}
              />
              <ContactRow icon={MapPin} label="Visit Us" value={siteConfig.contact.location} />
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone
  label: string
  value: string
  href?: string
}) {
  return (
    <li className="flex items-center gap-4 border-b border-ink/10 py-5 last:border-b-0 lg:gap-5 lg:py-[26px]">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-clay-light text-clay lg:size-[52px]">
        <Icon aria-hidden className="size-5 lg:size-[22px]" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-stone">{label}</p>
        {href ? (
          <a href={href} className="break-words text-base font-semibold hover:text-clay lg:text-lg">
            {value}
          </a>
        ) : (
          <p className="text-base font-semibold lg:text-lg">{value}</p>
        )}
      </div>
    </li>
  )
}
