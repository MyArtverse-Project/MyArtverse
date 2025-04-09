import Image from "next/image"

interface AvatarProps {
  className?: string
  username?: string
  src: string
  size?: number
}

export function Avatar({ className, username, src, size = 36 }: AvatarProps) {
  return (
    <div
      data-avatar=""
      aria-label={username}
      style={{ height: `${size}px`, width: `${size}px` }}
      className={className ?? "overflow-hidden rounded-full"}
    >
      <Image
        src={src}
        className="aspect-square object-cover"
        alt={username ? `Avatar of ${username}"}` : ""}
        decoding="async"
        loading="eager"
        priority
        fetchPriority="high"
        width={size}
        height={size}
        draggable={false}
      />
    </div>
  )
}
