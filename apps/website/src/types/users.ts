export type UserRoles = ("artist" | "admin" | "contributor")[]

export type UserType = {
  id: number
  handle: string
  displayName: string | null
  bio: string | null
  avatarUrl: string | null
  bannerUrl: string | null
  dateRegistered: Date
  dateUpdated: Date
  hasArtistAccess: boolean
  hasBetaAccess: boolean
  links: string | null
  badges: string | null
  onlineStatus: "offline" | "online"
  customStatus: string | null
  previousAliases: string | null
}
