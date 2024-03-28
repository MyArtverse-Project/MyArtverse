"use client"

import { useState } from "react"
import { FolderView, GridResponsive, Modal } from "@/components/ui"
import { Button } from "@/components/ui/Buttons"
import { FursonaCard, PinnedCharacter } from "@/components/ui/Cards"
import { InputField } from "@/components/ui/Forms"
import SearchBox from "@/components/ui/Forms/SearchBox"
import cn from "@/utils/cn"
import {
  LuCheckCircle2 as CheckCircle2Icon,
  LuFilter as FilterIcon,
  LuFolderPlus as FolderPlus,
  LuX as XIcon
} from "react-icons/lu"
import type { CharacterResponse } from "@/types/characters"

export default function CharacterView({
  handle,
  characters
}: {
  handle: string
  characters: CharacterResponse
}) {
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
          <FolderView.Item newItem nestedItem onClick={toggleCreateFolderModal} />
        </FolderView.Item>
        <FolderView.Item name="From trades" />
        <FolderView.Item newItem onClick={toggleCreateFolderModal} />
      </FolderView.Shelf>
      <FolderView.Contents>
        <div className="mb-4 flex w-full gap-x-2.5">
          <SearchBox placeholder="Search for characters" />
          <Button prefixIcon={<FilterIcon size={20} />}>Filter</Button>
        </div>
        {characters.mainCharacter && (
          <PinnedCharacter
            artist="Ratking"
            colors={[
              { color: "cyan", name: "cyan" },
              { color: "yellow", name: "yellow" },
              { color: "purple", name: "purple" },
              { color: "white", name: "white" }
            ]}
            avatar={characters.mainCharacter.avatarUrl || "/UserProfile.png"}
            name={characters.mainCharacter.name}
            species={characters.mainCharacter.species}
            refSheetImg={characters.mainCharacter.reference_sheet_url || "/GenericBG.png"}
          />
        )}

        <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
          {characters.characters.map((character, index) => (
            <FursonaCard
              key={index}
              img={character.avatarUrl || "/UserProfile.png"}
              name={character.name}
              species={character.species}
              status="owned"
              href={`/profile/${handle}/character/${character.name}`}
            />
          ))}
        </GridResponsive>
      </FolderView.Contents>
      <Modal
        state={createFolderModal}
        toggler={toggleCreateFolderModal}
        className="w-full md:w-[600px]"
      >
        <Modal.Title>
          <div className="flex w-full items-center justify-between">
            <span className="font-inter flex items-center gap-x-2 text-xl font-bold">
              <FolderPlus />
              Add new folder
            </span>
            <Button
              size="small"
              variant="tritery"
              icon={<XIcon size={18} />}
              onClick={toggleCreateFolderModal}
            />
          </div>
        </Modal.Title>
        <div className="flex flex-col gap-y-1 px-4 pb-3">
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
                  {selectedIndex == i ? <CheckCircle2Icon className="text-100" /> : null}
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
