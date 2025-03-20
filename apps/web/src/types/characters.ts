import type { Comments, UserType } from "./users"
import type { StatusIndicator, Visibility } from "./utils"

export type FursonaStatus = "adopted" | "upForAdopt" | "owned" | "hidden" | "main"

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
  attributes: CharacterAttributes
  migration: {
    url: string
    migrateDate: Date
    migrationStatus: Extract<StatusIndicator, "failed" | "canceled" | "pending" | "finished">
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
  artist?: UserType | null
  artistUrl?: string
  comments: Comments[]
  description?: string
  tags: string[]
  programUsed?: string
  title?: string
  favoritedBy: UserType[]
  owner: UserType
}

export interface Variant {
  name: string
  url: string
  nsfw: boolean
  main?: boolean
  onChangeCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onChangeName?: (e: React.ChangeEvent<HTMLInputElement>) => void
  deleteVarient?: (e: React.MouseEvent<HTMLDivElement>) => void
}

export interface ReferenceSheet {
  id: string
  refSheetName: string
  active: boolean
  artist: string
  character?: Character
  colors: string[]
  variants: Variant[]
}

export interface CharacterResponse {
  characters: Character[]
  mainCharacter: Character | null
}
