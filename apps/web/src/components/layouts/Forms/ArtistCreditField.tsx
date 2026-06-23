"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ArtistSearchInput, {
  type ArtistSearchOption,
} from "@/components/layouts/Forms/ArtistSearchInput"
import type { ArtistCreditFormValue } from "@/utils/artistCreditForm"
import { search } from "@/utils/api"
import {
  searchBlueskyArtists,
  searchXArtists,
} from "@/utils/externalArtistSearch"
import {
  ARTIST_PLATFORM_LABELS,
  ARTIST_PLATFORM_PLACEHOLDERS,
  type ArtistPlatform,
} from "@mav/shared"
import { useCallback, useState } from "react"

export default function ArtistCreditField({
  value,
  onChange,
  disabled,
}: {
  value: ArtistCreditFormValue
  onChange: (value: ArtistCreditFormValue) => void
  disabled?: boolean
}) {
  const [mavSearch, setMavSearch] = useState(
    value.mavUser?.handle ?? value.handle ?? ""
  )
  const [blueskySearch, setBlueskySearch] = useState(
    value.platform === "bluesky" ? (value.handle ?? "") : ""
  )
  const [xSearch, setXSearch] = useState(
    value.platform === "x" ? (value.handle ?? "") : ""
  )

  const searchMav = useCallback(async (query: string) => {
    const data = await search(query, "user")
    return (data.user ?? []).map(
      (user): ArtistSearchOption => ({
        id: user.id,
        handle: user.handle,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      })
    )
  }, [])

  const searchBluesky = useCallback(
    async (query: string) => searchBlueskyArtists(query),
    []
  )

  const searchX = useCallback(async (query: string) => searchXArtists(query), [])

  const setMode = (mode: ArtistCreditFormValue["mode"]) => {
    if (mode === "other") {
      onChange({
        mode,
        platform: value.platform ?? "mav",
        handle: value.handle,
        url: value.url,
        mavUser: value.mavUser,
      })
      return
    }

    onChange({ mode })
  }

  const setPlatform = (platform: ArtistPlatform) => {
    onChange({
      mode: "other",
      platform,
      handle:
        platform === "mav"
          ? value.mavUser?.handle ?? value.handle
          : platform === "bluesky"
            ? blueskySearch
            : platform === "x"
              ? xSearch
              : value.handle,
      url: platform === "url" ? value.url : undefined,
      mavUser: platform === "mav" ? value.mavUser : undefined,
    })

    if (platform === "mav") {
      setMavSearch(value.mavUser?.handle ?? value.handle ?? "")
    }
    if (platform === "bluesky") {
      setBlueskySearch(value.platform === "bluesky" ? (value.handle ?? "") : "")
    }
    if (platform === "x") {
      setXSearch(value.platform === "x" ? (value.handle ?? "") : "")
    }
  }

  const platform = value.platform ?? "mav"

  return (
    <div className="space-y-3">
      <Label>Artist credit</Label>
      <Tabs
        value={value.mode}
        onValueChange={(next) => setMode(next as ArtistCreditFormValue["mode"])}
        className="w-full"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-1 sm:grid-cols-3">
          <TabsTrigger value="none" disabled={disabled} className="text-xs sm:text-sm">
            No artist
          </TabsTrigger>
          <TabsTrigger value="self" disabled={disabled} className="text-xs sm:text-sm">
            I am the artist
          </TabsTrigger>
          <TabsTrigger value="other" disabled={disabled} className="text-xs sm:text-sm">
            Another artist
          </TabsTrigger>
        </TabsList>

        <TabsContent value="other" className="mt-3">
          <div className="border-border space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <ToggleGroup
                type="single"
                value={platform}
                onValueChange={(next) => {
                  if (next) setPlatform(next as ArtistPlatform)
                }}
                variant="outline"
                size="sm"
                className="flex flex-wrap justify-start gap-2"
                disabled={disabled}
              >
                {(Object.keys(ARTIST_PLATFORM_LABELS) as ArtistPlatform[]).map(
                  (item) => (
                    <ToggleGroupItem
                      key={item}
                      value={item}
                      aria-label={ARTIST_PLATFORM_LABELS[item]}
                      className="shrink-0 px-3"
                    >
                      {ARTIST_PLATFORM_LABELS[item]}
                    </ToggleGroupItem>
                  )
                )}
              </ToggleGroup>
            </div>

            {platform === "url" ? (
              <div className="space-y-2">
                <Label htmlFor="artist-url">Artist website</Label>
                <Input
                  id="artist-url"
                  placeholder="https://artist-portfolio.com"
                  value={value.url ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...value,
                      mode: "other",
                      platform: "url",
                      url: event.target.value,
                    })
                  }
                  disabled={disabled}
                />
              </div>
            ) : platform === "mav" ? (
              <ArtistSearchInput
                id="artist-mav"
                label="MyArtverse artist"
                placeholder={ARTIST_PLATFORM_PLACEHOLDERS.mav}
                value={mavSearch}
                selectedOption={
                  value.mavUser
                    ? {
                        id: value.mavUser.id,
                        handle: value.mavUser.handle,
                        displayName: value.mavUser.displayName,
                        avatarUrl: value.mavUser.avatarUrl,
                      }
                    : null
                }
                onValueChange={(next) => {
                  setMavSearch(next)
                  onChange({
                    ...value,
                    mode: "other",
                    platform: "mav",
                    handle: next,
                    mavUser: undefined,
                  })
                }}
                onSelect={(option) => {
                  setMavSearch(option.handle)
                  onChange({
                    mode: "other",
                    platform: "mav",
                    handle: option.handle,
                    mavUser: option.id
                      ? {
                          id: option.id,
                          handle: option.handle,
                          displayName: option.displayName,
                          avatarUrl: option.avatarUrl,
                        }
                      : undefined,
                  })
                }}
                search={searchMav}
                disabled={disabled}
              />
            ) : platform === "bluesky" ? (
              <ArtistSearchInput
                id="artist-bluesky"
                label="Bluesky artist"
                placeholder={ARTIST_PLATFORM_PLACEHOLDERS.bluesky}
                value={blueskySearch}
                onValueChange={(next) => {
                  setBlueskySearch(next)
                  onChange({
                    ...value,
                    mode: "other",
                    platform: "bluesky",
                    handle: next,
                    avatarUrl: null,
                  })
                }}
                onSelect={(option) => {
                  setBlueskySearch(option.handle)
                  onChange({
                    mode: "other",
                    platform: "bluesky",
                    handle: option.handle,
                    avatarUrl: option.avatarUrl ?? null,
                  })
                }}
                search={searchBluesky}
                selectedOption={
                  value.platform === "bluesky" && value.handle
                    ? {
                        handle: value.handle,
                        displayName: null,
                        avatarUrl: value.avatarUrl,
                      }
                    : null
                }
                formatHandle={(handle) => handle}
                disabled={disabled}
              />
            ) : platform === "x" ? (
              <ArtistSearchInput
                id="artist-x"
                label="X artist"
                placeholder={ARTIST_PLATFORM_PLACEHOLDERS.x}
                value={xSearch}
                onValueChange={(next) => {
                  setXSearch(next)
                  onChange({
                    ...value,
                    mode: "other",
                    platform: "x",
                    handle: next,
                    avatarUrl: null,
                  })
                }}
                onSelect={(option) => {
                  setXSearch(option.handle)
                  onChange({
                    mode: "other",
                    platform: "x",
                    handle: option.handle,
                    avatarUrl: option.avatarUrl ?? null,
                  })
                }}
                search={searchX}
                selectedOption={
                  value.platform === "x" && value.handle
                    ? {
                        handle: value.handle,
                        displayName: null,
                        avatarUrl: value.avatarUrl,
                      }
                    : null
                }
                disabled={disabled}
              />
            ) : (
              <div className="space-y-2">
                <Label htmlFor="artist-handle">
                  {ARTIST_PLATFORM_LABELS[platform]} handle
                </Label>
                <Input
                  id="artist-handle"
                  placeholder={ARTIST_PLATFORM_PLACEHOLDERS[platform]}
                  value={value.handle ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...value,
                      mode: "other",
                      platform,
                      handle: event.target.value,
                    })
                  }
                  disabled={disabled}
                />
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
