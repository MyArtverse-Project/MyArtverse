"use client"

import EditHTMLModal from "@/components/Modals/EditHTML"
import { Button } from "@mav/ui/components/buttons"
import { useState } from "react"

// TODO: Using `@ts-expect-error` here is a temporary workaround until we can

export default function Page() {
  const [editHTMLModal, setEditHTMLModal] = useState(false)
  const toggleEditHTMLModal = () => setEditHTMLModal(!editHTMLModal)

  return (
    <>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 px-8 py-6">
        <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
          <Button onClick={toggleEditHTMLModal}>Edit HTML</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button>Edit</Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button>Edit</Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button>Edit</Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button>Edit</Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button>Edit</Button>
          </div>
        </div>
      </div>
      <EditHTMLModal toggleEditHTMLModal={toggleEditHTMLModal} editHTMLModalShown={editHTMLModal} />
    </>
  )
}
