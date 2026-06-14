"use client"

import { setPanel } from "@/utils/api"
import { BRAND } from "@mav/shared"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState } from "react"
import { FaCode, FaComment, FaInfoCircle } from "react-icons/fa"
import { LuCat, LuGalleryHorizontal, LuSheet, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import Note from "../layouts/Note"

export default function EditPanelModal({
  toggleEditPanel,
  editPanelModalShown,
  position,
  characterName
}: {
  toggleEditPanel: (position: { row: number; col: number } | null) => void
  editPanelModalShown: boolean
  position: { row: number; col: number } | null
  characterName?: string
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
      description: `List of information`,
      value: "information",
      icon: <FaInfoCircle size={18} />
    },
    {
      label: "Featured Gallery",
      description: `List of featured images`,
      value: "featured_gallery",
      icon: <LuGalleryHorizontal size={18} />
    },
    {
      label: "Featured artwork",
      description: `A artwork featured`,
      value: "featured_artwork",
      icon: <LuCat size={18} />
    },
    {
      label: "Reference Sheet",
      description: `A reference sheet for the character`,
      value: "reference_sheet",
      icon: <LuSheet size={18} />
    }
  ]

  const updatePanel = async () => {
    if (!position) {
      setErrors("Unable to save panel")
      return
    }

    const data = await setPanel({ component: choosenComponent, position }, characterName)
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
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={() => toggleEditPanel(null)}
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
      <div className="flex flex-col justify-between gap-y-12 p-4">
        <Image
          src={`/modals/panels/${choosenComponent}.svg`}
          alt="Comment"
          width={250}
          height={250}
          className="border-border mx-auto mb-4 max-h-96 max-w-full rounded-lg border bg-white p-2 shadow-md"
        />
        <div>
          <span className="font-inter text-lg font-bold">Panel Type</span>
          <div className="mt-2 flex w-1/2 flex-row gap-4">
            {components.map((component) => (
              <Button
                key={component.value}
                variant={
                  choosenComponent === component.value ? "default" : "secondary"
                }
                size="icon"
                aria-label={component.label}
                onClick={() => setChoosenComponent(component.value)}
              >
                {component.icon}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl">
              Choosen Option:{" "}
              {components.find((c) => c.value === choosenComponent)?.label}
            </h2>
            <p className="text-muted-foreground text-lg">
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
