import { LoadingGalleryItem } from "./GalleryItem"
import styles from "../styles/Carousel.module.scss"

interface ICarouselProps {
  title: string
  type: "normal" | "popular" | "new"
  items?: any[] // TODO: define type
}

const Carousel = ({ title, type }: ICarouselProps) => {
  return (
    <div id={styles["carousel"]}>
      <h2
        id={
          type === "new"
            ? styles.labelNew
            : type === "popular"
            ? styles.labelPopular
            : styles.label
        }
      >
        {title}
      </h2>
      <div id={styles["cards"]}>
        <LoadingGalleryItem />
        <LoadingGalleryItem />
        <LoadingGalleryItem />
        <LoadingGalleryItem />
        <LoadingGalleryItem />
        <LoadingGalleryItem />
      </div>
    </div>
  )
}

export default Carousel
