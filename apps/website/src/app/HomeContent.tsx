"use client"

import { useSearchParams } from "next/navigation"
import Landing from "./landing/page"
import Browse from "./browse/page"

export default function HomeContent() {
  const guestMode = useSearchParams().get("show-as-guest")
  return <>{guestMode ? <Browse /> : <Landing />}</>
}
