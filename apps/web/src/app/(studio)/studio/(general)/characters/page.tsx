import { fetchSelfCharacters } from '@/utils/api'
import { Button } from '@mav/ui/components/buttons'
import { MarginGutter, Group } from '@mav/ui/components/layouts'
import React from 'react'
import { FaEllipsisVertical } from 'react-icons/fa6'
import CharactersView from './CharactersView'

export default async function Page() {
  const characters = await fetchSelfCharacters()
  return (
    <MarginGutter
      screenSize="xl"
      className="px-6 py-5 *:mt-6 *:gap-6 first:*:mt-0"
    >
      <CharactersView characters={characters} />
    </MarginGutter>


  )
}
