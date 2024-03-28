import { MFImage } from "@/components/ui"

export default function MastheadBanner({ src }: { src: string }) {
  return (
    <div data-masthead-banner="" className="relative">
      <MFImage
        aspectRatio="15/3"
        width="100%"
        objectFit="cover"
        src={src ?? "/UserBanner.svg"}
        strategy="important"
        style={{
          objectPosition: "0 calc(50% * 1))"
        }}
      />
    </div>
  )
}
