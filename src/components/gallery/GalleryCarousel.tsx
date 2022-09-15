import React from "react"
import GalleryItem from "./GalleryItem"
import IGalleryItemProps from "./GalleryItem"

type Props = {
  items: typeof IGalleryItemProps[] | any[]
}

const GalleryCarousel = ({ items }: Props) => {
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

export default GalleryCarousel