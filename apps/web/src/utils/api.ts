"use server"

import type {
  Artwork,
  Character,
  CharacterResponse,
  Folder,
  ReferenceSheet
} from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import { SearchResult } from "@/types/utils"
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { logError } from "."
import { BACKEND_URL } from "./constants"
import { ReferenceVariant } from "@/app/(studio)/studio/(general)/characters/[id]/Ref/ReferenceConfigForm"

type APIMethods = "GET" | "POST" | "DELETE" | "PUT" | "PATCH"

const endpoint = BACKEND_URL

/**
 * Builds an Error from a failed Response, pulling the backend's error body when
 * possible so the actual failure isn't masked. The real error is logged in
 * development via {@link logError}.
 */
const errorFromResponse = async (
  context: string,
  res: Response
): Promise<Error> => {
  let details: unknown
  try {
    details = await res.clone().json()
  } catch {
    details = await res.clone().text()
  }

  const error = new Error(
    `${context} failed with status ${res.status} ${res.statusText}`,
    { cause: details }
  )

  logError(context, { status: res.status, statusText: res.statusText, details })

  return error
}

export const getCookies = async () => {
  const cookiesHeaders = cookies()
  return new Promise((resolve) => {
    resolve(cookiesHeaders)
  })
}

export const apiWithAuth = async <Data>(
  method: APIMethods,
  route: string,
  body: object = {}
): Promise<Data> => {
  const makeRequest = async () => {
    const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies

    const accessToken = cookiesHeaders.get("accessToken")?.value
    const refreshToken = cookiesHeaders.get("refreshToken")?.value

    return fetch(`${endpoint}${route}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`
      },
      body: method === "GET" ? undefined : JSON.stringify(body),
      cache: "no-cache",
      credentials: "include"
    }).catch((err) => {
      logError(`${method} ${route} (connection)`, err)
      throw new Error("Unable to connect to the server")
    })
  }

  const context = `${method} ${route}`

  let res = await makeRequest()

  if (res.status === 401) {
    const refreshed = await refreshToken()
    if (!refreshed) throw await errorFromResponse(context, res)

    res = await makeRequest()
  }

  if (!res.ok) throw await errorFromResponse(context, res)

  return res.json() as Promise<Data>
}

export const apiWithoutAuth = async <Data>(
  method: APIMethods,
  route: string,
  body?: object
): Promise<Data> => {
  const context = `${method} ${route}`

  const res = await fetch(`${endpoint}${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-cache",
    credentials: "include"
  }).catch((err) => {
    logError(`${context} (connection)`, err)
    throw new Error("Unable to connect to the server")
  })

  if (!res.ok) throw await errorFromResponse(context, res)

  return res.json() as Promise<Data>
}

export const refreshToken = async () => {
  const cookiesHeaders = (await getCookies()) as ReadonlyRequestCookies
  if (!cookiesHeaders.has("refreshToken")) {
    return Promise.resolve(false)
  }

  const refreshToken = cookiesHeaders.get("refreshToken")!.value
  return fetch(`${endpoint}/v1/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `refreshToken=${refreshToken}`
    },
    body: JSON.stringify({}),
    credentials: "include",
    cache: "no-cache"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh token")
      }

      return true
    })
    .catch((err) => {
      logError("POST /v1/auth/refresh-token", err)
      return false
    })
}

export const fetchUserData = async () => {
  const data = await apiWithAuth<UserType>("GET", `/v1/profile/me`)
  return data
}

export const getArtistOpenComissions = async () => {
  const comissions = await apiWithoutAuth<UserType[]>(
    "GET",
    "/v1/profile/artists/open"
  )

  return comissions
}

export const fetchUser = async (handle: string) => {
  const data = await apiWithoutAuth<UserType>("GET", `/v1/profile/${handle}`)
  return data
}

export const getNotifications = async () => {
  const data = await apiWithAuth<Notification[]>(
    "GET",
    `/v1/profile/notifications`
  )
  return data
}

export const fetchUserCharacters = async (handle: string) => {
  const data = await apiWithoutAuth<CharacterResponse>(
    "GET",
    `/v1/character/${handle}`
  )

  return data
}

