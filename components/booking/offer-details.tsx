import { Bike, Check, Clock, Info, Lightbulb, Mountain, Users, UtensilsCrossed, X } from "lucide-react"
import { Eyebrow } from "@/components/typography"
import type { DailyItineraryItem, ItineraryItem, Offer, SpecialFeature } from "@/lib/data"
import { cn } from "@/lib/utils"

const featureIcons: Record<SpecialFeature["icon"], typeof Mountain> = {
  users: Users,
  mountain: Mountain,
}

const blockTitle = "mb-6 mt-4 font-serif text-[30px] font-normal leading-[1.1] tracking-[-0.015em] lg:mb-8 lg:mt-5 lg:text-[40px]"

/** Main column of the booking page: overview, highlights, itinerary and practical info. */
export function OfferDetails({ offer }: { offer: Offer }) {
  const isBiking = offer.activity === "biking"
  const isTrek = !offer.activity || offer.activity === "trek"

  return (
    <div className="min-w-0 space-y-14 lg:space-y-20">
      <section>
        <Eyebrow>Overview</Eyebrow>
        <p className="mt-5 font-serif text-xl font-light leading-[1.45] lg:mt-[22px] lg:text-[26px]">{offer.description}</p>
        {offer.note && (
          <p className="mt-6 flex items-start gap-3 rounded-lg bg-clay-light px-5 py-4 text-[15px] text-clay-dark">
            <Info aria-hidden className="mt-0.5 size-[18px] shrink-0" />
            {offer.note}
          </p>
        )}
      </section>

      <section>
        <Eyebrow>Highlights</Eyebrow>
        <h2 className={blockTitle}>{isTrek ? "Journey Highlights" : "Adventure Highlights"}</h2>
        <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {offer.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3.5 text-[15.5px] leading-normal lg:text-[16.5px]">
              <CheckMark icon={isBiking ? Bike : Check} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {offer.dailyItinerary?.length ? <DailyItinerary days={offer.dailyItinerary} /> : null}
      {offer.itinerary?.length ? <HourlyItinerary items={offer.itinerary} activity={offer.activity} /> : null}

      {offer.specialFeatures?.length ? (
        <section className="grid gap-4 md:grid-cols-2 lg:gap-6">
          {offer.specialFeatures.map((feature) => {
            const Icon = featureIcons[feature.icon]
            return (
              <div key={feature.title} className="rounded-lg border border-ink/10 bg-paper p-6 lg:p-8">
                <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-sand-light text-clay">
                  <Icon aria-hidden className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mb-2 font-serif text-[22px] leading-[1.2] lg:text-2xl">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-stone-dark">{feature.description}</p>
              </div>
            )
          })}
        </section>
      ) : null}

      <section>
        <Eyebrow>Practical</Eyebrow>
        <h2 className={blockTitle}>What&apos;s included</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
          <div className="rounded-lg border border-ink/10 bg-paper p-6 lg:p-8">
            <h3 className="mb-5 font-serif text-2xl lg:mb-[22px] lg:text-[26px]">Included</h3>
            <ul className="space-y-3.5">
              {offer.included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-normal lg:text-[15.5px]">
                  <CheckMark icon={Check} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-dashed border-ink/20 p-6 lg:p-8">
            <h3 className="mb-5 font-serif text-2xl lg:mb-[22px] lg:text-[26px]">Not Included</h3>
            <ul className="space-y-3.5">
              {offer.notIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-normal lg:text-[15.5px]">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-sand-light text-stone">
                    <X aria-hidden className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="pt-0.5">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {offer.proTips?.length ? (
        <section className="rounded-lg bg-night p-6 text-white lg:p-10">
          <h2 className="mb-6 flex items-center gap-3 font-serif text-[26px] lg:text-[30px]">
            <span className="flex size-11 items-center justify-center rounded-full bg-peach/12 text-peach">
              <Lightbulb aria-hidden className="size-5" strokeWidth={1.75} />
            </span>
            Pro Tips
          </h2>
          <ul className="grid gap-x-8 gap-y-3.5 md:grid-cols-2">
            {offer.proTips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-[15px] leading-normal text-white/85">
                <Check aria-hidden className="mt-0.5 size-[18px] shrink-0 text-peach" strokeWidth={2} />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function CheckMark({ icon: Icon }: { icon: typeof Check }) {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-clay-light text-clay">
      <Icon aria-hidden className="size-4" strokeWidth={2.2} />
    </span>
  )
}

function DailyItinerary({ days }: { days: DailyItineraryItem[] }) {
  return (
    <section>
      <Eyebrow>Day by day</Eyebrow>
      <h2 className={blockTitle}>Your Adventure Itinerary</h2>
      <ol>
        {days.map((day, index) => {
          const isLast = index === days.length - 1
          return (
            <li key={day.day} className="flex gap-4 md:gap-7">
              <div className="flex w-14 shrink-0 flex-col items-center md:w-[72px]">
                <div className="flex size-14 flex-col items-center justify-center rounded-full bg-clay text-white md:size-[72px]">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] md:text-xs">Day</span>
                  <span className="font-serif text-[22px] leading-none md:text-[26px]">{day.day}</span>
                </div>
                {!isLast && <div aria-hidden className="my-2.5 w-px flex-1 bg-clay/35" />}
              </div>
              <article className={cn("min-w-0 flex-1 rounded-lg border border-ink/10 bg-paper p-5 md:p-8", !isLast && "mb-6 md:mb-7")}>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h3 className="font-serif text-2xl leading-[1.15] md:text-[30px]">{day.title}</h3>
                  {day.duration && (
                    <span className="flex h-[34px] w-fit shrink-0 items-center gap-2 rounded-full bg-sand-light px-3.5 text-[13px] font-semibold">
                      <Clock aria-hidden className="size-[15px]" />
                      {day.duration}
                    </span>
                  )}
                </div>
                <p className="text-[15px] leading-[1.7] text-stone-dark md:text-base">{day.description}</p>
                {day.highlights.length > 0 && (
                  <div className="mt-6 border-t border-ink/10 pt-5 md:pt-[22px]">
                    <h4 className="mb-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone">Day Highlights</h4>
                    <ul className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex min-h-[34px] items-center gap-2 rounded-full border border-ink/14 bg-white px-3.5 py-1.5 text-sm leading-snug"
                        >
                          <Check aria-hidden className="size-3.5 shrink-0 text-clay" strokeWidth={2.2} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

const hourlyTitles: Record<NonNullable<Offer["activity"]>, string> = {
  trek: "Your Day in the High Atlas",
  biking: "Your Biking Adventure",
  riding: "Your Day on Horseback",
}

function HourlyItinerary({ items, activity = "trek" }: { items: ItineraryItem[]; activity?: Offer["activity"] }) {
  return (
    <section>
      <Eyebrow>Hour by hour</Eyebrow>
      <h2 className={blockTitle}>{hourlyTitles[activity]}</h2>
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const isMeal = /lunch/i.test(item.title)
          const isRide = activity === "biking" && /bik|cycl/i.test(item.title)

          return (
            <li key={item.time} className="flex gap-4 md:gap-6">
              {/* Rail: a dot level with the time pill, and a line down to the next step. */}
              <div aria-hidden className="flex w-3.5 shrink-0 flex-col items-center pt-[11px] md:pt-[13px]">
                <span className="size-3.5 rounded-full border-[3px] border-clay-light bg-clay" />
                {!isLast && <span className="mt-2 w-px flex-1 bg-clay/35" />}
              </div>
              <div className={cn("min-w-0 flex-1", !isLast && "pb-8 md:pb-10")}>
                <span className="mb-3 inline-flex h-9 items-center rounded-full bg-clay px-3.5 font-serif text-base text-white md:h-10 md:text-lg">
                  {item.time}
                </span>
                <h3 className="mb-2 font-serif text-[22px] leading-[1.2] md:text-[26px]">{item.title}</h3>
                {isMeal && (
                  <Tag icon={UtensilsCrossed}>A highlight of your journey</Tag>
                )}
                {isRide && <Tag icon={Bike}>Adrenaline &amp; adventure</Tag>}
                <p className="text-[15px] leading-[1.7] text-stone-dark md:text-base">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

function Tag({ children, icon: Icon }: { children: React.ReactNode; icon: typeof Mountain }) {
  return (
    <span className="mb-3 flex h-8 w-fit items-center gap-2 rounded-full bg-clay-light px-3 text-[13px] font-semibold text-clay-dark">
      <Icon aria-hidden className="size-4" />
      {children}
    </span>
  )
}
