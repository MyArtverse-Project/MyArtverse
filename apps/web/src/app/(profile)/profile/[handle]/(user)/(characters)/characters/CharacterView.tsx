"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import CreateFolderModal from "@/components/Modals/CreateFolder"
import { FursonaCard, PinnedCharacter } from "@/components/layouts/Cards"
import FolderView from "@/components/layouts/Folders"
import { SearchBox } from "@/components/layouts/Forms"
import GridResponsive from "@/components/layouts/Layouts/GridResponsive"
import { folderColors } from "@/utils/constants"
import { Button } from "@mav/ui/components/buttons"
import { LuFilter as FilterIcon, LuCog, LuPlus } from "react-icons/lu"
import type { Character, CharacterResponse, Folder } from "@/types/characters"

export default function CharacterView({
  handle,
  characters,
  folders,
  owner = false,
}: {
  handle: string
  characters: CharacterResponse
  folders: Folder[]
  owner: boolean
}) {
  const router = useRouter()
  const [createFolderModal, setFolderModalState] = useState(false)
  const toggleCreateFolderModal = () => setFolderModalState(!createFolderModal)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [parentFolderId, setParentFolderId] = useState<string | null>(null)
  const activeRefSheets = characters.mainCharacter?.refSheets
    .find((r) => r.active)
    ?.variants.find((v) => v.main)
    
  const mainCharacter = characters.mainCharacter

  return (
    <FolderView>
      <FolderView.Shelf defaultName="All characters">
        {folders
          .filter((folder) => !folder.parentId)
          .map((folder) => (
            <FolderView.Item
              key={folder.id}
              name={folder.name}
              color={folder.color}
            >
              {folder.children?.map((child) => (
                <FolderView.Item
                  key={child.id}
                  name={child.name}
                  color={child.color}
                  nestedItem
                />
              ))}
              <FolderView.Item
                newItem
                nestedItem
                onClick={() => {
                  setParentFolderId(folder.id)
                  toggleCreateFolderModal()
                }}
              />
            </FolderView.Item>
          ))}
        <FolderView.Item newItem onClick={toggleCreateFolderModal} />
      </FolderView.Shelf>
      <FolderView.Contents>
        <div className="mb-4 flex w-full gap-x-2.5">
          <div className="max-w-full flex-grow">
            <SearchBox placeholder="Search for characters" />
          </div>
          <Button icon={<FilterIcon size={20} />}>Filter</Button>
          {owner && (
            <>
              <Button
                onClick={() => router.push("/dashboard/characters")}
                icon={<LuCog size={20} />}
              >
                Manage Character
              </Button>
              <Button
                onClick={() =>
                  router.push("/dashboard/characters?createModal=true")
                }
                icon={<LuPlus size={20} />}
              >
                Create Character
              </Button>
            </>
          )}
        </div>
        {/* {characters.mainCharacter && (
          <PinnedCharacter
            artist={"Unknown artist"}
            colors={characters.mainCharacter.refSheets[0].colors}
            avatar={characters.mainCharacter.avatarUrl || "/UserProfile.png"}
            name={characters.mainCharacter.name}
            species={characters.mainCharacter.species}
            refSheetImg={
              activeRefSheets
                ? activeRefSheets.url
                : "/DefaultRefrenceSheet.png"
            }
          />
        )} */}

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
              href={`/@${handle}/${character.name}`}
            />
          ))}
        </GridResponsive>
      </FolderView.Contents>
      <CreateFolderModal
        createFolderModal={createFolderModal}
        toggleCreateFolderModal={toggleCreateFolderModal}
        colors={folderColors}
        parentId={parentFolderId}
        category="characters"
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </FolderView>
  )
}
