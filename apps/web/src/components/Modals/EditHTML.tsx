"use client"

import { redirect } from "next/navigation"
import { useState } from "react"
import { setHTMLPanel } from "@/utils/api"
import { BACKEND_URL } from "@/utils/constants"
import { Button } from "@mav/ui/components/buttons"
import { sanitize } from "isomorphic-dompurify"
import { FaCode } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

export default function EditHTMLModal({
  toggleEditHTMLModal,
  editHTMLModalShown,
}: {
  toggleEditHTMLModal: () => void
  editHTMLModalShown: boolean
}) {
  const [errors, setErrors] = useState<string>()
  const [htmlContent, setHtmlContent] = useState<string>(
    "<div>\n   <p>Write your HTML Here</p>\n</div>",
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
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleEditHTMLModal}
          />
        </div>
      </Modal.Title>
      {errors && (
        <div className="my-3 px-4">
          <Note type="error">{errors}</Note>
        </div>
      )}
      <div className="flex flex-row gap-4 p-4">
        <textarea
          className="bg-200 h-40 w-1/2 border p-2 font-mono"
          placeholder="Enter HTML here..."
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        />
        <div
          className="h-40 w-1/2 overflow-auto border p-2"
          dangerouslySetInnerHTML={{ __html: sanitize(htmlContent) }}
        />
      </div>
      <div className="flex flex-row items-center justify-end p-4">
        <Button onClick={submitHTML}>Save HTML</Button>
      </div>
    </Modal>
  )
}
