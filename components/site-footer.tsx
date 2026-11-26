import Link from "next/link"
import { ExternalLink, Facebook, Instagram } from "lucide-react"
import { BrandLogo } from "@/components/brand"
import { getOfferById, offerGroups } from "@/lib/data"
import { siteConfig } from "@/lib/site"

const quickLinks = [
  { href: "/#offers", label: "Our Offers" },
  { href: "/#about", label: "About" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
]

const legalLinks = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/legal", label: "Legal Notice" },
]

const socialLinks = [
  { href: siteConfig.links.instagram, label: "Instagram", icon: Instagram },
  { href: siteConfig.links.facebook, label: "Facebook", icon: Facebook },
  { href: siteConfig.links.tripadvisor, label: "TripAdvisor", icon: ExternalLink },
]

export function SiteFooter() {
  const adventures = offerGroups
    .flatMap((group) => group.offerIds)
    .map((id) => getOfferById(String(id)))
    .filter((offer) => offer !== undefined)
    .map((offer) => ({ href: `/book/${offer.id}`, label: offer.name }))

  return (
    <footer className="overflow-hidden bg-night pb-10 pt-16 text-white lg:pt-[100px]">
      <div className="shell">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[300px_1fr_1.5fr_1fr_1fr] lg:gap-14">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <BrandLogo tone="clay" />
            <p className="mt-5 max-w-xs text-[15px] text-white/60 lg:mt-[22px]">
              Your gateway to Morocco&apos;s most spectacular mountain adventures.
            </p>
            <ul className="mt-[18px] flex gap-2.5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-11 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-peach hover:text-peach"
                  >
                    <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Adventures" links={adventures} className="col-span-2 md:col-span-1 md:row-span-2 lg:row-span-1" />
          <FooterLinks title="Legal" links={legalLinks} />

          <div>
            <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 lg:mb-[22px]">Follow Us</h2>
            <p className="mb-3 text-[15px] text-white/85">Stay updated with our latest adventures</p>
            <ul className="space-y-3 text-[15px] text-white/85">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-peach">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative wordmark, drawn as generated content so contrast checkers don't treat it as text. */}
        <div
          aria-hidden
          data-wordmark={siteConfig.name}
          className="mb-7 mt-14 whitespace-nowrap font-serif text-[clamp(52px,11.6vw,168px)] font-light leading-none tracking-[-0.04em] text-white/[0.07] before:content-[attr(data-wordmark)] lg:mb-9 lg:mt-20"
        />

        <div className="flex flex-col gap-2 border-t border-white/12 pt-7 text-sm text-white/50 md:flex-row md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p>Marrakech · Imlil · Morocco</p>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({
  title,
  links,
  className,
}: {
  title: string
  links: { href: string; label: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/50 lg:mb-[22px]">{title}</h2>
      <ul className="space-y-3 text-[15px] text-white/85">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-peach">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
