"use client"

import { useState } from "react"
import { CheckCircle2Icon, FolderPlus, XIcon } from "lucide-react"
import { FolderView, GridResponsive, Modal } from "@/components/ui"
import { FursonaCard, PinnedCharacter } from "@/components/ui/Cards"
import { Button } from "@/components/ui/Buttons"
import { InputField } from "@/components/ui/Forms"
import clsx from "clsx"

export default function CharacterView() {
  const [createFolderModal, setFolderModalState] = useState(false)

  const toggleCreateFolderModal = () => {
    setFolderModalState(!createFolderModal)
    return
  }

  const [selectedIndex, setSelectedIndex] = useState(0)

  const colors = [
    "bg-gray-400",
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-blue-400",
    "bg-violet-400",
    "bg-purple-400",
    "bg-pink-400"
  ]

  return (
    <FolderView>
      <FolderView.Shelf defaultName="All characters">
        {/* TODO implement drag and drop onto this thing */}
        <FolderView.Item name="Personal" />
        <FolderView.Item name="Adopts">
          <FolderView.Item name="For sale" nestedItem />
          <FolderView.Item name="Adopted" nestedItem />
          {/* TODO only show "new folder" item when user is logged in */}
          <FolderView.Item
            newItem
            nestedItem
            onClick={toggleCreateFolderModal}
          />
        </FolderView.Item>
        <FolderView.Item name="From trades" />
        <FolderView.Item newItem onClick={toggleCreateFolderModal} />
      </FolderView.Shelf>
      <FolderView.Contents>
        <PinnedCharacter
          artist="Ratking"
          characterColors={[{ color: "cyan", name: "cyan" }, { color: "yellow", name: "yellow" }, { color: "purple", name: "purple" }, { color: "white", name: "white" }]}
          characterImage="/img/hero/renzo-snowglobe.jpg"
          characterName="Kuroji"
          characterSpecies="Raccoon-Fox-Dragon"
          refSheetImage="/img/examples/kuro/kuro-refsheet.png"
        />
        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {[...Array(10)].map((_, i) => (
            <FursonaCard
              key={i}
              name={"Renzo"}
              img={"/img/hero/renzo-snowglobe.jpg"}
              species="Raccoon-Fox-Dragon"
              status="owned"
              role="listitem"
            />
          ))}
        </GridResponsive>
      </FolderView.Contents>
      <Modal
        state={createFolderModal}
        toggler={toggleCreateFolderModal}
        className="md:w-[600px] w-full"
      >
        <Modal.Title>
          <div className="flex items-center justify-between w-full">
            <span className="flex items-center gap-x-2 text-xl font-inter font-bold">
              <FolderPlus />
              Add new folder
            </span>
            <Button
              size="small"
              variant="tritery"
              iconOnly
              onClick={toggleCreateFolderModal}
            >
              <XIcon size={18} />
            </Button>
          </div>
        </Modal.Title>
        <div className="px-4 pb-3 flex flex-col gap-y-1">
          <InputField inputName="Folder name" />
          <div className="flex flex-col gap-y-1">
            {/* TODO export as a <SelectField /> component */}
            <span className="uppercase text-600 font-bold">Color</span>
            <div className="flex flex-wrap gap-2">
              {colors.map((color, i) => (
                <Button
                  key={i}
                  className={clsx(
                    "rounded-full h-10 w-10 grid place-items-center",
                    color
                  )}
                  onClick={() => setSelectedIndex(i)}
                >
                  {selectedIndex == i ? (
                    <CheckCircle2Icon className="text-100" />
                  ) : null}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-2 px-4 pb-3">
          <Button variant="secondary">Cancel</Button>
          <Button>Create</Button>
        </div>
      </Modal>
    </FolderView>
  )
}
