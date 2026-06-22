"use client"

import { setPanel } from "@/utils/api"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { DashboardPanel, PanelSettings, PanelType } from "@/types/users"
import {
  CHARACTER_PANEL_OPTIONS,
  getPanelAt,
  USER_PANEL_OPTIONS,
} from "@/utils/panels"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import { useEffect, useMemo, useState, type ReactNode } from "react"
import { FaCode, FaComment, FaInfoCircle } from "react-icons/fa"
import { LuCat, LuGalleryHorizontal, LuSheet, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

const PANEL_META: Record<
  PanelType,
  { label: string; description: string; icon: ReactNode }
> = {
  comments: {
    label: "Comments",
    description: "Show the comment thread for this profile.",
    icon: <FaComment size={18} />,
  },
  information: {
    label: "Information",
    description: "Show profile or character details.",
    icon: <FaInfoCircle size={18} />,
  },
  featured_gallery: {
    label: "Featured gallery",
    description: "Show a grid of artworks from a selected source.",
    icon: <LuGalleryHorizontal size={18} />,
  },
  featured_artwork: {
    label: "Featured artwork",
    description: "Highlight a single artwork.",
    icon: <LuCat size={18} />,
  },
  reference_sheet: {
    label: "Reference sheet",
    description: "Display a character reference sheet.",
    icon: <LuSheet size={18} />,
  },
  customHTML: {
    label: "Custom HTML",
    description: "Custom HTML block.",
    icon: <FaCode size={18} />,
  },
}

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
  const options =
    context === "character" ? CHARACTER_PANEL_OPTIONS : USER_PANEL_OPTIONS

  const existingPanel = position ? getPanelAt(panels, position) : undefined

  const [errors, setErrors] = useState<string>()
  const [chosenComponent, setChosenComponent] = useState<PanelType>("comments")
  const [characterSlug, setCharacterSlug] = useState("")
  const [artworkId, setArtworkId] = useState("")
  const [refSheetId, setRefSheetId] = useState("")
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([])

  useEffect(() => {
    if (!editPanelModalShown || !position) return

    const panel = getPanelAt(panels, position)
    const type = (panel?.type as PanelType | undefined) ?? "comments"
    setChosenComponent(options.includes(type) ? type : options[0])
    setCharacterSlug(panel?.settings?.characterSlug ?? characters[0]?.slug ?? "")
    setArtworkId(panel?.settings?.artworkId ?? "")
    setRefSheetId(panel?.settings?.refSheetId ?? refSheets[0]?.id ?? "")
    setSelectedArtworkIds(
      panel?.settings?.artworkIds?.split(",").map((id) => id.trim()).filter(Boolean) ?? []
    )
    setErrors(undefined)
  }, [editPanelModalShown, position, panels, options, characters, refSheets])

  const galleryArtworks = useMemo(() => {
    if (context === "character") return artworks

    const slug = characterSlug || characters[0]?.slug
    if (!slug) return []

    return artworks.filter(
      (artwork) =>
        artwork.publishedCharacter?.slug === slug ||
        artwork.charactersFeatured?.some((character) => character.slug === slug)
    )
  }, [artworks, characterSlug, characters, context])

  const buildSettings = (): PanelSettings => {
    const settings: PanelSettings = {}

    if (chosenComponent === "featured_gallery") {
      if (context === "user" && characterSlug) {
        settings.characterSlug = characterSlug
      }
      if (selectedArtworkIds.length > 0) {
        settings.artworkIds = selectedArtworkIds.join(",")
      }
    }

    if (chosenComponent === "featured_artwork" && artworkId) {
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

    if (chosenComponent === "featured_artwork" && !artworkId) {
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

  return (
    <Modal
      className="w-full max-w-2xl px-4"
      toggler={() => toggleEditPanel(null)}
      state={editPanelModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaCode />
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

      <div className="flex flex-col gap-6 p-4">
        <Image
          src={`/modals/panels/${chosenComponent}.svg`}
          alt={PANEL_META[chosenComponent].label}
          width={250}
          height={250}
          className="border-border mx-auto max-h-56 max-w-full rounded-lg border bg-white p-2 shadow-md"
        />

        <div className="space-y-3">
          <Label>Panel type</Label>
          <div className="flex flex-wrap gap-2">
            {options.map((value) => (
              <Button
                key={value}
                variant={chosenComponent === value ? "default" : "secondary"}
                size="icon"
                aria-label={PANEL_META[value].label}
                onClick={() => setChosenComponent(value)}
              >
                {PANEL_META[value].icon}
              </Button>
            ))}
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {PANEL_META[chosenComponent].label}
            </h2>
            <p className="text-muted-foreground text-sm">
              {PANEL_META[chosenComponent].description}
            </p>
            {existingPanel ? (
              <p className="text-muted-foreground mt-1 text-xs">
                Replacing: {PANEL_META[existingPanel.type as PanelType]?.label ?? existingPanel.type}
              </p>
            ) : null}
          </div>
        </div>

        {chosenComponent === "featured_gallery" && context === "user" ? (
          <div className="space-y-2">
            <Label>Character gallery source</Label>
            <Select value={characterSlug} onValueChange={setCharacterSlug}>
              <SelectTrigger>
                <SelectValue placeholder="Select a character" />
              </SelectTrigger>
              <SelectContent>
                {characters.map((character) => (
                  <SelectItem key={character.id} value={character.slug}>
                    {character.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}

        {chosenComponent === "featured_gallery" ? (
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

        {chosenComponent === "featured_artwork" ? (
          <div className="space-y-2">
            <Label>Featured artwork</Label>
            <Select value={artworkId} onValueChange={setArtworkId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an artwork" />
              </SelectTrigger>
              <SelectContent>
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
            <Select value={refSheetId} onValueChange={setRefSheetId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reference sheet" />
              </SelectTrigger>
              <SelectContent>
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

      <div className="flex flex-row items-center justify-end gap-2 p-4">
        <Button variant="outline" onClick={() => toggleEditPanel(null)}>
          Cancel
        </Button>
        <Button onClick={updatePanel}>Save panel</Button>
      </div>
    </Modal>
  )
}
