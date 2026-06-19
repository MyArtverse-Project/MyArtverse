"use client"

import { Character } from '@/types/characters'
import { Button } from '@/components/ui/button'
import { Group } from '@/components/ui/group'
import { useEffect, useState } from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import CreateCharacterModal from '@/components/Modals/CreateCharacter'
import { CharacterCard } from '@/components/layouts/Cards'
import Avatar from '@/components/Avatar'
import Checkbox from '@/components/layouts/Forms/Checkbox'
import { LuEye, LuLock } from 'react-icons/lu'
import { useRouter, useSearchParams } from 'next/navigation'
import { displaySpecies } from '@/utils/displayer'

export default function CharactersView({ characters }: { characters: Character[] }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const toggleCreateCharacterModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen)
  }
  useEffect(() => {
    const showModal = searchParams.get('createModal') === 'true'
    if (showModal) {
      setIsCreateModalOpen(true)
      const params = new URLSearchParams(Array.from(searchParams.entries()))
      params.delete('createModal')
      const newUrl = `${window.location.pathname}?${params.toString()}`
      router.replace(newUrl, { scroll: false })
    }
  }, [searchParams, router])

  return (
    <div className="grid">
      <Group
        title="Characters"
        potentialActions={
          <div className="flex items-center gap-x-2">
            <Button onClick={toggleCreateCharacterModal}>Create</Button>
            <Button variant="ghost" size="icon">
              <FaEllipsisVertical size={20} />
            </Button>
          </div>
        }
      >
        {characters.length === 0 ? (

          <div className="flex flex-1 items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl">No one seems to be around...</h1>
              <p className="text-lg">Create a character or import through a Toyhouse account to get started!</p>
            </div>
          </div>

        ) : (
          <table className="border-border w-full border-collapse text-left text-sm">
            <thead className="border-border border-b">
              <tr className="text-muted-foreground">
                <th className='w-10'></th>
                <th className="py-3">Character</th>
                <th className="py-3">Date</th>
                <th className="py-3">Ownership</th>
                <th className="py-3">Visibility</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((characters, index) => (
                <tr key={characters.id} className="border-border hover:bg-muted/50 cursor-pointer border-b" onClick={() => window.location.href = `/studio/characters/${characters.id}`}>
                  <td className="px-2">
                    <Checkbox
                      inputName={`character-select-${index}`}
                      label=''
                      checked={false}
                      onChange={() => { }}
                      disabled={false}
                    />
                  </td>
                  <td className="flex items-center gap-3 py-4">
                    <Avatar size={50} src={characters.avatarUrl} className='rounded-none' />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{characters.name}</span>
                        {characters.mainCharacter && (
                          <span className="text-xs px-2 py-0.5 bg-100 text-700 rounded-full border border-300">
                            Default
                          </span>
                        )}
                        {/* TODO: Toyhou.se Icon */}
                      </div>
                      <div className="text-sm text-gray-500">{displaySpecies(characters.species ?? "")}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    {characters.adoptionStatus ? (
                      <div className="text-purple-600 text-sm">
                        Adopted on {new Date(characters.adoptionStatus.adoptionDate).toLocaleDateString()}
                      </div>
                    ) : (
                      <>
                        <div className="text-purple-600 text-sm">
                          Created
                        </div>
                        <div className="font-medium">{new Date(characters.createdAt).toLocaleDateString()}</div>
                      </>
                    )}

                  </td>
                  <td className="py-4 font-medium">{characters.owner.handle}</td>
                  <td className="py-4">
                    {characters.visibility === 'public' ? (
                      <div className="flex items-center gap-1 text-600">
                        <LuEye size={20} />
                        <span>Public</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-600">
                        <LuLock size={20} />
                        <span>Private</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Group>
      <CreateCharacterModal
        createCharacterModalShown={isCreateModalOpen}
        toggleCreateCharacterModal={toggleCreateCharacterModal}
      />
    </div >
  )
}
