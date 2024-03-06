import { atom } from "jotai"

// Sidebar
export const sidebarToggle = atom(false)
export const sidebarToggleDashboard = atom(true)

interface ProfilePeekAtom {
  img: string
  username: string
  handle: string
}

export const profilePeekData = atom<ProfilePeekAtom>({
  img: "",
  username: "",
  handle: ""
})
