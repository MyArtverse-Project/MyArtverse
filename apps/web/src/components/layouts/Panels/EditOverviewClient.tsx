"use client"

import EditHTMLModal from "@/components/Modals/EditHTML"
import EditPanelModal from "@/components/Modals/EditPanel"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { DashboardPanel } from "@/types/users"
import { getPanelAt } from "@/utils/panels"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

type Position = { row: number; col: number }

function SlotButton({
  position,
  panels,
  onEdit,
}: {
  position: Position
  panels: DashboardPanel[]
  onEdit: (position: Position) => void
}) {
  const panel = getPanelAt(panels, position)

  return (
    <div className="border-border flex min-h-28 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-4">
      {panel ? (
        <p className="text-muted-foreground text-center text-sm">
          {panel.type.replaceAll("_", " ")}
        </p>
      ) : (
        <p className="text-muted-foreground text-sm">Empty slot</p>
      )}
      <Button size="sm" onClick={() => onEdit(position)}>
        Edit panel
      </Button>
    </div>
  )
}

export default function EditOverviewClient({
  panels,
  context,
  characterName,
  characters = [],
  artworks = [],
  refSheets = [],
  backHref,
}: {
  panels: DashboardPanel[]
  context: "user" | "character"
  characterName?: string
  characters?: Character[]
  artworks?: Artwork[]
  refSheets?: ReferenceSheet[]
  backHref: string
}) {
  const [editHTMLModal, setEditHTMLModal] = useState(false)
  const [editPanelModal, setEditPanelModal] = useState(false)
  const [panelPosition, setPanelPosition] = useState<Position | null>(null)

  const toggleEditHTMLModal = () => setEditHTMLModal((open) => !open)

  const toggleEditPanelModal = (position: Position | null) => {
    if (position === null) {
      setEditPanelModal(false)
      setPanelPosition(null)
      return
    }

    setPanelPosition(position)
    setEditPanelModal(true)
  }

  return (
    <>
      <div className="mx-auto max-w-screen-2xl space-y-4 px-8 py-6">
        <div className="flex justify-end">
          <Button variant="outline" asChild>
            <Link href={backHref}>Back to overview</Link>
          </Button>
        </div>

        <div className="border-border flex justify-center rounded-lg border-2 border-dashed p-4">
          <Button onClick={toggleEditHTMLModal}>Edit HTML block</Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SlotButton
            position={{ row: 2, col: 1 }}
            panels={panels}
            onEdit={toggleEditPanelModal}
          />
          <SlotButton
            position={{ row: 2, col: 2 }}
            panels={panels}
            onEdit={toggleEditPanelModal}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SlotButton
            position={{ row: 3, col: 1 }}
            panels={panels}
            onEdit={toggleEditPanelModal}
          />
          <SlotButton
            position={{ row: 3, col: 2 }}
            panels={panels}
            onEdit={toggleEditPanelModal}
          />
          <SlotButton
            position={{ row: 3, col: 3 }}
            panels={panels}
            onEdit={toggleEditPanelModal}
          />
        </div>
      </div>

      <EditHTMLModal
        toggleEditHTMLModal={toggleEditHTMLModal}
        editHTMLModalShown={editHTMLModal}
        panels={panels}
        characterName={characterName}
      />

      <EditPanelModal
        editPanelModalShown={editPanelModal}
        toggleEditPanel={toggleEditPanelModal}
        position={panelPosition}
        panels={panels}
        context={context}
        characterName={characterName}
        characters={characters}
        artworks={artworks}
        refSheets={refSheets}
      />
    </>
  )
}
