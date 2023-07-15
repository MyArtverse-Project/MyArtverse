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
    keywords: ["fur", "furries", "furry", "fursona", "mascot", "furry fandom"],
    openGraph: {
      title: title,
      description: description,
      type: isProfile ? "profile" : "website",
      siteName: "MyFursona"
    },
    twitter: {
      card: isProfile ? "summary" : "summary_large_image"
    },
    robots: "noai, noimageai"
  }
}
