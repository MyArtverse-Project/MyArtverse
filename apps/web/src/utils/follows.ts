import type { UserType } from "@/types/users"

type RelationshipEntry = {
  follower?: UserType
  following?: UserType
}

function isUserType(value: unknown): value is UserType {
  return Boolean(value && typeof value === "object" && "handle" in value)
}

export function mapFollowers(
  relations: RelationshipEntry[] | UserType[] | undefined
): UserType[] {
  if (!relations?.length) return []
  if (isUserType(relations[0])) return relations as UserType[]
  return (relations as RelationshipEntry[])
    .map((relation) => relation.follower)
    .filter((user): user is UserType => Boolean(user))
}

export function mapFollowing(
  relations: RelationshipEntry[] | UserType[] | undefined
): UserType[] {
  if (!relations?.length) return []
  if (isUserType(relations[0])) return relations as UserType[]
  return (relations as RelationshipEntry[])
    .map((relation) => relation.following)
    .filter((user): user is UserType => Boolean(user))
}

export function isFollowingUser(
  selfFollowing: RelationshipEntry[] | UserType[] | undefined,
  profileId: string
): boolean {
  return mapFollowing(selfFollowing).some((user) => user.id === profileId)
}
