import { useEffect, useRef, useState } from "react"
import { appWindow } from "@tauri-apps/api/window"
import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeRestore,
  VscClose
} from "react-icons/vsc"

export function TitleBar() {
  const windowMinimize = useRef<React.ElementRef<"button">>(null)
  const windowMaximize = useRef<React.ElementRef<"button">>(null)
  const windowClose = useRef<React.ElementRef<"button">>(null)

  const [isMaximizedState, setMaximizedState] = useState(false)

  useEffect(() => {
    const maxBtn = windowMaximize.current
    const minBtn = windowMinimize.current
    const closeButton = windowClose.current

    maxBtn?.addEventListener("click", async () => {
      const isMaximized = await appWindow.isMaximized()

      setMaximizedState(isMaximized)

      if (!isMaximized) {
        appWindow.maximize()
        return
      }

      appWindow.unmaximize()
    })
    minBtn?.addEventListener("click", () => appWindow.minimize())
    closeButton?.addEventListener("click", () => appWindow.close())
  }, [])

  return (
    <div
      data-tauri-drag-region=""
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-x-3 px-5 py-3">
        <div data-tauri-drag-region="">
          {/* <MyArtverseIcon logoOnly size={0.6} /> */}
        </div>
        <span data-tauri-drag-region="" className="select-none text-lg">
          Window title
        </span>
      </div>
      <div className="flex items-center gap-x-3">
        <button>Not logged in</button>
        <div className="*:h-full *:px-3">
          {/* TODO hide this button if operating system is macOS */}
          <button ref={windowMinimize}>
            <VscChromeMinimize size={21} />
          </button>
          <button ref={windowMaximize}>
            {isMaximizedState ? (
              <VscChromeMaximize size={21} />
            ) : (
              <VscChromeRestore size={21} />
            )}
          </button>
          <button ref={windowClose}>
            <VscClose size={21} />
          </button>
        </div>
      </div>
    </div>
  )
}
