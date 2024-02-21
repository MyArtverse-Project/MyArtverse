"use client"

import { createContext } from "react"

export const MastheadContext = createContext<{
  hasEditAccess: boolean
  setEditAccess: React.Dispatch<React.SetStateAction<boolean>>
}>({ hasEditAccess: false, setEditAccess: () => {} })

export default function MastheadRoot({
  children,
  hasEditAccess
}: {
  children?: React.ReactNode
  hasEditAccess?: boolean
}) {
  return (
    <>
      {/* <MastheadContext.Provider> */}
      {children}
      {/* </MastheadContext.Provider> */}
    </>
  )
}
