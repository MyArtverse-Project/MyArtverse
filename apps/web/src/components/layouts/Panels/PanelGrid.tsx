"use client"

import type { User } from "@/app/context/AuthContext"
import type { DashboardPanel } from "@/types/users"
import type { Artwork, Character, ReferenceSheet } from "@/types/characters"
import type { UserType } from "@/types/users"
import { renderPanel } from "./RenderPanel"

function PanelSlot({
  row,
  col,
  panels,
  type,
  target,
  self,
  artworks,
  refSheets,
}: {
  row: number
  col: number
  panels: DashboardPanel[]
  type: "user" | "character"
  target: UserType | Character
  self: User | UserType | null
  artworks: Artwork[]
  refSheets: ReferenceSheet[]
}) {
  const panel = panels.find(
    (item) => item.position.row === row && item.position.col === col
  )

  if (!panel || panel.type === "customHTML") {
    return null
  }

  return (
    <div className="p-4">
      {renderPanel(panel, type, target, self, artworks, refSheets)}
    </div>
  )
}

export default function PanelGrid({
  panels,
  type,
  target,
  self,
  artworks = [],
  refSheets = [],
}: {
  panels: DashboardPanel[]
  type: "user" | "character"
  target: UserType | Character
  self: User | UserType | null
  artworks?: Artwork[]
  refSheets?: ReferenceSheet[]
}) {
  return (
    <>
      <div className="mb-4 grid w-full grid-cols-2 gap-4">
        <PanelSlot
          row={2}
          col={1}
          panels={panels}
          type={type}
          target={target}
          self={self}
          artworks={artworks}
          refSheets={refSheets}
        />
        <PanelSlot
          row={2}
          col={2}
          panels={panels}
          type={type}
          target={target}
          self={self}
          artworks={artworks}
          refSheets={refSheets}
        />
      </div>

      <div className="grid w-full grid-cols-3 gap-4">
        <PanelSlot
          row={3}
          col={1}
          panels={panels}
          type={type}
          target={target}
          self={self}
          artworks={artworks}
          refSheets={refSheets}
        />
        <PanelSlot
          row={3}
          col={2}
          panels={panels}
          type={type}
          target={target}
          self={self}
          artworks={artworks}
          refSheets={refSheets}
        />
        <PanelSlot
          row={3}
          col={3}
          panels={panels}
          type={type}
          target={target}
          self={self}
          artworks={artworks}
          refSheets={refSheets}
        />
      </div>
    </>
  )
}
