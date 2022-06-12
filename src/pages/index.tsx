import React, { useEffect, useState } from "react"
import Container from "@/components/Container"
import styles from "@/styles/Home.module.scss"
import UnderConstruction from "@/components/UnderConstruction"
import Carousel from "@/components/CarouselMenu"
import { Fursona } from "@/utils/types"

export default function Home() {
  const [data, setData] = useState<Fursona[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ! Disabled temporarily for debugging front-end stuff
    // const fetchFursona = (async () => {
    //   const res = await fetch(`api/fursona/popular`)
    //   const fursonas = await res.json()
    //   setLoading(false)
    //   return setData(fursonas)
    // })();
    setData([
      {
        avatar: "/images/ozzy.png",
        name: "Ozzy",
        gradientCSS: "linear-gradient(228.09deg, #AB41FF 0%, #FF248D 100%)",
        link: "/user/2342349824",
        primaryColor: "#9F02FF",
        species: "Otter"
      }
    ])
  }, [])
  return (
    <Container>
      <main>
        <div id={styles["header-hero"]}>
          <article>
            <h1>
              Manage, store, and show your fursonas in one place
            </h1>
            <p>
              <strong>MyFursona</strong> is an open-source platform where you
              can show off your fluffy characters and show them off to your
              friends!
            </p>
          </article>
        </div>
        <div className={styles["fursona-main-showcase"]}>
          <section>
            <Carousel title="Popular Fursonas" type="popular" items={data} />
          </section>
          <section id={styles["card-previews"]}>
            <Carousel title={"New Fursonas"} type="new" />
          </section>
        </div>
      </main>
    </Container>
  )
}
