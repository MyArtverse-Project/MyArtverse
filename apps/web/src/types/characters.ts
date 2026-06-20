import type { Comments, DashboardPanel, UserType } from "./users"
import type { StatusIndicator, Visibility } from "./utils"

export type CharacterStatus =
  | "adopted"
  | "upForAdopt"
  | "owned"
  | "hidden"
  | "main"

export interface ColorPalette {
  name: string
  color: string
}

// type PronounOriginal = "He/Him" | "She/Her" | "They/Them"
// type Pronouns = (PronounOriginal | Lowercase<PronounOriginal>)[] | string[]

export interface CustomAttributes {
  heading: string
  value: string
}

export interface CharacterAttributes {
  bio: string
  pronouns: string
  gender: string
  preferences: {
    likes: string
    dislikes: string
  }
  custom_fields: CustomAttributes[]
}

export interface Character {
  id: string
  name: string
  slug: string
  nickname: string
  visibility: Visibility
  owner: UserType
  mainCharacter: boolean
  fullName: string
  createdAt: Date
  updatedAt: Date
  species: string
  isHybrid: boolean
  comments: Comments[]
  avatarUrl: string
  refSheets: ReferenceSheet[]
  attributes: CharacterAttributes,
  dashboards: DashboardPanel[]
  migration: {
    url: string
    migrateDate: Date
    migrationStatus: Extract<
      StatusIndicator,
      "failed" | "canceled" | "pending" | "finished"
    >
    migrationReason: string
  }
  adoptionStatus: {
    ownership: {
      adoptedOn: Date
      displayName: string
      handle: string
    }
    previousOwner: {
      displayName: string
      handle: string
    }
    adoptionDate: Date
    adoptee: UserType
  }
  favoritedBy: UserType[]
  folder?: Folder | null
}

export interface Artwork {
  id: string
  altText?: string
  createdAt: Date
  updatedAt: Date
  artworkUrl?: string
  watermarkUrl?: string
  charactersFeatured?: Character[]
  publishedCharacter?: Character
  artist?: UserType
  artistUrl?: string
  comments: Comments[]
  description?: string
  nsfw?: boolean
  tags: string[]
  programUsed?: string
  title?: string
  favoritedBy: UserType[]
  owner: UserType
  folder?: Folder | null
  folderId?: string | null
}

export interface Variant {
  name: string
  url: string
  nsfw: boolean
  main?: boolean
  onChangeCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void
  deleteVariant: (e: React.MouseEvent<HTMLDivElement>) => void
}

export interface ReferenceSheet {
  id: string
  name: string
  active: boolean
  artist: string
  character?: Character
  variants: Variant[]
}

export type Folder = {
  id: string
  name: string
  color?: string
  contentType?: "characters" | "art" | "artworks"
  children?: Folder[]
  parentId?: string
  characters?: Character[]
  artworks?: Artwork[]
}

export interface CharacterResponse {
  characters: Character[]
  mainCharacter: Character | null
}
