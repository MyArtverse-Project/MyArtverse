import styles from '../styles/Artworks.module.scss'

interface ArtworkProps {
  image: string
}

export default function Artwork({ image }) {
  // TODO: Make a Popup modal of the image
  return (
    <div id={styles["artwork"]}>
      <img src={image} />
    </div>
  )
}
