import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

/** Line drawing of a peak, used as the logo mark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M2 20 9 7.5l3.6 6L15.5 9 22 20Z" />
      <path d="m7.2 10.7 1.8 1.3 1.6-1.4" />
    </svg>
  )
}

/**
 * Logo: mark in a circle + name.
 * - "outline": circle outline, for transparent headers over photos.
 * - "night" / "clay": filled circle.
 */
export function BrandLogo({ tone = "night", className }: { tone?: "outline" | "night" | "clay"; className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 md:gap-3", className)}>
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full text-white md:size-[42px]",
          tone === "outline" && "border border-white/45",
          tone === "night" && "bg-night",
          tone === "clay" && "bg-clay",
        )}
      >
        <BrandMark className="size-5 md:size-[22px]" />
      </span>
      <span className="font-serif text-[19px] font-semibold tracking-[-0.01em] md:text-[23px]">{siteConfig.name}</span>
    </span>
  )
}
