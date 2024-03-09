"use client"

import { atom, useAtom, useSetAtom } from "jotai"

const mastheadEditAccess = atom(false)

export function useMastheadAccessAtom() {
  const [hasAccess, setHasAccess] = useAtom(mastheadEditAccess)

  return [hasAccess, setHasAccess]
}

export default function MastheadRoot({
  children,
  hasEditAccess
}: {
  children?: React.ReactNode
  hasEditAccess?: boolean
}) {
  const setHasAccess = useSetAtom(mastheadEditAccess)

  if (hasEditAccess) setHasAccess(true)

  return <div masthead-root="">{children}</div>
}
