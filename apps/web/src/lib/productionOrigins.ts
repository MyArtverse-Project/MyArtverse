export function getBackendOrigin(
  url =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.NEXT_PUBLIC_BACKEND_URL
) {
  const raw = url?.trim()
  if (!raw) return null

  try {
    return new URL(raw).origin
  } catch {
    return null
  }
}

export function getImageOrigins() {
  const raw = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME?.trim()
  if (!raw) return []

  return raw
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean)
    .map((hostname) => `https://${hostname}`)
}

export function getSocialAvatarOrigins() {
  return [
    "https://cdn.bsky.app",
    "https://pbs.twimg.com",
    "https://abs.twimg.com",
  ]
}

export function isDevEnvironment() {
  return process.env.NODE_ENV !== "production"
}
