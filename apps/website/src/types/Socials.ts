import type { IconProp } from "@fortawesome/fontawesome-svg-core"
import { OmitUnion } from "."

export type Platforms =
  // general
  | "Facebook"
  | "Twitter"
  | "YouTube"
  | "Instagram"
  | "Twitch"
  | "TikTok"
  | "Reddit"
  | "Threads"
  | "Tumblr"
  | "Mastodon"
  | "Bluesky"
  | "Linktree"
  // gaming
  | "Steam"
  | "PlayStation"
  | "Battle.net"
  | "Origin"
  | "Xbox"
  | "GitHub"
  // messaging
  | "Telegram"
  | "Discord"
  | "WhatsApp"
  // Art focused
  | "Pinterest"
  | "Behance"
  | "DeviantArt"
  | "ArtStation"
  | "SketchFab"
  | "Artfight"
  | "FurAffinity"
  | "Weasyl"
  // Fundrasing & e-commerce
  | "Etsy"
  | "Ko-fi"
  | "Patreon"
  // music
  | "Apple Music"
  | "Spotify"
  | "Soundcloud"
  | "Bandcamp"
  | "Website"

export type Socials = Array<{
  platform: Platforms
  link: string
}>

// prettier-ignore
type IconsNotAvilableToFontAwesome = OmitUnion<Platforms, "FurAffinity" | "Weasyl" | "Ko-fi" | "Bluesky" | "Website">
// prettier-ignore
export type ResolveToFontAwesome = Partial<Record<IconsNotAvilableToFontAwesome, IconProp>>
