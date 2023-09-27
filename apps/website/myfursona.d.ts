export {}

interface Profile {
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
}

declare global {
  interface Window {
    MyFursona: {
      version?: string
      profileDebug?: Partial<Profile>
      characterDebug?: Partial<{
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
    }
  }
}
