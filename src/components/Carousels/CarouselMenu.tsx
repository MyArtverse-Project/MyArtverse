import { useRef } from "react"
import styles from "./Carousel.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import GalleryItem, { LoadingGalleryItem } from "../Gallery/GalleryItem"

interface CarouselMenuProps {
  title: string
  type: "normal" | "popular" | "new"
  items?: Fursona[]
}

export default function CarouselMenu({
  title,
  type,
  items = []
}: CarouselMenuProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

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
              ? items.map((item) => <GalleryItem key={item.link} {...item} />)
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
