"use client"

import { Character } from '@/types/characters'
import { Button } from '@mav/ui/components/buttons'
import { Group } from '@mav/ui/components/layouts'
import React from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import CreateCharacterModal from '@/components/Modals/CreateCharacter'
import { CharacterCard } from '@/components/layouts/Cards'

export default function CharactersView({ characters }: { characters: Character[] }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false)
  const toggleCreateCharacterModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }

  return (
    <div className="grid">
      <Group
        title="Characters"
        potentialActions={
          <div className="flex items-center gap-x-2">
            <Button onClick={toggleCreateCharacterModal}>Create</Button>
            <Button icon={<FaEllipsisVertical size={20} />} />
          </div>
        }
      >
        <div className="flex flex-1 items-center justify-center min-h-[60vh]">
          {characters.length === 0 ? (
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl">No one seems to be around...</h1>
              <p className="text-lg">Create a character or import through a Toyhouse account to get started!</p>
            </div>
          ) : (
      <div>
        
      </div>
          )}
        </div>
      </Group>
      <CreateCharacterModal
        createCharacterModalShown={isCreateModalOpen}
        toggleCreateCharacterModal={toggleCreateCharacterModal}
      />
    </div>
  )
}
