import { type User } from "@/app/context/AuthContext"
import Field from "@/components/layouts/Layouts/Field"
import type { UserType } from "@/types/users"
import { Button } from "@mav/ui/components/buttons"
import { Group } from "@mav/ui/components/layouts"

// TODO: Make it reusable for Characters as well

export default function InformationPanel({
  information,
  isOwner
}: { information: UserType; isOwner?: boolean }) {
  return (
    <Group
      title={`About ${information.displayName ? information.displayName : information.handle}`}
      potentialActions={
        isOwner ? (
          <Button size="small" href="/settings/profile">
            Edit
          </Button>
        ) : undefined
      }
      containerStyle="border-padding"
    >
      <Field
        title="Date joined"
        content={new Date(information.dateRegistered).toDateString()}
      />
      {/* TODO: Custom attributes for Backend */}
      <Field
        title="Birthday"
        content={
          information.birthday ? new Date(information.birthday).toDateString() : "Not Set"
        }
      />
      <Field
        title="Pronouns"
        content={information.pronouns ? information.pronouns : "Not Set"}
      />
      <Field
        title="Nationality"
        content={information.nationality ? information.nationality : "Not Set"}
      />
      {/* <Field title="Nationality" content="Murica" /> */}
    </Group>
  )
}
