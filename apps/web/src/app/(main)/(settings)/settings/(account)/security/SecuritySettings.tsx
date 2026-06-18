"use client"

import { Button } from "@/components/ui/button"
import { Group, GroupContainer } from "@/components/ui/group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserType } from "@/types/users"

export default function SecuritySettings({ user }: { user: UserType }) {
  return (
    <GroupContainer>
      <Group title="Change Password">
        <form className="flex flex-col gap-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="repeat-password">Repeat new password</Label>
            <Input id="repeat-password" type="password" />
          </div>
          <span>
            <Button>Change password</Button>
          </span>
        </form>
      </Group>
      <Group
        title="Linked accounts"
        description="Manage your login from third-party authenticators"
      >
        <Button>Link account via Google</Button>
        <Button>Link account via X</Button>
        <Button>Link account via Apple ID</Button>
      </Group>
      <Group title="Two-factor authentication">content</Group>
    </GroupContainer>
  )
}
