"use client"

import { setPanel } from "@/utils/api"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { DashboardPanel, PanelSettings, PanelType } from "@/types/users"
import {
  CHARACTER_PANEL_CATEGORIES,
  getPanelAt,
  panelNeedsArtworks,
  panelNeedsCharacters,
  USER_PANEL_CATEGORIES,
} from "@/utils/panels"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import { LuXCircle } from "react-icons/lu"

const SELECT_CONTENT_CLASS = "z-[110]"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

const PANEL_META: Record<PanelType, { label: string; description: string }> = {
  comments: {
    label: "Profile comments",
    description: "Show the comment thread for this profile.",
  },
  information: {
    label: "About",
    description: "Show profile or character details in a summary card.",
  },
  featured_gallery: {
    label: "Featured gallery",
    description: "Show a grid of artworks from a selected source.",
  },
  featured_artwork: {
    label: "Featured artwork",
    description: "Highlight a single artwork with artist attribution.",
  },
  reference_sheet: {
    label: "Reference sheet",
    description: "Display a character reference sheet.",
  },
  featured_character: {
    label: "Featured character",
    description: "Spotlight one of your characters.",
  },
  popular_character: {
    label: "Popular character",
    description: "Show the character with the most favorites.",
  },
  multiple_characters: {
    label: "Multiple characters",
    description: "Show a grid of selected characters.",
  },
  recent_artworks: {
    label: "Recent artworks",
    description: "Show the newest uploads from a gallery source.",
  },
  multiple_artworks: {
    label: "Multiple artworks",
    description: "Show a curated grid of artworks.",
  },
  popular_artwork: {
    label: "Popular artwork",
    description: "Highlight artwork with the most favorites.",
  },
  multiple_galleries: {
    label: "Multiple galleries",
    description: "Show previews from multiple character galleries.",
  },
  featured_listing: {
    label: "Featured listing",
    description: "Highlight a shop listing (coming soon).",
  },
  recent_listings: {
    label: "Recent listings",
    description: "Show your latest shop listings (coming soon).",
  },
  commission_queue: {
    label: "Commission queue",
    description: "Show commission, request, and trade status.",
  },
  customHTML: {
    label: "Custom HTML",
    description: "Custom HTML block.",
  },
}

const MULTI_LIMIT_TYPES = new Set<PanelType>([
  "multiple_characters",
  "multiple_artworks",
  "multiple_galleries",
  "recent_artworks",
])

const SINGLE_ARTWORK_TYPES = new Set<PanelType>([
  "featured_artwork",
  "popular_artwork",
])

