'use client'

import { useEffect, useState } from 'react'
import Checkbox from '@/components/layouts/Forms/Checkbox'
import MarginClamp from '@/components/layouts/Layouts/MarginClamp'
import DropZone from '@/components/Modals/DropZone'
import { Character } from '@/types/characters'
import { Group, GroupContainer, MarginGutter } from '@mav/ui/components/layouts'
import { InputField, Textarea } from '@mav/ui/components/fields'
import { SelectField } from '@/components/layouts/Forms'
import { furrySpeciesOptions, pronounOptions } from '@/utils/constants'
import { Button } from '@mav/ui/components/buttons/Button'
import { updateCharacter } from '@/utils/api'
import { redirect } from 'next/navigation'

export default function EditCharacter({ character }: { character: Character }) {
  const [avatarUrl, setAvatarUrl] = useState<string>(character.avatarUrl)
  const [displayName, setDisplayName] = useState<string>(character.name)
  const [nickname, setNickname] = useState<string>(character.nickname ?? '')
  const [isMainCharacter, setIsMainCharacter] = useState<boolean>(character.mainCharacter)
  const [characterUrl, setCharacterUrl] = useState<string>(character.slug ?? '')
  const [pronouns, setPronouns] = useState<string>(character.attributes.pronouns ?? '')
  const [species, setSpecies] = useState<string>(character.species ?? '')
  const [bio, setBio] = useState<string>(character.attributes.bio ?? '')

  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const changed =
      displayName !== (character.name ?? "") ||
      nickname !== (character.nickname ?? "") ||
      isMainCharacter !== character.mainCharacter ||
      characterUrl !== (character.slug ?? "") ||
      pronouns !== (character.attributes.pronouns ?? "") ||
      species !== (character.species ?? "") ||
      bio !== (character.attributes.bio ?? "")
    setIsDirty(changed)
  }, [displayName, nickname, isMainCharacter, characterUrl, pronouns, species, bio])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const attributes = {
        pronouns,
        bio,
        gender: character.attributes.gender ?? "",
        preferences: character.attributes.preferences ?? { likes: "", dislikes: "" },
        custom_fields: character.attributes.custom_fields ?? [],
      }
      await updateCharacter(character.id, {
        name: displayName,
        nickname,
        mainCharacter: isMainCharacter,
        slug: characterUrl,
        attributes,
        species,
        avatarUrl
      })
      setIsDirty(false)
      redirect('/studio/characters')
    } catch (error) {
      console.error("Failed to save profile settings", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <MarginGutter screenSize="xl" className="px-6 py-5 *:mt-6 *:gap-6 first:*:mt-0">
      <GroupContainer>
        <Group title='Basic Information' description="A nickname field is optional. You can change the name and nickname of your character twice a week. Make sure the name and avatar you chose adheres to the Community Guidelines.">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex flex-col gap-y-4 w-full lg:w-2/3">
              <InputField
                inputName="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <Checkbox
                inputName=""
                label="Set this character as my current/main character"
                checked={isMainCharacter}
                onChange={() => setIsMainCharacter(!isMainCharacter)}
              />
              <InputField
                inputName="Nickname (optional)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <DropZone
              value={avatarUrl}
              setData={setAvatarUrl}
              className='w-full lg:w-1/3'
            />
          </div>
        </Group>
        <Group title='Character URL' description="This is a shareable URL of your character. It’s automatically generated based on the name and species you gave it but you can change it at will anytime or you can reset it.">
          <InputField
            inputName=""
            value={characterUrl}
            onChange={(e) => setCharacterUrl(e.target.value)}
            prefix={`@${character.owner.handle}/`}
          />
        </Group>
        <Group title='Properties' description="Add an attribute(s) that best represents your character.">
          <div className="flex flex-col gap-4">
            <div className='flex flex-row gap-4'>
              <SelectField
                inputName="Pronouns"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                options={pronounOptions}
              />
              <SelectField
                inputName="Species"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                options={furrySpeciesOptions}
              />
            </div>
            <Textarea
              inputName="Bio"
              value={bio}
              heightLimit={5}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </Group>
        <Group title='Reference sheets' description="Reference sheets will appear in the list if you have this character linked and be shown on the public profile. Learn more">
          <div className='flex flex-row gap-x-2'>
            <Button
              variant="primary"
              onClick={() => {}}
            >
              Add Reference Sheet
            </Button>
            <Button
              variant="secondary"
              onClick={() => {}}
            >
              Manage Reference Sheet
            </Button>
          </div>
        </Group>
      </GroupContainer>
      {isDirty && (
        <div className="flex justify-end mt-4">
          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </MarginGutter>
  )
}
