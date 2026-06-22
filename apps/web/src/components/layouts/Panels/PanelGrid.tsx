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
  characters,
}: {
  row: number
  col: number
  panels: DashboardPanel[]
  type: "user" | "character"
  target: UserType | Character
  self: User | UserType | null
  artworks: Artwork[]
  refSheets: ReferenceSheet[]
  characters: Character[]
}) {
  const panel = panels.find(
    (item) => item.position.row === row && item.position.col === col
  )

  if (!panel || panel.type === "customHTML") {
    return null
  }

  return (
    <div className="min-h-[12rem]">
      {renderPanel(
        panel,
        type,
        target,
        self,
        artworks,
        refSheets,
        characters
      )}
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
  characters = [],
}: {
  panels: DashboardPanel[]
  type: "user" | "character"
  target: UserType | Character
  self: User | UserType | null
  artworks?: Artwork[]
  refSheets?: ReferenceSheet[]
  characters?: Character[]
}) {
  const slotProps = {
    panels,
    type,
    target,
    self,
    artworks,
    refSheets,
    characters,
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <PanelSlot row={2} col={1} {...slotProps} />
        <PanelSlot row={2} col={2} {...slotProps} />
      </div>

      <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <PanelSlot row={3} col={1} {...slotProps} />
        <PanelSlot row={3} col={2} {...slotProps} />
        <PanelSlot row={3} col={3} {...slotProps} />
      </div>
    </div>
  )
}
