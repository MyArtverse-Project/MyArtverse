"use client"

import PanelGrid from "@/components/layouts/Panels/PanelGrid"
import { Button } from "@/components/ui/button"
import type { Artwork, Character } from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"

export default function OverviewContent({
  character,
  self,
  panels,
  artworks = [],
}: {
  character: Character
  self: UserType | null
  panels: DashboardPanel[]
  artworks?: Artwork[]
}) {
  const customHTMLPanel = panels.find((panel) => panel.type === "customHTML")
  const htmlContent = customHTMLPanel?.settings?.html
    ? DOMPurify.sanitize(customHTMLPanel.settings.html)
    : ""

  return (
    <div className="mx-auto max-w-screen-2xl px-8 py-6">
      <div className="bg-100 col-span-2 mb-4 flex w-full flex-col gap-4 rounded-lg">
        {self?.id === character.owner?.id && (
          <Button variant="outline" className="mb-4 self-end" asChild>
            <Link href={`/@${self?.handle}/${character.slug}/edit`}>
              Edit Panels
            </Link>
          </Button>
        )}
        {htmlContent ? (
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="w-full"
          />
        ) : null}
      </div>

      <PanelGrid
        panels={panels}
        type="character"
        target={character}
        self={self}
        artworks={artworks}
        refSheets={character.refSheets ?? []}
      />
    </div>
  )
}
