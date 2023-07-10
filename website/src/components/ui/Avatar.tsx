import Image from "next/image"

interface AvatarProps {
  name: string
  src: string
  size?: number
}

export default function Avatar({ name, src, size = 31 }: AvatarProps) {
  return (
    <button
      data-mf-avatar-item=""
      aria-label={name}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={src}
        className="object-cover overflow-hidden rounded-full aspect-square"
        alt={`Avatar of ${name}`}
        decoding="async"
        loading="eager"
        priority
        fetchPriority="high"
        width={size}
        height={size}
      />
    </button>
  )
}
