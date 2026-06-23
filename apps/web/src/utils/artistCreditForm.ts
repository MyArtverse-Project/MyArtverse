import type { ArtistPlatform } from "@mav/shared"
import type { Artwork, ReferenceSheet } from "@/types/characters"

export type ArtistCreditMode = "none" | "self" | "other"

export type MavArtistOption = {
  id: string
  handle: string
  displayName?: string | null
  avatarUrl?: string | null
}

export type ArtistCreditFormValue = {
  mode: ArtistCreditMode
  platform?: ArtistPlatform
  handle?: string
  url?: string
  mavUser?: MavArtistOption
  avatarUrl?: string | null
}

export type ArtistCreditApiPayload = {
  platform: ArtistPlatform
  handle?: string
  url?: string
  mavUserId?: string
  avatarUrl?: string | null
}

export function toArtistCreditRequest(value: ArtistCreditFormValue): {
  userAsArtist: boolean
  artistCredit: ArtistCreditApiPayload | null
} {
  if (value.mode === "self") {
    return { userAsArtist: true, artistCredit: null }
  }

  if (value.mode === "none") {
    return { userAsArtist: false, artistCredit: null }
  }

  const platform = value.platform ?? "mav"

  if (platform === "url") {
    const url = value.url?.trim()
    return {
      userAsArtist: false,
      artistCredit: url ? { platform: "url", url } : null,
    }
  }

  if (platform === "mav") {
    const handle = value.mavUser?.handle ?? value.handle?.trim()
    if (!handle && !value.mavUser?.id) {
      return { userAsArtist: false, artistCredit: null }
    }

    return {
      userAsArtist: false,
      artistCredit: {
        platform: "mav",
        handle,
        mavUserId: value.mavUser?.id,
      },
    }
  }

  const handle = value.handle?.trim()
  return {
    userAsArtist: false,
    artistCredit: handle
      ? { platform, handle, avatarUrl: value.avatarUrl ?? null }
      : null,
  }
}

export function fromArtworkArtist(
  artwork: Artwork,
  selfUserId?: string
): ArtistCreditFormValue {
  if (artwork.artist?.id && selfUserId && artwork.artist.id === selfUserId) {
    return { mode: "self" }
  }

  if (artwork.artist?.handle) {
    return {
      mode: "other",
      platform: "mav",
      handle: artwork.artist.handle,
      mavUser: {
        id: artwork.artist.id,
        handle: artwork.artist.handle,
        displayName: artwork.artist.displayName,
        avatarUrl: artwork.artist.avatarUrl,
      },
    }
  }

  if (artwork.artistPlatform === "url" && artwork.artistUrl) {
    return {
      mode: "other",
      platform: "url",
      url: artwork.artistUrl,
    }
  }

  if (
    artwork.artistPlatform &&
    artwork.artistPlatform !== "url" &&
    artwork.artistExternalHandle
  ) {
    return {
      mode: "other",
      platform: artwork.artistPlatform as ArtistPlatform,
      handle: artwork.artistExternalHandle,
      avatarUrl: artwork.artistExternalAvatarUrl ?? null,
    }
  }

  return { mode: "none" }
}

type RefSheetVariantWithLegacyArtist = ReferenceSheet["variants"][number] & {
  artistExternal?: string
}

export function fromRefSheetArtist(
  refSheet: ReferenceSheet,
  selfUserId?: string
): ArtistCreditFormValue {
  if (
    refSheet.artistUser?.id &&
    selfUserId &&
    refSheet.artistUser.id === selfUserId
  ) {
    return { mode: "self" }
  }

  if (refSheet.artistUser?.handle) {
    return {
      mode: "other",
      platform: "mav",
      handle: refSheet.artistUser.handle,
      mavUser: {
        id: refSheet.artistUser.id,
        handle: refSheet.artistUser.handle,
        displayName: refSheet.artistUser.displayName,
        avatarUrl: refSheet.artistUser.avatarUrl,
      },
    }
  }

  if (refSheet.artistPlatform === "url" && refSheet.artistUrl) {
    return {
      mode: "other",
      platform: "url",
      url: refSheet.artistUrl,
    }
  }

  if (
    refSheet.artistPlatform &&
    refSheet.artistPlatform !== "url" &&
    refSheet.artistExternalHandle
  ) {
    return {
      mode: "other",
      platform: refSheet.artistPlatform as ArtistPlatform,
      handle: refSheet.artistExternalHandle,
      avatarUrl: refSheet.artistExternalAvatarUrl ?? null,
    }
  }

  const legacyArtist =
    refSheet.artistExternal?.trim() || refSheet.artist?.trim() || ""
  if (legacyArtist) {
    if (legacyArtist.startsWith("@")) {
      return {
        mode: "other",
        platform: "mav",
        handle: legacyArtist.slice(1),
      }
    }
    if (legacyArtist.startsWith("http://") || legacyArtist.startsWith("https://")) {
      return {
        mode: "other",
        platform: "url",
        url: legacyArtist,
      }
    }
    return {
      mode: "other",
      platform: "mav",
      handle: legacyArtist,
    }
  }

  const mainVariant =
    refSheet.variants.find((variant) => variant.main) ?? refSheet.variants[0]
  const variantArtist = (mainVariant as RefSheetVariantWithLegacyArtist | undefined)
    ?.artistExternal?.trim()
  if (variantArtist) {
    if (variantArtist.startsWith("@")) {
      return {
        mode: "other",
        platform: "mav",
        handle: variantArtist.slice(1),
      }
    }
    if (
      variantArtist.startsWith("http://") ||
      variantArtist.startsWith("https://")
    ) {
      return {
        mode: "other",
        platform: "url",
        url: variantArtist,
      }
    }
    return {
      mode: "other",
      platform: "mav",
      handle: variantArtist,
    }
  }

  return { mode: "none" }
}

export function isArtistCreditComplete(value: ArtistCreditFormValue) {
  if (value.mode !== "other") return true

  const platform = value.platform ?? "mav"
  if (platform === "url") return !!value.url?.trim()
  if (platform === "mav") {
    return !!(value.mavUser?.handle || value.handle?.trim())
  }

  return !!value.handle?.trim()
}
