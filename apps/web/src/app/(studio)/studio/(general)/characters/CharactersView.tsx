"use client"

import Avatar from "@/components/Avatar"
import DeleteCharacterDialog from "@/components/DeleteCharacterDialog"
import CreateCharacterModal from "@/components/Modals/CreateCharacter"
import { CharacterCard } from "@/components/layouts/Cards"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import type { Character } from "@/types/characters"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { displaySpecies } from "@/utils/displayer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Group } from "@/components/ui/group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@mav/shared/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LuEye, LuLayoutGrid, LuList, LuLock, LuTrash2 } from "react-icons/lu"

type ViewMode = "table" | "grid"

const VIEW_STORAGE_KEY = "studio-characters-view"

function characterStatus(character: Character) {
  if (character.mainCharacter) return "main" as const
  if (character.adoptionStatus) return "adopted" as const
  if (character.visibility === "private") return "hidden" as const
  return "owned" as const
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
  const router = useRouter()
  const searchParams = useSearchParams()

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
          <div className="flex items-center gap-2">
            {characters.length > 0 ? (
              <ToggleGroup
                type="single"
                value={view}
                onValueChange={handleViewChange}
                variant="outline"
                size="sm"
                aria-label="Character list layout"
              >
                <ToggleGroupItem value="table" aria-label="Table view">
                  <LuList size={18} />
                </ToggleGroupItem>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <LuLayoutGrid size={18} />
                </ToggleGroupItem>
              </ToggleGroup>
            ) : null}
            <Button onClick={toggleCreateCharacterModal}>Create</Button>
          </div>
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
        ) : view === "grid" ? (
          <GridResponsive breakpoint={220} className="gap-3" role="list">
            {characters.map((character) => (
              <div key={character.id} className="group relative">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  aria-label={`Delete ${character.name}`}
                  className={cn(
                    "absolute right-3 top-3 z-10 size-8 opacity-0 shadow-sm transition-opacity",
                    "group-hover:opacity-100 group-focus-within:opacity-100"
                  )}
                  onClick={() => setCharacterToDelete(character)}
                >
                  <LuTrash2 size={16} />
                </Button>

                <div className="pointer-events-none absolute left-3 top-3 z-10 flex flex-wrap gap-1.5">
                  {character.visibility === "private" ? (
                    <Badge
                      variant="secondary"
                      className="bg-background/90 gap-1 backdrop-blur-sm"
                    >
                      <LuLock size={12} aria-hidden />
                      Private
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-background/90 gap-1 backdrop-blur-sm"
                    >
                      <LuEye size={12} aria-hidden />
                      Public
                    </Badge>
                  )}
                </div>

                <CharacterCard
                  id={character.id}
                  character={character}
                  img={character.avatarUrl || USER_DEFAULT_AVATAR}
                  name={character.name}
                  species={character.species ?? ""}
                  isHybrid={character.isHybrid}
                  loading={false}
                  status={characterStatus(character)}
                  href={`/studio/characters/${character.id}`}
                  likes={character.favoritedBy?.length ?? 0}
                />
              </div>
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
              {characters.map((character) => (
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
                          {displaySpecies(character.species ?? "")}
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
