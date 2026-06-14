"use client"

import { fetcher } from "@/app/lib/fetcher"
import { Notification } from "@/types/users"
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
  hasArtistAccess: boolean
  hasBetaAccess: boolean
  links: { url: string; label: string }[]
  pronouns: string
  nationality: string
  birthday: string
  characters: {
    id: string
    name: string
    avatarUrl: string
    slug: string
    species: string
    slug: string
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
      await fetcher("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.push("/login")
    } catch (_err) {
      throw new Error("Logout failed")
    }
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
