'use client'

import { useEffect, useState } from 'react'
import Checkbox from '@/components/layouts/Forms/Checkbox'
import DropZone from '@/components/Modals/DropZone'
import { SelectField } from '@/components/layouts/Forms'
import { Button } from '@/components/ui/button'
import { Group, GroupContainer, MarginGutter } from '@/components/ui/group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Character, ReferenceSheet } from '@/types/characters'
import { furrySpeciesOptions, pronounOptions } from '@/utils/constants'
import { updateCharacter } from '@/utils/api'
import { useRouter } from 'next/navigation'
import RefSheetModal from './Ref/RefSheetModal'
import ManageRefSheetModal from './Ref/ManageRefSheetModal'
import RefSheetThumbnail from './RefSheetThumbnail'

export default function EditCharacter({ character }: { character: Character }) {
  const router = useRouter()
  const [avatarUrl, setAvatarUrl] = useState<string>(character.avatarUrl ?? "")
  const [displayName, setDisplayName] = useState<string>(character.name)
  const [nickname, setNickname] = useState<string>(character.nickname ?? '')
  const [isMainCharacter, setIsMainCharacter] = useState<boolean>(character.mainCharacter)
  const [characterUrl, setCharacterUrl] = useState<string>(character.slug ?? '')
  const [pronouns, setPronouns] = useState<string>(character.attributes.pronouns ?? '')
  const [species, setSpecies] = useState<string>(character.species ?? '')
  const [bio, setBio] = useState<string>(character.attributes.bio ?? '')
  const [isRefModalOpen, setIsRefModalOpen] = useState(false)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [refModalMode, setRefModalMode] = useState<'create' | 'edit'>('create')
  const [editingRefSheet, setEditingRefSheet] = useState<ReferenceSheet | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedAvatarUrl, setSavedAvatarUrl] = useState<string>(
    character.avatarUrl ?? ""
  )

  useEffect(() => {
    setAvatarUrl(character.avatarUrl ?? "")
    setSavedAvatarUrl(character.avatarUrl ?? "")
    setDisplayName(character.name)
    setNickname(character.nickname ?? "")
    setIsMainCharacter(character.mainCharacter)
    setCharacterUrl(character.slug ?? "")
    setPronouns(character.attributes.pronouns ?? "")
    setSpecies(character.species ?? "")
    setBio(character.attributes.bio ?? "")
  }, [character])

  useEffect(() => {
    const changed =
      displayName !== (character.name ?? "") ||
      nickname !== (character.nickname ?? "") ||
      isMainCharacter !== character.mainCharacter ||
      characterUrl !== (character.slug ?? "") ||
      pronouns !== (character.attributes.pronouns ?? "") ||
      species !== (character.species ?? "") ||
      bio !== (character.attributes.bio ?? "") ||
      avatarUrl !== savedAvatarUrl
    setIsDirty(changed)
  }, [displayName, nickname, isMainCharacter, characterUrl, pronouns, species, bio, avatarUrl, savedAvatarUrl, character])

  const handleAvatarUpload = async (url: string) => {
    setAvatarUrl(url)
    try {
      await updateCharacter(character.id, { avatarUrl: url })
      setSavedAvatarUrl(url)
      router.refresh()
    } catch (error) {
      console.error("Failed to save avatar", error)
    }
  }

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
      setSavedAvatarUrl(avatarUrl)
      router.refresh()
    } catch (error) {
      console.error("Failed to save profile settings", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRefSheetSaved = () => {
    setIsRefModalOpen(false)
    setEditingRefSheet(null)
    setRefModalMode('create')
    router.refresh()
  }

  const openCreateRefSheet = () => {
    setRefModalMode('create')
    setEditingRefSheet(null)
    setIsRefModalOpen(true)
  }

  const handleEditRefSheet = (refSheet: ReferenceSheet) => {
    setIsManageModalOpen(false)
    setRefModalMode('edit')
    setEditingRefSheet(refSheet)
    setIsRefModalOpen(true)
  }

  return (
    <>
      <RefSheetModal
        isOpen={isRefModalOpen}
        onClose={() => {
          setIsRefModalOpen(false)
          setEditingRefSheet(null)
          setRefModalMode('create')
        }}
        onSaved={handleRefSheetSaved}
        character={character}
        mode={refModalMode}
        initialRefSheet={editingRefSheet}
      />
      <ManageRefSheetModal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        refSheets={character.refSheets}
        onEdit={handleEditRefSheet}
        onChanged={() => router.refresh()}
      />
      <MarginGutter screenSize="xl" className="px-6 py-5 *:mt-6 *:gap-6 first:*:mt-0">
        <GroupContainer>
          <Group title='Basic Information' description="A nickname field is optional. You can change the name and nickname of your character twice a week. Make sure the name and avatar you chose adheres to the Community Guidelines.">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div className="flex flex-col gap-y-4 w-full lg:w-2/3">
                <div className="space-y-2">
                  <Label htmlFor="character-name">Name</Label>
                  <Input
                    id="character-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <Checkbox
                  inputName=""
                  label="Set this character as my current/main character"
                  checked={isMainCharacter}
                  onChange={() => setIsMainCharacter(!isMainCharacter)}
                />
                <div className="space-y-2">
                  <Label htmlFor="character-nickname">Nickname (optional)</Label>
                  <Input
                    id="character-nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </div>
              </div>
              <DropZone
                key={character.id}
                value={avatarUrl || null}
                setData={handleAvatarUpload}
                className='w-full lg:w-1/3'
              />
            </div>
          </Group>
          <Group title='Character URL' description="This is a shareable URL of your character. It's automatically generated based on the name and species you gave it but you can change it at will anytime or you can reset it.">
            <div className="flex overflow-hidden rounded-md border border-input">
              <div className="bg-muted flex select-none items-center px-3 text-sm">
                @{character.owner.handle}/
              </div>
              <Input
                value={characterUrl}
                onChange={(e) => setCharacterUrl(e.target.value)}
                className="border-0 shadow-none focus-visible:ring-0"
              />
            </div>
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
              <div className="space-y-2">
                <Label htmlFor="character-bio">Bio</Label>
                <Textarea
                  id="character-bio"
                  value={bio}
                  rows={5}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </Group>
          <Group title='Reference sheets' description="Reference sheets will appear in the list if you have this character linked and be shown on the public profile. Learn more">
            <div className='flex flex-col gap-3'>
              {character.refSheets.map(refSheet => (
                <RefSheetThumbnail
                  key={refSheet.id}
                  refSheet={refSheet}
                  onClick={() => handleEditRefSheet(refSheet)}
                />
              ))}
            </div>
            <div className='flex flex-row gap-x-2'>
              <Button onClick={openCreateRefSheet}>
                Add Reference Sheet
              </Button>
              <Button variant="outline" onClick={() => setIsManageModalOpen(true)}>
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
    </>
  )
}
