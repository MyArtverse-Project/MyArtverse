"use client"

import Image from "next/image"
import DeleteArtworkDialog from "@/components/DeleteArtworkDialog"
import ArtistCreditField from "@/components/layouts/Forms/ArtistCreditField"
import Checkbox from "@/components/layouts/Forms/Checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarginGutter } from "@/components/ui/group"
import { Textarea } from "@/components/ui/textarea"
import type { Artwork } from "@/types/characters"
import { updateArtwork } from "@/utils/api"
import {
  fromArtworkArtist,
  isArtistCreditComplete,
  toArtistCreditRequest,
  type ArtistCreditFormValue,
} from "@/utils/artistCreditForm"
import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LuArrowLeft, LuTrash2 } from "react-icons/lu"

export default function EditArtworkForm({ artwork }: { artwork: Artwork }) {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = useState(artwork.title ?? "")
  const [description, setDescription] = useState(artwork.description ?? "")
  const [tags, setTags] = useState<string[]>(artwork.tags ?? [])
  const [nsfw, setNsfw] = useState(!!artwork.nsfw)
  const [artistCredit, setArtistCredit] = useState<ArtistCreditFormValue>(() =>
    fromArtworkArtist(artwork, user?.id)
  )
  const [loading, setLoading] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    if (user?.id) {
      setArtistCredit(fromArtworkArtist(artwork, user.id))
    }
  }, [artwork, user?.id])

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim()
      if (value && !tags.includes(value)) {
        setTags([...tags, value])
      }
      e.currentTarget.value = ""
      e.preventDefault()
    }
  }

  const handleSave = async () => {
    if (!title.trim() || !isArtistCreditComplete(artistCredit)) return

    setLoading(true)

    try {
      const artistRequest = toArtistCreditRequest(artistCredit)
      await updateArtwork(artwork.id, {
        title: title.trim(),
        description: description.trim(),
        tags,
        nsfw,
        userAsArtist: artistRequest.userAsArtist,
        artistCredit: artistRequest.artistCredit,
      })
      router.push("/studio/gallery")
      router.refresh()
    } catch (err) {
      console.error("Update failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <MarginGutter screenSize="xl" className="px-6 py-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/studio/gallery")}
          type="button"
        >
          <LuArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Edit artwork</h1>
          <p className="text-muted-foreground text-sm">
            Update the details below.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wide">
            Artwork
          </Label>
          <div className="border-border relative aspect-square w-full overflow-hidden rounded-lg border">
            {artwork.artworkUrl ? (
              <Image
                src={artwork.artworkUrl}
                alt={artwork.altText ?? artwork.title ?? "Artwork"}
                fill
                unoptimized
                className="object-contain"
              />
            ) : null}
          </div>
        </div>

        <div className="border-border bg-card flex flex-col gap-5 rounded-lg border p-5 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="art-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="art-title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="art-description">Description</Label>
            <Textarea
              id="art-description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="art-tags">Tags</Label>
            <Input id="art-tags" onKeyDown={handleTagAdd} />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="border-border space-y-4 rounded-md border p-4">
            <ArtistCreditField
              value={artistCredit}
              onChange={setArtistCredit}
              disabled={loading}
            />
            <Checkbox
              inputName="nsfw"
              onChange={() => setNsfw(!nsfw)}
              checked={nsfw}
              label="Mark this artwork as NSFW"
            />
          </div>
        </div>
      </div>

      <div className="border-border mt-8 flex justify-between gap-3 border-t pt-6">
        <Button
          type="button"
          variant="destructive"
          onClick={() => setDeleteOpen(true)}
          disabled={loading}
        >
          <LuTrash2 size={16} />
          Delete
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => router.push("/studio/gallery")}
            type="button"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || !title.trim() || !isArtistCreditComplete(artistCredit)}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      <DeleteArtworkDialog
        artwork={artwork}
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDeleted={() => {
          router.push("/studio/gallery")
          router.refresh()
        }}
      />
    </MarginGutter>
  )
}
