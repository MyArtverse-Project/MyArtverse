import { type User } from "@/app/context/AuthContext"
import Field from "@/components/layouts/Layouts/Field"
import type { UserType } from "@/types/users"
import { Group } from "@mav/ui/components/layouts"

export default function FeaturedArtworkPanel({
  user,
  isOwner
}: { user: UserType; isOwner?: boolean }) {
  return (
    <Group
      title={`Featured Artwork`}
      containerStyle="border-padding"
    >
      {/* TODO: Implement Featured Gallery */}
    </Group>
  )
}
