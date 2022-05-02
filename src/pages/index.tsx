import React from "react"
import Link from "next/link"
import Container from "../components/Container"
import GalleryItem, { LoadingGalleryItem } from "../components/GalleryItem"
import styles from "../styles/Home.module.scss"
import { useEffect, useState } from "react"
import UnderConstruction from "../components/UnderConstruction"

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // ! Disabled temporarily for debugging front-end stuff
    // const fetchFursona = (async () => {
    //   const res = await fetch(`api/fursona/popular`)
    //   const fursonas = await res.json()
    //   setLoading(false)
    //   return setData(fursonas)
    // })();
  }, [])
  return (
    <Container>
      <main>
        <UnderConstruction />
        <div id={styles["header-hero"]}>
          <article>
            <h1>Manage, store, and show your fursonas in one place</h1>
            <p>
              <strong>MyFursona</strong> is an open-source platform where you can show off
              your fluffy characters and show them off to your friends!
            </p>
          </article>
          <div id={styles["hero-animation"]}>
            <div className={styles["image-folder-overlay"]}>
              <div className={styles['image-folder-item']} style={{'--stagger': '1'} as React.CSSProperties }>
                <img src="/images/ozzy.png" alt="Ozzy Fursona" />
              </div>
              <div className={styles['image-folder-item']} style={{'--stagger': '2'} as React.CSSProperties }>
                <img src="/images/ozzy.png" alt="Ozzy Fursona" />
              </div>
              <div className={styles['image-folder-item']} style={{'--stagger': '3'} as React.CSSProperties }>
                <img src="/images/ozzy.png" alt="Ozzy Fursona" />
              </div>
            </div>
          </div>
        </div>
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
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
              <LoadingGalleryItem />
            </div>
          </section>
          <section>
            <h2 id={styles.labelNew}>New Fursonas</h2>
            <div className="fursona-gallery-grid">
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
