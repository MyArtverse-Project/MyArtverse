import Image from "next/image"

export function MastheadBanner({ src }: { src: string | undefined }) {
  if (src)
    return (
      <div data-mh-banner="" className="relative">
        <Image
          objectFit="cover"
          src={src ?? "/UserBanner.svg"}
          alt={`Banner of Username`}
          width={1500}
          height={350}
          className="relative aspect-[15/3] w-full"
          style={{
            objectPosition: "0 calc(50% * 1))"
          }}
        />
      </div>
    )
}
