import { Button } from "@mav/ui/components/buttons"
import { InputField } from "@mav/ui/components/fields"
import { Group, GroupContainer } from "@mav/ui/components/layouts"

export const metadata = {
  title: "Data & privacy"
}

export default function SettingsPrivacyPage() {
  return (
    <GroupContainer>
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
        learnMoreLink="/lmao"
      >
        <div className="flex gap-x-2">
          <Button>Export data</Button>
          <Button variant="alert-secondary">Deactivate account</Button>
          <Button variant="alert">Delete account</Button>
        </div>
      </Group>
      
    </GroupContainer>
  )
}
