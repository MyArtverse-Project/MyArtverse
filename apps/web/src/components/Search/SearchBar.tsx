"use client"

import { SearchResult } from "@/types/utils"
import { search } from "@/utils/api"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { SearchSection } from "./Section"

interface SearchBarProps {
  // TODO store `recentSearches` from localStorage
  recentSearches?: string[]
  characters?: { name: string; image: string }[]
}

export function SearchBar({
  recentSearches = [],
  characters = []
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult>({
    user: [],
    artwork: [],
    character: []
  })

  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const searchQueryTrimmed = searchQuery.trim()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key

      if (key === "/" && !isOpen) {
        event.preventDefault()
        setIsOpen(true)
      } else if (key === "Escape") {
        redirect("/search/?q=" + encodeURIComponent(searchQueryTrimmed))
      } else if (key === "Enter" && isOpen) {
        setIsOpen(false)
        redirect("/search/?q=" + encodeURIComponent(searchQueryTrimmed))
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, searchQuery])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    setLoading(true)
    if (!searchQueryTrimmed) return

    const delay = setTimeout(async () => {
      try {
        const newResults = await search(searchQuery)
        setResults(newResults)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [searchQuery])

  const hasNoSearchResults = Object.values(results).some(
    (item) => item.length === 0
  )

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
          className="bg-popover text-popover-foreground border-border fixed inset-0 top-3.5 z-50 mx-auto h-fit w-2/3 items-start justify-center overflow-y-auto rounded-lg border p-4 shadow-lg"
        >
          <div className="flex items-center justify-center w-full gap-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                redirect("/search/?q=" + encodeURIComponent(searchQueryTrimmed))
                setIsOpen(false)
              }}
              className="flex items-center gap-x-2 w-full"
            >
              <Input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Character, Artist, Artwork, User..."
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
              <SearchSection title="USER RESULTS" items={results} />
            )}
            {!loading && (results.artwork ?? []).length > 0 && (
              <SearchSection title="ARTWORK RESULTS" items={results} />
            )}
            {!loading && (results.character ?? []).length > 0 && (
              <SearchSection
                title="CHARACTER RESULTS"
                items={results}
                isCharacter
              />
            )}
            {!loading && searchQueryTrimmed && hasNoSearchResults && (
              <>
                <div className="text-muted-foreground py-4 text-center">
                  No results found for "<strong>{searchQuery}</strong>"
                </div>
                <SearchSection title="RECENT SEARCHES" items={recentSearches} />
                <SearchSection
                  title="CHARACTERS"
                  items={characters}
                  isCharacter
                />
              </>
            )}
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
