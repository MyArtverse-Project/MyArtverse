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
      <div className="flex flex-row p-2.5 border border-300 rounded-md mx-4 items-center text-center justify-center">
        <div
          onClick={() => setOption("prices")}
          className={`${option == "prices" ? "bg-500 text-100" : "text-700"}  w-32 h-9 flex flex-row justify-center my-auto rounded-md cursor-pointer`}
        >
          <span className="my-auto">Prices</span>
        </div>
        <div
          onClick={() => setOption("queue")}
          className={`${
            option == "queue" ? "bg-500 text-100" : "text-700"
          } w-32 h-9 flex flex-row text-center justify-center items-center rounded-md cursor-pointer`}
        >
          <Palette className="mr-2" width={24} height={24} />
          Queue
        </div>
      </div>
    </div>
  )
}
