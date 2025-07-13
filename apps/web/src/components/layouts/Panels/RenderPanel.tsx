import { User } from "@/app/context/AuthContext"
import { DashboardPanel, UserType } from "@/types/users"
import CommentPanel from "./Comments/CommentPanel"
import FeaturedArtworkPanel from "./FeaturedArtworkPanel"
import FeaturedGalleryPanel from "./FeaturedGalleryPanel"
import InformationPanel from "./InformationPanel"
import ReferenceSheetPanel from "./ReferenceSheetPanel"
import { Character } from "@/types/characters"

export function renderPanel(
  panel: DashboardPanel,
  type: "user" | "character",
  target: UserType | Character,
  self: User | null
) {
  switch (panel.type) {
    case "customHTML":
      return null
    case "comments":
      return (
        <CommentPanel
          comments={target.comments}
          self={self}
          type={type}
          characterName={type == 'character' ? (target as Character).slug : undefined}
        />
      )
    // case "information":
    //   return <InformationPanel user={target} isOwner={self?.id === target.id} />
    // case "featured_gallery":
    //   return <FeaturedGalleryPanel user={target} isOwner={self?.id === target.id} />
    // case "featured_artwork":
    //   return <FeaturedArtworkPanel user={target} isOwner={self?.id === target.id} />
    // case "reference_sheet":
    //   return <ReferenceSheetPanel user={target} isOwner={self?.id === target.id} />
    default:
      return <div>Unknown Panel Type</div>
  }
}
