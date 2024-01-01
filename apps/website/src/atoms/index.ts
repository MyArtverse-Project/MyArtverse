import { atom } from "jotai"

// Sidebar
export const sidebarToggle = atom(false)

// Navbar profile/character peeking
type PeekType = "profile" | "character"

export const isProfilePeeking = atom(false)
export const profilePeek = atom<{
  type: PeekType
  img: string
  username: string
  handle: string
}>({
  type: "profile",
  img: "",
  username: "",
  handle: ""
})
