"use client"

import { useRef, useState, type FormEvent } from "react"
import { addDays, format } from "date-fns"
import { CalendarIcon, ChevronDown, MessageCircle, Users } from "lucide-react"
import { pillButton } from "@/components/pill-button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Offer } from "@/lib/data"
import { getPricePerPerson, getStartingPrice, getTierLabel, sortedTiers } from "@/lib/pricing"
import { formatPrice, siteConfig, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const fitnessLevels = ["Beginner", "Intermediate", "Advanced"]

const fieldClass =
  "h-[52px] data-[size=default]:h-[52px] w-full rounded-lg border-ink/18 bg-white px-4 text-[15px] shadow-none hover:border-ink/35"
const labelClass = "mb-2.5 text-[13px] font-semibold"

/** Booking card: group pricing, trip details and a pre-filled WhatsApp message. */
export function BookingForm({ offer }: { offer: Offer }) {
  const [date, setDate] = useState<Date>()
  const [dateOpen, setDateOpen] = useState(false)
  const [dateError, setDateError] = useState(false)
  const dateButtonRef = useRef<HTMLButtonElement>(null)
  const [participants, setParticipants] = useState(1)
  const [fitnessLevel, setFitnessLevel] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [specialRequests, setSpecialRequests] = useState("")

  const tiers = sortedTiers(offer)
  const pricePerPerson = getPricePerPerson(offer, participants)
  const totalPrice = pricePerPerson === null ? null : pricePerPerson * participants
  const isSolo = tiers.length > 0 && participants < tiers[0].people
  const hasSoloSupplement = isSolo && !offer.soloOnRequest
  const activeTier = tiers.filter((tier) => tier.people <= participants).at(-1)
  const showPrice = (amount: number | null) => (amount === null ? "On request" : formatPrice(amount))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!date) {
      setDateError(true)
      dateButtonRef.current?.focus()
      return
    }

    const lines = [
      `Hello ${siteConfig.name}! I want to book the ${offer.name}.`,
      "",
      `Date: ${format(date, "MMMM d, yyyy")}`,
      `Participants: ${participants}`,
      `Price per person: ${showPrice(pricePerPerson)}`,
      `Total price: ${showPrice(totalPrice)}`,
      ...(hasSoloSupplement
        ? [`Note: includes the solo traveler supplement (${formatPrice(siteConfig.pricing.soloSupplement)}).`]
        : []),
      `Fitness level: ${fitnessLevel || "Not specified"}`,
      `Dietary requirements: ${dietaryRestrictions.trim() || "None"}`,
      `Special requests: ${specialRequests.trim() || "None"}`,
      "",
      "Please let me know the availability.",
    ]

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer")
  }

  return (
    <form
      id="book"
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="book-title"
      className="scroll-mt-28 rounded-xl border border-ink/12 bg-paper p-6 shadow-[0_24px_48px_-24px_rgba(18,21,25,0.25)] md:p-8"
    >
      <h2 id="book-title" className="sr-only">
        Book This Adventure
      </h2>

      <p className="flex items-baseline gap-2 border-b border-ink/10 pb-6">
        <span className="text-sm text-stone">From</span>
        <span className="font-serif text-[44px] leading-none md:text-5xl">{formatPrice(getStartingPrice(offer))}</span>
        <span className="text-[15px] text-stone">/ person</span>
      </p>

      {tiers.length > 0 && (
        <div className="border-b border-ink/10 py-[22px]">
          <h3 className={labelClass}>Group Pricing</h3>
          <ul>
            {tiers.map((tier, index) => (
              <li
                key={tier.people}
                className={cn(
                  "flex h-11 items-center justify-between rounded-lg px-3.5 text-[15px] transition-colors",
                  tier === activeTier && "bg-clay-light font-semibold text-clay-dark",
                )}
              >
                <span>{getTierLabel(tiers, index)}</span>
                <span className="font-semibold">{formatPrice(tier.pricePerPerson)} / person</span>
              </li>
            ))}
          </ul>
          <p
            className={cn(
              "mt-2.5 rounded-lg px-3.5 text-[13px] text-stone",
              isSolo && "bg-clay-light py-2.5 font-semibold text-clay-dark",
            )}
          >
            {offer.soloOnRequest ? (
              "Solo travelers: price on request"
            ) : (
              <>
                Solo travelers: {formatPrice(tiers[0].pricePerPerson + siteConfig.pricing.soloSupplement)} (includes{" "}
                {formatPrice(siteConfig.pricing.soloSupplement)} supplement)
              </>
            )}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-[18px] pt-[22px]">
        <div>
          <Label id="date-label" className={labelClass}>
            Select Date
          </Label>
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger asChild>
              <button
                ref={dateButtonRef}
                type="button"
                aria-labelledby="date-label"
                aria-invalid={dateError}
                aria-describedby={dateError ? "date-error" : undefined}
                className={cn(
                  "flex items-center justify-between border text-left outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive",
                  fieldClass,
                )}
              >
                <span className={cn("flex items-center gap-2.5 truncate", !date && "text-stone")}>
                  <CalendarIcon aria-hidden className="size-[18px] shrink-0 text-stone" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </span>
                <ChevronDown aria-hidden className="size-[18px] shrink-0 text-stone" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selected) => {
                  setDate(selected)
                  setDateError(false)
                  setDateOpen(false)
                }}
                disabled={{ before: addDays(new Date(), 1) }}
              />
            </PopoverContent>
          </Popover>
          {dateError && (
            <p id="date-error" role="alert" className="mt-2 text-sm text-destructive">
              Please select a date for your trek.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="min-w-0">
            <Label htmlFor="participants" className={labelClass}>
              Participants
            </Label>
            <Select value={String(participants)} onValueChange={(value) => setParticipants(Number(value))}>
              <SelectTrigger id="participants" className={cn(fieldClass, "font-medium *:data-[slot=select-value]:flex-1")}>
                <Users aria-hidden className="size-[18px] text-ink" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: offer.maxGroupSize }, (_, i) => i + 1).map((count) => (
                  <SelectItem key={count} value={String(count)}>
                    {count} {count === 1 ? "person" : "people"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="min-w-0">
            <Label htmlFor="fitness-level" className={labelClass}>
              Fitness Level
            </Label>
            <Select value={fitnessLevel} onValueChange={setFitnessLevel}>
              <SelectTrigger id="fitness-level" className={fieldClass}>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                {fitnessLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="dietary-restrictions" className={labelClass}>
            Dietary Restrictions
          </Label>
          <Textarea
            id="dietary-restrictions"
            value={dietaryRestrictions}
            onChange={(event) => setDietaryRestrictions(event.target.value)}
            placeholder="Allergies..."
            className="min-h-[84px] resize-y rounded-lg border-ink/18 bg-white px-4 py-3.5 text-[15px] shadow-none md:text-[15px]"
          />
        </div>

        <div>
          <Label htmlFor="special-requests" className={labelClass}>
            Special Requests
          </Label>
          <Textarea
            id="special-requests"
            value={specialRequests}
            onChange={(event) => setSpecialRequests(event.target.value)}
            placeholder="Any special requests or notes..."
            className="min-h-[84px] resize-y rounded-lg border-ink/18 bg-white px-4 py-3.5 text-[15px] shadow-none md:text-[15px]"
          />
        </div>

        <div className="mt-1.5 border-t border-ink/10 pb-1 pt-5" aria-live="polite">
          <p className="mb-2 flex justify-between text-[15px] text-stone">
            <span>Price per person</span>
            <span>{showPrice(pricePerPerson)}</span>
          </p>
          <p className="mb-2 flex justify-between text-[15px] text-stone">
            <span>Participants</span>
            <span>× {participants}</span>
          </p>
          {hasSoloSupplement && (
            <p className="mb-2 text-[13px] text-stone">
              Includes {formatPrice(siteConfig.pricing.soloSupplement)} solo traveler supplement
            </p>
          )}
          <p className="flex items-baseline justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="font-serif text-4xl font-normal">{showPrice(totalPrice)}</span>
          </p>
        </div>

        <button type="submit" className={cn(pillButton({ tone: "juniper", size: "lg" }), "w-full [&_svg]:size-5")}>
          <MessageCircle aria-hidden />
          Book via WhatsApp
        </button>
        <p className="text-center text-[13px] leading-normal text-stone">
          Your request opens in WhatsApp, pre-filled.
          <br />
          {siteConfig.guideName} replies with availability.
        </p>
      </div>
    </form>
  )
}
