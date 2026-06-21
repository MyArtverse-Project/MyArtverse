import { notFound } from "next/navigation"
import { fetchCharacter } from "./api"

export async function loadCharacter(handle: string, slug: string) {
  try {
    return await fetchCharacter(handle, slug)
  } catch {
    notFound()
  }
}
