import React from "react"
import { LuCheckCircle, LuFolderPlus, LuXCircle } from "react-icons/lu"
import Modal from "../layouts/Modal"
import { cn } from "@mav/shared/utils"
import { InputField } from "@mav/ui/components/fields"
import { Button } from "@mav/ui/components/buttons"

export default function CreateFolderModal({
  createFolderModal,
  toggleCreateFolderModal,
  colors: colors,
  selectedIndex,
  setSelectedIndex
}: {
  createFolderModal: boolean
  toggleCreateFolderModal: () => void
  colors: string[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}) {
  return (
    <Modal
      state={createFolderModal}
      toggler={toggleCreateFolderModal}
      className="w-full md:w-[600px]"
    >
      <Modal.Title>
        <div className="flex w-full items-center justify-between">
          <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
            <LuFolderPlus />
            Add new folder
          </span>
          <Button
            size="small"
            variant="tritery"
            icon={<LuXCircle size={18} />}
            onClick={toggleCreateFolderModal}
          />
        </div>
      </Modal.Title>
      <Modal.Body>
        <InputField inputName="Folder name" />
        <div className="flex flex-col gap-y-1">
          {/* TODO export as a <SelectField /> component */}
          <span className="text-600 font-bold uppercase">Color</span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, i) => (
              <Button
                key={i}
                className={cn("grid h-10 w-10 place-items-center rounded-full", color)}
                onClick={() => setSelectedIndex(i)}
              >
                {selectedIndex == i ? <LuCheckCircle className="text-100" /> : null}
              </Button>
            ))}
          </div>
        </div>
      </Modal.Body>
      <div className="flex justify-end gap-x-2 px-4 pb-3">
        <Button variant="secondary">Cancel</Button>
        <Button>Create</Button>
      </div>
    </Modal>
  )
}
