"use client"

import { SearchResult } from "@/types/utils"
import { search } from "@/utils/api"
import { Dialog, Transition } from "@headlessui/react"
import { Button } from "@mav/ui/components/buttons"
import { InputField } from "@mav/ui/components/fields"
import { redirect } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { LuSearch } from "react-icons/lu"
import { SearchSection } from "./Section"

export default function SearchBar({
  recentSearches = [],
  characters = []
}: {
  recentSearches?: string[]
  characters?: { name: string; image: string }[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<SearchResult>({
    user: [],
    artwork: [],
    character: []
  })
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/" && !isOpen) {
        event.preventDefault()
        setIsOpen(true)
      } else if (event.key === "Escape") {
        redirect("/search/?q=" + encodeURIComponent(query.trim()))
      } else if (event.key === "Enter" && isOpen) {
        redirect("/search/?q=" + encodeURIComponent(query.trim()))
        setIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, query])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    setLoading(true)
    if (!query.trim()) return

    const delay = setTimeout(async () => {
      try {
        const newResults = await search(query)
        setResults(newResults)
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(delay)
  }, [query])

  return (
    <div className="top-full relative">
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          prefix={<LuSearch size={18} />}
          className="hover:!bg-100 w-64"
          variant="secondary"
        >
          Type
          <kbd className="bg-400 text-xs px-1 rounded">/</kbd>
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
          className="fixed z-50 inset-0 overflow-y-auto top-3.5 items-start justify-center w-2/3 mx-auto bg-100 h-fit"
        >
          <div className="flex items-center justify-center w-full gap-y-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                redirect("/search/?q=" + encodeURIComponent(query.trim()))
                setIsOpen(false)
              }}
              className="flex items-center gap-x-2 w-full"
            >
              <InputField
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Character, Artist, Artwork, User..."
              />
            </form>
          </div>
          <div className="mt-4">
            {loading && (
              <div className="text-center text-gray-500 py-4">
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
            {!loading &&
              query.trim() &&
              results.user?.length === 0 &&
              results.artwork?.length === 0 &&
              results.character?.length === 0 && (
                <>
                  <div className="text-center text-gray-500 py-4">
                    No results found for "<strong>{query}</strong>"
                  </div>
                  <SearchSection
                    title="RECENT SEARCHES"
                    items={recentSearches}
                  />
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
