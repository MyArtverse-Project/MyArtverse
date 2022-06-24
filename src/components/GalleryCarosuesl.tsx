import React from 'react'
import GalleryItem, { IGalleryItemProps } from './GalleryItem'

type Props = {
    items: IGalleryItemProps[]
}

export default function GalleryCarosuesl({ items }: Props) {
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