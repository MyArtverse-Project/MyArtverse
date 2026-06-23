"use client"

import Checkbox from "@/components/layouts/Forms/Checkbox"
import ArtistCreditField from "@/components/layouts/Forms/ArtistCreditField"
import DropZone from "@/components/Modals/DropZone"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Character, ReferenceSheet } from "@/types/characters"
import { createRefSheet } from "@/utils/api"
import {
  fromRefSheetArtist,
  isArtistCreditComplete,
  toArtistCreditRequest,
  type ArtistCreditFormValue,
} from "@/utils/artistCreditForm"
import { useAuth } from "@/app/context/AuthContext"
import { extractImageColors } from "@/utils/extractImageColors"
import { uploadImageFile } from "@/utils/uploadImage"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import {
  LuHelpCircle,
  LuCopy,
  LuGripVertical,
  LuPlus,
  LuTrash2,
} from "react-icons/lu"
import LinkedCharacterSelect, {
  type LinkedCharacter,
} from "./LinkedCharacterSelect"
import { mapVariantFromApi, refSheetVariantPreviewClassName } from "./refSheetUtils"

export type RefSheetFormData = Parameters<typeof createRefSheet>[0]

export interface ReferenceVariant {
  id?: string
  title: string
  description: string
  image: string
  primary: boolean
  nsfw: boolean
  colors: string[]
}

type ApiVariant = ReferenceSheet["variants"][number] & {
  id?: string
  title?: string
  description?: string
  colors?: string[]
}

export function ReferenceConfigForm({
  image,
  character,
  characters,
  initialRefSheet,
  onClose,
  formId = "ref-sheet-form",
}: {
  image: string
  character: Character
  characters: LinkedCharacter[]
  initialRefSheet?: ReferenceSheet
  onClose: (formData: RefSheetFormData) => void
  formId?: string
}) {
  const { user } = useAuth()
  const isEditing = !!initialRefSheet

  const [name, setName] = useState(initialRefSheet?.name ?? "")
  const [linkedTo, setLinkedTo] = useState(character.id)
  const [artistCredit, setArtistCredit] = useState<ArtistCreditFormValue>({
    mode: "none",
  })
  useEffect(() => {
    if (!isEditing || !initialRefSheet) {
      setArtistCredit({ mode: "none" })
      return
    }
    setArtistCredit(fromRefSheetArtist(initialRefSheet, user?.id))
  }, [initialRefSheet, isEditing, user?.id])

  const [referenceVariants, setReferenceVariants] = useState<ReferenceVariant[]>(
    () => {
      if (initialRefSheet?.variants?.length) {
        return (initialRefSheet.variants as ApiVariant[]).map((v) =>
          mapVariantFromApi(v)
        )
      }
      return [
        {
          title: "",
          description: "",
          image,
          primary: true,
          nsfw: false,
          colors: [],
        },
      ]
    }
  )

  const applyColorsToVariant = useCallback(
    async (index: number, imageUrl: string) => {
      try {
        const colors = await extractImageColors(imageUrl)
        setReferenceVariants((prev) => {
          const next = [...prev]
          if (next[index]) next[index] = { ...next[index], colors }
          return next
        })
      } catch {
        // Keep existing palette if extraction fails.
      }
    },
    []
  )

  useEffect(() => {
    if (!isEditing) {
      applyColorsToVariant(0, image)
    }
  }, [image, applyColorsToVariant, isEditing])

  const updateVariant = (
    index: number,
    key: keyof ReferenceVariant,
    value: ReferenceVariant[keyof ReferenceVariant]
  ) => {
    setReferenceVariants((prev) => {
      const next = [...prev]
      next[index] = { ...next[index], [key]: value }
      return next
    })
  }

  const handleSubmit = () => {
    if (!name.trim() || !isArtistCreditComplete(artistCredit)) return

    const artistRequest = toArtistCreditRequest(artistCredit)

    onClose({
      characterId: linkedTo,
      refSheet: {
        ...(initialRefSheet?.id ? { id: initialRefSheet.id } : {}),
        name: name.trim(),
        description: referenceVariants[0]?.description ?? "",
        primary: referenceVariants.some((variant) => variant.primary),
        userAsArtist: artistRequest.userAsArtist,
        artistCredit: artistRequest.artistCredit,
        variants: referenceVariants.map((variant) => ({
          ...(variant.id ? { id: variant.id } : {}),
          title: variant.title,
          description: variant.description,
          image: variant.image,
          primary: variant.primary,
          nsfw: variant.nsfw,
          colors: variant.colors,
        })),
      },
    })
  }

  const addVariant = (url: string) => {
    setReferenceVariants((prev) => {
      const nextIndex = prev.length
      void applyColorsToVariant(nextIndex, url)
      return [
        ...prev,
        {
          title: "",
          description: "",
          image: url,
          primary: false,
          nsfw: false,
          colors: [] as string[],
        },
      ]
    })
  }

  const removeVariant = (index: number) => {
    setReferenceVariants((prev) => {
      if (prev.length <= 1) return prev
      const next = prev.filter((_, i) => i !== index)
      if (!next.some((variant) => variant.primary)) {
        next[0] = { ...next[0], primary: true }
      }
      return next
    })
  }

  const setDefaultVariant = (index: number) => {
    setReferenceVariants((prev) =>
      prev.map((variant, i) => ({ ...variant, primary: i === index }))
    )
  }

  const copyPalette = async (colors: string[]) => {
    if (!colors.length) return
    await navigator.clipboard.writeText(colors.join(", "))
  }

  return (
    <TooltipProvider>
      <form
        id={formId}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="flex min-w-0 flex-col gap-6"
      >
        <p className="text-muted-foreground text-sm">
          Upload reference images, add details for each variant, and link the
          sheet to a character.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ref-name">
              Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="ref-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <LinkedCharacterSelect
            characters={characters}
            value={linkedTo}
            onChange={setLinkedTo}
          />
        </div>

        <ArtistCreditField
          value={artistCredit}
          onChange={setArtistCredit}
        />

        <div className="space-y-3">
          <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wide">
            Reference image(s)
          </Label>

          <div className="flex flex-col gap-4">
            {referenceVariants.map((variant, index) => (
              <ReferenceVariantCard
                key={variant.id ?? `${variant.image}-${index}`}
                variant={variant}
                index={index}
                canDelete={referenceVariants.length > 1}
                onUpdate={updateVariant}
                onRemove={() => removeVariant(index)}
                onSetDefault={() => setDefaultVariant(index)}
                onReplaceImage={async (url) => {
                  updateVariant(index, "image", url)
                  await applyColorsToVariant(index, url)
                }}
                onCopyPalette={() => copyPalette(variant.colors)}
                onAddColor={() =>
                  updateVariant(index, "colors", [...variant.colors, "#cccccc"])
                }
              />
            ))}
          </div>
        </div>

        <DropZone
          setData={addVariant}
          label="Add more by dropping images here"
          enableCrop={false}
          className="border-border w-full max-w-full"
        />
      </form>
    </TooltipProvider>
  )
}

