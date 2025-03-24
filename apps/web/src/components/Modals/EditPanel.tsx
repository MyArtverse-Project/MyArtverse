"use client"

import Image from "next/image"
import { redirect } from "next/navigation"
import { useState } from "react"
import { setPanel } from "@/utils/api"
import { BACKEND_URL } from "@/utils/constants"
import { BRAND } from "@mav/shared"
import { Button } from "@mav/ui/components/buttons"
import { sanitize } from "isomorphic-dompurify"
import { FaCode, FaComment, FaInfoCircle } from "react-icons/fa"
import { FaTrash } from "react-icons/fa6"
import { LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

export default function EditPanelModal({
  toggleEditPanel,
  editPanelModalShown,
  position
}: {
  toggleEditPanel: (position: { row: number; col: number } | null) => void
  editPanelModalShown: boolean
  position: { row: number; col: number } | null
}) {
  const [errors, setErrors] = useState<string>()
  const [choosenComponent, setChoosenComponent] = useState<string>("comments")
  const components = [
    {
      label: "Comments",
      description: "Add comments to your panel",
      value: "comments",
      icon: <FaComment size={18} />
    },
    {
      label: "Information",
      description: `Add information to your panel. Information including when you joined ${BRAND}, your birthday, nationality, and more.`,
      value: "information",
      icon: <FaInfoCircle size={18} />
    }
  ]

  const updatePanel = async () => {
    if (!position) {
      setErrors("Unable to save panel")
      return
    }

    const data = await setPanel({ component: choosenComponent, position })
    if (!data) {
      setErrors("Unable to save panel")
      return
    }

    setErrors(undefined)
    toggleEditPanel(null)
    window.location.reload()
  }

  return (
    <Modal
      className="w-1/2 px-4"
      toggler={() => toggleEditPanel(null)}
      state={editPanelModalShown}
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <FaCode />
            Edit Panel
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={() => toggleEditPanel(null)}
          />
        </div>
      </Modal.Title>
      {errors && (
        <div className="my-3 px-4">
          <Note type="error">{errors}</Note>
        </div>
      )}
      <div className="flex flex-col justify-between gap-y-12 p-4">
        <Image
          src={`/modals/panels/${choosenComponent}.svg`}
          alt="Comment"
          width={250}
          height={250}
          className="mx-auto mb-4 max-h-96 max-w-full rounded-lg border-2 border-gray-300 bg-white p-2 shadow-md"
        />
        <div>
          <span className="font-inter text-lg font-bold">Panel Type</span>
          <div className="mt-2 flex w-1/2 flex-row gap-4">
            {components.map((component) => (
              <Button
                key={component.value}
                variant="primary"
                className="flex size-12 items-center gap-x-2"
                icon={component.icon}
                position="center"
                onClick={() => setChoosenComponent(component.value)}
              />
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl">
              Choosen Option:{" "}
              {components.find((c) => c.value === choosenComponent)?.label}
            </h2>
            <p className="text-lg text-gray-500">
              {
                components.find((c) => c.value === choosenComponent)
                  ?.description
              }
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end p-4">
        <Button onClick={updatePanel}>Save</Button>
      </div>
    </Modal>
  )
}
