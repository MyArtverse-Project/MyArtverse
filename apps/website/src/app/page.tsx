'use client'

import { Metadata } from "next"
import { useSearchParams } from "next/navigation"
import Landing from "./Landing"

const title = "MyFursona — a place where everyfur belongs!"
const description =
  "MyFursona is a social platform where you manage and keep track of your fursonas, art commissions, trades, and character adoptables!"

export const metadata: Metadata = {
  title: {
    absolute: title
  },
  description: description,
  openGraph: {
    title: title,
    description: description
  }
}

export default function Home() {
  const guestMode = useSearchParams().get("show-as-guest")
  return (
    <>
      {guestMode ? (
        <div></div>
      ) : (
        <Landing />
      )}
    </>
  )
}
