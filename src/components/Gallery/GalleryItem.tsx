import styles from "./GalleryItem.module.scss"
import Link from "next/link"

export interface IGalleryItemProps {
  avatar: string
  name: string
  species: string
  gradientCSS: string
  primaryColor: string
  link: string
}

export default function GalleryItem(props: IGalleryItemProps) {
  return (
    <Link href={props.link} passHref>
      <div
        id={styles["galleryItem"]}
        style={{
          background: `${props.gradientCSS}`
        }}
      >
        <img
          src={props.avatar}
          style={{
            border: `${props.primaryColor ?? "black"} solid 3px`,
            background: `${props.primaryColor ?? "black"}`
          }}
          alt={`${props.name}'s avatar`}
        />
        <h2>{props.name}</h2>
        <h3>{props.species}</h3>
      </div>
    </Link>
  )
}

export function LoadingGalleryItem() {
  return (
    <div id={styles["loadingGalleryItem"]}>
      <div id={styles["loadingImage"]} style={{ background: undefined }}></div>
      <div id={styles["text"]}></div>
      <div id={styles["textSpecies"]}></div>
    </div>
  )
}
