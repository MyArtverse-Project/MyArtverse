import GalleryItem, { LoadingGalleryItem } from "./GalleryItem"
import styles from "../styles/Carousel.module.scss"
import { Fursona } from "../utils/types"

interface ICarouselProps {
  title: string
  type: "normal" | "popular" | "new"
  items?: Fursona[];
}

const Carousel = ({ title, type, items = [] }: ICarouselProps) => {
  return (
    <div id={styles.carousel}>
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
      <div id={styles["carousel-container"]}>
        <div id={styles["control-wrapper"]}>
          <button id={styles.control}>
            <i className="fa-solid fa-angle-left" />
          </button>
        </div>
        <div id={styles["card-wrapper"]}>
          <div id={styles["cards"]}>
            {items.length >= 5
              ? items.map((item, index) => (
                  <GalleryItem key={index} {...item} />
                ))
              : items.map((item, index) => (
                  <GalleryItem key={index} {...item} />
                ))}
            {Array(5 - items.length)
              .fill(0)
              .map((_, index) => (
                <LoadingGalleryItem key={index} />
              ))}
          </div>
        </div>
        <div id={styles["control-wrapper"]}>
          <button id={styles.control}>
            <i className="fa-solid fa-angle-right" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Carousel
