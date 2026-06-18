import { User } from "@/app/context/AuthContext"
import { renderPanel } from "@/components/layouts/Panels/RenderPanel"
import { Button } from "@/components/ui/button"
import { Character } from "@/types/characters"
import { DashboardPanel } from "@/types/users"
import DOMPurify from "dompurify"
import Link from "next/link"

export default function OverviewContent({ character, self, panels }: { character: Character; self: User | null; panels: DashboardPanel[] }) {
  const customHTMLPanel = panels.find((panel) => panel.type === "customHTML")
  const htmlContent = customHTMLPanel?.settings?.html
    ? DOMPurify.sanitize(customHTMLPanel.settings.html)
    : ""

  return (
    <div className="mx-auto max-w-screen-2xl px-8 py-6">
      <div className="bg-100 col-span-2 mb-4 flex w-full flex-col gap-4 rounded-lg ">
        {self?.id === character.owner.id && (
          <Button
            variant="outline"
            className="mb-4 self-end"
            asChild
          >
            <Link href={`/@${self?.handle}/${character.slug}/edit`}>
              Edit Panels
            </Link>
          </Button>
        )}
        {htmlContent && (
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="w-full"
          />
        )}
      </div>

      <div className="mb-4 grid w-full grid-cols-2 gap-4">
        {panels
          .filter((panel) => panel.position.row === 2)
          .map((panel, index) => (
            <div key={index} className="p-4">
              {renderPanel(panel, 'character', character, self)}
            </div>
          ))}
      </div>

      <div className="grid w-full grid-cols-3 gap-4">
        {panels
          .filter((panel) => panel.position.row === 3)
          .map((panel, index) => (
            <div key={index} className="p-4">
              {renderPanel(panel, 'character', character, self)}
            </div>
          ))}
      </div>
    </div>
  )
}
