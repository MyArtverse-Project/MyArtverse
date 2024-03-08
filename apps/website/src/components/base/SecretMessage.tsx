"use client"

import { useEffect } from "react"

export default function SecretMessage() {
  const GH_LINK = "https://github.com/MyArtverse-Project/MyArtverse"
  const CONSOLE_MSG = `%c🦊✨ Hey~ Are you looking to improve MyArtverse? If you're a developer, you can help! The code, including this website, is open-source! ${GH_LINK}`

  useEffect(() => {
    /* eslint-disable-next-line no-console */
    console.info(CONSOLE_MSG, "color:hsl(250,95.5%,75%")
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  return null
}
