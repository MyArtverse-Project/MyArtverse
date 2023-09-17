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
  insetShieldSize = "0.5",
  objectFit,
  ...attributes
}: {
  aspectRatio?: string
  height?: string | number
  width?: string | number
  sizes?: any
  insetShieldSize?: string
  strategy?: ImgLoadStrategy
  objectFit?: React.CSSProperties["objectFit"]
} & Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "onClick" | "onContextMenu"
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
      className="relative before:absolute before:-inset-[var(--inset-shield,0.25rem)] before:z-[2]"
      style={{ aspectRatio, height, width }}
      draggable="false"
      {...attributes}
    >
      <Image
        style={{ userSelect: "none", objectFit }}
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
