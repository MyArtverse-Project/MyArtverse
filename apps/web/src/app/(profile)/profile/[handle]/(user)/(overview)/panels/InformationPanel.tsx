import { type User } from "@/app/context/AuthContext"
import Field from "@/components/layouts/Layouts/Field"
import type { UserType } from "@/types/users"
import { Button } from "@/components/ui/button"
import { Group } from "@/components/ui/group"
import Link from "next/link"

export default function InformationPanel({
  user,
  self
}: { user: UserType; self?: User | null }) {
  return (
    <Group
      title={`About ${user.displayName ? user.displayName : user.handle}`}
      potentialActions={
        self?.id == user.id ? (
          <Button size="sm" variant="secondary" asChild>
            <Link href="/settings/profile">Edit</Link>
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
