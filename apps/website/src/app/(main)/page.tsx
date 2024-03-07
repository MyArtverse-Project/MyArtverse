import type { Metadata } from "next"
import LandingHero from "@/components/landing/LandingHero"
import LandingIntegration from "@/components/landing/LandingIntegration"
import { config } from "@/constants"
import { BRAND } from "@myfursona-internal/config"

const title = `${BRAND} — a place where everyfur belongs!`
const description = config.description

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description: description,
  openGraph: {
    title: title,
    siteName: BRAND,
    description: description
  }
}

export default function Home() {
  return (
    <>
      <LandingHero />
      <LandingIntegration />
    </>
  )
}
