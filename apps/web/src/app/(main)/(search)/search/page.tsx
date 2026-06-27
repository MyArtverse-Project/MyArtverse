"use client"

import { SearchArtworkGrid } from "@/components/Search/SearchArtworkGrid"
import { SearchSection } from "@/components/Search/Section"
import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { SearchResult } from "@/types/utils"
import { search, SearchType } from "@/utils/api"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import {
  LuCat,
  LuChevronDown,
  LuGalleryThumbnails,
  LuMoreVertical,
  LuScan,
  LuUser,
} from "react-icons/lu"

type SearchFilter = "all" | "users" | "characters" | "artworks"

const FILTER_TO_API_TYPE: Record<Exclude<SearchFilter, "all">, SearchType> = {
  users: "users",
  characters: "characters",
  artworks: "artworks",
}

const emptyResults: SearchResult = {
  user: [],
  artwork: [],
  character: [],
}

function countResults(results: SearchResult, filter: SearchFilter) {
  switch (filter) {
    case "users":
      return results.user.length
    case "characters":
      return results.character.length
    case "artworks":
      return results.artwork.length
    default:
      return (
        results.user.length + results.character.length + results.artwork.length
      )
  }
}

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryFromUrl = searchParams.get("q") ?? ""
  const typeFromUrl = (searchParams.get("type") as SearchFilter | null) ?? "all"

  const [searchType, setSearchType] = useState<SearchFilter>(
    typeFromUrl === "users" ||
      typeFromUrl === "characters" ||
      typeFromUrl === "artworks"
      ? typeFromUrl
      : "all"
  )
  const debouncedQuery = useDebounce(queryFromUrl, 400)
  const [results, setResults] = useState<SearchResult>(emptyResults)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchType(
      typeFromUrl === "users" ||
        typeFromUrl === "characters" ||
        typeFromUrl === "artworks"
        ? typeFromUrl
        : "all"
    )
  }, [typeFromUrl])

  useEffect(() => {
    const trimmed = debouncedQuery.trim()
    if (!trimmed) {
      setResults(emptyResults)
      setLoading(false)
      return
    }

    setLoading(true)

    const apiType =
      searchType === "all" ? undefined : FILTER_TO_API_TYPE[searchType]

    search(trimmed, apiType)
      .then(setResults)
      .finally(() => setLoading(false))
  }, [debouncedQuery, searchType])

  const handleFilterChange = (type: SearchFilter) => {
    setSearchType(type)
    const params = new URLSearchParams()
    if (queryFromUrl.trim()) params.set("q", queryFromUrl.trim())
    if (type !== "all") params.set("type", type)
    const next = params.toString()
    router.replace(next ? `/search?${next}` : "/search")
  }

  const trimmedQuery = debouncedQuery.trim()
  const totalResults = countResults(results, searchType)
  const hasNoResults = !loading && trimmedQuery.length > 0 && totalResults === 0

  const showUsers = searchType === "all" || searchType === "users"
  const showCharacters = searchType === "all" || searchType === "characters"
  const showArtworks = searchType === "all" || searchType === "artworks"

  const userCount = results.user?.length ?? 0
  const characterCount = results.character?.length ?? 0
  const artworkCount = results.artwork?.length ?? 0

  return (
    <div className="mx-auto flex max-w-screen-3xl flex-row gap-x-8 px-8 py-6">
      <aside className="flex w-56 shrink-0 flex-col gap-y-3 lg:w-64">
        <span className="text-2xl font-semibold">Filters</span>
        <div className="flex flex-col gap-y-2 text-base">
          <Button
            onClick={() => handleFilterChange("all")}
            variant={searchType === "all" ? "default" : "secondary"}
            className="justify-start gap-2"
          >
            <LuScan size={18} />
            All
          </Button>
          <Button
            onClick={() => handleFilterChange("users")}
            variant={searchType === "users" ? "default" : "secondary"}
            className="justify-start gap-2"
          >
            <LuUser size={18} />
            Users & Artists
          </Button>
          <Button
            onClick={() => handleFilterChange("characters")}
            variant={searchType === "characters" ? "default" : "secondary"}
            className="justify-start gap-2"
          >
            <LuCat size={18} />
            Characters
          </Button>
          <Button
            onClick={() => handleFilterChange("artworks")}
            variant={searchType === "artworks" ? "default" : "secondary"}
            className="justify-start gap-2"
          >
            <LuGalleryThumbnails size={18} />
            Artworks
          </Button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="text-2xl font-semibold">
            {loading
              ? "Searching..."
              : trimmedQuery
                ? `${totalResults} result${totalResults === 1 ? "" : "s"}`
                : "Search"}
          </span>
          {trimmedQuery ? (
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" className="gap-1.5" disabled>
                Sort by: Best Match
                <LuChevronDown size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground"
                disabled
                aria-label="More options"
              >
                <LuMoreVertical size={18} />
              </Button>
            </div>
          ) : null}
        </div>

        {!trimmedQuery && (
          <p className="text-muted-foreground py-8 text-center">
            Use the search bar above to find users, characters, and artworks.
          </p>
        )}

        {loading && trimmedQuery && (
          <div className="text-muted-foreground py-8 text-center">
            Loading results...
          </div>
        )}

        {hasNoResults && (
          <div className="text-muted-foreground py-8 text-center">
            No results found for &ldquo;{trimmedQuery}&rdquo;
          </div>
        )}

        {!loading && !hasNoResults && trimmedQuery && (
          <div className="flex flex-col">
            {showUsers && userCount > 0 && (
              <SearchSection
                title="USERS & ARTISTS"
                items={results}
                category="user"
                variant="page"
              />
            )}
            {showCharacters && characterCount > 0 && (
              <SearchSection
                title="CHARACTERS"
                items={results}
                category="character"
                variant="page"
              />
            )}
            {showArtworks && artworkCount > 0 && (
              <div className={searchType === "all" ? "mt-2" : undefined}>
                {searchType === "all" ? (
                  <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide">
                    ARTWORKS
                  </h3>
                ) : null}
                <SearchArtworkGrid artworks={results.artwork ?? []} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
