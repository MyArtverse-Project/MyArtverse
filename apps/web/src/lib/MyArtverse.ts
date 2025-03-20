import { Artwork, Character, CharacterResponse, ReferenceSheet } from "@/types/characters"
import { apiWithAuth, apiWithoutAuth } from "./helpers"
import { UserType } from "@/types/users"

// users
const fetchUserData = async () => {
  const data = await apiWithAuth<UserType>("GET", `/v1/profile/me`)
  return data
}

const fetchUser = async (handle: string) => {
  const data = await apiWithoutAuth<UserType>("GET", `/v1/profile/${handle}`)
  return data
}

const getFavorites = async (handle: string) => {
  const characters = await apiWithoutAuth<Character[]>(
    "GET",
    `/v1/profile/favorites/${handle}`
  )

  return characters
}

// characters
const fetchUserCharacters = async (handle: string) => {
  const data = await apiWithoutAuth<CharacterResponse>("GET", `/v1/character/${handle}`)
  return data
}

const fetchSelfCharacters = async () => {
  const characters = await apiWithAuth<Character[]>("GET", "/v1/character/")
  return characters
}

const fetchSelfCharacter = async (characterName: string) => {
  const character = await apiWithAuth<Character>(
    "GET",
    `/v1/character/me/${characterName}`
  )

  return character
}


// artist stuff
const getArtistOpenCommissions = async () => {
  const comissions = await apiWithoutAuth<UserType[]>("GET", "/v1/profile/artists/open")
  return comissions
}

const fetchArtistRequests = async () => {
  const requests = await apiWithAuth<UserType[]>("GET", "/v1/staff/artist-requests")
  return requests
}

// characters
const fetchCharacter = async (handle: string, characterName: string) => {
  const character = await apiWithoutAuth<Character>(
    "GET",
    `/v1/character/name/${handle}/${characterName}`
  )

  return character
}

const getArtworks = async (profile: string, character: string) => {
  const artworks = await apiWithoutAuth<Artwork[]>(
    "GET",
    `/v1/art/characters/${profile}/${character}`
  )

  return artworks
}

const getFeatured = async () => {
  const characters = await apiWithoutAuth<Character[]>("GET", "/v1/character/featured")
  return characters
}

const getNewCharacters = async () => {
  const characters = await apiWithoutAuth<Character[]>("GET", "/v1/character/new")
  return characters
}

// artwork and ref sheets
const getArtwork = async (artworkId: number) => {
  const artwork = await apiWithoutAuth<Artwork>("GET", `/v1/art/${artworkId}`)
  return artwork
}

const setRefAsMain = async (refId: string) => {
  await apiWithAuth("PUT", `/v1/character/assign-ref/${refId}`)
  return
}

const getRefSheets = async (handle: string) => {
  const refSheets = await apiWithoutAuth<ReferenceSheet[]>(
    "GET",
    `/v1/character/${handle}/refSheets`
  )

  return refSheets
}

export const MyArtverse = {
  user: {
    handle: fetchUser,
    self: fetchUserData,
    characters: fetchUserCharacters,
    favorites: getFavorites,
  },
  admin: {
    artistReqs: fetchArtistRequests
  },
  characters: {
    new: getNewCharacters,
    get: fetchCharacter,
    getFeatured,
    self: {
      getAll: fetchSelfCharacters,
      getOne: fetchSelfCharacter,
    }
  },
  artists: {
    open: getArtistOpenCommissions
  },
  artwork: {
    getOne: getArtwork,
    getMany: getArtworks,
  },
  refSheets: {
    get: getRefSheets,
    setRef: setRefAsMain
  }
}