export const updateCharacter = async (characterId: string, data: Partial<Character>) => {
  return apiWithAuth("PUT", `/v1/character/update/${characterId}`, data)
}

export const fetchSelfCharacters = async () => {
  const characters = await apiWithAuth<Character[]>("GET", "/v1/character/")
  return characters
}

export const fetchSelfCharacter = async (characterName: string) => {
  const character = await apiWithAuth<Character>(
    "GET",
    `/v1/character/me/${characterName}`
  )

  return character
}

export const fetchUserGallery = async () => {
  const gallery = await apiWithAuth<Artwork[]>("GET", "/v1/art/gallery")
  return gallery
}

export const fetchCharacter = async (handle: string, characterName: string) => {
  const character = await apiWithoutAuth<Character>(
    "GET",
    `/v1/character/name/${handle}/${characterName}`
  )

  return character
}

export const fetchCharacterById = async (id: string) => {
  const character = await apiWithoutAuth<Character>(
    "GET",
    `/v1/character/id/${id}`
  )

  return character
}

export const uploadArt = async (
  characterId: string,
  body: {
    imageUrl: string
    title: string
    description: string
    tags: string[]
    userAsArtist: boolean
    nsfw: boolean
    mainCharacterId: string
    taggedCharacterIds: string[]
  }
) => {
  const res = await apiWithAuth("POST", `/v1/art/upload/${characterId}`, body)

  if (!res) {
    throw new Error("Art upload failed")
  }

  return res
}

export const fetchArtistRequests = async () => {
  const requests = await apiWithAuth<UserType[]>(
    "GET",
    "/v1/staff/artist-requests"
  )

  return requests
}

export const getArtworks = async (profile: string, character: string) => {
  const artworks = await apiWithoutAuth<Artwork[]>(
    "GET",
    `/v1/art/characters/${profile}/${character}`
  )

  return artworks
}

export const getFeatured = async () => {
  const characters = await apiWithoutAuth<Character[]>(
    "GET",
    "/v1/character/featured"
  )

  return characters
}

export const getNewCharacters = async () => {
  const characters = await apiWithoutAuth<Character[]>(
    "GET",
    "/v1/character/new"
  )

  return characters
}

export const getFavorites = async (handle: string) => {
  const characters = await apiWithoutAuth<Character[]>(
    "GET",
    `/v1/profile/favorites/${handle}`
  )

  return characters
}

export const getArtwork = async (artworkId: string) => {
  const artwork = await apiWithoutAuth<Artwork>("GET", `/v1/art/${artworkId}`)
  return artwork
}

export const updateArtwork = async (
  artworkId: string,
  body: {
    title: string
    description: string
    tags: string[]
    nsfw?: boolean
  }
) => {
  const res = await apiWithAuth("PUT", `/v1/art/${artworkId}`, body)

  if (!res) {
    throw new Error("Artwork update failed")
  }

  return res
}

export const deleteArtwork = async (artworkId: string) => {
  const res = await apiWithAuth("DELETE", `/v1/art/${artworkId}`)

  if (!res) {
    throw new Error("Artwork deletion failed")
  }

  return res
}

export const setRefAsMain = async (refId: string) => {
  await apiWithAuth("PUT", `/v1/character/assign-ref/${refId}`)
  return
}

export const getRefSheets = async (handle: string) => {
  const refSheets = await apiWithoutAuth<ReferenceSheet[]>(
    "GET",
    `/v1/character/${handle}/refSheets`
  )

  return refSheets
}

export const deleteRefSheet = async (refId: string) => {
  return apiWithAuth("DELETE", `/v1/character/delete-ref/${refId}`)
}

export const createRefSheet = async (body: {
  characterId: string
  refSheet: {
    id?: string
    name: string
    description: string
    primary?: boolean
    variants: {
      id?: string
      title: string
      artist: string
      description: string
      image: string
      primary: boolean
      nsfw: boolean
      colors: string[]
    }[]
  }
}) => {
  return apiWithAuth("POST", "/v1/character/upload-ref", body)
}

