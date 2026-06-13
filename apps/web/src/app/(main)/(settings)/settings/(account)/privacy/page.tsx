import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Group, GroupContainer } from "@/components/ui/group"

export const metadata = {
  title: "Data & privacy"
}

export default function SettingsPrivacyPage() {
  return (
    <GroupContainer>
      <Group title="Change Password">
        <form className="flex flex-col gap-y-3">
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
        <div className="flex flex-col items-start gap-y-2">
          <Button variant="secondary">Link account via Google</Button>
          <Button variant="secondary">Link account via X</Button>
          <Button variant="secondary">Link account via Apple ID</Button>
        </div>
      </Group>
      <Group title="Two-factor authentication">content</Group>
    </GroupContainer>
  )
}
