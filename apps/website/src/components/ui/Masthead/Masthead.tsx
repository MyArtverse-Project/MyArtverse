import Image from "next/image"

export function Avatar() {
  return (
    <div className="relative flex-shrink-0 w-[var(--avatar-size)] h-[calc(var(--avatar-size)/1.25)]">
      <div className="absolute inset-0 z-[3] -top-12" />
      <div className="w-[var(--avatar-size)] absolute -top-12 aspect-square overflow-hidden border-4 rounded-full border-100 bg-100">
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
  return <div data-masthead-constructor="">{children}</div>
}
