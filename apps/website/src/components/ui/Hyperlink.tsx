import Link from "next/link"
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu"
import type { UrlObject } from "url"
import type { ReactMapElement } from "@/types/utils"

export default function Hyperlink({
  children,
  href,
  ...others
}: {
  children?: React.ReactNode
} & ReactMapElement<"a">) {
  const hasHttpUrl = href.startsWith("http")

  return (
    <Link
      className="inline-flex w-fit  flex-wrap items-center text-blue-400 hover:text-blue-500 hover:underline"
      href={href as unknown as UrlObject}
      target={hasHttpUrl ? "_blank" : undefined}
      {...others}
    >
      {children}
      {hasHttpUrl ? <ExternalLinkIcon size={16} className="ml-1" /> : null}
    </Link>
  )
}
