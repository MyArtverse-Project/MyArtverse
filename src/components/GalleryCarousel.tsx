import React from "react"
import GalleryItem from "./GalleryItem"
import IGalleryItemProps from "./GalleryItem"

type Props = {
  items: typeof IGalleryItemProps[] | any[]
}

export default function GalleryCarousel({ items }: Props) {
  return (
    <div>
      <button>{"<"}</button>
      {items.map((item, index) => (
        <GalleryItem {...item} key={index} />
      ))}
      <button>{">"}</button>
    </div>
  )
}
