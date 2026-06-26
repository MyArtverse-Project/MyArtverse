"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { Visibility } from "@/types/utils"
import {
  type ContentVisibility,
  visibilityOwnerLabels,
} from "@/utils/visibility"
import { cn } from "@mav/shared/utils"

export const visibilityOptions = (
  Object.entries(visibilityOwnerLabels) as Array<
    [ContentVisibility, (typeof visibilityOwnerLabels)[ContentVisibility]]
  >
).map(([value, option]) => ({
  value,
  ...option,
}))

export default function VisibilityField({
  value,
  onChange,
  idPrefix = "visibility",
  legend = "Visibility",
}: {
  value: ContentVisibility
  onChange: (value: ContentVisibility) => void
  idPrefix?: string
  legend?: string
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium">{legend}</legend>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as ContentVisibility)}
        className="grid grid-cols-1 gap-2 sm:grid-cols-2"
      >
        {visibilityOptions.map((option) => {
          const Icon = option.icon
          const isSelected = value === option.value

          return (
            <Label
              key={option.value}
              htmlFor={`${idPrefix}-${option.value}`}
              className={cn(
                "flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 transition-colors",
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border hover:bg-muted/40"
              )}
            >
              <RadioGroupItem
                value={option.value}
                id={`${idPrefix}-${option.value}`}
                className="sr-only"
              />
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-none">{option.label}</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  {option.description}
                </p>
              </div>
            </Label>
          )
        })}
      </RadioGroup>
    </fieldset>
  )
}
