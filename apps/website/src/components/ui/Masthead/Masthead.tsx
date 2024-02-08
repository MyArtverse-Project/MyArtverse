import Image from "next/image"

export function Avatar() {
  return (
    <div className="relative h-[calc(var(--avatar-size)/1.25)] w-[var(--avatar-size)] flex-shrink-0">
      <div className="absolute inset-0 -top-12 z-[3]" />
      <div className="border-100 bg-100 absolute -top-12 aspect-square w-[var(--avatar-size)] overflow-hidden rounded-full border-4">
        <Image
          fill
          priority
          loading="eager"
          src="/img/examples/ozzy/5.png"
          alt={`Avatar of Username`}
          sizes="(min-width: 1200px) 200px"
          className="object-cover"
          draggable="false"
        />
      </div>
    </div>
  )
}

export function Info() {}

export default function Masthead({ children }: { children?: React.ReactNode }) {
  return <div>{children}</div>
}
