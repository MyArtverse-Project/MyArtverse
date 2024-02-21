import Link from "next/link"
import { LuExternalLink as ExternalLinkIcon } from "react-icons/lu"
import type { UrlObject } from "url"
import type { ReactMapElement } from "@/types/utils"

export default function BuiLink({
  children,
  href,
  ...others
}: {
  children?: React.ReactNode
} & ReactMapElement<"a">) {
  const hasHTTPInUrl = href.startsWith("http")

  return (
    <Link
      className="inline-flex w-fit items-center text-blue-400 underline hover:text-blue-500"
      href={href as unknown as UrlObject}
      target={hasHTTPInUrl ? "_blank" : undefined}
      {...others}
    >
      {children}
      {hasHTTPInUrl ? (
        <ExternalLinkIcon size={16} style={{ marginLeft: "0.25rem" }} />
      ) : null}
    </Link>
  )
}
