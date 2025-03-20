import type { Artwork, Character } from "./characters"
import type { LinkedString } from "./utils"

type NullableString = string | null
type UserRole = "developer" | "admin" | "moderator" | "user"
type UserRoles = UserRole
type OnlineStatus = "offline" | "online"

type Link = {
  url: string
  label: string
}

type Badge = {
  roleName: string
  rewardDate: Date
}

export interface UserType {
  id: string
  handle: string
  displayName: NullableString
  bio: NullableString
  customHTMLCard: NullableString
  avatarUrl: LinkedString
  bannerUrl: LinkedString
  following: UserType[]
  followers: UserType[]
  favoriteCharacters: Character[]
  characters: Character[]
  dateRegistered: Date
  dateUpdated: Date
  role: UserRole
  hasArtistAccess: boolean
  hasBetaAccess: boolean
  links: Link[]
  badges: Badge[]
  comments: Comments[]
  onlineStatus: OnlineStatus
  customStatus: NullableString
  previousAliases: NullableString
  pronouns: NullableString
  nationaility: NullableString
  commissionStatus: "open" | "closed" | "limited"
  requestStatus: "open" | "closed" | "limited"
  artTradeStatus: "open" | "closed" | "limited"
  notifications: Notification[]
  artistApplication: {
    bio: string
    name: string
    email: string
    portfolio: string
    images: string[]
  }
  birthday: Date
}

export interface Notification {
  id: string
  content: string
  read: boolean
  user: UserType
  sender: UserType | null
  artwork: Artwork | null
  comment: Comments | null
  createdAt: Date
}

export interface Comments {
  id: string
  content: string
  author: UserType
  user: UserType
  artwork?: Artwork
  character?: Character
}
