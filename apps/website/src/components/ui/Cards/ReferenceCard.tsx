import { MFImage } from "@/components/ui"

export default function ReferenceCard({
  src,
  alt,
  label,
  artist,
  variantCount
}: {
  src: string
  alt: string
  label: string
  artist: string
  variantCount: number
}) {
  return (
    <div className="bg-400 mt-4 flex w-full flex-row space-y-3 rounded-lg">
      <MFImage src={src} alt={alt} width={250} height={150} rounded={20} />
      <div className="ml-4 flex flex-col justify-center">
        <h2 className="text-xl">{label}</h2>
        <span className="text-sm">{artist}</span>
        <span className="text-sm">Contains {variantCount} variant(s)</span>
      </div>
    </div>
  )
}
