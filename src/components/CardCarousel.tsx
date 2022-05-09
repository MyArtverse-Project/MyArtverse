import { useRef } from "react"
import GalleryItem, { LoadingGalleryItem } from "./GalleryItem"
import styles from "../styles/Carousel.module.scss"
import { Fursona } from "../utils/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

interface ICarouselProps {
  title: string
  type: "normal" | "popular" | "new"
  items?: Fursona[]
}

const CardCarousel = ({ title, type, items = [] }: ICarouselProps) => {
  const carouselRef = useRef(null)

  const scrollLeft = () => {
    const node = carouselRef.current
    if (node) {
      console.log("LEFT")
      node.scrollBy({
        top: 0,
        left: -480,
        behavior: "smooth"
      })
    }
  }

  const scrollRight = () => {
    const node = carouselRef.current
    if (node) {
      console.log("RIGHT")
      carouselRef.current.scrollBy({
        top: 0,
        left: 480,
        behavior: "smooth"
      })
    }
  }

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
          <button id={styles.control} onClick={() => scrollLeft()}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
        <div id={styles["card-wrapper"]} ref={carouselRef}>
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
          <button id={styles.control} onClick={() => scrollRight()}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  )
}
export default CardCarousel
