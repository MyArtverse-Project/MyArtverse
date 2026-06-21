"use client"
import { setHTMLPanel } from "@/utils/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import DOMPurify from "isomorphic-dompurify"
import { useState } from "react"
import { FaCode } from "react-icons/fa"
import { LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

export default function EditHTMLModal({
  toggleEditHTMLModal,
  editHTMLModalShown
}: {
  toggleEditHTMLModal: () => void
  editHTMLModalShown: boolean
}) {
  const [errors, setErrors] = useState<string>()
  const [htmlContent, setHtmlContent] = useState<string>(
    "<div>\n   <p>Write your HTML Here</p>\n</div>"
  )

  const submitHTML = async () => {
    const data = await setHTMLPanel({ html: htmlContent })
    if (!data) {
      setErrors("Unable to save HTML")
      return
    }

    setErrors(undefined)
    toggleEditHTMLModal()
  }

  return (
    <Modal
      className="w-1/2 px-4"
      toggler={toggleEditHTMLModal}
      state={editHTMLModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaCode />
            HTML Editor
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
      {errors && (
        <div className="my-3 px-4">
          <Note type="error">{errors}</Note>
        </div>
      )}
      <div className="flex flex-row gap-4 p-4">
        <Textarea
          className="h-40 w-1/2 font-mono"
          placeholder="Enter HTML here..."
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
        <div
          className="border-border h-40 w-1/2 overflow-auto rounded-md border p-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlContent) }}
        />
      </div>
      <div className="flex flex-row items-center justify-end p-4">
        <Button onClick={submitHTML}>Save HTML</Button>
      </div>
    </Modal>
  )
}
