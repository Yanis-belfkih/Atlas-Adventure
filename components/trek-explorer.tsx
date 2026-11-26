"use client"

import { useState } from "react"
import { OfferCard } from "@/components/offer-card"
import type { Offer, OfferGroup } from "@/lib/data"
import { cn } from "@/lib/utils"

type GroupWithOffers = OfferGroup & { offers: Offer[] }

/** Treks grouped by intention, with filter chips. */
export function TrekExplorer({ groups }: { groups: GroupWithOffers[] }) {
  const [filter, setFilter] = useState<OfferGroup["id"] | "all">("all")
  const total = groups.reduce((sum, group) => sum + group.offers.length, 0)
  const chips = [
    { id: "all" as const, label: "All adventures", count: total },
    ...groups.map((group) => ({ id: group.id, label: group.title, count: group.offers.length })),
  ]
  const visibleGroups = filter === "all" ? groups : groups.filter((group) => group.id === filter)

  return (
    <>
      <div
        role="group"
        aria-label="Filter treks"
        className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mb-[68px] md:flex-wrap md:gap-2.5 md:px-0"
      >
        {chips.map((chip) => {
          const active = chip.id === filter
          return (
            <button
              key={chip.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(chip.id)}
              className={cn(
                "flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors md:h-[46px] md:gap-2.5 md:px-[22px] md:text-[15px]",
                active ? "border-night bg-night text-white" : "border-ink/18 hover:border-ink/40",
              )}
            >
              {chip.label}
              <span className="text-[11px] font-semibold opacity-55 md:text-xs">{chip.count}</span>
            </button>
          )
        })}
      </div>

      {visibleGroups.map((group) => (
        <section
          key={group.id}
          aria-labelledby={`group-${group.id}`}
          className="mb-12 animate-in fade-in duration-500 last:mb-0 lg:mb-24"
        >
          <header className="flex flex-col gap-1 pb-4 pt-7 md:flex-row md:items-baseline md:gap-5 md:border-b md:border-ink/14 md:pb-[22px] md:pt-0 lg:mb-8 md:mb-6">
            <div className="flex items-baseline gap-3 md:gap-5">
              <span className="font-serif text-sm text-clay md:text-base">
                {String(groups.indexOf(group) + 1).padStart(2, "0")}
              </span>
              <h3 id={`group-${group.id}`} className="font-serif text-[26px] leading-[1.1] md:text-[34px]">
                {group.title}
              </h3>
            </div>
            <p className="text-sm text-stone md:ml-auto md:text-base">{group.subtitle}</p>
          </header>

          <div
            className={cn(
              "-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8",
              group.offers.length > 2 && "lg:grid-cols-3",
            )}
          >
            {group.offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                className="w-[300px] shrink-0 snap-start md:w-auto"
                mediaClassName={group.offers.length === 2 ? "lg:h-[380px]" : undefined}
              />
            ))}
          </div>
        </section>
      ))}
    </>
  )
}
