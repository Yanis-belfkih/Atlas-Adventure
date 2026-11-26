import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { BrandMark } from "@/components/brand"
import { pillButton } from "@/components/pill-button"

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <span className="mb-8 flex size-16 items-center justify-center rounded-full bg-night text-white">
        <BrandMark className="size-8" />
      </span>
      <h1 className="mb-3 font-serif text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">Page Not Found</h1>
      <p className="mb-8 max-w-md text-stone">The page or trek you are looking for doesn&apos;t exist.</p>
      <Link href="/" className={pillButton({ tone: "clay" })}>
        <ArrowLeft aria-hidden />
        Return Home
      </Link>
    </main>
  )
}
