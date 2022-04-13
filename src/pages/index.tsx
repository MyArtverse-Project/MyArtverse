import Link from "next/link";
import Container from "../components/Container";
import GalleryItem, { LoadingGalleryItem } from "../components/GalleryItem";
import styles from "../styles/Home.module.scss";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchFursona = async () => {
      const res = await fetch(`api/fursona/popular`)
      const fursonas = await res.json()
      setLoading(false)
      return setData(fursonas)
    }
    fetchFursona()
  }, [])
  return (
    <Container>
      <main>
        <div id={styles["fursona-main-showcase"]}>
          <section>
            <h2 id={styles.labelPopular}>Popular Fursonas</h2>
            <div className="fursona-gallery-grid">
              <Link href="/user" passHref>
                <a>
                  <GalleryItem
                    avatar={"/images/ozzy.png"}
                    name={"Ozzy"}
                    species={"Otter"}
                    gradientCSS={
                      "linear-gradient(228.09deg, #AB41FF 0%, #FF248D 100%)"
                    }
                    primaryColor={"black"}
                    />
                </a>
              </Link>

              {/*TODO: Convert gallery items into components */}
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
            </div>
          </section>
          <section>
            <h2 id={styles.labelNew}>New Fursonas</h2>
            <div className="fursona-gallery-grid">
              {/* TODO: Convert gallery items into components */}
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
            </div>
          </section>
        </div>
      </main>
    </Container>
  )
}
