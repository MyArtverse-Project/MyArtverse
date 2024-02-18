import { atom } from "jotai"

// Sidebar
export const sidebarToggle = atom(false)
export const dashboardSidebarToggle = atom(false)

interface ProfilePeekAtom {
  img: string
  username: string
  handle: string
}

export const isProfilePeeking = atom(false)
export const profilePeekData = atom<ProfilePeekAtom>({
  img: "",
  username: "",
  handle: ""
})
