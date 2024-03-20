import React from "react"
import { MFImage } from "@/components/ui"

interface ReferenceCardProps {
  src: string
  alt: string
  label: string
  artist: string
  varients: number
}

export default function ReferenceCard({
  src,
  alt,
  label,
  artist,
  varients
}: ReferenceCardProps) {
  return (
    <div className="bg-400 mt-4 flex w-full flex-row space-y-3 rounded-lg">
      <MFImage src={src} alt={alt} width={250} height={150} rounded={20} />
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl">{label}</h2>
        <p className="text-sm">{artist}</p>
        <p className="text-sm">Contains {varients} varients</p>
      </div>
    </div>
  )
}
