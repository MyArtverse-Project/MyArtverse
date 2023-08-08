import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Linktree } from "../icons"

import { fab } from "@fortawesome/free-brands-svg-icons"
import { library } from "@fortawesome/fontawesome-svg-core"
library.add(fab)

type Socials =
  // general
  | "facebook"
  | "twitter"
  | "youtube"
  | "instagram"
  | "twitch"
  | "tiktok"
  | "reddit"
  | "threads"
  | "tumblr"
  | "mastodon"
  | "bluesky"
  | "linktree"
  // gaming
  | "steam"
  | "playstation"
  | "xbox"
  | "github"
  // messaging
  | "telegram"
  | "discord"
  | "whatsapp"
  // Art focused
  | "pinterest"
  | "behance"
  | "deviantart"
  | "artstation"
  | "sketchfab"
  | "artfight"
  | "furaffinity"
  | "weasyl"
  // Fundrasing & e-commerce
  | "Etsy"
  | "Ko-fi"
  | "Patreon"
  // music
  | "iTunes"
  | "Spotify"
  | "SoundCloud"
  | "Bandcamp"

export default function Socials({
  items
}: {
  items?: Partial<Record<Lowercase<Socials>, string>>
}) {
  return (
    <div data-social-shelf="">
      <FontAwesomeIcon icon={["fab", "youtube"]} size="lg" fixedWidth />
      <FontAwesomeIcon icon={["fab", "x-twitter"]} size="lg" fixedWidth />
      <FontAwesomeIcon icon={["fab", "github"]} size="lg" fixedWidth />
    </div>
  )
}
