"use client"

import { createContext, useContext, useState } from "react"

type PeekType = "profile" | "character"

const DetailPeekContext = createContext<{
  isPeeking: boolean
  setPeeking: React.Dispatch<React.SetStateAction<boolean>>
  type: PeekType
  img: string
  username: string
  setPeek: {
    type: React.Dispatch<React.SetStateAction<PeekType>>
    img: React.Dispatch<React.SetStateAction<string>>
    username: React.Dispatch<React.SetStateAction<string>>
  }
}>({
  isPeeking: false,
  setPeeking: () => {},
  type: "profile",
  img: "",
  username: "",
  setPeek: {
    type: () => {},
    img: () => {},
    username: () => {}
  }
})

export function useDetailPeekContext() {
  const ctx = useContext(DetailPeekContext)

  if (!ctx) {
    throw new Error("The useSidebarContext hook must be used within the DetailPeekContext.")
  }

  return ctx
}

export function DetailPeekProvider({ children }: { children?: React.ReactNode }) {
  const [isPeeking, setPeeking] = useState(false)
  const [peekType, setPeekType] = useState<PeekType>("profile")
  const [img, setImg] = useState("")
  const [username, setUsername] = useState("")

  return (
    <DetailPeekContext.Provider
      value={{
        isPeeking,
        setPeeking,
        type: peekType,
        img,
        username,
        setPeek: {
          type: setPeekType,
          img: setImg,
          username: setUsername
        }
      }}
    >
      {children}
    </DetailPeekContext.Provider>
  )
}
