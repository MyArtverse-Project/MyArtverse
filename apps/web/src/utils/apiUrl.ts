function normalizeApiUrl(url: string | undefined) {
  const trimmed = url?.trim()
  if (!trimmed) return null
  return trimmed.replace(/\/$/, "")
}

/** Runtime server URL — prefer API_URL (not inlined at build). */
export function getServerApiUrl(): string {
  const url = normalizeApiUrl(
    process.env.API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      process.env.NEXT_PUBLIC_BACKEND_URL
  )

  if (!url) {
    throw new Error(
      "API URL is not configured. Set API_URL or NEXT_PUBLIC_API_URL in Vercel."
    )
  }

  return url
}

/** Client-safe URL (NEXT_PUBLIC_* only, inlined at build). */
export function getPublicApiUrl(): string {
  const url = normalizeApiUrl(
    process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL
  )

  if (!url) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured")
  }

  return url
}
