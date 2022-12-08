import { useRef } from "react"
import styles from "@/styles/Carousel.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import GalleryItem, { LoadingGalleryItem } from "../Gallery/GalleryItem"

interface CarouselProps {
  title: string
  type: "normal" | "popular" | "new"
  items?: Fursona[]
}

export default function CardCarousel(props: CarouselProps) {
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
          props.type === "new"
            ? styles.labelNew
            : props.type === "popular"
            ? styles.labelPopular
            : styles.label
        }
      >
        {props.title}
      </h2>
      <div id={styles["carousel-container"]}>
        <div id={styles["control-wrapper"]}>
          <button id={styles.control} onClick={() => scrollLeft()}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </div>
        <div id={styles["card-wrapper"]} ref={carouselRef}>
          <div id={styles["cards"]}>
            {props.items!.length >= 5
              ? props.items!.map((item) => <GalleryItem key={item.link} {...item} />)
              : props.items!.map((item) => <GalleryItem key={item.link} {...item} />)}
            {Array(5 - props.items!.length)
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
