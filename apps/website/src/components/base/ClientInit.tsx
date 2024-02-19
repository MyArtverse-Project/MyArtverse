"use client"

import { useEffect } from "react"

export default function ClientInit() {
  const CONSOLE_MSG =
    "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"

  useEffect(() => {
    console.log(CONSOLE_MSG, "color:hsl(250,95.5%,75%")
  }, [])

  return null
}
