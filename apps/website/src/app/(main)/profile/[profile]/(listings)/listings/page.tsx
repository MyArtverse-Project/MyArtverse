import type { Metadata, ResolvingMetadata } from "next"
import type { SlugRouteProps } from "@/types/utils"
import ListingPage from "./ListingPage"

export async function generateMetadata(
  { params, searchParams }: SlugRouteProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `User's Listings`,
    description: `Follow User on new listing updates on MyFursona by creating an account!`
  }
}

export default function Page({ params }: SlugRouteProps) {
  return <ListingPage />
}
