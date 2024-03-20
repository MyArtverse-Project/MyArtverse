import Link from "next/link"
import type { ReactElement } from "react"
import type { IconType } from "react-icons"
import type { UrlObject } from "url"

export default function MenuItem({
  prefixIcon,
  suffixIcon,
  name,
  href
}: {
  prefixIcon: ReactElement<IconType> | ReactElement
  suffixIcon?: ReactElement<IconType> | ReactElement
  name: string
  href: string
}) {
  return (
    <Link
      className="hover:bg-color-2 flex select-none items-center justify-between rounded-md px-4 py-2.5 font-medium transition-colors"
      href={href as unknown as UrlObject}
    >
      <span className="flex items-center gap-x-3 text-sm">
        {prefixIcon}
        {name}
      </span>
      {suffixIcon}
    </Link>
  )
}
