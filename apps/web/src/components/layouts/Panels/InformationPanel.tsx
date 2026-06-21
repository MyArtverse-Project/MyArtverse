import Field from "@/components/layouts/Layouts/Field"
import type { UserType } from "@/types/users"
import { Button } from "@/components/ui/button"
import { Group } from "@/components/ui/group"
import Link from "next/link"

// TODO: Make it reusable for Characters as well

export default function InformationPanel({
  information,
  isOwner
}: {
  information: UserType
  isOwner?: boolean
}) {
  return (
    <Group
      title={`About ${information.displayName ? information.displayName : information.handle}`}
      potentialActions={
        isOwner ? (
          <Button size="sm" variant="secondary" asChild>
            <Link href="/settings/profile">Edit</Link>
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
    </Group>
  )
}
