import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Clock, User, Users } from "lucide-react"
import { DifficultyMeter } from "@/components/difficulty-meter"
import type { Offer } from "@/lib/data"
import { getStartingPrice } from "@/lib/pricing"
import { formatPrice } from "@/lib/site"
import { cn } from "@/lib/utils"

/** Trek card. The whole card links to the booking page. */
export function OfferCard({
  offer,
  className,
  mediaClassName,
}: {
  offer: Offer
  className?: string
  mediaClassName?: string
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-ink/8 bg-paper transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgba(18,21,25,0.35)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-clay",
        className,
      )}
    >
      <div className={cn("relative h-[280px] overflow-hidden md:h-[340px] lg:h-[400px]", mediaClassName)}>
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          sizes="(max-width: 768px) 300px, (max-width: 1024px) 50vw, 420px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={offer.imagePosition ? { objectPosition: offer.imagePosition } : undefined}
        />
        <span className="absolute left-3.5 top-3.5 flex h-[30px] items-center gap-2 rounded-full bg-paper px-3 text-xs font-semibold md:left-[18px] md:top-[18px] md:h-[34px] md:gap-2.5 md:px-3.5 md:text-[13px]">
          <DifficultyMeter difficulty={offer.difficulty} />
          {offer.difficulty}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 lg:px-7 lg:pb-[26px] lg:pt-7">
        <h3 className="mb-2 font-serif text-[23px] font-normal leading-[1.15] tracking-[-0.01em] lg:mb-3 lg:text-[28px] lg:leading-[1.14]">
          <Link href={`/book/${offer.id}`} className="outline-none after:absolute after:inset-0">
            {offer.name}
          </Link>
        </h3>
        <p className="mb-4 flex-1 text-sm leading-[1.55] text-stone lg:mb-6 lg:text-[15.5px] lg:leading-[1.6]">
          {offer.teaser}
        </p>

        <dl className="flex flex-wrap gap-x-[22px] gap-y-1.5 border-y border-ink/12 py-3 text-[13px] text-stone-dark lg:py-[15px] lg:text-sm">
          <Fact icon={Clock} label="Duration" value={offer.duration} />
          <Fact icon={Users} label="Group size" value={`Max ${offer.maxGroupSize}`} />
          {offer.minAge !== undefined && <Fact icon={User} label="Minimum age" value={`Age ${offer.minAge}+`} />}
        </dl>

        <div className="flex items-center justify-between pt-4 lg:pt-5">
          <p className="flex items-baseline gap-1.5">
            <span className="text-xs text-stone lg:text-[13px]">From</span>
            <span className="font-serif text-[26px] leading-none lg:text-[32px]">{formatPrice(getStartingPrice(offer))}</span>
            <span className="text-[13px] text-stone lg:text-sm">/ person</span>
          </p>
          <span
            aria-hidden
            className="flex size-[46px] items-center justify-center rounded-full bg-clay text-white transition-colors group-hover:bg-clay-dark lg:size-[52px]"
          >
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}

function Fact({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 lg:gap-2">
      <Icon aria-hidden className="size-4 text-stone" strokeWidth={1.75} />
      <dt className="sr-only">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
