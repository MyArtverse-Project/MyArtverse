import GalleryItem, { LoadingGalleryItem } from "../gallery/GalleryItem"
import styles from "@/styles/ArtCarousel.module.scss"
import { useRef } from "react"
import Artwork from "../gallery/Artwork"
import { readdir } from "fs"

interface IArtCarouselProps {
  title: string
  images?: Fursona[]
}

const ArtCarousel = ({ title, images = [] }: IArtCarouselProps) => {
  return (
    <div id={styles["carousel-container"]}>
      <h2>{title}</h2>
      <div id={styles["carousel"]}>
        <Artwork image={"/images/examples/ozzy/1.jpg"} />
        <Artwork image={"/images/examples/ozzy/2.png"} />
        <Artwork image={"/images/examples/ozzy/3.png"} />
        <Artwork image={"/images/examples/ozzy/4.png"} />
        <Artwork image={"/images/examples/ozzy/5.png"} />
        <Artwork image={"/images/examples/ozzy/6.png"} />
      </div>
    </div>
  )
}
export default ArtCarousel