function ReferenceVariantCard({
  variant,
  index,
  canDelete,
  onUpdate,
  onRemove,
  onSetDefault,
  onReplaceImage,
  onCopyPalette,
  onAddColor,
}: {
  variant: ReferenceVariant
  index: number
  canDelete: boolean
  onUpdate: (
    index: number,
    key: keyof ReferenceVariant,
    value: ReferenceVariant[keyof ReferenceVariant]
  ) => void
  onRemove: () => void
  onSetDefault: () => void
  onReplaceImage: (url: string) => Promise<void>
  onCopyPalette: () => void
  onAddColor: () => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isReplacing, setIsReplacing] = useState(false)

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsReplacing(true)
    try {
      const url = await uploadImageFile(file)
      await onReplaceImage(url)
    } finally {
      setIsReplacing(false)
      e.target.value = ""
    }
  }

  return (
    <div className="flex min-w-0 gap-3">
      <div className="text-muted-foreground flex shrink-0 items-start pt-8">
        <LuGripVertical size={20} className="cursor-move" />
      </div>

      <div className="border-border bg-card flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border lg:flex-row lg:items-stretch">
        <div className="flex w-full shrink-0 flex-col gap-3 p-4 lg:w-72 lg:self-stretch">
          <div className={refSheetVariantPreviewClassName}>
            <Image
              src={variant.image}
              alt={variant.title || "Reference preview"}
              fill
              className="object-cover object-center"
              unoptimized
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleReplace}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full shrink-0"
            disabled={isReplacing}
            onClick={() => fileInputRef.current?.click()}
          >
            {isReplacing ? "Uploading..." : "Replace image"}
          </Button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1 space-y-2">
              <Label htmlFor={`variant-title-${index}`}>Title</Label>
              <Input
                id={`variant-title-${index}`}
                value={variant.title}
                onChange={(e) => onUpdate(index, "title", e.target.value)}
              />
            </div>
            {canDelete && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mt-7 shrink-0"
                onClick={onRemove}
                aria-label="Remove reference image"
              >
                <LuTrash2 size={18} />
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                inputName={`primary-${index}`}
                label="Set this reference image by default"
                checked={variant.primary}
                onChange={onSetDefault}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button type="button" className="text-muted-foreground">
                    <LuHelpCircle size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  The default image is shown first on your character profile.
                </TooltipContent>
              </Tooltip>
            </div>
            <Checkbox
              inputName={`nsfw-${index}`}
              label="Mark this reference as NSFW"
              checked={variant.nsfw}
              onChange={() => onUpdate(index, "nsfw", !variant.nsfw)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`variant-description-${index}`}>
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id={`variant-description-${index}`}
              value={variant.description}
              rows={4}
              onChange={(e) => onUpdate(index, "description", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wide">
                Color palette
              </Label>
              <Badge variant="outline">Auto-generated</Badge>
              <div className="ml-auto flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onAddColor}
                  aria-label="Add color"
                >
                  <LuPlus size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onCopyPalette}
                  aria-label="Copy palette"
                >
                  <LuCopy size={16} />
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {variant.colors.map((color, colorIndex) => (
                <label
                  key={`${color}-${colorIndex}`}
                  className="border-border relative size-8 overflow-hidden rounded-full border"
                  style={{ backgroundColor: color }}
                >
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => {
                      const next = [...variant.colors]
                      next[colorIndex] = e.target.value
                      onUpdate(index, "colors", next)
                    }}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