export default function EditPanelModal({
  toggleEditPanel,
  editPanelModalShown,
  position,
  panels,
  context,
  characterName,
  characters = [],
  artworks = [],
  refSheets = [],
}: {
  toggleEditPanel: (position: { row: number; col: number } | null) => void
  editPanelModalShown: boolean
  position: { row: number; col: number } | null
  panels: DashboardPanel[]
  context: "user" | "character"
  characterName?: string
  characters?: Character[]
  artworks?: Artwork[]
  refSheets?: ReferenceSheet[]
}) {
  const categories =
    context === "character" ? CHARACTER_PANEL_CATEGORIES : USER_PANEL_CATEGORIES
  const allOptions = useMemo(
    () => categories.flatMap((category) => category.options),
    [categories]
  )

  const existingPanel = position ? getPanelAt(panels, position) : undefined
  const initializedFor = useRef<string | null>(null)

  const [errors, setErrors] = useState<string>()
  const [chosenComponent, setChosenComponent] = useState<PanelType>("comments")
  const [customTitle, setCustomTitle] = useState("")
  const [limit, setLimit] = useState("6")
  const [characterSlug, setCharacterSlug] = useState("")
  const [selectedCharacterSlugs, setSelectedCharacterSlugs] = useState<string[]>(
    []
  )
  const [artworkId, setArtworkId] = useState("")
  const [refSheetId, setRefSheetId] = useState("")
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])

  useEffect(() => {
    if (!editPanelModalShown || !position) {
      initializedFor.current = null
      return
    }

    const slotKey = `${position.row}-${position.col}`
    if (initializedFor.current === slotKey) return
    initializedFor.current = slotKey

    const panel = getPanelAt(panels, position)
    const type = (panel?.type as PanelType | undefined) ?? allOptions[0]
    setChosenComponent(allOptions.includes(type) ? type : allOptions[0])
    setCustomTitle(panel?.settings?.customTitle ?? "")
    setLimit(panel?.settings?.limit ?? "6")
    setCharacterSlug(panel?.settings?.characterSlug ?? characters[0]?.slug ?? "")
    setSelectedCharacterSlugs(
      panel?.settings?.characterSlugs
        ?.split(",")
        .map((slug) => slug.trim())
        .filter(Boolean) ?? []
    )
    setArtworkId(panel?.settings?.artworkId ?? "")
    setRefSheetId(panel?.settings?.refSheetId ?? refSheets[0]?.id ?? "")
    setSelectedArtworkIds(
      panel?.settings?.artworkIds
        ?.split(",")
        .map((id) => id.trim())
        .filter(Boolean) ?? []
    )
    setErrors(undefined)
  }, [editPanelModalShown, position, panels, allOptions, characters, refSheets])

  const galleryArtworks = useMemo(() => {
    if (context === "character") return artworks

    const slug = characterSlug || characters[0]?.slug
    if (!slug) return artworks

    return artworks.filter(
      (artwork) =>
        artwork.publishedCharacter?.slug === slug ||
        artwork.charactersFeatured?.some((character) => character.slug === slug)
    )
  }, [artworks, characterSlug, characters, context])

  const buildSettings = (): PanelSettings => {
    const settings: PanelSettings = {}

    if (customTitle.trim()) settings.customTitle = customTitle.trim()
    if (MULTI_LIMIT_TYPES.has(chosenComponent)) settings.limit = limit

    if (
      chosenComponent === "featured_gallery" ||
      (context === "user" && panelNeedsArtworks(chosenComponent))
    ) {
      if (context === "user" && characterSlug) {
        settings.characterSlug = characterSlug
      }
    }

    if (chosenComponent === "featured_character" && characterSlug) {
      settings.characterSlug = characterSlug
    }

    if (panelNeedsCharacters(chosenComponent) && selectedCharacterSlugs.length) {
      settings.characterSlugs = selectedCharacterSlugs.join(",")
    }

    if (selectedArtworkIds.length > 0) {
      settings.artworkIds = selectedArtworkIds.join(",")
    }

    if (SINGLE_ARTWORK_TYPES.has(chosenComponent) && artworkId) {
      settings.artworkId = artworkId
    }

    if (chosenComponent === "reference_sheet" && refSheetId) {
      settings.refSheetId = refSheetId
    }

    return settings
  }

  const updatePanel = async () => {
    if (!position) {
      setErrors("Unable to save panel")
      return
    }

    if (SINGLE_ARTWORK_TYPES.has(chosenComponent) && !artworkId) {
      setErrors("Select an artwork for this panel")
      return
    }

    if (chosenComponent === "reference_sheet" && !refSheetId) {
      setErrors("Select a reference sheet for this panel")
      return
    }

    if (
      chosenComponent === "featured_gallery" &&
      context === "user" &&
      !characterSlug &&
      characters.length > 0
    ) {
      setErrors("Select which character's gallery to show")
      return
    }

    if (
      chosenComponent === "featured_character" &&
      !characterSlug &&
      characters.length > 0
    ) {
      setErrors("Select a featured character")
      return
    }

    try {
      await setPanel(
        {
          component: chosenComponent,
          position,
          settings: buildSettings(),
        },
        characterName
      )
      toggleEditPanel(null)
      window.location.reload()
    } catch {
      setErrors("Unable to save panel")
    }
  }

  const toggleArtworkSelection = (id: string) => {
    setSelectedArtworkIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  const toggleCharacterSelection = (slug: string) => {
    setSelectedCharacterSlugs((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    )
  }

  const showCharacterSource =
    context === "user" &&
    (chosenComponent === "featured_gallery" ||
      panelNeedsArtworks(chosenComponent))

  const showCharacterPicker =
    chosenComponent === "featured_character" ||
    chosenComponent === "multiple_characters" ||
    chosenComponent === "multiple_galleries"

  return (
    <Modal
      className="w-full max-w-3xl px-4"
      toggler={() => toggleEditPanel(null)}
      state={editPanelModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter text-xl font-bold">
            Edit panel
            {position ? ` (row ${position.row}, col ${position.col})` : ""}
          </span>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={() => toggleEditPanel(null)}
          >
            <LuXCircle size={18} />
          </Button>
        </div>
      </Modal.Title>

      {errors ? (
        <div className="my-3 px-4">
          <Note type="error">{errors}</Note>
        </div>
      ) : null}

      <div className="grid gap-6 p-4 md:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="space-y-1">
              <p className="text-muted-foreground px-2 text-xs font-semibold uppercase tracking-wide">
                {category.label}
              </p>
              <div className="space-y-0.5">
                {category.options.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setChosenComponent(value)}
                    className={cn(
                      "w-full rounded-lg px-2 py-2 text-left text-sm transition-colors",
                      chosenComponent === value
                        ? "bg-primary/15 text-primary font-semibold"
                        : "hover:bg-muted/60"
                    )}
                  >
                    {PANEL_META[value].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="bg-primary/[0.06] rounded-2xl border border-primary/10 p-4">
            <h2 className="text-lg font-bold">{PANEL_META[chosenComponent].label}</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {PANEL_META[chosenComponent].description}
            </p>
            {existingPanel ? (
              <p className="text-muted-foreground mt-2 text-xs">
                Replacing:{" "}
                {PANEL_META[existingPanel.type as PanelType]?.label ??
                  existingPanel.type}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="panel-custom-title">Custom title (optional)</Label>
            <Input
              id="panel-custom-title"
              value={customTitle}
              onChange={(event) => setCustomTitle(event.target.value)}
              placeholder={PANEL_META[chosenComponent].label}
            />
          </div>

          {MULTI_LIMIT_TYPES.has(chosenComponent) ? (
            <div className="space-y-2">
              <Label htmlFor="panel-limit">Item limit</Label>
              <Input
                id="panel-limit"
                type="number"
                min={1}
                max={24}
                value={limit}
                onChange={(event) => setLimit(event.target.value)}
              />
            </div>
          ) : null}

          {showCharacterSource ? (
            <div className="space-y-2">
              <Label>Gallery source</Label>
              <Select
                value={characterSlug || undefined}
                onValueChange={setCharacterSlug}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a character" />
                </SelectTrigger>
                <SelectContent className={SELECT_CONTENT_CLASS}>
                  {characters.map((character) => (
                    <SelectItem key={character.id} value={character.slug}>
                      {character.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          {showCharacterPicker && context === "user" ? (
            <div className="space-y-2">
              <Label>
                {chosenComponent === "featured_character"
                  ? "Featured character"
                  : "Characters"}
              </Label>
              {chosenComponent === "featured_character" ? (
                <Select
                value={characterSlug || undefined}
                onValueChange={setCharacterSlug}
              >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a character" />
                  </SelectTrigger>
                  <SelectContent className={SELECT_CONTENT_CLASS}>
                    {characters.map((character) => (
                      <SelectItem key={character.id} value={character.slug}>
                        {character.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border p-3">
                  {characters.length > 0 ? (
                    characters.map((character) => (
                      <label
                        key={character.id}
                        className="flex cursor-pointer items-center gap-2 text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCharacterSlugs.includes(character.slug)}
                          onChange={() => toggleCharacterSelection(character.slug)}
                        />
                        <span>{character.name}</span>
                      </label>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      No characters available yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : null}

          {chosenComponent === "featured_gallery" ||
          chosenComponent === "multiple_artworks" ? (
            <div className="space-y-2">
              <Label>Artworks to include (optional)</Label>
              <p className="text-muted-foreground text-xs">
                Leave empty to show all artworks from the selected source.
              </p>
              <div className="max-h-40 space-y-2 overflow-y-auto rounded-md border p-3">
                {galleryArtworks.length > 0 ? (
                  galleryArtworks.map((artwork) => (
                    <label
                      key={artwork.id}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedArtworkIds.includes(artwork.id)}
                        onChange={() => toggleArtworkSelection(artwork.id)}
                      />
                      <span>{artwork.title || "Untitled artwork"}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No artworks available for this source yet.
                  </p>
                )}
              </div>
            </div>
          ) : null}

          {SINGLE_ARTWORK_TYPES.has(chosenComponent) ? (
            <div className="space-y-2">
              <Label>Artwork</Label>
              <Select
                value={artworkId || undefined}
                onValueChange={setArtworkId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an artwork" />
                </SelectTrigger>
                <SelectContent className={SELECT_CONTENT_CLASS}>
                  {galleryArtworks.map((artwork) => (
                    <SelectItem key={artwork.id} value={artwork.id}>
                      {artwork.title || "Untitled artwork"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          {chosenComponent === "reference_sheet" ? (
            <div className="space-y-2">
              <Label>Reference sheet</Label>
              <Select
                value={refSheetId || undefined}
                onValueChange={setRefSheetId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a reference sheet" />
                </SelectTrigger>
                <SelectContent className={SELECT_CONTENT_CLASS}>
                  {refSheets.map((sheet) => (
                    <SelectItem key={sheet.id} value={sheet.id}>
                      {sheet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex flex-row items-center justify-end gap-2 p-4">
        <Button variant="outline" onClick={() => toggleEditPanel(null)}>
          Cancel
        </Button>
        <Button onClick={updatePanel}>Save panel</Button>
      </div>
    </Modal>
  )
}
