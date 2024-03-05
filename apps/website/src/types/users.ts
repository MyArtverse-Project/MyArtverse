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
  links: {
    url: string
    label: string
  }[]
  badges: {
    roleName: string,
    rewardDate: Date
  }
  onlineStatus: "offline" | "online"
  customStatus: string | null
  previousAliases: string | null
  pronouns: string,
  nationaility: string,
  birthday: Date,
}
