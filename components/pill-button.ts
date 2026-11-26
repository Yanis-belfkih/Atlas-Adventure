import { cva, type VariantProps } from "class-variance-authority"

/** Rounded call-to-action used across the site (links and buttons). */
export const pillButton = cva(
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 active:opacity-90 [&_svg]:size-[18px] [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        clay: "bg-clay text-white hover:bg-clay-dark focus-visible:outline-clay",
        juniper: "bg-juniper text-white hover:bg-juniper-dark focus-visible:outline-juniper",
        light: "bg-white text-ink hover:bg-snow focus-visible:outline-white",
        ghost: "border border-white/55 text-white hover:border-white hover:bg-white/10 focus-visible:outline-white",
        outline: "border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03] focus-visible:outline-ink",
      },
      size: {
        sm: "h-11 px-5 text-[15px]",
        md: "h-[52px] px-6 text-[15px] md:h-[54px] md:px-7 md:text-base",
        lg: "h-[58px] px-7 text-[17px]",
      },
    },
    defaultVariants: { tone: "clay", size: "md" },
  },
)

export type PillButtonProps = VariantProps<typeof pillButton>
