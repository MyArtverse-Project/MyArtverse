import styles from "./ArtCarousel.module.scss"
import Artwork from "../Gallery/Artwork"
import { readdir } from "fs"

interface IArtCarouselProps {
  title: string
  images?: Fursona[]
}

export default function ArtCarousel(props: IArtCarouselProps) {
  return (
    <div id={styles["carousel-comp"]}>
      <h2>{props.title}</h2>
      <div id={styles["carousel-container"]}>
        <div id={styles["carousel"]}>
          <Artwork image={"/images/examples/ozzy/1.jpg"} />
          <Artwork image={"/images/examples/ozzy/2.png"} />
          <Artwork image={"/images/examples/ozzy/3.png"} />
          <Artwork image={"/images/examples/ozzy/4.png"} />
          <Artwork image={"/images/examples/ozzy/5.png"} />
          <Artwork image={"/images/examples/ozzy/6.png"} />
          <Artwork image={"/images/examples/ozzy/6.png"} />
        </div>
      </div>
    </div>
  )
}
