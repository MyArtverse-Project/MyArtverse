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
        title="Danger zone"
        description={
          <>
            Deleting an account is irreversable and cannot be undone! Once you
            delete your account—your characters, images, and account history
            will be completely wiped from our servers to comply with GDPR
            standards. If you are certain that you'll delete your account,
            it's important to export your data first before proceeding.
          </>
        }
      >
        <div className="flex gap-x-2">
          <Button>Export data</Button>
          <Button variant="destructive">Deactivate account</Button>
          <Button variant="destructive">Delete account</Button>
        </div>
      </Group>
    </GroupContainer>
  )
}
