"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type AnimationProps, type Variants, motion } from "framer-motion"
import { useDetailPeekContext } from "@/context"
import { MyFursona } from "../../icons"
import { BuiImage } from "../../ui"
import { Button } from "../../ui/Buttons"

export default function NavbarProfilePeek() {
  const { img: peekImg, username, isPeeking } = useDetailPeekContext()

  const handlePeekRoutes = usePathname().includes("/@")

  const transitionOptions: AnimationProps["transition"] = {
    type: "spring",
    duration: 0.44
  }

  const peekVariants: Variants = {
    visible: {
      y: 0,
      pointerEvents: "auto"
    },
    up: {
      y: -30,
      pointerEvents: "none"
    },
    down: {
      y: 30,
      pointerEvents: "none"
    }
  }

  return (
    <div className="relative flex items-center">
      <Link href="/" aria-label="Home" draggable={false}>
        <MyFursona logoOnly size={0.7} />
      </Link>
      {/* Wordmark */}
      <motion.div
        variants={peekVariants}
        initial={"visible"}
        animate={handlePeekRoutes && !isPeeking ? "up" : "visible"}
        style={{
          opacity: handlePeekRoutes && !isPeeking ? 0 : 1,
          transition: "opacity 150ms ease"
        }}
        transition={transitionOptions}
        className="absolute top-0"
      >
        <Link
          href="/"
          aria-label="Home"
          draggable={false}
          className="flex items-center"
        >
          <MyFursona wordmarkOnly size={0.7} />
          <span className="ml-2 px-1 py-0.5 bg-red-600 text-xs rounded-sm uppercase">
            Alpha
          </span>
        </Link>
      </motion.div>
      {/* User avatar and handle */}
      <motion.div
        variants={peekVariants}
        initial={"down"}
        animate={handlePeekRoutes && !isPeeking ? "visible" : "down"}
        style={{
          opacity: handlePeekRoutes && !isPeeking ? 1 : 0,
          transition: "opacity 150ms ease"
        }}
        transition={transitionOptions}
        className="ml-3.5 flex gap-x-2 items-center"
      >
        {peekImg ? (
          <>
            <span className="opacity-50 text-xl ml-1">&#47;</span>
            <Button
              className="cursor-pointer px-2.5 py-1.5 hover:bg-300 transition-colors rounded-md flex items-center justify-center"
              onClick={() => navigator.clipboard.writeText("profile something")}
            >
              <span className="flex items-center gap-x-2">
                <BuiImage
                  src={peekImg}
                  height={30}
                  width={30}
                  objectFit="cover"
                  aspectRatio="1/1"
                  rounded
                  strategy="important"
                />
                <span className="font-inter text-sm">{`@${username}`}</span>
              </span>
            </Button>
          </>
        ) : null}
      </motion.div>
    </div>
  )
}
