import { FursonaStatus } from "@/types/Fursonas"
import { LockIcon, Sparkles, Star } from "lucide-react"
import React from "react"

export default function Status({ status }: { status: FursonaStatus }) {
  const base = "flex flex-row  items-center text-md font-semibold my-2"
  const styles = ["main", "upForAdopt", "adopted"].includes(status)
    ? "text-500"
    : "text-subtext"
  switch (status) {
    case "adopted":
      return (
        <span className={[styles, base].join(" ")}>
          <Sparkles size={19} className="mr-2" />
          Adopted
        </span>
      )
    case "upForAdopt":
      return (
        <span className={[styles, base].join(" ")}>
          <Sparkles size={19} className="mr-2" />
          Up For Adoption
        </span>
      )
    case "owned":
      return null
    case "hidden":
      return (
        <span className={[styles, base].join(" ")}>
          <LockIcon size={19} className="mr-2" />
          Only Visible to you
        </span>
      )
    case "main":
      return (
        <span className={[styles, base].join(" ")}>
          <Star size={19} className="mr-2" />
          Main Character
        </span>
      )
  }
}
