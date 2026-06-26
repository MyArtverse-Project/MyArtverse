import type { Artwork, Character, Folder } from "./characters"
import type { ContentPreferences } from "./contentPreferences"
import type { LinkedString } from "./utils"

type NullableString = string | null
type UserRole = "developer" | "admin" | "moderator" | "user"
// type UserRoles = UserRole
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
  folders: Folder[]
  favoriteCharacters: Character[]
  favoriteArtworks: Artwork[]
  characters: Character[]
  dateRegistered: Date
  dateUpdated: Date
  role: UserRole
  uploadLimitBytes?: number | null
  effectiveUploadLimitBytes?: number
  hasArtistAccess: boolean
  hasBetaAccess: boolean
  links: Link[]
  badges: Badge[]
  comments: Comments[]
  onlineStatus: OnlineStatus
  customStatus: NullableString
  previousAliases: NullableString
  pronouns: NullableString
  nationality: NullableString
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
  contentPreferences?: ContentPreferences
}

export interface Notification {
  id: string
  content: string
  read: boolean
  user: UserType
  sender: UserType | null
  artwork: Artwork | null
  character: Character | null
  comment: Comments | null
  createdAt: Date
}

export interface Comments {
  id: string
  content: string
  parentId: string | null
  isPinned: boolean
  replies: Comments[]
  author: UserType
  user: UserType
  artwork?: Artwork
  character?: Character
  createdAt: string
  updatedAt: string
}

export interface DashboardPanel {
  id?: string
  type: PanelType
  position: { row: number; col: number }
  settings?: PanelSettings
}

export type PanelType =
  | "comments"
  | "information"
  | "featured_gallery"
  | "featured_artwork"
  | "reference_sheet"
  | "featured_character"
  | "popular_character"
  | "multiple_characters"
  | "recent_artworks"
  | "multiple_artworks"
  | "popular_artwork"
  | "multiple_galleries"
  | "featured_listing"
  | "recent_listings"
  | "commission_queue"
  | "customHTML"

export type PanelSettings = {
  html?: string
  artworkId?: string
  artworkIds?: string
  characterSlug?: string
  characterSlugs?: string
  refSheetId?: string
  folderId?: string
  customTitle?: string
  limit?: string
}
