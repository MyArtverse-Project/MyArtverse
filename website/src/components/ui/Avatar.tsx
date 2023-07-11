import Image from "next/image"

interface AvatarProps {
  username: string
  src: string
  size?: number
}

export default function Avatar({ username, src, size = 36 }: AvatarProps) {
  return (
    <button
      data-mf-avatar-item=""
      aria-label={username}
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        src={src}
        className="object-cover overflow-hidden rounded-full aspect-square"
        alt={`Avatar of ${username}`}
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
