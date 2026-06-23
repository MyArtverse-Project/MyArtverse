"use client"

import Avatar from "@/components/Avatar"
import DeleteCharacterDialog from "@/components/DeleteCharacterDialog"
import CreateCharacterModal from "@/components/Modals/CreateCharacter"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import type { Character } from "@/types/characters"
import { isRemoteImageUrl, USER_DEFAULT_AVATAR } from "@/utils/constants"
import { displaySpecies } from "@/utils/displayer"
import { Button } from "@/components/ui/button"
import { Group } from "@/components/ui/group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@mav/shared/utils"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {
  LuEye,
  LuLayoutGrid,
  LuList,
  LuLock,
  LuSearch,
  LuTrash2,
} from "react-icons/lu"

type ViewMode = "table" | "grid"

const VIEW_STORAGE_KEY = "studio-characters-view"

function formatCharacterSpecies(character: Character) {
  const label = displaySpecies(character.species ?? "")
  if (label !== "Unknown") {
    return character.isHybrid && !label.toLowerCase().includes("hybrid")
      ? `${label} hybrid`
      : label
  }
  return character.species || "Unknown"
}

function StudioCharacterCard({
  character,
  onDelete,
}: {
  character: Character
  onDelete: () => void
}) {
  const img = character.avatarUrl || USER_DEFAULT_AVATAR
  const href = `/studio/characters/${character.id}`

  return (
    <div className="group relative">
      <Button
        type="button"
        variant="destructive"
        size="icon"
        aria-label={`Delete ${character.name}`}
        className={cn(
          "absolute right-2 top-2 z-10 size-8 opacity-0 shadow-sm transition-opacity",
          "group-hover:opacity-100 group-focus-within:opacity-100"
        )}
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
          onDelete()
        }}
      >
        <LuTrash2 size={16} />
      </Button>

      <Link
        href={href}
        className="flex flex-col items-center gap-3 text-center"
        aria-label={`${character.name}, ${formatCharacterSpecies(character)}`}
      >
        <div className="relative w-full overflow-hidden rounded-2xl">
          <div className="relative aspect-square w-full">
            <Image
              src={img}
              alt={`Avatar of ${character.name}`}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, 220px"
              unoptimized={isRemoteImageUrl(img)}
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-1">
          <div className="flex items-center justify-center gap-1.5">
            <h3 className="text-foreground text-base font-bold leading-tight">
              {character.name}
            </h3>
            {character.visibility === "private" ? (
              <LuLock
                size={14}
                className="text-primary shrink-0"
                aria-label="Private"
              />
            ) : null}
          </div>
          <p className="text-muted-foreground text-sm">
            {formatCharacterSpecies(character)}
          </p>
          {character.mainCharacter ? (
            <span className="border-300 bg-100 text-700 mt-0.5 rounded-full border px-2.5 py-0.5 text-xs font-medium">
              Default
            </span>
          ) : null}
        </div>
      </Link>
    </div>
  )
}

function readStoredView(): ViewMode {
  if (typeof window === "undefined") return "table"
  const stored = window.localStorage.getItem(VIEW_STORAGE_KEY)
  return stored === "grid" ? "grid" : "table"
}

