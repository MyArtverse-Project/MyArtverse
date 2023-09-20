import Image from "next/image"

type ImgLoadStrategy = "lazy" | "neutral" | "important"

export default function BuiImage({
  src,
  alt,
  aspectRatio,
  height,
  width,
  sizes,
  strategy = "neutral",
  objectFit,
  rounded,
  style,
  ...attributes
}: {
  src: string
  aspectRatio?: string
  height?: string | number
  width?: string | number
  sizes?: any
  strategy?: ImgLoadStrategy
  objectFit?: React.CSSProperties["objectFit"]
  rounded?: boolean
} & Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "alt" | "onClick" | "onContextMenu" | "style"
>) {
  const loadingStrategy: Record<
    ImgLoadStrategy,
    Pick<
      React.ImgHTMLAttributes<HTMLImageElement>,
      "fetchPriority" | "loading"
    > & { priority: boolean }
  > = {
    lazy: {
      fetchPriority: "low",
      loading: "lazy",
      priority: false
    },
    neutral: {
      fetchPriority: "auto",
      loading: "eager",
      priority: false
    },
    important: {
      fetchPriority: "high",
      loading: "eager",
      priority: true
    }
  }

  const setStrategy = loadingStrategy[strategy]

  return (
    <div
      id="img-shield"
      className="relative before:absolute before:inset-0 before:z-[2]"
      style={{
        aspectRatio,
        height,
        width,
        overflow: "hidden",
        borderRadius: !rounded ? 0 : 9999
      }}
      draggable="false"
      {...attributes}
    >
      <Image
        style={{
          userSelect: "none",
          objectFit,
          ...style
        }}
        fill
        src={src}
        alt={alt ?? ""}
        decoding="async"
        sizes={sizes}
        loading={setStrategy.loading}
        fetchPriority={setStrategy.fetchPriority}
        priority={setStrategy.priority}
      />
      <div id="loading-skeleton" className="absolute inset-0 -z-[2]" />
    </div>
  )
}
