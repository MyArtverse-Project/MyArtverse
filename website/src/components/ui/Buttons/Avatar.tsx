import Image from "next/image"

export default function Avatar({
  username,
  src,
  size = 36
}: {
  username: string
  src: string
  size?: number
}) {
  return (
    <div
      data-avatar-item=""
      aria-label={username}
      style={{ height: `${size}px`, width: `${size}px` }}
      className="overflow-hidden rounded-full"
    >
      <Image
        src={src}
        className="object-cover aspect-square"
        alt={`Avatar of ${username}`}
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
