import type { UserType } from "./users"
import type { StatusIndicator, Visibility } from "./utils"

export type FursonaStatus = "adopted" | "upForAdopt" | "owned" | "hidden" | "main"

export interface ColorPalette {
  name: string
  color: string
}

type PronounOriginal = "He/Him" | "She/Her" | "They/Them"
type Pronouns = (PronounOriginal | Lowercase<PronounOriginal>)[] | string[]

interface CustomAttributes {
  property: string
  value: string
}

interface CharacterAttributes {
  bio: string
  pronouns: string
  gender: string
  preferences: {
    likes: string
    dislikes: string
  }
  customFields: CustomAttributes[]
}

export interface Character {
  id: string
  name: string
  nickname: string
  visibility: Visibility
  mainCharacter: boolean
  fullName: string
  species: string
  isHybrid: boolean
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
}

export interface Variant {
  name: string
  url: string
  nsfw: boolean
  active: boolean
}

export interface ReferenceSheet {
  refSheetName: string
  artist: string
  colors: string[]
  variants: Variant[]
}

export interface CharacterResponse {
  characters: Character[]
  mainCharacter: Character | null
}