export const createFolder = async (body: {
  name: string
  contentType: "characters" | "artworks"
  parentId: string | null
  color: string
  characterId?: string
}) => {
  return apiWithAuth("POST", "/v1/folders/create", {
    ...body,
    contentType: body.contentType === "artworks" ? "art" : body.contentType,
  })
}

export const fetchCharacterGalleryFolders = async (characterId: string) => {
  return apiWithoutAuth<Folder[]>("GET", `/v1/folders/character/${characterId}`)
}

export const assignArtworkToFolder = async (
  artworkId: string,
  folderId: string | null
) => {
  return apiWithAuth(
    "PUT",
    `/v1/art/${artworkId}/folder/${folderId ?? "root"}`
  )
}

export const assignCharacterToFolder = async (
  characterId: string,
  folderId: string | null
) => {
  return apiWithAuth(
    "PUT",
    `/v1/character/${characterId}/folder/${folderId ?? "root"}`
  )
}

export const createCharacter = async (body: {
  name: string
  nickname?: string
  characterAvatar: string | null
  visibility: "public" | "private"
  mainCharacter: boolean
}) => {
  return apiWithAuth("POST", "/v1/character/create", body)
}

export const getFolders = async (folderId: string) => {
  return apiWithAuth("GET", `/v1/folders/${folderId}`)
}

export const getFolderByHandle = async (handle: string) => {
  return apiWithAuth("GET", `/v1/folders/handle/${handle}`)
}

export const getFoldersRecursively = async (folderId: string) => {
  return apiWithAuth("GET", `/v1/folders/${folderId}/recursive`)
}

export const setPanel = async (body: {
  position: {
    col: number
    row: number
  }
  component: string
}, characterName?: string) => {
  console.log(body.position)
  if (characterName) {
    return apiWithAuth("POST", `/v1/dashboard/cpanels/${characterName}`, body)
  }
  return apiWithAuth("POST", "/v1/dashboard/panels", body)
}


export const setHTMLPanel = async (body: { html: string }, characterName: string) => {
  if (characterName) {
    return apiWithAuth("PUT", `/v1/dashboard/cpanels/${characterName}/html`, body)
  }
  return apiWithAuth("PUT", "/v1/dashboard/panels/html", body)
}

export const getPanels = async (handle: string, characterName?: string) => {
  if (characterName) {
    return apiWithoutAuth<DashboardPanel[]>(
      "GET",
      `/v1/dashboard/cpanels/${characterName}`
    )
  }
  return apiWithoutAuth<DashboardPanel[]>(
    "GET",
    `/v1/dashboard/panels/${handle}`
  )
}

export const updateProfile = async (body: {
  displayName: string
  handle: string
  pronouns: string
  avatarLink: string
}) => {
  return apiWithAuth("PUT", "/v1/user/me", body)
}

export const updateContentPreferences = async (body: {
  showNsfw?: boolean
  nsfwDisplayMode?: "blur" | "show"
}) => {
  return apiWithAuth<{ contentPreferences: { showNsfw: boolean; nsfwDisplayMode: "blur" | "show" } }>(
    "PATCH",
    "/v1/profile/content-preferences",
    body
  )
}

export const postComment = async (
  commentType: string,
  content: string,
  redirectRoute: string,
  artworkId?: string | null,
  username?: string,
  characterName?: string | null,
  replyId?: string | null
) => {
  if (!content.trim()) throw new Error("Comment content cannot be empty.")

  const identifier = artworkId ?? username
  if (!identifier) throw new Error("Either artworkId or username is required.")

  const route = `/v1/${commentType}/${identifier}${characterName ? `/${characterName}` : ""}/comment`

  const data = await apiWithAuth("POST", route, {
    content,
    parentCommentId: replyId ?? null
  })
  if (!data) throw new Error("Unable to post comment")

  return redirect(redirectRoute)
}

export const search = async (
  query: string,
  type?: "character" | "user" | "artwork"
) => {
  if (!query.trim()) {
    return {
      user: [],
      artwork: [],
      character: []
    }
  }
  

  const data = await apiWithAuth<SearchResult>(
    "GET",
    `/v1/search?query=${encodeURIComponent(query)}&type=${type}`
  )

  return data
}
