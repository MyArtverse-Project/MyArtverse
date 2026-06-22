import type { Character } from "@/types/characters"
import type { UserType } from "@/types/users"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PanelCard, PanelField } from "./PanelCard"

function formatDate(value?: Date | string | null) {
  if (!value) return "Not set"
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

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
    const displayName = character.name

    return (
      <PanelCard title={`About ${displayName}`}>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5">
          <PanelField label="Species" value={character.species || "Not set"} />
          <PanelField label="Pronouns" value={attrs?.pronouns || "Not set"} />
          <PanelField label="Gender" value={attrs?.gender || "Not set"} />
          <PanelField
            label="Created"
            value={formatDate(character.createdAt)}
          />
        </div>
        {attrs?.bio ? (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {attrs.bio}
          </p>
        ) : null}
        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/@${character.owner.handle}/${character.slug}/biography`}>
            View {displayName}&apos;s biography
          </Link>
        </Button>
        {isOwner ? (
          <Button className="w-full" variant="outline" asChild>
            <Link href={`/studio/characters/${character.id}`}>Edit character</Link>
          </Button>
        ) : null}
      </PanelCard>
    )
  }

  const user = target as UserType
  const displayName = user.displayName || user.handle

  return (
    <PanelCard title={`About ${displayName}`}>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        <PanelField label="Join date" value={formatDate(user.dateRegistered)} />
        <PanelField label="Birthday" value={formatDate(user.birthday)} />
        <PanelField label="Pronouns" value={user.pronouns || "Not set"} />
        <PanelField label="Nationality" value={user.nationality || "Not set"} />
      </div>
      <Button className="w-full" variant="secondary" asChild>
        <Link href={`/@${user.handle}/characters`}>
          View {displayName}&apos;s characters
        </Link>
      </Button>
      {isOwner ? (
        <Button className="w-full" variant="outline" asChild>
          <Link href="/settings/profile">Edit profile</Link>
        </Button>
      ) : null}
    </PanelCard>
  )
}
