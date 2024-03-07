export type FursonaStatus = "adopted" | "upForAdopt" | "owned" | "hidden" | "main"

export interface ColorPalette {
  name: string
  color: string
}

export interface Character {
  id: string
  name: string
  visible: boolean
  nickname: string
  species: string
  is_hybrid: boolean
  avatar_url: string | null
  reference_sheet_url: string | null
}

