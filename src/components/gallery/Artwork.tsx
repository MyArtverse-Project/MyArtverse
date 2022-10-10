import styles from "./Artwork.module.scss"

interface ArtworkProps {
  image: string
}

export default function Artwork({ image }: ArtworkProps) {
  // TODO: Make a Popup modal of the image
  return (
    <div id={styles["artwork"]}>
      <img src={image} alt="" />
    </div>
  )
}