export default function CharactersView({
  characters: initialCharacters,
}: {
  characters: Character[]
}) {
  const [characters, setCharacters] = useState(initialCharacters)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [characterToDelete, setCharacterToDelete] = useState<Character | null>(
    null
  )
  const [view, setView] = useState<ViewMode>("table")
  const [filter, setFilter] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const filteredCharacters = useMemo(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return characters

    return characters.filter((character) => {
      const species = formatCharacterSpecies(character).toLowerCase()
      return (
        character.name.toLowerCase().includes(query) ||
        species.includes(query) ||
        character.owner.handle.toLowerCase().includes(query)
      )
    })
  }, [characters, filter])

  useEffect(() => {
    setView(readStoredView())
  }, [])

  useEffect(() => {
    setCharacters(initialCharacters)
  }, [initialCharacters])

  useEffect(() => {
    const showModal = searchParams.get("createModal") === "true"
    if (showModal) {
      setIsCreateModalOpen(true)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.delete("createModal")
      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    }
  }, [searchParams, router])

  const toggleCreateCharacterModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }

  const handleViewChange = (value: string) => {
    if (value !== "table" && value !== "grid") return
    setView(value)
    window.localStorage.setItem(VIEW_STORAGE_KEY, value)
  }

  const handleCharacterDeleted = () => {
    if (!characterToDelete) return
    setCharacters((current) =>
      current.filter((character) => character.id !== characterToDelete.id)
    )
    setCharacterToDelete(null)
    router.refresh()
  }

  return (
    <div className="grid">
      <Group
        title="Characters"
        potentialActions={
          <Button onClick={toggleCreateCharacterModal}>Create</Button>
        }
      >
        {characters.length === 0 ? (
          <div className="flex min-h-[60vh] flex-1 items-center justify-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl">No one seems to be around...</h1>
              <p className="text-lg">
                Create a character or import through a Toyhouse account to get
                started!
              </p>
              <Button className="mt-6" onClick={toggleCreateCharacterModal}>
                Create character
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center gap-3">
              <div className="relative min-w-0 flex-1">
                <LuSearch
                  size={18}
                  className="text-muted-foreground pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
                  aria-hidden
                />
                <input
                  type="search"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                  placeholder="Filter characters"
                  className="bg-primary/[0.06] focus-visible:ring-primary/25 h-10 w-full rounded-xl border-none py-2 pl-10 pr-3 text-sm outline-none focus-visible:ring-2"
                />
              </div>

              <ToggleGroup
                type="single"
                value={view}
                onValueChange={handleViewChange}
                className="bg-primary/[0.06] shrink-0 rounded-xl p-1"
                aria-label="Character list layout"
              >
                <ToggleGroupItem
                  value="table"
                  aria-label="Table view"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground size-9 rounded-lg border-0 bg-transparent shadow-none"
                >
                  <LuList size={18} />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="grid"
                  aria-label="Grid view"
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground size-9 rounded-lg border-0 bg-transparent shadow-none"
                >
                  <LuLayoutGrid size={18} />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {filteredCharacters.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center text-sm">
                No characters match &ldquo;{filter.trim()}&rdquo;.
              </p>
            ) : view === "grid" ? (
              <GridResponsive breakpoint={200} className="gap-6" role="list">
                {filteredCharacters.map((character) => (
                  <StudioCharacterCard
                    key={character.id}
                    character={character}
                    onDelete={() => setCharacterToDelete(character)}
                  />
                ))}
              </GridResponsive>
            ) : (
              <table className="border-border w-full border-collapse text-left text-sm">
                <thead className="border-border border-b">
                  <tr className="text-muted-foreground">
                    <th className="py-3">Character</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Ownership</th>
                    <th className="py-3">Visibility</th>
                    <th className="w-12 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCharacters.map((character) => (
                <tr
                  key={character.id}
                  className="border-border hover:bg-muted/50 group border-b"
                >
                  <td
                    className="cursor-pointer py-4"
                    onClick={() =>
                      router.push(`/studio/characters/${character.id}`)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Avatar
                        size={50}
                        src={character.avatarUrl}
                        username={character.name}
                        imageKey={character.id}
                        className="rounded-none"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">
                            {character.name}
                          </span>
                          {character.mainCharacter ? (
                            <span className="border-300 bg-100 text-700 rounded-full border px-2 py-0.5 text-xs">
                              Default
                            </span>
                          ) : null}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatCharacterSpecies(character)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className="cursor-pointer py-4"
                    onClick={() =>
                      router.push(`/studio/characters/${character.id}`)
                    }
                  >
                    {character.adoptionStatus ? (
                      <div className="text-sm text-purple-600">
                        Adopted on{" "}
                        {new Date(
                          character.adoptionStatus.adoptionDate
                        ).toLocaleDateString()}
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-purple-600">Created</div>
                        <div className="font-medium">
                          {new Date(character.createdAt).toLocaleDateString()}
                        </div>
                      </>
                    )}
                  </td>
                  <td
                    className="cursor-pointer py-4 font-medium"
                    onClick={() =>
                      router.push(`/studio/characters/${character.id}`)
                    }
                  >
                    {character.owner.handle}
                  </td>
                  <td
                    className="cursor-pointer py-4"
                    onClick={() =>
                      router.push(`/studio/characters/${character.id}`)
                    }
                  >
                    {character.visibility === "public" ? (
                      <div className="text-600 flex items-center gap-1">
                        <LuEye size={20} />
                        <span>Public</span>
                      </div>
                    ) : (
                      <div className="text-600 flex items-center gap-1">
                        <LuLock size={20} />
                        <span>Private</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${character.name}`}
                      className="text-muted-foreground hover:text-destructive opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => setCharacterToDelete(character)}
                    >
                      <LuTrash2 size={18} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            )}
          </>
        )}
      </Group>

      <CreateCharacterModal
        createCharacterModalShown={isCreateModalOpen}
        toggleCreateCharacterModal={toggleCreateCharacterModal}
      />

      <DeleteCharacterDialog
        character={characterToDelete}
        open={!!characterToDelete}
        onOpenChange={(open) => !open && setCharacterToDelete(null)}
        onDeleted={handleCharacterDeleted}
      />
    </div>
  )
}
