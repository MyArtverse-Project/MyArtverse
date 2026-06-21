/** @param {string | undefined} url */
export function getBackendOrigin(
  url = process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_BACKEND_URL
) {
  const raw = url?.trim()
  if (!raw) return null

  try {
    return new URL(raw).origin
  } catch {
    return null
  }
}

/** @returns {string[]} */
export function getImageHostnames() {
  const raw = process.env.NEXT_PUBLIC_IMAGE_HOSTNAME?.trim()
  if (!raw) return []

  return raw
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean)
}

/** @returns {string[]} HTTPS origins for image CDN / bucket hostnames */
export function getImageOrigins() {
  return getImageHostnames().map((hostname) => `https://${hostname}`)
}

/** @returns {import('next/dist/shared/lib/image-config').RemotePattern[]} */
export function buildImageRemotePatterns() {
  const patterns = [
    {
      protocol: "http",
      hostname: "localhost",
      port: "9000",
      pathname: "/**",
    },
    {
      protocol: "http",
      hostname: "localhost",
      port: "4566",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "localhost.localstack.cloud",
      pathname: "/**",
      port: "4566",
    },
  ]

  for (const hostname of getImageHostnames()) {
    patterns.push({
      protocol: "https",
      hostname,
      pathname: "/**",
    })
  }

  const backendOrigin = getBackendOrigin()
  if (backendOrigin) {
    const { hostname, protocol } = new URL(backendOrigin)
    patterns.push({
      protocol: protocol.replace(":", ""),
      hostname,
      pathname: "/**",
    })
  }

  return patterns
}

export function isDevEnvironment() {
  return process.env.NODE_ENV !== "production"
}
