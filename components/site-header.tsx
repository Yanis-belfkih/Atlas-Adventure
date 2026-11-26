"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, MessageCircle, X } from "lucide-react"
import { BrandLogo } from "@/components/brand"
import { pillButton } from "@/components/pill-button"
import { generalInquiryMessage, whatsappUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/#offers", label: "Treks" },
  { href: "/#about", label: "Your guide" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
] as const

type NavLabel = (typeof navLinks)[number]["label"]

type SiteHeaderProps = {
  /** "overlay" sits transparent on top of a hero photo and turns solid once the page scrolls. */
  variant?: "overlay" | "solid"
  active?: NavLabel
}

export function SiteHeader({ variant = "solid", active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (variant !== "overlay") return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [variant])

  const transparent = variant === "overlay" && !scrolled && !menuOpen

  return (
    <header
      className={cn(
        "inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        variant === "overlay" ? "fixed" : "sticky",
        transparent ? "border-white/15 text-white" : "border-ink/10 bg-snow/95 text-ink backdrop-blur-md",
      )}
    >
      <div className="shell flex h-[72px] items-center justify-between lg:h-24">
        <Link href="/" aria-label="Atlas Adventures – home" className="rounded-full">
          <BrandLogo tone={transparent ? "outline" : "night"} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-11 text-[15px] font-medium lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors",
                transparent ? "hover:text-peach" : "hover:text-clay",
                link.label === active && "text-clay",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={whatsappUrl(generalInquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(pillButton({ tone: transparent ? "light" : "juniper", size: "sm" }), "hidden lg:inline-flex")}
        >
          <MessageCircle aria-hidden />
          Book on WhatsApp
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className={cn(
            "flex size-11 items-center justify-center rounded-full transition-colors lg:hidden",
            transparent ? "bg-white/15 hover:bg-white/25" : "bg-ink/5 hover:bg-ink/10",
          )}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "grid transition-[grid-template-rows] duration-300 lg:hidden",
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav aria-label="Mobile" className="overflow-hidden" inert={!menuOpen}>
          <div className="shell flex flex-col pb-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "border-b border-ink/10 py-4 font-serif text-2xl",
                  link.label === active && "text-clay",
                )}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl(generalInquiryMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(pillButton({ tone: "juniper" }), "mt-6")}
            >
              <MessageCircle aria-hidden />
              Book on WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
