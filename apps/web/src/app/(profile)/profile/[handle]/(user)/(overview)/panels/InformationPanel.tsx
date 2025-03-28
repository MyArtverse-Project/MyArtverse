import Field from "@/components/layouts/Layouts/Field"
import { Button } from "@mav/ui/components/buttons"
import { Group } from "@mav/ui/components/layouts"
import type { UserType } from "@/types/users"
import { type User } from "@/app/context/AuthContext"

export default function InformationPanel({
  user,
  self
}: { user: UserType; self?: User | null }) {
  return (
    <Group
      title={`About ${user.displayName ? user.displayName : user.handle}`}
      potentialActions={
        self?.id == user.id ? (
          <Button size="small" href="/settings/profile">
            Edit
          </Button>
        ) : undefined
      }
      containerStyle="border-padding"
    >
      <Field
        title="Date joined"
        content={new Date(user.dateRegistered).toDateString()}
      />
      {/* TODO: Custom attributes for Backend */}
      <Field
        title="Birthday"
        content={
          user.birthday ? new Date(user.birthday).toDateString() : "Not Set"
        }
      />
      <Field
        title="Pronouns"
        content={user.pronouns ? user.pronouns : "Not Set"}
      />
      <Field
        title="Nationality"
        content={user.nationality ? user.nationality : "Not Set"}
      />
      {/* <Field title="Nationality" content="Murica" /> */}
    </Group>
  )
}
