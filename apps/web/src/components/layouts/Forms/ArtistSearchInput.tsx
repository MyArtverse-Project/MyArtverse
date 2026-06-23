"use client"

import Avatar from "@/components/Avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDebounce } from "@/hooks/useDebounce"
import { USER_DEFAULT_AVATAR } from "@/utils/constants"
import { cn } from "@/lib/utils"
import { useEffect, useId, useRef, useState } from "react"

export type ArtistSearchOption = {
  id?: string
  handle: string
  displayName?: string | null
  avatarUrl?: string | null
}

function SearchResultAvatar({
  src,
  username,
  size,
}: {
  src?: string | null
  username: string
  size: number
}) {
  const resolvedSrc = src || USER_DEFAULT_AVATAR
  const isRemote = resolvedSrc.startsWith("http://") || resolvedSrc.startsWith("https://")

  if (isRemote) {
    return (
      <img
        src={resolvedSrc}
        alt={username ? `Avatar of ${username}` : ""}
        width={size}
        height={size}
        className="aspect-square shrink-0 rounded-full object-cover"
        loading="lazy"
        decoding="async"
        onError={(event) => {
          const img = event.currentTarget
          if (img.src !== USER_DEFAULT_AVATAR) {
            img.src = USER_DEFAULT_AVATAR
          }
        }}
      />
    )
  }

  return (
    <Avatar src={resolvedSrc} username={username} size={size} />
  )
}

export default function ArtistSearchInput({
  id,
  label,
  placeholder,
  value,
  selectedOption,
  onValueChange,
  onSelect,
  search,
  disabled,
  formatHandle = (handle) => `@${handle}`,
}: {
  id: string
  label: string
  placeholder: string
  value: string
  selectedOption?: ArtistSearchOption | null
  onValueChange: (value: string) => void
  onSelect: (option: ArtistSearchOption) => void
  search: (query: string) => Promise<ArtistSearchOption[]>
  disabled?: boolean
  formatHandle?: (handle: string) => string
}) {
  const listboxId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(value, 300)
  const [options, setOptions] = useState<ArtistSearchOption[]>([])
  const [open, setOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [committed, setCommitted] = useState<ArtistSearchOption | null>(
    selectedOption ?? null
  )

  useEffect(() => {
    if (!isEditing) {
      setCommitted(selectedOption ?? null)
    }
  }, [selectedOption, isEditing])

  useEffect(() => {
    const query = debouncedQuery.trim().replace(/^@+/, "")
    if (!isEditing || !query) {
      setOptions([])
      setOpen(false)
      return
    }

    let cancelled = false

    search(query)
      .then((results) => {
        if (cancelled) return
        setOptions(results)
        setOpen(results.length > 0)
      })
      .catch(() => {
        if (!cancelled) {
          setOptions([])
          setOpen(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, isEditing, search])

  const handleSelect = (option: ArtistSearchOption) => {
    setCommitted(option)
    setIsEditing(false)
    setOptions([])
    setOpen(false)
    onSelect(option)
  }

  const showCommittedPreview =
    committed && !isEditing && !open && committed.handle === value.trim().replace(/^@+/, "")

  const inputAvatar =
    isEditing && options[0]
      ? options[0]
      : showCommittedPreview
        ? committed
        : null

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
              {inputAvatar ? (
                <div className="pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2">
                  <SearchResultAvatar
                    src={inputAvatar.avatarUrl}
                    username={inputAvatar.handle}
                    size={22}
                  />
                </div>
              ) : null}
              <Input
                ref={inputRef}
                id={id}
                role="combobox"
                aria-expanded={open}
                aria-controls={open ? listboxId : undefined}
                aria-autocomplete="list"
                placeholder={placeholder}
                value={value}
                className={cn(inputAvatar && "pl-10")}
                onChange={(event) => {
                  const next = event.target.value
                  setIsEditing(true)
                  setCommitted(null)
                  onValueChange(next)
                }}
                onFocus={() => {
                  setIsEditing(true)
                  if (options.length > 0) {
                    setOpen(true)
                  }
                }}
                onBlur={() => {
                  window.setTimeout(() => {
                    if (document.activeElement === inputRef.current) return
                    setIsEditing(false)
                    setOpen(false)
                  }, 150)
                }}
                disabled={disabled}
              />
            </div>
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <ScrollArea className="max-h-48">
            <div id={listboxId} role="listbox" className="p-1">
              {options.map((option) => (
                <button
                  key={`${option.id ?? option.handle}`}
                  type="button"
                  role="option"
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-sm px-2 py-2.5 text-left text-sm outline-none"
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSelect(option)}
                >
                  <SearchResultAvatar
                    src={option.avatarUrl}
                    username={option.handle}
                    size={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {option.displayName || formatHandle(option.handle)}
                    </p>
                    <p className="text-muted-foreground truncate text-xs">
                      {option.displayName
                        ? formatHandle(option.handle)
                        : null}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {showCommittedPreview ? (
        <div className="bg-muted/40 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm">
          <SearchResultAvatar
            src={committed.avatarUrl}
            username={committed.handle}
            size={32}
          />
          <div className="min-w-0">
            <p className="font-medium">
              {committed.displayName || formatHandle(committed.handle)}
            </p>
            {committed.displayName ? (
              <p className="text-muted-foreground truncate text-xs">
                {formatHandle(committed.handle)}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
