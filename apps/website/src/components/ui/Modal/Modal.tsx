"use client"

import cn from "@/utils/cn"
import { motion } from "framer-motion"
import type { MapElement } from "@/types/utils"
import Overlay from "./Overlay"

export default function Modal({
  children,
  state,
  toggler,
  className
}: {
  children?: React.ReactNode
  state?: boolean
  toggler?: () => void
} & Pick<React.HTMLAttributes<MapElement<"div">>, "className">) {
  const positionInitial = "-60%"

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
        initial={{ opacity: 0, y: positionInitial, x: "-50%" }}
        animate={!state ? modalInitial : modalActive}
        transition={{
          type: "tween",
          duration: 0.22
        }}
        className={cn(
          "border-300 bg-200 fixed left-1/2 top-1/2 overflow-hidden rounded-md border",
          className
        )}
      >
        <div>{children}</div>
      </motion.div>
    </Overlay>
  )
}
