"use client"

import { ErrorWrapper } from "@/components/misc"

export default function GlobalErrorPage(pwops: { error: Error; reset: () => void }) {
  return <ErrorWrapper {...pwops} />
}
