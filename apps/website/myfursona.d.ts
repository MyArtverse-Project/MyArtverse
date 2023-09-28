type Profile = Partial<{
  uuid: any
  name: string
  handle: string
  img: string
  isFollowing: boolean
  isFollowed: boolean
  followers: number
  following: number
  bio: string
  characters: Array<{
    name: string
    species: string
  }>
}>

type Character = Partial<{
  name: string
  species: string
  isHybrid: boolean
  adopted: boolean
  adoptedFrom: Partial<Omit<Profile, "characters">>
  colorPalette: Array<{
    name: string
    color: string
  }>
}>

declare global {
  interface Window {
    MyFursona: {
      __myfursona_version?: string
      profileDebug?: Profile
      characterDebug?: Character
    }
  }
}

export {}
