"use client"

import DropZone from "@/components/Modals/DropZone"
import Checkbox from "@/components/layouts/Forms/Checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarginGutter } from "@/components/ui/group"
import { useDebounce } from "@/hooks/useDebounce"
import { search, uploadArt } from "@/utils/api"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { LuXCircle } from "react-icons/lu"

interface Character {
  id: string
  name: string
}

interface UploadArtModalProps {
  toggleUploadArtModal: () => void
  uploadArtModal: boolean
  characterId: string
}

export default function UploadArtModal({
  toggleUploadArtModal,
  uploadArtModal,
  characterId
}: UploadArtModalProps) {
  const [artUrl, setArtUrl] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [userAsArtist, setUserAsArtist] = useState(false)

  const [mainCharacterId, setMainCharacterId] = useState("")
  const [taggedCharacterIds, setTaggedCharacterIds] = useState<string[]>([])

  const [mainSearch, setMainSearch] = useState("")
  const [taggedSearch, setTaggedSearch] = useState("")
  const debouncedMainSearch = useDebounce(mainSearch, 300)
  const debouncedTaggedSearch = useDebounce(taggedSearch, 300)

  const [mainCharacterOptions, setMainCharacterOptions] = useState<Character[]>([])
  const [taggedCharacterOptions, setTaggedCharacterOptions] = useState<Character[]>([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setArtUrl("")
    setTitle("")
    setDescription("")
    setTags([])
    setUserAsArtist(false)
    setMainCharacterId(characterId)
    setTaggedCharacterIds([])
    setMainSearch("")
    setTaggedSearch("")
  }, [uploadArtModal])

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
        mainCharacterId,
        taggedCharacterIds
      })
      redirect("/studio/gallery")
    } catch (err) {
      console.error("Upload failed", err)
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
    <MarginGutter screenSize="xl" className="px-6 py-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          Upload Artwork
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleUploadArtModal}
        >
          <LuXCircle size={18} />
        </Button>
      </div>

      <section className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <DropZone aspectRatio="1" setData={setArtUrl} className="w-full" />
          {artUrl && (
            <img
              src={artUrl}
              alt="Uploaded Art Preview"
              className="mt-4 w-full rounded-md border object-cover"
            />
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="art-title">Title</Label>
            <Input
              id="art-title"
              placeholder="Enter a title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="art-description">Description</Label>
            <Input
              id="art-description"
              placeholder="Optional description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="art-tags">Tags (Press Enter)</Label>
            <Input
              id="art-tags"
              placeholder="Add tags"
              onKeyDown={handleTagAdd}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white hover:bg-red-600 cursor-pointer transition"
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                #{tag}
              </span>
            ))}
          </div>

          <Checkbox
            inputName="artist"
            onChange={() => setUserAsArtist(!userAsArtist)}
            checked={userAsArtist}
            label="I am the artist of this artwork"
          />

          <div className="space-y-2">
            <Label htmlFor="main-character">Main Character</Label>
            <Input
              id="main-character"
              placeholder="Search main character..."
              onChange={(e) => setMainSearch(e.target.value)}
              value={mainSearch}
            />
          </div>
          {Array.isArray(mainCharacterOptions) && mainCharacterOptions.length > 0 && (
            <ul className="mt-2 rounded-md border bg-100 shadow-sm max-h-40 overflow-y-auto">
              {mainCharacterOptions.map((char) => (
                <li
                  key={char.id}
                  className="cursor-pointer px-3 py-2 hover:bg-100"
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

          <div className="space-y-2">
            <Label htmlFor="tag-characters">Tag Characters</Label>
            <Input
              id="tag-characters"
              placeholder="Search and select characters..."
              onChange={(e) => setTaggedSearch(e.target.value)}
              value={taggedSearch}
            />
          </div>
          {taggedCharacterOptions.length > 0 && (
            <ul className="mt-2 rounded-md border bg-100 shadow-sm max-h-40 overflow-y-auto">
              {taggedCharacterOptions.map((char) => (
                <li
                  key={char.id}
                  className="cursor-pointer px-3 py-2 hover:bg-100"
                  onClick={() => {
                    setTaggedCharacterIds((prev) => [...prev, char.id])
                    setTaggedSearch("")
                    setTaggedCharacterOptions([])
                  }}
                >
                  {char.name}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            {taggedCharacterIds.map((id) => (
              <span
                key={id}
                className="rounded-full bg-purple-600 px-3 py-1 text-sm text-white hover:bg-red-600 cursor-pointer transition"
                onClick={() => setTaggedCharacterIds(taggedCharacterIds.filter((x) => x !== id))}
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setArtUrl("")
            setTitle("")
            setDescription("")
            setTags([])
            setUserAsArtist(false)
            setMainCharacterId("")
            setTaggedCharacterIds([])
            setMainSearch("")
            setTaggedSearch("")
          }}
        >
          Clear
        </Button>
        <Button
          onClick={handleUpload}
          disabled={loading || !artUrl || !title || !mainCharacterId}
        >
          {loading ? "Uploading..." : "Upload Art"}
        </Button>
      </div>
    </MarginGutter>
  )
}
