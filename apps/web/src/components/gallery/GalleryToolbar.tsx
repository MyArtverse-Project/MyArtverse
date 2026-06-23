"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { GallerySort, GalleryViewMode } from "@/utils/galleryUtils"
import {
  LuArrowDownUp,
  LuChevronDown,
  LuFilter,
  LuLayoutGrid,
  LuList,
  LuSearch,
} from "react-icons/lu"

const sortLabels: Record<GallerySort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  title: "Title A–Z",
}

export default function GalleryToolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  hideNsfw = false,
  onHideNsfwChange,
  showViewToggle = false,
  view = "grid",
  onViewChange,
  searchPlaceholder = "Search",
}: {
  search: string
  onSearchChange: (value: string) => void
  sort: GallerySort
  onSortChange: (sort: GallerySort) => void
  hideNsfw?: boolean
  onHideNsfwChange?: (hide: boolean) => void
  showViewToggle?: boolean
  view?: GalleryViewMode
  onViewChange?: (view: GalleryViewMode) => void
  searchPlaceholder?: string
}) {
  return (
    <div className="mb-5 flex w-full flex-wrap items-center gap-2.5">
      <div className="relative min-w-[12rem] flex-1">
        <LuSearch
          size={18}
          className="text-muted-foreground pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
          aria-hidden
        />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={searchPlaceholder}
          className="border-border bg-background focus-visible:ring-primary/25 h-10 w-full rounded-xl border py-2 pl-10 pr-3 text-sm outline-none focus-visible:ring-2"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-primary/[0.06] hover:bg-primary/10 gap-2 rounded-xl border-0 shadow-none"
          >
            <LuArrowDownUp size={18} />
            Sort
            <LuChevronDown size={16} className="opacity-60" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {(Object.keys(sortLabels) as GallerySort[]).map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => onSortChange(option)}
              className={sort === option ? "font-semibold" : undefined}
            >
              {sortLabels[option]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {onHideNsfwChange ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-primary/[0.06] hover:bg-primary/10 gap-2 rounded-xl border-0 shadow-none"
            >
              <LuFilter size={18} />
              Filter
              <LuChevronDown size={16} className="opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onHideNsfwChange(false)}>
              Show all
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onHideNsfwChange(true)}>
              Hide NSFW
            </DropdownMenuItem>
            {hideNsfw ? (
              <DropdownMenuItem disabled className="text-muted-foreground text-xs">
                NSFW hidden
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      {showViewToggle && onViewChange ? (
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(value) => {
            if (value === "grid" || value === "list") onViewChange(value)
          }}
          className="bg-primary/[0.06] shrink-0 rounded-xl p-1"
          aria-label="Gallery layout"
        >
          <ToggleGroupItem
            value="grid"
            aria-label="Grid view"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground size-9 rounded-lg border-0 bg-transparent shadow-none"
          >
            <LuLayoutGrid size={18} />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="list"
            aria-label="List view"
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground size-9 rounded-lg border-0 bg-transparent shadow-none"
          >
            <LuList size={18} />
          </ToggleGroupItem>
        </ToggleGroup>
      ) : null}
    </div>
  )
}
