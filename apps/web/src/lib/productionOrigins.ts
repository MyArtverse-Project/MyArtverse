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

export function getAllowedImageHostnames() {
  const hostnames = new Set<string>()

  for (const origin of getImageOrigins()) {
    try {
      hostnames.add(new URL(origin).hostname)
    } catch {
      // ignore invalid origins
    }
  }

  const backendOrigin = getBackendOrigin()
  if (backendOrigin) {
    try {
      hostnames.add(new URL(backendOrigin).hostname)
    } catch {
      // ignore invalid backend origin
    }
  }

  if (isDevEnvironment()) {
    hostnames.add("localhost")
  }

  return hostnames
}

export function isAllowedImageUrl(urlString: string) {
  try {
    const url = new URL(urlString)
    if (url.protocol !== "https:" && url.protocol !== "http:") return false
    return getAllowedImageHostnames().has(url.hostname)
  } catch {
    return false
  }
}
