import { cn } from "@/lib/utils"

/** Serif section title. Wrap the accent word in <em>. */
export const sectionTitle =
  "accent font-serif text-[38px] font-normal leading-[1.06] tracking-[-0.02em] md:text-5xl lg:text-[64px] lg:leading-[1.04]"

/** Small uppercase label with a rule, shown above titles. */
export function Eyebrow({
  children,
  tone = "clay",
  className,
}: {
  children: React.ReactNode
  tone?: "clay" | "light"
  className?: string
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] md:gap-3 md:text-xs",
        tone === "light" ? "text-peach" : "text-clay",
        className,
      )}
    >
      <span aria-hidden className="h-px w-[22px] shrink-0 bg-current md:w-7" />
      {children}
    </p>
  )
}
