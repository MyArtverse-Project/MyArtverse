import Field from "@/components/layouts/Layouts/Field"
import { Button } from "@mav/ui/components/buttons"
import { Group } from "@mav/ui/components/layouts"
import { UserType } from "@/types/users"

export default function InformationPanel({ user }: { user: UserType }) {
  return (
    <Group
      title={`About ${user.displayName ? user.displayName : user.handle}`}
      potentialActions={<Button size="small">Edit</Button>}
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
        content={user.nationaility ? user.nationaility : "Not Set"}
      />
      {/* <Field title="Nationality" content="Murica" /> */}
    </Group>
  )
}
