import type { Difficulty } from "@/lib/data"
import { cn } from "@/lib/utils"

const levels: Record<Difficulty, number> = {
  Easy: 1,
  "Easy to Moderate": 2,
  Moderate: 3,
  "Moderate to Difficult": 4,
  Advanced: 5,
  High: 5,
}

/** 5-bar difficulty gauge. Decorative: always show the difficulty label next to it. */
export function DifficultyMeter({ difficulty, className }: { difficulty: Difficulty; className?: string }) {
  const level = levels[difficulty]

  return (
    <span aria-hidden className={cn("flex gap-[3px]", className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={cn("block h-1 w-2 rounded-sm md:w-2.5", i < level ? "bg-clay" : "bg-ink/15")} />
      ))}
    </span>
  )
}
