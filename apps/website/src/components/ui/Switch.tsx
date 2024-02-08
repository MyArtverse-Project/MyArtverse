"use client"

import { useState } from "react"
import { LuPalette as Palette } from "react-icons/lu"

type SwitchTemp = "prices" | "queue"
interface Switch {
  option: SwitchTemp
}

export default function Switch() {
  const [option, setOption] = useState<SwitchTemp>("prices")
  return (
    <div>
      <div className="border-300 mx-4 flex flex-row items-center justify-center rounded-md border p-2.5 text-center">
        <div
          onClick={() => setOption("prices")}
          className={`${option == "prices" ? "bg-500 text-100" : "text-700"}  my-auto flex h-9 w-32 cursor-pointer flex-row justify-center rounded-md`}
        >
          <span className="my-auto">Prices</span>
        </div>
        <div
          onClick={() => setOption("queue")}
          className={`${
            option == "queue" ? "bg-500 text-100" : "text-700"
          } flex h-9 w-32 cursor-pointer flex-row items-center justify-center rounded-md text-center`}
        >
          <Palette className="mr-2" width={24} height={24} />
          Queue
        </div>
      </div>
    </div>
  )
}
