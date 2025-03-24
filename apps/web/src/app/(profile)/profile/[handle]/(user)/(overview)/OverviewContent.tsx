import Image from "next/image"
import { Button } from "@headlessui/react"
import React from "react"
import { UserComment, UserCommentInput } from "@mav/ui/components/comments"
import { Group } from "@mav/ui/components/layouts"
import { sanitize } from "isomorphic-dompurify"
import { DashboardPanel } from "@/types/users"
import CommentPanel from "./panels/CommentPanel"

export default function OverviewContent({
  handle,
  panels
}: {
  handle: string
  panels: DashboardPanel[]
}) {
  const html = panels.find((panel) => panel.type == "customHTML")?.settings
    ?.html

  return (
    <>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 px-8 py-6">
        <div
          dangerouslySetInnerHTML={{ __html: sanitize(html || "") }}
          className="col-span-2 w-full"
        ></div>
        <aside className="flex flex-col gap-y-3">
          <Group title="About user"></Group>
          <CommentPanel />
        </aside>
      </div>
    </>
  )
}
