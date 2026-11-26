import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Eyebrow } from "@/components/typography"

/** Header used on secondary pages (legal pages): site navigation plus a page title. */
export function PageHeader({ title, eyebrow = "Atlas Adventures" }: { title: string; eyebrow?: string }) {
  return (
    <>
      <SiteHeader />
      <div className="shell pb-10 pt-7 lg:pb-14">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-clay">
          <ArrowLeft aria-hidden className="size-[18px]" />
          Back to Home
        </Link>
        <Eyebrow className="mt-10">{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-serif text-[40px] leading-[1.05] tracking-[-0.02em] md:text-[56px]">{title}</h1>
      </div>
    </>
  )
}
