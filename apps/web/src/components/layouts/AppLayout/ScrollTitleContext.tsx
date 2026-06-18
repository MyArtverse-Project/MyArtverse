"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react"

export interface ScrollTitleData {
  kind: "profile" | "character"
  href: string
  label: string
  primary: string
  secondary?: string
  avatarUrl?: string
  ownerAvatarUrl?: string
  ownerHref?: string
}

interface ScrollTitleContextValue {
  scrollTitle: ScrollTitleData | null
  showTitle: boolean
  register: (element: HTMLElement | null, title: ScrollTitleData) => () => void
}

const ScrollTitleContext = createContext<ScrollTitleContextValue | null>(null)

export function ScrollTitleProvider({ children }: React.PropsWithChildren) {
  const [scrollTitle, setScrollTitle] = useState<ScrollTitleData | null>(null)
  const [showTitle, setShowTitle] = useState(false)

  const register = useCallback(
    (element: HTMLElement | null, nextTitle: ScrollTitleData) => {
      setScrollTitle(nextTitle)
      setShowTitle(false)

      if (!element) {
        return () => {
          setScrollTitle(null)
          setShowTitle(false)
        }
      }

      const observer = new IntersectionObserver(
        ([entry]) => setShowTitle(!entry.isIntersecting),
        { rootMargin: "-60px 0px 0px 0px", threshold: 0 }
      )

      observer.observe(element)

      return () => {
        observer.disconnect()
        setScrollTitle(null)
        setShowTitle(false)
      }
    },
    []
  )

  const value = useMemo(
    () => ({ scrollTitle, showTitle, register }),
    [scrollTitle, showTitle, register]
  )

  return (
    <ScrollTitleContext.Provider value={value}>
      {children}
    </ScrollTitleContext.Provider>
  )
}

export function useScrollTitle() {
  const context = useContext(ScrollTitleContext)
  if (!context) {
    throw new Error("useScrollTitle must be used within ScrollTitleProvider")
  }
  return context
}
