import { useState } from "react"
import { LuComputer, LuMoon, LuSun } from "react-icons/lu"

const ThemeToggle = () => {
  const [theme, setTheme] = useState("default")

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)
    
    // TODO: Change the theme
  }

  return (
    <div className="flex items-center gap-2 border border-400 rounded-lg bg-purple-50">
      <div className="flex items-center gap-2 bg-200 p-1 rounded-md">
        <button
          className={`p-1 rounded ${theme === "default" ? "bg-400" : ""}`}
          onClick={() => handleThemeChange("default")}
        >
          <LuComputer />
        </button>
        <button
          className={`p-1 rounded ${theme === "dark" ? "bg-400" : ""}`}
          onClick={() => handleThemeChange("dark")}
        >
          <LuMoon />
        </button>
        <button
          className={`p-1 rounded ${theme === "light" ? "bg-400" : ""}`}
          onClick={() => handleThemeChange("light")}
        >
          <LuSun />
        </button>
      </div>
    </div>
  )
}

export default ThemeToggle
