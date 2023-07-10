import Link from "next/link"
import type { UrlObject } from "url"
import type { ReactElement } from "react"
import type { LucideIcon } from "lucide-react"

interface MenuItem {
  prefix: ReactElement<LucideIcon> | ReactElement
  suffix?: ReactElement<LucideIcon> | ReactElement
  name: string
  href: string
}

export default function MenuItem({ prefix, suffix, name, href }: MenuItem) {
  return (
    <Link
      className="select-none px-4 py-2.5 font-semibold flex items-center justify-between hover:bg-red-200 rounded-md"
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
