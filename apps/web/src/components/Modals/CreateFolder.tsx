import { cn } from "@mav/shared/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { LuCheckCircle, LuFolderPlus, LuXCircle } from "react-icons/lu"
import { createFolder } from "../../utils/api"
import Modal from "../layouts/Modal"

export default function CreateFolderModal({
  createFolderModal,
  toggleCreateFolderModal,
  selectedIndex,
  setSelectedIndex,
  parentId = null,
  category,
  colors
}: {
  createFolderModal: boolean
  toggleCreateFolderModal: () => void
  colors: string[]
  selectedIndex: number
  setSelectedIndex: (index: number) => void
  parentId: string | null
  category: "artworks" | "characters"
}) {
  const [folderName, setFolderName] = useState<string>("")
  const [color, _setColor] = useState<string>("")
  const onSubmit = async () => {
    if (!folderName) {
      return alert("Please enter a folder name")
    }

    const data = await createFolder({
      name: folderName,
      contentType: category,
      parentId,
      color: color
    })

    if (data) {
      toggleCreateFolderModal()
      alert("Folder created")
      // TODO: Update the folder list
      window.location.reload()
    }

    alert("Folder successfully failed")
    return
  }

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
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={toggleCreateFolderModal}
          >
            <LuXCircle size={18} />
          </Button>
        </div>
      </Modal.Title>
      <Modal.Body>
        <div className="space-y-2">
          <Label htmlFor="folder-name">Folder name</Label>
          <Input
            id="folder-name"
            onChange={(e) => setFolderName(e.target.value)}
            value={folderName}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          {/* TODO export as a <SelectField /> component */}
          <span className="text-muted-foreground font-bold uppercase">
            Color
          </span>
          <div className="flex flex-wrap gap-2">
            {colors.map((color, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full",
                  color
                )}
                onClick={() => setSelectedIndex(i)}
              >
                {selectedIndex == i ? (
                  <LuCheckCircle className="text-white" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </Modal.Body>
      <div className="flex justify-end gap-x-2 px-4 pb-3">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={onSubmit}>Create</Button>
      </div>
    </Modal>
  )
}
