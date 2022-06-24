import GalleryItem, { LoadingGalleryItem } from "./GalleryItem"
import styles from "@/styles/Carousel.module.scss"
import { useRef } from "react"

interface IArtCarouselProps {
  title: string
  images?: Fursona[]
}

const Carousel = ({ title, images = [] }: IArtCarouselProps) => {
  return <div>wip</div>
}
export default Carousel
