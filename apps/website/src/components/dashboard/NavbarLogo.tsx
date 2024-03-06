import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { MyFursonaIcon } from "@/components/icons"
import { BRAND } from "@myfursona-internal/config"
import { type AnimationProps, motion } from "framer-motion"

export default function NavbarLogo() {
  const [logoHover, setLogoHover] = useState(false)
  const logoRef = useRef<React.ElementRef<"a">>(null)

  useEffect(() => {
    const logoElement = logoRef.current

    const handleLogoOn = () => setLogoHover(true)
    const handleLogoOff = () => setLogoHover(false)

    logoElement.addEventListener("mouseenter", handleLogoOn)
    logoElement.addEventListener("focusin", handleLogoOn)

    logoElement.addEventListener("mouseleave", handleLogoOff)
    logoElement.addEventListener("focusout", handleLogoOff)

    return () => {
      logoElement.removeEventListener("mouseenter", handleLogoOn)
      logoElement.removeEventListener("focusin", handleLogoOn)

      logoElement.removeEventListener("mouseleave", handleLogoOff)
      logoElement.removeEventListener("focusout", handleLogoOff)
    }
  }, [])

  const RETURN_LABEL = "back-to-home" as const
  const FRAMER_TRANSITION = {
    type: "tween",
    duration: 0.15
  } as AnimationProps["transition"]

  return (
    <>
      <Link
        ref={logoRef}
        href="/"
        draggable={false}
        className="relative z-[11]"
        aria-labelledby={logoHover ? RETURN_LABEL : null}
      >
        <MyFursonaIcon logoOnly />
      </Link>
      <motion.div
        aria-hidden
        className="z-10 flex items-center gap-x-2.5 text-xl"
        transition={FRAMER_TRANSITION}
        animate={
          logoHover
            ? {
                x: -20,
                opacity: 0
              }
            : {
                x: 0,
                opacity: 100
              }
        }
      >
        <div className="border-600 mx-1 block h-6 rotate-[18deg] border-[2px] border-b-0 border-l-0 opacity-70" />
        <span className="text-2xl font-bold">Studio</span>
      </motion.div>
      <motion.span
        id={RETURN_LABEL}
        transition={FRAMER_TRANSITION}
        initial={{
          x: "9rem",
          opacity: 0
        }}
        animate={
          logoHover
            ? {
                x: "6.5rem",
                opacity: 100,
                display: "inline"
              }
            : {
                x: "8rem",
                opacity: 0,
                transitionEnd: {
                  display: "none"
                }
              }
        }
        className="absolute select-none text-lg"
      >
        Back to {BRAND}
      </motion.span>
    </>
  )
}
