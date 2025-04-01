"use server"

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { cookies } from "next/headers"
import type {
  Artwork,
  Character,
  CharacterResponse,
  ReferenceSheet
} from "@/types/characters"
import type { DashboardPanel, UserType } from "@/types/users"
import { BACKEND_URL } from "./constants"
import { redirect } from "next/navigation"
import { SearchResult } from "@/types/utils"

type APIMethods = "GET" | "POST" | "DELETE" | "PUT"

const endpoint = BACKEND_URL

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
      throw new Error(`Unable to connect to the server: ${err}`)
    })
  }

  return makeRequest()
    .then((res) => {
      if (res.ok) return res.json()
      if (res.status === 401) {
        return refreshToken().then((refreshed) => {
          if (!refreshed) throw new Error("Unauthorized")

          return makeRequest().then((res) => {
            if (!res.ok) throw new Error("Unable to provide data")
            return res.json()
          })
        })
      }
    })
    .catch((err) => {
      throw new Error(err)
    })
}

export const apiWithoutAuth = async <Data>(
  method: APIMethods,
  route: string,
  body?: object
): Promise<Data> => {
  return fetch(`${endpoint}${route}`, {
    method: method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    cache: "no-cache",
    credentials: "include"
  })
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error(`Unable to provide data ${res.status}`)
    })
    .catch((err) => {
      throw new Error(err)
    })
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
    .catch(() => {
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

export const fetchCharacter = async (handle: string, characterName: string) => {
  const character = await apiWithoutAuth<Character>(
    "GET",
    `/v1/character/name/${handle}/${characterName}`
  )

  return character
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

export const createFolder = async (body: {
  name: string
  contentType: "characters" | "artworks"
  parentId: string | null
  color: string
}) => {
  return apiWithAuth("POST", "/v1/folders/create", body)
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
}) => {
  return apiWithAuth("POST", "/v1/dashboard/panels", body)
}

export const setHTMLPanel = async (body: { html: string }) => {
  return apiWithAuth("PUT", "/v1/dashboard/panels/html", body)
}

export const getPanels = async (handle: string) => {
  return apiWithoutAuth<DashboardPanel[]>(
    "GET",
    `/v1/dashboard/panels/${handle}`
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
