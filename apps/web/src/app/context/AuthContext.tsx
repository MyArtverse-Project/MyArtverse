"use client"

import { fetcher } from "@/app/lib/fetcher"
import { logoutAction } from "@/app/actions/logout"
import { Notification } from "@/types/users"
import type { ContentPreferences } from "@/types/contentPreferences"
// Import the fetch helper
import { BACKEND_URL } from "@/utils/constants"
import { useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"

export type User = {
  id: string
  handle: string
  displayName: string
  bio: string
  notifications: Notification[]
  avatarUrl: string
  recentSearches: string[]
  bannerUrl: string
  dateRegistered: string
  dateUpdated: string
  role?: "user" | "moderator" | "admin" | "developer"
  hasArtistAccess: boolean
  hasBetaAccess: boolean
  uploadLimitBytes?: number | null
  effectiveUploadLimitBytes?: number
  links: { url: string; label: string }[]
  pronouns: string
  nationality: string
  birthday: string
  contentPreferences?: ContentPreferences
  characters: {
    id: string
    name: string
    avatarUrl: string
    slug: string
    species: string
  }[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => null,
  refreshUser: () => Promise.resolve()
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetcher<User>(
          `${BACKEND_URL}/v1/auth/whoami`,
          {},
          false
        )
        setUser(data)
      } catch (_error) {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [])

  const logout = async () => {
    try {
      await logoutAction()
    } catch (_err) {
      // Still clear local session if the server action fails.
    }

    setUser(null)
    router.push("/login")
  }

  const refreshUser = async () => {
    try {
      const data = await fetcher<User>(
        `${BACKEND_URL}/v1/auth/whoami`,
        {},
        false
      )
      setUser(data)
    } catch (_err) {
      throw new Error("Refresh user failed")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}
