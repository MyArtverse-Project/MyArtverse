"use client"

import * as Sentry from "@sentry/nextjs"
import { BRAND } from "@mav/shared"
import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          An unexpected error occurred on {BRAND}. The team has been notified.
        </p>
        <button
          type="button"
          className="bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  )
}
