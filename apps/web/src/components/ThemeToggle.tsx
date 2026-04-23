import { cn } from "@mav/shared/utils"
import { useState } from "react"
import { LuComputer, LuMoon, LuSun } from "react-icons/lu"

const ThemeToggle = () => {
  const [theme, setTheme] = useState("default")

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)

    // TODO: Change the theme
  }

  return (
    <div className="border-400 flex items-center gap-2 rounded-lg border bg-purple-50">
      <div className="bg-200 flex items-center gap-2 rounded-md p-1">
        <button
          className={cn("rounded p-1", theme === "default" ? "bg-400" : "")}
          onClick={() => handleThemeChange("default")}
        >
          <LuComputer />
        </button>
        <button
          className={cn("rounded p-1", theme === "dark" ? "bg-400" : "")}
          onClick={() => handleThemeChange("dark")}
        >
          <LuMoon />
        </button>
        <button
          className={cn("rounded p-1", theme === "light" ? "bg-400" : "")}
          onClick={() => handleThemeChange("light")}
        >
          <LuSun />
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
