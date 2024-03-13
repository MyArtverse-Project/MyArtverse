import type { Metadata } from "next"
import { NotFoundWrapper } from "@/components/misc"

export const metadata: Metadata = {
  title: "404'd",
  robots: {
    index: false
  }
}

export default function GlobalNotFoundCatchAll() {
  return <NotFoundWrapper />
}
