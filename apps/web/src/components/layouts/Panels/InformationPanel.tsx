import Field from "@/components/layouts/Layouts/Field"
import type { Character } from "@/types/characters"
import type { UserType } from "@/types/users"
import { Button } from "@/components/ui/button"
import { Group } from "@/components/ui/group"
import Link from "next/link"

export default function InformationPanel({
  target,
  type,
  isOwner,
}: {
  target: UserType | Character
  type: "user" | "character"
  isOwner?: boolean
}) {
  if (type === "character") {
    const character = target as Character
    const attrs = character.attributes

    return (
      <Group
        title={`About ${character.name}`}
        potentialActions={
          isOwner ? (
            <Button size="sm" variant="secondary" asChild>
              <Link href={`/studio/characters/${character.id}`}>Edit</Link>
            </Button>
          ) : undefined
        }
        containerStyle="border-padding"
      >
        <Field title="Species" content={character.species || "Not set"} />
        <Field title="Pronouns" content={attrs?.pronouns || "Not set"} />
        <Field title="Gender" content={attrs?.gender || "Not set"} />
        {attrs?.bio ? <Field title="Bio" content={attrs.bio} /> : null}
      </Group>
    )
  }

  const user = target as UserType

  return (
    <Group
      title={`About ${user.displayName ? user.displayName : user.handle}`}
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
        content={new Date(user.dateRegistered).toDateString()}
      />
      <Field
        title="Birthday"
        content={
          user.birthday ? new Date(user.birthday).toDateString() : "Not set"
        }
      />
      <Field title="Pronouns" content={user.pronouns ? user.pronouns : "Not set"} />
      <Field
        title="Nationality"
        content={user.nationality ? user.nationality : "Not set"}
      />
    </Group>
  )
}
