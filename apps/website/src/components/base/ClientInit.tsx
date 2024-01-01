"use client"

import { useEffect } from "react"
import NoJSReminder from "./NoJSReminder"
// import OneSignal from "react-onesignal"

export default function ClientInit() {
  const CONSOLE_MSG =
    "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"

  useEffect(() => {
    const d = document
    const commentMsg =
      "Oh you decided to take a looksies at the precious sauce code I see OwO"
    d.insertBefore(d.createComment(commentMsg), d.childNodes[0])

    console.log(CONSOLE_MSG, "color:hsl(250,95.5%,75%")

    // OneSignal
    // OneSignal.init({
    //   appId: "test"
    // })
  }, [])

  return <NoJSReminder />
}
