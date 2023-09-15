'use client'

import { useSearchParams } from "next/navigation"
import React from "react"
import Landing from "./Landing"
import Browse from "./Browse"

export default function HomeContent() {
  const guestMode = useSearchParams().get("show-as-guest")
  return <>{guestMode ? <Browse /> : <Landing />}</>
}
