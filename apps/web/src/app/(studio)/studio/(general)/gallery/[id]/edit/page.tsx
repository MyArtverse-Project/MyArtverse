import EditArtworkForm from "./EditArtworkForm"
import { getArtwork } from "@/utils/api"
import { notFound } from "next/navigation"

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const artwork = await getArtwork(id)

  if (!artwork?.id) {
    notFound()
  }

  return <EditArtworkForm artwork={artwork} />
}
