"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { LuFilter as FilterIcon, LuCog, LuPlus } from "react-icons/lu"
import type { CharacterResponse } from "@/types/characters"
import FolderView from "@/components/layouts/Folders"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import { Button } from "@mav/ui/components/buttons"
import { FursonaCard, PinnedCharacter } from "@/components/layouts/Cards"
import { SearchBox } from "@/components/layouts/Forms"
import CreateFolderModal from "@/components/Modals/CreateFolder"
import { folderColors } from "@/utils/constants"

export default function CharacterView({
  handle,
  characters
}: {
  handle: string
  characters: CharacterResponse
}) {
  const router = useRouter()
  const [createFolderModal, setFolderModalState] = useState(false)
  const toggleCreateFolderModal = () => setFolderModalState(!createFolderModal)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const activeRefSheets = characters.mainCharacter?.refSheets.find((r) => r.active)?.variants.find((v) => v.main)

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
        <Button icon={<FilterIcon size={20} />}>Filter</Button>
        {/* TODO: Display if logged in */}
        <Button
          onClick={() => router.push("/dashboard/characters")}
          icon={<LuCog size={20} />}
        >
          Manage Character
        </Button>
        <Button
          onClick={() => router.push("/dashboard/characters?createModal=true")}
          icon={<LuPlus size={20} />}
        >
          Create Character
        </Button>
      </div>
      {characters.mainCharacter && (
        <PinnedCharacter
          artist={"Unknown artist"}
          colors={characters.mainCharacter.refSheets[0].colors}
          avatar={characters.mainCharacter.avatarUrl || "/UserProfile.png"}
          name={characters.mainCharacter.name}
          species={characters.mainCharacter.species}
          refSheetImg={
            activeRefSheets ? activeRefSheets.url : "/DefaultRefrenceSheet.png"
          }
        />
      )}

      <GridResponsive breakpoint={250} className="gap-1.5" role="listbox">
        {characters.characters.map((character, index) => (
          <FursonaCard
            key={index}
            img={character.avatarUrl || "/UserProfile.png"}
            name={character.name}
            species={character.species}
            palette={
              characters.mainCharacter!.refSheets[index]
                ? characters.mainCharacter!.refSheets[index].colors
                : []
            }
            status="owned"
            href={`/profile/${handle}/character/${character.name}`}
          />
        ))}
      </GridResponsive>
    </FolderView.Contents>
    <CreateFolderModal
      createFolderModal={createFolderModal}
      toggleCreateFolderModal={toggleCreateFolderModal}
      colors={folderColors}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
    />
  </FolderView>
  )
}
