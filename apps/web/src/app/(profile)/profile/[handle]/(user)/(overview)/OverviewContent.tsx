'use client'

import Image from "next/image"
import React from "react"
import { Button } from "@mav/ui/components/buttons"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import { sanitize } from "isomorphic-dompurify"
import type { DashboardPanel, UserType } from "@/types/users"
import CommentPanel from "./panels/Comments/CommentPanel"
import InformationPanel from "./panels/InformationPanel"
import { useAuth, type User } from "@/app/context/AuthContext"

function renderPanel(panel: DashboardPanel, userData: UserType, self?: User | null) {
  switch (panel.type) {
    case "customHTML":
      return null
    case "comments":
      return <CommentPanel comments={userData.comments} user={userData} self={self} />
    case "information":
      return <InformationPanel user={userData} />
    default:
      return <div>Unknown Panel Type</div>
  }
}

export default function OverviewContent({
  handle,
  panels,
  userData
}: {
  handle: string
  panels: DashboardPanel[]
  userData: UserType
}) {
  const { user: self } = useAuth()
  const customHTMLPanel = panels.find((panel) => panel.type === "customHTML")
  const htmlContent = customHTMLPanel?.settings?.html
    ? sanitize(customHTMLPanel.settings.html)
    : ""

  return (
    <div className="mx-auto max-w-screen-2xl px-8 py-6">
      <div className="bg-100 col-span-2 mb-4 flex w-full flex-col gap-4 rounded-lg ">
        <Button
          variant="secondary"
          className="mb-4 self-end"
          href={`/@${handle}/edit`}
        >
          Edit Panels
        </Button>
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
              {renderPanel(panel, userData, self)}
            </div>
          ))}
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        {panels
          .filter((panel) => panel.position.row === 3)
          .map((panel, index) => (
            <div key={index} className="p-4">
              {renderPanel(panel, userData, self)}
            </div>
          ))}
      </div>
    </div>
  )
}
