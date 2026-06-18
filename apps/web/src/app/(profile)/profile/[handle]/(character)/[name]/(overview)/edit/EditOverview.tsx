"use client"

import EditHTMLModal from "@/components/Modals/EditHTML"
import EditPanelModal from "@/components/Modals/EditPanel"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// TODO: Using `@ts-expect-error` here is a temporary workaround until we can
type Position = { row: number; col: number }

export default function EditOverviewPage({ handle, name }: { handle: string; name: string }) {
  const [editHTMLModal, setEditHTMLModal] = useState(false)
  const [editPanelModal, setEditPanelModal] = useState(false)

  const [panelPosition, setPanelPosition] = useState<Position | null>(null)

  const toggleEditHTMLModal = () => setEditHTMLModal(!editHTMLModal)

  const toggleEditPanelModal = (position: Position | null) => {
    setPanelPosition(position)
    setEditPanelModal(!editPanelModal)
  }


  return (
    <>
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-4 px-8 py-6">
        <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
          <Button onClick={toggleEditHTMLModal}>Edit HTML</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button onClick={() => toggleEditPanelModal({ row: 2, col: 1 })}>
              Edit Panel
            </Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button onClick={() => toggleEditPanelModal({ row: 2, col: 2 })}>
              Edit Panel
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button onClick={() => toggleEditPanelModal({ row: 3, col: 1 })}>
              Edit Panel
            </Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button onClick={() => toggleEditPanelModal({ row: 3, col: 2 })}>
              Edit Panel
            </Button>
          </div>
          <div className="flex justify-center border-2 border-dashed border-gray-500 p-4">
            <Button onClick={() => toggleEditPanelModal({ row: 3, col: 3 })}>
              Edit Panel
            </Button>
          </div>
        </div>
      </div>
      <EditHTMLModal
        toggleEditHTMLModal={toggleEditHTMLModal}
        editHTMLModalShown={editHTMLModal}
      />
      <EditPanelModal
        editPanelModalShown={editPanelModal}
        toggleEditPanel={toggleEditPanelModal}
        position={panelPosition}
        characterName={name}
      />
    </>
  )
}
