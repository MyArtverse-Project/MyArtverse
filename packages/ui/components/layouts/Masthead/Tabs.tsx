"use client"

import { Tabs } from "../../Tabs"
import type { MastheadTabs } from "./Masthead.types"

export function MastheadTabs(props: MastheadTabs) {
  return (
    <div className="bg-100 sticky top-[3.75rem] z-[3] overflow-x-auto mt-2.5">
      <div className="mx-auto max-w-screen-2xl px-9">
        <Tabs {...props} />
      </div>
      <div
        className="border-b-separator relative -z-[1] w-full border-0 border-b-2 border-opacity-50"
        aria-hidden
      ></div>
    </div>
  )
}
