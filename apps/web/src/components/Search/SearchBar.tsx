"use client"

import { SearchResult } from "@/types/utils"
import { search } from "@/utils/api"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { SearchSection } from "./Section"

interface SearchBarProps {
  recentSearches?: string[]
  characters?: { name: string; image: string }[]
}

const emptyResults: SearchResult = {
  user: [],
  artwork: [],
  character: [],
}

export function SearchBar({
  recentSearches = [],
  characters = [],
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult>(emptyResults)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const searchQueryTrimmed = searchQuery.trim()

  const goToSearch = useCallback(() => {
    if (!searchQueryTrimmed) return
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(searchQueryTrimmed)}`)
  }, [router, searchQueryTrimmed])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key
      const target = event.target
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)

      if (key === "/" && !isOpen && !isTyping) {
        event.preventDefault()
        setIsOpen(true)
      } else if (key === "Escape" && isOpen) {
        setIsOpen(false)
      } else if (key === "Enter" && isOpen) {
        event.preventDefault()
        goToSearch()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [goToSearch, isOpen])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!searchQueryTrimmed) {
      setResults(emptyResults)
      setLoading(false)
      return
    }

    setLoading(true)

    const delay = setTimeout(async () => {
      try {
        const newResults = await search(searchQueryTrimmed)
        setResults(newResults)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [searchQueryTrimmed])

  const hasNoSearchResults =
    (results.user?.length ?? 0) === 0 &&
    (results.artwork?.length ?? 0) === 0 &&
    (results.character?.length ?? 0) === 0

  return (
    <div className="top-full relative">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="text-muted-foreground w-64 justify-start gap-2"
          variant="outline"
        >
          <LuSearch size={18} />
          Type
          <kbd className="bg-muted text-muted-foreground rounded px-1 text-xs">
            /
          </kbd>
          to search
        </Button>
      )}

      <Transition
        show={isOpen}
        enter="transition duration-200 ease"
        enterFrom="transform -translate-y-1 opacity-0"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition duration-200 ease"
        leaveFrom="transform translate-y-0 opacity-100"
        leaveTo="transform -translate-y-1 opacity-0"
        // @ts-expect-error
        className="translate-x-0 top-0"
      >
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="bg-popover text-popover-foreground border-border fixed inset-0 top-3.5 z-50 mx-auto h-fit max-h-[80vh] w-2/3 items-start justify-center overflow-y-auto rounded-lg border p-4 shadow-lg"
        >
          <div className="flex items-center justify-center w-full gap-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                goToSearch()
              }}
              className="flex items-center gap-x-2 w-full"
            >
              <Input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search characters, artists, artworks..."
              />
            </form>
          </div>
          <div className="mt-4">
            {loading && (
              <div className="text-muted-foreground py-4 text-center">
                Loading results...
              </div>
            )}
            {!loading && (results.user ?? []).length > 0 && (
              <SearchSection
                title="USERS"
                items={results}
                category="user"
              />
            )}
            {!loading && (results.character ?? []).length > 0 && (
              <SearchSection
                title="CHARACTERS"
                items={results}
                category="character"
              />
            )}
            {!loading && (results.artwork ?? []).length > 0 && (
              <SearchSection
                title="ARTWORKS"
                items={results}
                category="artwork"
              />
            )}
            {!loading && searchQueryTrimmed && hasNoSearchResults && (
              <>
                <div className="text-muted-foreground py-4 text-center">
                  No results found for &ldquo;{searchQueryTrimmed}&rdquo;
                </div>
                {recentSearches.length > 0 && (
                  <SearchSection title="RECENT SEARCHES" items={recentSearches} />
                )}
                {characters.length > 0 && (
                  <SearchSection title="YOUR CHARACTERS" items={characters} />
                )}
              </>
            )}
            {!loading && !searchQueryTrimmed && recentSearches.length > 0 && (
              <SearchSection title="RECENT SEARCHES" items={recentSearches} />
            )}
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
