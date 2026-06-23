"use client"

import { useAuth } from "@/app/context/AuthContext"
import DropZone from "@/components/Modals/DropZone"
import { SelectField } from "@/components/layouts/Forms"
import { Button } from "@/components/ui/button"
import { Group, GroupContainer } from "@/components/ui/group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserType } from "@/types/users"
import { updateProfile } from "@/utils/api"
import { pronounOptions, USER_DEFAULT_AVATAR } from "@/utils/constants"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const isPlaceholderAvatar = (url: string) =>
  !url || url === USER_DEFAULT_AVATAR

const normalizeAvatar = (url: string) =>
  isPlaceholderAvatar(url) ? "" : url

export default function ProfileSettings({ user }: { user: UserType }) {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [displayName, setDisplayName] = useState(user.displayName ?? "")
  const [handle, setHandle] = useState(user.handle)
  const [pronouns, setPronouns] = useState(user.pronouns ?? "")
  const [avatarUrl, setAvatarUrl] = useState<string>(user.avatarUrl ?? "")
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const changed =
      displayName !== (user.displayName ?? "") ||
      handle !== user.handle ||
      pronouns !== (user.pronouns ?? "") ||
      normalizeAvatar(avatarUrl) !== normalizeAvatar(user.avatarUrl ?? "")
    setIsDirty(changed)
  }, [displayName, handle, pronouns, avatarUrl, user])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfile({
        displayName,
        handle,
        pronouns,
        avatarLink: avatarUrl
      })
      await refreshUser()
      setIsDirty(false)
      router.refresh()
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
            <div className="space-y-2">
              <Label htmlFor="display-name">Name</Label>
              <Input
                id="display-name"
                value={displayName}
                placeholder="Enter your display name"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="handle">Handle</Label>
              <Input
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase())}
              />
            </div>
            <SelectField
              inputName="Pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              options={pronounOptions}
            />
          </div>
          <DropZone
            setData={(url) => setAvatarUrl(url)}
            value={isPlaceholderAvatar(avatarUrl) ? null : avatarUrl}
            enableCrop
          />
        </div>
      </Group>
    </GroupContainer>
  )
}
