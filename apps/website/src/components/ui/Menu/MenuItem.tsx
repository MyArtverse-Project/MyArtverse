import Link from "next/link"
import type { UrlObject } from "url"
import type { ReactElement } from "react"
import type { LucideIcon } from "lucide-react"

export default function MenuItem({
  prefix,
  suffix,
  name,
  href
}: {
  prefix: ReactElement<LucideIcon> | ReactElement
  suffix?: ReactElement<LucideIcon> | ReactElement
  name: string
  href: string
}) {
  return (
    <Link
      className="transition-colors select-none px-4 py-2.5 font-medium flex items-center justify-between hover:bg-color-2 rounded-md"
      href={href as unknown as UrlObject}
    >
      <span className="flex items-center text-sm gap-x-3">
        {prefix}
        {name}
      </span>
      {suffix}
    </Link>
  )
}