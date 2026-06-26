import type { Visibility } from "@/types/utils"
import type { IconType } from "react-icons"
import { LuGlobe, LuLink2, LuLock, LuUsers } from "react-icons/lu"

export type ContentVisibility = Extract<
  Visibility,
  "public" | "private" | "unlisted" | "followers"
>

export function normalizeContentVisibility(
  visibility: Visibility | string | undefined
): ContentVisibility {
  if (
    visibility === "private" ||
    visibility === "unlisted" ||
    visibility === "followers"
  ) {
    return visibility
  }
  return "public"
}

export const visibilityOwnerLabels: Record<
  ContentVisibility,
  { label: string; description: string; icon: IconType }
> = {
  public: {
    label: "Public",
    description: "Visible to everyone",
    icon: LuGlobe,
  },
  unlisted: {
    label: "Unlisted",
    description: "Direct link only",
    icon: LuLink2,
  },
  followers: {
    label: "Mutual followers",
    description: "Only mutual followers",
    icon: LuUsers,
  },
  private: {
    label: "Private",
    description: "Only you",
    icon: LuLock,
  },
}

export function getVisibilityOwnerLabel(
  visibility: Visibility | string | undefined
) {
  return visibilityOwnerLabels[normalizeContentVisibility(visibility)]
}

export function isRestrictedVisibility(
  visibility: Visibility | string | undefined
): boolean {
  return normalizeContentVisibility(visibility) !== "public"
}
