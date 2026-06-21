"use client"

import { cn } from "@/lib/utils"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const OPTIONS = [
  { value: "system", label: "System theme", icon: Monitor },
  { value: "light", label: "Light theme", icon: Sun },
  { value: "dark", label: "Dark theme", icon: Moon }
] as const

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const active = mounted ? theme : undefined

  return (
    <div className="bg-muted inline-flex items-center gap-1 rounded-lg p-1">
      {OPTIONS.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={active === value}
          onClick={() => setTheme(value)}
          className={cn(
            "ring-offset-background focus-visible:ring-ring inline-flex h-7 w-7 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            active === value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      ))}
    </div>
  )
}

export default ThemeToggle
