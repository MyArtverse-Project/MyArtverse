import Image from "next/image"

export default function Avatar({
  className,
  username,
  src,
  size = 36
}: {
  className?: string
  username?: string
  src: string
  size?: number
}) {
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
