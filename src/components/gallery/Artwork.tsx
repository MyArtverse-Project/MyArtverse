import styles from "../styles/Artworks.module.scss"

interface ArtworkProps {
  image: string
}

const Artwork = ({ image }: ArtworkProps) => {
  // TODO: Make a Popup modal of the image
  return (
    <div id={styles["artwork"]}>
      <img src={image} alt="" />
    </div>
  )
}

export default Artwork
