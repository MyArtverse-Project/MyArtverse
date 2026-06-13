import { Button } from "@/components/ui/button"
import { Group, GroupContainer } from "@/components/ui/group"

export const metadata = {
  title: "Profile"
}

export default function SettingsProfilePage() {
  return (
    <GroupContainer>
      <Group title="Public profile">content</Group>
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
          <Button variant="outline">Deactivate account</Button>
          <Button variant="destructive">Delete account</Button>
        </div>
      </Group>
    </GroupContainer>
  )
}
