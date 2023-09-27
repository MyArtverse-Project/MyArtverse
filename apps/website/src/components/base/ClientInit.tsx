"use client"

import { useEffect } from "react"

export default function ClientInit() {
  const CONSOLE_MSG =
    "%c🦊✨ Are you looking to improve MyFursona? If you're a developer, you can help! The code, including this website, is open-source! https://github.com/MyFursona-Project"

  const WEB_SCRAPER_MSG =
    "For those scraping this website, try typing `window.MyFursona` into the console and you'll no longer need to dig through HTML! You're welcome 😉"

  useEffect(() => {
    const d = document
    const commentMsg =
      "Oh you decided to take a looksies at the precious sauce code I see OwO"
    d.insertBefore(d.createComment(commentMsg), d.childNodes[0])

    console.log(CONSOLE_MSG, "color:hsl(250,95.5%,75%")
    console.log(WEB_SCRAPER_MSG)

    window.MyFursona = {
      version: "0.0.1"
    }
  }, [])

  return <></>
}
