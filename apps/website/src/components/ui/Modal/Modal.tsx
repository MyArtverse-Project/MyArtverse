"use client"

import Overlay from "../Overlay"
import { motion } from "framer-motion"

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
  const positionInitial = "-30%"

  const modalInitial = {
    opacity: 0,
    pointerEvents: "none",
    y: positionInitial,
    x: "-50%"
  }
  const modalActive = {
    opacity: 1,
    y: "-50%",
    x: "-50%"
  }
  return (
    <Overlay state={state} toggler={toggler}>
      <motion.div
        id="modal-transition"
        initial={{ opacity: 0, y: positionInitial, x: "-50%" }}
        animate={!state ? modalInitial : modalActive}
        transition={{
          type: "tween",
          duration: 0.18
        }}
        className="fixed left-1/2 top-1/2 overflow-hidden rounded-md border border-300 bg-100"
      >
        {children}
      </motion.div>
    </Overlay>
  )
}
