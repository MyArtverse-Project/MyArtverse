"use client"

import DropZone from "@/components/Modals/DropZone"
import { useAuth } from "@/app/context/AuthContext"
import Checkbox from "@/components/layouts/Forms/Checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarginGutter } from "@/components/ui/group"
import { Textarea } from "@/components/ui/textarea"
import { useDebounce } from "@/hooks/useDebounce"
import { fetchCharacterById, search, uploadArt } from "@/utils/api"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LuArrowLeft } from "react-icons/lu"
import { toast } from "sonner"

interface Character {
  id: string
  name: string
  slug?: string
  owner?: { handle?: string }
}

function getCharacterGalleryPath(
  character: Character,
  fallbackHandle?: string | null
) {
  const handle = character.owner?.handle ?? fallbackHandle
  if (!handle || !character.slug) return null
  return `/@${handle}/${character.slug}/gallery`
}

export default function UploadArtPage() {
  const router = useRouter()
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const resolvedCharacterId = searchParams.get("characterId") ?? ""
  const [artUrl, setArtUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [userAsArtist, setUserAsArtist] = useState(false)
  const [nsfw, setNsfw] = useState(false)

  const [mainCharacterId, setMainCharacterId] = useState("")
  const [taggedCharacterIds, setTaggedCharacterIds] = useState<string[]>([])
  const [taggedCharacterNames, setTaggedCharacterNames] = useState<
    Record<string, string>
  >({})

  const [mainSearch, setMainSearch] = useState("")
  const [taggedSearch, setTaggedSearch] = useState("")
  const debouncedMainSearch = useDebounce(mainSearch, 300)
  const debouncedTaggedSearch = useDebounce(taggedSearch, 300)

  const [mainCharacterOptions, setMainCharacterOptions] = useState<Character[]>(
    []
  )
  const [taggedCharacterOptions, setTaggedCharacterOptions] = useState<
    Character[]
  >([])

  const [loading, setLoading] = useState(false)

  const resetForm = () => {
    setArtUrl("")
    setTitle("")
    setDescription("")
    setTags([])
    setUserAsArtist(false)
    setNsfw(false)
    setMainCharacterId(resolvedCharacterId)
    setTaggedCharacterIds([])
    setTaggedCharacterNames({})
    setMainSearch("")
    setTaggedSearch("")
  }

  useEffect(() => {
    resetForm()
  }, [resolvedCharacterId])

  useEffect(() => {
    if (!resolvedCharacterId) return

    fetchCharacterById(resolvedCharacterId)
      .then((character) => {
        setMainCharacterId(character.id)
        setMainSearch(character.name)
      })
      .catch((error) => {
        console.error("Failed to prefill character", error)
      })
  }, [resolvedCharacterId])

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!debouncedMainSearch) return setMainCharacterOptions([])
      try {
        const data = await search(debouncedMainSearch, "character")
        setMainCharacterOptions(data.character)
      } catch (err) {
        console.error("Character search failed", err)
      }
    }
    fetchCharacters()
  }, [debouncedMainSearch])

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!debouncedTaggedSearch) return setTaggedCharacterOptions([])
      try {
        const data = await search(debouncedTaggedSearch, "character")
        const filtered = data.character.filter(
          (c) => c.id !== mainCharacterId && !taggedCharacterIds.includes(c.id)
        )
        setTaggedCharacterOptions(filtered)
      } catch (err) {
        console.error("Tagged character search failed", err)
      }
    }
    fetchCharacters()
  }, [debouncedTaggedSearch, mainCharacterId, taggedCharacterIds])

  const handleClose = () => {
    router.push("/studio/gallery")
  }

  const handleUpload = async () => {
    if (!artUrl || !title || !mainCharacterId) return

    setLoading(true)

    try {
      await uploadArt(mainCharacterId, {
        imageUrl: artUrl,
        title,
        description,
        tags,
        userAsArtist,
        nsfw,
        mainCharacterId,
        taggedCharacterIds,
      })

      toast.success("Artwork uploaded", {
        description: `"${title}" was added to your gallery.`,
      })

      const character = await fetchCharacterById(mainCharacterId)
      const galleryPath =
        getCharacterGalleryPath(character, user?.handle) ?? "/studio/gallery"

      router.push(galleryPath)
    } catch (err) {
      console.error("Upload failed", err)
      toast.error("Upload failed", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <MarginGutter screenSize="xl" className="px-6 py-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={handleClose} type="button">
          <LuArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-xl font-semibold">Upload artwork</h1>
          <p className="text-muted-foreground text-sm">
            Add an image and fill in the details below.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wide">
            Artwork
          </Label>
          <DropZone
            value={artUrl}
            setData={setArtUrl}
            enableCrop={false}
            previewSize="large"
            label="Drop your artwork here"
            className="w-full"
          />
        </div>

        <div className="border-border bg-card flex flex-col gap-5 rounded-lg border p-5 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="art-title">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="art-title"
              placeholder="Enter a title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="art-description">Description</Label>
            <Textarea
              id="art-description"
              placeholder="Optional description"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="art-tags">Tags</Label>
            <Input
              id="art-tags"
              placeholder="Press Enter to add a tag"
              onKeyDown={handleTagAdd}
            />
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

          <div className="border-border flex flex-col gap-3 rounded-md border p-4">
            <Checkbox
              inputName="artist"
              onChange={() => setUserAsArtist(!userAsArtist)}
              checked={userAsArtist}
              label="I am the artist of this artwork"
            />
            <Checkbox
              inputName="nsfw"
              onChange={() => setNsfw(!nsfw)}
              checked={nsfw}
              label="Mark this artwork as NSFW"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="main-character">
              Main character <span className="text-destructive">*</span>
            </Label>
            <Input
              id="main-character"
              placeholder="Search main character..."
              onChange={(e) => setMainSearch(e.target.value)}
              value={mainSearch}
            />
            {mainCharacterOptions.length > 0 && (
              <ul className="border-border bg-popover max-h-40 overflow-y-auto rounded-md border shadow-sm">
                {mainCharacterOptions.map((char) => (
                  <li
                    key={char.id}
                    className="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
                    onClick={() => {
                      setMainCharacterId(char.id)
                      setMainSearch(char.name)
                      setMainCharacterOptions([])
                    }}
                  >
                    {char.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag-characters">Tag characters</Label>
            <Input
              id="tag-characters"
              placeholder="Search and select characters..."
              onChange={(e) => setTaggedSearch(e.target.value)}
              value={taggedSearch}
            />
            {taggedCharacterOptions.length > 0 && (
              <ul className="border-border bg-popover max-h-40 overflow-y-auto rounded-md border shadow-sm">
                {taggedCharacterOptions.map((char) => (
                  <li
                    key={char.id}
                    className="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
                    onClick={() => {
                      setTaggedCharacterIds((prev) => [...prev, char.id])
                      setTaggedCharacterNames((prev) => ({
                        ...prev,
                        [char.id]: char.name,
                      }))
                      setTaggedSearch("")
                      setTaggedCharacterOptions([])
                    }}
                  >
                    {char.name}
                  </li>
                ))}
              </ul>
            )}
            {taggedCharacterIds.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {taggedCharacterIds.map((id) => (
                  <Badge
                    key={id}
                    variant="outline"
                    className="cursor-pointer hover:bg-destructive/20"
                    onClick={() => {
                      setTaggedCharacterIds(
                        taggedCharacterIds.filter((x) => x !== id)
                      )
                      setTaggedCharacterNames((prev) => {
                        const next = { ...prev }
                        delete next[id]
                        return next
                      })
                    }}
                  >
                    {taggedCharacterNames[id] ?? id}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-border mt-8 flex justify-end gap-3 border-t pt-6">
        <Button variant="outline" onClick={resetForm} type="button">
          Clear
        </Button>
        <Button
          onClick={handleUpload}
          disabled={loading || !artUrl || !title || !mainCharacterId}
        >
          {loading ? "Uploading..." : "Upload artwork"}
        </Button>
      </div>
    </MarginGutter>
  )
}
