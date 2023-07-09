import type { Metadata } from "next"

interface PageMetaProps {
  title: string
  description: string
  img?: string
  isProfile?: boolean
}

export default function setPageMeta({
  title,
  description,
  img,
  isProfile
}: PageMetaProps): Metadata {
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: isProfile ? "profile" : "website"
    },
    twitter: {
      title: title,
      description: description,
      card: isProfile ? "summary" : "summary_large_image"
    }
  }
}
