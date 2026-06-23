import { config } from "@/utils/constants"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    return new URL(explicit.endsWith("/") ? explicit : `${explicit}/`)
  }

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    return new URL(`https://${vercel}/`)
  }

  return new URL("http://localhost:3000/")
}

export function toAbsoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }

  return new URL(pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`, getSiteUrl()).toString()
}

type BuildPageMetadataOptions = {
  title: string
  description?: string
  path?: string
  image?: string | null
  imageAlt?: string
  type?: "website" | "article"
  authors?: { name: string; url?: string }[]
}

export function buildPageMetadata({
  title,
  description = config.description,
  path,
  image,
  imageAlt,
  type = "website",
  authors,
}: BuildPageMetadataOptions): Metadata {
  const url = path ? toAbsoluteUrl(path) : undefined
  const imageUrl = image ? toAbsoluteUrl(image) : null

  return {
    title,
    description,
    authors,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: BRAND,
      type,
      locale: "en_US",
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: imageAlt ?? title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  }
}

export function truncateDescription(value: string, maxLength = 200) {
  const trimmed = value.trim()
  if (trimmed.length <= maxLength) return trimmed
  return `${trimmed.slice(0, maxLength - 1).trimEnd()}…`
}

export function possessiveName(name: string) {
  return name.endsWith("s") ? `${name}'` : `${name}'s`
}
