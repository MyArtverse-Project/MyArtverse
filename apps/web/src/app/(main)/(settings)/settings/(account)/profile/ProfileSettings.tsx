"use client"

import { UserType } from "@/types/users"
import { pronounOptions } from "@/utils/constants"
import { Button } from "@mav/ui/components/buttons"
import { InputField } from "@mav/ui/components/fields"
import { Group, GroupContainer } from "@mav/ui/components/layouts"
import { SelectField } from "@/components/layouts/Forms"
import { useEffect, useState } from "react"
import { updateProfile } from "@/utils/api"
import DropZone from "@/components/Modals/DropZone"


export default function ProfileSettings({ user }: { user: UserType }) {
  const [displayName, setDisplayName] = useState(user.displayName ?? "")
  const [handle, setHandle] = useState(user.handle)
  const [pronouns, setPronouns] = useState(user.pronouns ?? "")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const changed =
      displayName !== (user.displayName ?? "") ||
      handle !== user.handle ||
      pronouns !== (user.pronouns ?? "") ||
      avatarUrl !== (user.avatarUrl ?? "")
    setIsDirty(changed)
  }, [displayName, handle, pronouns, user])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfile({
        displayName,
        handle,
        pronouns,
        avatarLink: avatarUrl
      })
      setIsDirty(false)
    } catch (error) {
      console.error("Failed to save profile settings", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <GroupContainer>
      <Group
        title="Public profile"
        potentialActions={
          isDirty ? (
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="primary"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          ) : (
            <></>
          )
        }
      >
        <div className="flex flex-row gap-6 justify-between">
          <div className="w-full flex flex-col gap-y-4">
            <InputField
              inputName="Name"
              value={displayName}
              placeholder="Enter your display name"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <InputField
              inputName="Handle"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
            <SelectField
              inputName="Pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              options={pronounOptions}
            />
          </div>
          <DropZone setData={(url) => setAvatarUrl(url)} value={avatarUrl} />
        </div>
      </Group>
    </GroupContainer>
  )
}