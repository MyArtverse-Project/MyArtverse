"use client"

import { useAuth } from "@/app/context/AuthContext"
import PanelGrid from "@/components/layouts/Panels/PanelGrid"
import type { Artwork } from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import { Button } from "@/components/ui/button"
import DOMPurify from "isomorphic-dompurify"
import Link from "next/link"

export default function OverviewContent({
  handle,
  panels,
  userData,
  artworks = [],
}: {
  handle: string
  panels: DashboardPanel[]
  userData: UserType
  artworks?: Artwork[]
}) {
  const { user: self } = useAuth()
  const customHTMLPanel = panels.find((panel) => panel.type === "customHTML")
  const htmlContent = customHTMLPanel?.settings?.html
    ? DOMPurify.sanitize(customHTMLPanel.settings.html)
    : ""

  return (
    <div className="mx-auto max-w-screen-2xl px-8 py-6">
      <div className="bg-100 col-span-2 mb-4 flex w-full flex-col gap-4 rounded-lg">
        {self?.id === userData.id && (
          <Button variant="secondary" className="mb-4 self-end" asChild>
            <Link href={`/@${handle}/edit`}>Edit Panels</Link>
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
        type="user"
        target={userData}
        self={self}
        artworks={artworks}
        characters={userData.characters ?? []}
      />
    </div>
  )
}
