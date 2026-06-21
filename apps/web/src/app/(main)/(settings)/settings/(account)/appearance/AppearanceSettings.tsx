"use client"

import { useNsfwPreferences } from "@/app/context/NsfwPreferencesContext"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MarginGutter } from "@/components/ui/group"
import { cn } from "@/lib/utils"

export default function AppearanceSettings() {
  const { preferences, setPreferences } = useNsfwPreferences()

  return (
    <MarginGutter screenSize="xl" className="px-6 py-8">
      <div className="max-w-xl space-y-8">
        <div>
          <h1 className="text-2xl font-semibold">Appearance</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Control how sensitive content is shown across the site.
          </p>
        </div>

        <div className="border-border bg-card space-y-6 rounded-lg border p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label htmlFor="show-nsfw" className="text-base">
                Show NSFW content
              </Label>
              <p className="text-muted-foreground text-sm">
                When off, NSFW artworks and reference images show a placeholder
                instead.
              </p>
            </div>
            <Switch
              id="show-nsfw"
              checked={preferences.showNsfw}
              onCheckedChange={(checked) =>
                setPreferences({ showNsfw: checked })
              }
            />
          </div>

          <div
            className={cn(
              "space-y-3 border-t pt-5",
              !preferences.showNsfw && "pointer-events-none opacity-50"
            )}
          >
            <p className="text-sm font-medium">When NSFW is enabled</p>
            <div className="space-y-2">
              <label className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-md border p-3">
                <input
                  type="radio"
                  name="nsfw-display-mode"
                  checked={preferences.nsfwDisplayMode === "blur"}
                  disabled={!preferences.showNsfw}
                  onChange={() => setPreferences({ nsfwDisplayMode: "blur" })}
                  className="h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium">Blur NSFW images</span>
                  <p className="text-muted-foreground text-xs">
                    Images appear blurred until you click to reveal each one.
                  </p>
                </div>
              </label>
              <label className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 rounded-md border p-3">
                <input
                  type="radio"
                  name="nsfw-display-mode"
                  checked={preferences.nsfwDisplayMode === "show"}
                  disabled={!preferences.showNsfw}
                  onChange={() => setPreferences({ nsfwDisplayMode: "show" })}
                  className="h-4 w-4"
                />
                <div>
                  <span className="text-sm font-medium">
                    Show NSFW images without blur
                  </span>
                  <p className="text-muted-foreground text-xs">
                    NSFW content is displayed normally.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </MarginGutter>
  )
}
