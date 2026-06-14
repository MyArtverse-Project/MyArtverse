import "./shadcn.css"
import { BRAND } from "@mav/shared"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "UI Playground",
  description: `The canonical shadcn/ui source of truth for the ${BRAND} internal UI system.`,
  robots: { index: false, follow: false }
}

export default function UIPlaygroundLayout({
  children
}: React.PropsWithChildren) {
  return children
}
