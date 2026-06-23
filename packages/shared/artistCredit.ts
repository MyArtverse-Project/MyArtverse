export const ARTIST_PLATFORMS = ["mav", "bluesky", "x", "telegram", "url"] as const

export type ArtistPlatform = (typeof ARTIST_PLATFORMS)[number]

export const ARTIST_PLATFORM_LABELS: Record<ArtistPlatform, string> = {
  mav: "MyArtverse",
  bluesky: "Bluesky",
  x: "X",
  telegram: "Telegram",
  url: "Website",
}

export const ARTIST_PLATFORM_PLACEHOLDERS: Record<
  Exclude<ArtistPlatform, "url">,
  string
> = {
  mav: "Search or enter @handle",
  bluesky: "handle.bsky.social",
  x: "username",
  telegram: "username",
}

export interface ArtistCreditSource {
  artist?: { handle?: string; avatarUrl?: string } | null
  artistUser?: { handle?: string; avatarUrl?: string } | null
  artistPlatform?: ArtistPlatform | string | null
  artistExternalHandle?: string | null
  artistUrl?: string | null
  artistExternalAvatarUrl?: string | null
}

export interface ResolvedArtistCredit {
  label: string
  href: string
  isInternal: boolean
  platform: ArtistPlatform | null
  avatarUrl?: string | null
}

export function normalizeArtistHandle(value: string) {
  return value.trim().replace(/^@+/, "")
}

export function buildArtistProfileUrl(
  platform: ArtistPlatform,
  handle: string
): string {
  const normalized = normalizeArtistHandle(handle)

  switch (platform) {
    case "mav":
      return `/@${normalized}`
    case "bluesky":
      return `https://bsky.app/profile/${normalized}`
    case "x":
      return `https://x.com/${normalized}`
    case "telegram":
      return `https://t.me/${normalized}`
    case "url":
      return handle
    default:
      return handle
  }
}

export function formatArtistHandleLabel(
  platform: ArtistPlatform,
  handle: string
) {
  const normalized = normalizeArtistHandle(handle)

  if (platform === "mav" || platform === "bluesky" || platform === "x") {
    return `@${normalized}`
  }

  if (platform === "telegram") {
    return normalized.startsWith("@") ? normalized : `@${normalized}`
  }

  return normalized
}

export function inferArtistPlatformFromUrl(url: string): ArtistPlatform {
  try {
    const host = new URL(url).hostname.toLowerCase().replace(/^www\./, "")

    if (host === "bsky.app") return "bluesky"
    if (host === "x.com" || host === "twitter.com") return "x"
    if (host === "t.me" || host === "telegram.me") return "telegram"
  } catch {
    // keep generic website icon
  }

  return "url"
}

export function resolveArtistCredit(
  source: ArtistCreditSource
): ResolvedArtistCredit | null {
  const linkedArtist = source.artist?.handle
    ? source.artist
    : source.artistUser?.handle
      ? source.artistUser
      : null

  if (linkedArtist?.handle) {
    return {
      label: `@${linkedArtist.handle}`,
      href: `/@${linkedArtist.handle}`,
      isInternal: true,
      platform: "mav",
      avatarUrl: linkedArtist.avatarUrl,
    }
  }

  const platform = source.artistPlatform as ArtistPlatform | null | undefined
  const externalHandle = source.artistExternalHandle?.trim()

  if (platform && platform !== "url" && externalHandle) {
    return {
      label: formatArtistHandleLabel(platform, externalHandle),
      href: buildArtistProfileUrl(platform, externalHandle),
      isInternal: platform === "mav",
      platform,
      avatarUrl: source.artistExternalAvatarUrl ?? null,
    }
  }

  const artistUrl = source.artistUrl?.trim()
  if (artistUrl) {
    let label = artistUrl
    try {
      label = new URL(artistUrl).hostname.replace(/^www\./, "")
    } catch {}

    return {
      label,
      href: artistUrl,
      isInternal: false,
      platform:
        platform && platform !== "url"
          ? platform
          : inferArtistPlatformFromUrl(artistUrl),
    }
  }

  return null
}
