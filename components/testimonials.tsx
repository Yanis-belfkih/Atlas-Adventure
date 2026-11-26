"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { pillButton } from "@/components/pill-button"
import { Stars } from "@/components/stars"
import type { Testimonial } from "@/lib/testimonials"
import { cn } from "@/lib/utils"

/**
 * Editorial layout: one featured review, two beside it, three below,
 * and the rest behind a "Show more" button.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [showAll, setShowAll] = useState(false)
  const [featured, ...others] = testimonials
  const beside = others.slice(0, 2)
  const below = others.slice(2, 5)
  const hidden = others.slice(5)

  if (!featured) return null

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <figure className="flex flex-col justify-between rounded-lg bg-night p-7 text-white md:p-10 lg:w-[55%] lg:shrink-0 lg:p-14">
          <div>
            <span aria-hidden className="block h-10 font-serif text-[88px] leading-[0.6] text-clay lg:h-[60px] lg:text-[120px]">
              &ldquo;
            </span>
            <blockquote className="mb-9 mt-5 font-serif text-[23px] font-light italic leading-[1.35] tracking-[-0.01em] md:text-[28px] lg:mb-12 lg:mt-7 lg:text-[34px] lg:leading-[1.32]">
              {featured.text}
            </blockquote>
          </div>
          <figcaption className="flex items-center justify-between gap-4">
            <Person testimonial={featured} featured />
            <Stars rating={featured.rating} className="[&_svg]:size-[18px]" />
          </figcaption>
        </figure>

        <div className="flex flex-1 flex-col gap-4 lg:gap-8">
          {beside.map((testimonial) => (
            <ReviewCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3 lg:mt-8 lg:gap-8">
        {below.map((testimonial) => (
          <ReviewCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>

      {hidden.length > 0 && (
        <>
          <div
            id="more-testimonials"
            hidden={!showAll}
            className="mt-4 grid gap-4 animate-in fade-in duration-500 md:grid-cols-3 lg:mt-8 lg:gap-8"
          >
            {hidden.map((testimonial) => (
              <ReviewCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>

          <div className="mt-10 flex justify-center lg:mt-14">
            <button
              type="button"
              onClick={() => setShowAll((value) => !value)}
              aria-expanded={showAll}
              aria-controls="more-testimonials"
              className={cn(pillButton({ tone: "outline" }), "w-full sm:w-auto")}
            >
              {showAll ? "Show Less Reviews" : "Show More Reviews"}
              {showAll ? <ChevronUp aria-hidden /> : <ChevronDown aria-hidden />}
            </button>
          </div>
        </>
      )}
    </>
  )
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex flex-1 flex-col rounded-lg border border-ink/10 bg-paper p-6 lg:p-8">
      <Stars rating={testimonial.rating} />
      <blockquote className="mb-6 mt-4 flex-1 text-[15px] leading-[1.62] lg:mb-[26px] lg:mt-[18px] lg:text-[16.5px]">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
      <figcaption>
        <Person testimonial={testimonial} />
      </figcaption>
    </figure>
  )
}

function Person({ testimonial, featured }: { testimonial: Testimonial; featured?: boolean }) {
  return (
    <div className="flex items-center gap-3.5">
      <span
        aria-hidden
        className={cn(
          "flex size-[46px] shrink-0 items-center justify-center rounded-full font-serif",
          featured ? "bg-clay text-white" : "bg-sand text-clay-dark",
        )}
      >
        {initials(testimonial.name)}
      </span>
      <div>
        <p className="text-[15px] font-semibold leading-[1.3]">{testimonial.name}</p>
        <p className={cn("text-[13px]", featured ? "text-white/60" : "text-stone")}>{testimonial.location}</p>
      </div>
    </div>
  )
}

function initials(name: string): string {
  const words = name.replace(/^The /, "").replace(/&/g, "").split(/\s+/).filter(Boolean)
  return (words[0][0] + (words.length > 1 ? words[words.length - 1][0] : "")).toUpperCase()
}
