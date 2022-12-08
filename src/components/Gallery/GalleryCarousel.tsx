import React from "react"
import styles from "./GalleryCarousel.module.scss"
import GalleryItem, { IGalleryItemProps } from "./GalleryItem"

export default function GalleryCarousel({
  items
}: {
  items: IGalleryItemProps[]
}) {
  return (
    <div id={styles["galleryCarousel"]}>
      <button>{"<"}</button>
      {items.map((item: IGalleryItemProps, index: number) => (
        <GalleryItem {...item} key={index} />
      ))}
      <button>{">"}</button>
    </div>
  )
}
