"use client"

import { useAuth } from "@/app/context/AuthContext"
import {
  CONTENT_PREFERENCES_STORAGE_KEY,
  DEFAULT_CONTENT_PREFERENCES,
  type ContentPreferences,
  parseContentPreferences,
} from "@/types/contentPreferences"
import { updateContentPreferences } from "@/utils/api"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"

type NsfwPreferencesContextType = {
  preferences: ContentPreferences
  setPreferences: (next: Partial<ContentPreferences>) => Promise<void>
  isReady: boolean
}

const NsfwPreferencesContext = createContext<NsfwPreferencesContextType>({
  preferences: DEFAULT_CONTENT_PREFERENCES,
  setPreferences: async () => {},
  isReady: false,
})

function readStoredPreferences(): ContentPreferences {
  if (typeof window === "undefined") return DEFAULT_CONTENT_PREFERENCES
  try {
    const raw = localStorage.getItem(CONTENT_PREFERENCES_STORAGE_KEY)
    if (!raw) return DEFAULT_CONTENT_PREFERENCES
    return parseContentPreferences(JSON.parse(raw))
  } catch {
    return DEFAULT_CONTENT_PREFERENCES
  }
}

function writeStoredPreferences(prefs: ContentPreferences) {
  if (typeof window === "undefined") return
  localStorage.setItem(CONTENT_PREFERENCES_STORAGE_KEY, JSON.stringify(prefs))
}

export function NsfwPreferencesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading: authLoading } = useAuth()
  const [preferences, setPreferencesState] = useState<ContentPreferences>(
    DEFAULT_CONTENT_PREFERENCES
  )
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setPreferencesState(readStoredPreferences())
    setIsReady(true)
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (user?.contentPreferences) {
      const serverPrefs = parseContentPreferences(user.contentPreferences)
      setPreferencesState(serverPrefs)
      writeStoredPreferences(serverPrefs)
      return
    }
    if (!user) {
      setPreferencesState(DEFAULT_CONTENT_PREFERENCES)
      writeStoredPreferences(DEFAULT_CONTENT_PREFERENCES)
    }
  }, [user, user?.contentPreferences, authLoading])

  const setPreferences = useCallback(
    async (next: Partial<ContentPreferences>) => {
      const merged: ContentPreferences = {
        showNsfw: next.showNsfw ?? preferences.showNsfw,
        nsfwDisplayMode: next.nsfwDisplayMode ?? preferences.nsfwDisplayMode,
      }

      setPreferencesState(merged)
      writeStoredPreferences(merged)

      if (user) {
        try {
          const result = await updateContentPreferences(merged)
          if (result.contentPreferences) {
            const saved = parseContentPreferences(result.contentPreferences)
            setPreferencesState(saved)
            writeStoredPreferences(saved)
          }
        } catch (err) {
          console.error("Failed to save content preferences", err)
        }
      }
    },
    [preferences, user]
  )

  return (
    <NsfwPreferencesContext.Provider
      value={{ preferences, setPreferences, isReady }}
    >
      {children}
    </NsfwPreferencesContext.Provider>
  )
}

export const useNsfwPreferences = () => useContext(NsfwPreferencesContext)
