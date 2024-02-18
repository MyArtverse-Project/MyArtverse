"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { isProfilePeeking, profilePeekData } from "@/atoms"
import { type AnimationProps, type Variants, motion } from "framer-motion"
import { useAtom } from "jotai"
import { MyFursonaIcon } from "../icons"
import { MFImage } from "../ui"
import { Button } from "../ui/Buttons"

export default function NavbarProfilePeek() {
  const handlePeekRoutes = usePathname().includes("/@")
  const [isPeeking] = useAtom(isProfilePeeking)
  const [peekInfo] = useAtom(profilePeekData)

  const { type, username, handle, img } = peekInfo

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
        <MyFursonaIcon logoOnly size={0.7} />
      </Link>
      {/* Wordmark */}
      <motion.div
        variants={peekVariants}
        initial="visible"
        animate={handlePeekRoutes && !isPeeking ? "up" : "visible"}
        style={{
          opacity: handlePeekRoutes && !isPeeking ? 0 : 1,
          transition: "opacity 150ms ease"
        }}
        transition={transitionOptions}
        className="absolute top-0"
      >
        <Link href="/" aria-label="Home" draggable={false} className="flex items-center">
          <MyFursonaIcon wordmarkOnly size={0.7} />
          <span className="text-active ml-2 rounded-md bg-red-600 px-1.5 py-1 text-xs uppercase">
            WIP
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
        className="ml-3.5 flex items-center gap-x-2"
      >
        {img ? (
          <>
            <span className="ml-1 text-xl opacity-50">&#47;</span>
            <Button
              className="hover:bg-300 flex cursor-pointer items-center justify-center rounded-md px-2.5 py-1.5 transition-colors"
              onClick={() => navigator.clipboard.writeText("profile something")}
            >
              <span className="flex items-center gap-x-2">
                <MFImage
                  src={img}
                  height={30}
                  width={30}
                  objectFit="cover"
                  aspectRatio="1/1"
                  rounded={999}
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
