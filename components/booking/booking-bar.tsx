"use client"

import { useEffect, useState } from "react"
import { ArrowDown } from "lucide-react"
import { pillButton } from "@/components/pill-button"
import { cn } from "@/lib/utils"

/** Bottom bar that keeps the price and a shortcut to the booking form in reach while the form is off-screen. */
export function BookingBar({ name, price }: { name: string; price: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById("book")
    if (!form) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0.15 })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-paper/95 backdrop-blur-md transition-transform duration-300",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="shell flex h-[76px] items-center justify-between gap-4">
        <p className="hidden truncate font-serif text-xl lg:block">{name}</p>
        <div className="flex flex-1 items-center justify-between gap-6 lg:flex-none">
          <p className="flex items-baseline gap-1.5">
            <span className="text-xs text-stone">From</span>
            <span className="font-serif text-[28px] leading-none">{price}</span>
            <span className="text-[13px] text-stone">/ person</span>
          </p>
          <a href="#book" className={pillButton({ tone: "clay", size: "sm" })}>
            Book this trek
            <ArrowDown aria-hidden />
          </a>
        </div>
      </div>
    </div>
  )
}
