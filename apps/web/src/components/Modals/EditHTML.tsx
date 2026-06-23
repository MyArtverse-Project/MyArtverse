"use client"

import { setHTMLPanel } from "@/utils/api"
import type { DashboardPanel } from "@/types/users"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import DOMPurify from "isomorphic-dompurify"
import { useEffect, useState } from "react"
import { FaCode } from "react-icons/fa"
import { LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

export default function EditHTMLModal({
  toggleEditHTMLModal,
  editHTMLModalShown,
  panels,
  characterName,
}: {
  toggleEditHTMLModal: () => void
  editHTMLModalShown: boolean
  panels?: DashboardPanel[]
  characterName?: string
}) {
  const [errors, setErrors] = useState<string>()
  const [htmlContent, setHtmlContent] = useState(
    "<div>\n   <p>Write your HTML here</p>\n</div>"
  )
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!editHTMLModalShown) return

    const existing = panels?.find((panel) => panel.type === "customHTML")
    setHtmlContent(
      existing?.settings?.html ??
        "<div>\n   <p>Write your HTML here</p>\n</div>"
    )
    setErrors(undefined)
  }, [editHTMLModalShown, panels])

  const submitHTML = async () => {
    setSaving(true)
    try {
      await setHTMLPanel({ html: htmlContent }, characterName)
      setErrors(undefined)
      toggleEditHTMLModal()
      window.location.reload()
    } catch {
      setErrors("Unable to save HTML")
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      className="w-full max-w-2xl px-4"
      toggler={toggleEditHTMLModal}
      state={editHTMLModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaCode />
            HTML editor
          </span>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={toggleEditHTMLModal}
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

      <div className="flex flex-col gap-4 p-4 md:flex-row">
        <Textarea
          className="min-h-48 flex-1 font-mono"
          placeholder="Enter HTML here..."
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
        <div
          className="border-border min-h-48 flex-1 overflow-auto rounded-md border p-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
        />
      </div>

      <div className="flex flex-row items-center justify-end p-4">
        <Button onClick={submitHTML} disabled={saving}>
          {saving ? "Saving..." : "Save HTML"}
        </Button>
      </div>
    </Modal>
  )
}
