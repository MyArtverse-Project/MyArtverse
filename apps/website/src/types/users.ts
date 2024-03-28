import { type Character } from "./characters"
import type { LinkedString } from "./utils"

export type UserRoles = ("artist" | "admin" | "contributor" | "early-tester")[]

export interface UserType {
  id: number
  handle: string
  displayName: string | null
  bio: string | null
  avatarUrl: LinkedString
  bannerUrl: LinkedString
  characters: Character[]
  dateRegistered: Date
  dateUpdated: Date
  roles: UserRoles
  hasBetaAccess: boolean
  links: {
    url: string
    label: string
  }[]
  badges: {
    roleName: string
    rewardDate: Date
  }
  onlineStatus: "offline" | "online"
  customStatus: string | null
  previousAliases: string | null
  pronouns: string
  nationaility: string
  birthday: Date
}
