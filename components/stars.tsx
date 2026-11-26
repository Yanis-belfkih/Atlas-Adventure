import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn("flex gap-[3px] text-gold", className)}>
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} aria-hidden className="size-4 fill-current" strokeWidth={0} />
      ))}
    </span>
  )
}
