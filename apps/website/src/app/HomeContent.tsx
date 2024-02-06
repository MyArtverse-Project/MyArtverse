"use client"

import { useSearchParams } from "next/navigation"
import Browse from "./browse/page"
import Landing from "./landing/page"

export default function HomeContent() {
  const guestMode = useSearchParams().get("show-as-guest")
  return <>{guestMode ? <Browse /> : <Landing />}</>
}
