import Link from "next/link"

import { ExternalLinkIcon } from "lucide-react"
import type { UrlObject } from "url"

export default function BuiLink({
  children,
  href,
  ...others
}: {
  children?: React.ReactNode
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const hasHTTPInUrl = href.startsWith("http")

  return (
    <Link
      className="underline text-blue-400 hover:text-blue-500 inline-flex items-center"
      href={href as unknown as UrlObject}
      target={!hasHTTPInUrl ? "_blank" : undefined}
      {...others}
    >
      {children}
      {!hasHTTPInUrl ? <ExternalLinkIcon size={21} /> : null}
    </Link>
  )
}
