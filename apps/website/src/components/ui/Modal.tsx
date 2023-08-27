"use client"

import { useState } from "react"
import Overlay from "./Overlay"

export default function Modal({
  children,
  title,
  actions,
  state,
  toggler
}: {
  children?: React.ReactNode
  title?: string | NonNullable<React.ReactNode>
  actions?: NonNullable<React.ReactNode>
  state?: boolean
  toggler?: () => void
}) {
  return (
    <Overlay state={state} toggler={toggler}>
      <div data-modal="">
        <div data-modal-title="">{title}</div>
        <div>{children}</div>
        {/* Actions */}
        <div>{actions}</div>
      </div>
    </Overlay>
  )
}
