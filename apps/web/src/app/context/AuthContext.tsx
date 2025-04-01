"use client"

import { useRouter } from "next/navigation"
import React, { createContext, useContext, useEffect, useState } from "react"
import { fetcher } from "@/app/lib/fetcher"
// Import the fetch helper
import { BACKEND_URL } from "@/utils/constants"
import { Notification } from "@/types/users"

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
    species: string
  }[]
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: () => null
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
      } catch (error) {
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
    } catch (err) {
      throw new Error("Logout failed")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
