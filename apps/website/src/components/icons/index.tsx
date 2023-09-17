"use client"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import Linktree from "./Linktree"
import MyFursona from "./MyFursona"

library.add(fab)

export function YouTube({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "youtube"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function GitHub({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "github"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function XTwitter({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "x-twitter"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Google({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "google"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Facebook({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "facebook"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Instagram({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "instagram"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Twitch({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "twitch"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function TikTok({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "tiktok"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Telegram({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "telegram"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Discord({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "discord"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Reddit({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "reddit"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Tumblr({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "tumblr"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Threads({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "threads"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function DeviantArt({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "deviantart"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function ArtStation({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "artstation"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function SoundCloud({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "soundcloud"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Spotify({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "spotify"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function AppleMusic({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "itunes-note"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Patreon({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "patreon"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Bandcamp({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "bandcamp"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Xbox({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "xbox"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export function Steam({ size = 21 }: { size?: number }) {
  return (
    <FontAwesomeIcon
      icon={["fab", "steam"]}
      fixedWidth
      fontSize={size.toString()}
    />
  )
}

export { Linktree, MyFursona }
