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
import { useEffect, useState } from "react"

export type ArtistSearchOption = {
  id?: string
  handle: string
  displayName?: string | null
  avatarUrl?: string | null
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
  const debouncedQuery = useDebounce(value, 300)
  const [options, setOptions] = useState<ArtistSearchOption[]>([])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ArtistSearchOption | null>(
    selectedOption ?? null
  )

  useEffect(() => {
    setSelected(selectedOption ?? null)
  }, [selectedOption])

  useEffect(() => {
    const query = debouncedQuery.trim().replace(/^@+/, "")
    if (!query) {
      setOptions([])
      setOpen(false)
      return
    }

    let cancelled = false

    search(query)
      .then((results) => {
        if (cancelled) return
        setOptions(results)
        setOpen(results.length > 0 && !selected)
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
  }, [debouncedQuery, search, selected])

  const handleSelect = (option: ArtistSearchOption) => {
    setSelected(option)
    setOptions([])
    setOpen(false)
    onSelect(option)
  }

  const inputAvatar = selected ?? (open && options[0] ? options[0] : null)

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverAnchor asChild>
          <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
              {inputAvatar ? (
                <div className="pointer-events-none absolute left-2.5 top-1/2 z-10 -translate-y-1/2">
                  <Avatar
                    src={inputAvatar.avatarUrl || USER_DEFAULT_AVATAR}
                    username={inputAvatar.handle}
                    size={22}
                  />
                </div>
              ) : null}
              <Input
                id={id}
                placeholder={placeholder}
                value={value}
                className={cn(inputAvatar && "pl-10")}
                onChange={(event) => {
                  const next = event.target.value
                  setSelected(null)
                  onValueChange(next)
                }}
                onFocus={() => {
                  if (options.length > 0 && !selected) {
                    setOpen(true)
                  }
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
            <div className="p-1">
              {options.map((option) => (
                <button
                  key={option.handle}
                  type="button"
                  className={cn(
                    "hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-3 rounded-sm px-2 py-2.5 text-left text-sm outline-none"
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <Avatar
                    src={option.avatarUrl || USER_DEFAULT_AVATAR}
                    username={option.handle}
                    size={32}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {formatHandle(option.handle)}
                    </p>
                    {option.displayName ? (
                      <p className="text-muted-foreground truncate text-xs">
                        {option.displayName}
                      </p>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {selected ? (
        <div className="bg-muted/40 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm">
          <Avatar
            src={selected.avatarUrl || USER_DEFAULT_AVATAR}
            username={selected.handle}
            size={32}
          />
          <div className="min-w-0">
            <p className="font-medium">{formatHandle(selected.handle)}</p>
            {selected.displayName ? (
              <p className="text-muted-foreground truncate text-xs">
                {selected.displayName}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
