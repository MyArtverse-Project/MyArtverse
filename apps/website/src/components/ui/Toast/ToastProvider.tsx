"use client"

import { OmitUnion, Variants } from "@/types"
import { createContext, useContext, useState, useEffect } from "react"

type ToastMsgProperty = {
  type: OmitUnion<Variants, "primary" | "secondary" | "tritery"> | "normal"
  message: string
  cta?: {
    label: string
    link: string
  }
}

const ToastContext = createContext<{
  messages: ToastMsgProperty[] | never[]
  setMessages: React.Dispatch<React.SetStateAction<ToastMsgProperty[]>>
}>({
  messages: [],
  setMessages: () => {}
})

export function useThemeContext() {
  const ctx = useContext(ToastContext)

  if (!ctx) {
    throw new Error(
      "The useToastContext hook must be used within the ToastProvider."
    )
  }

  return ctx
}

export default function ToastProvider({
  children
}: {
  children?: React.ReactNode
}) {
  const [messages, setMessages] = useState<ToastMsgProperty[] | never[]>([])

  return (
    <ToastContext.Provider value={{ messages, setMessages }}>
      {children}
    </ToastContext.Provider>
  )
}
