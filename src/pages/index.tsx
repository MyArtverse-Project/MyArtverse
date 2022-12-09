import React, { useEffect, useState } from "react"
import Container from "@/components/Layouts/Container"
import styles from "@/styles/Home.module.scss"
import Carousel from "@/components/Carousels/CarouselMenu"
import StackedCards from "../components/Hero/HeroOld"
import Hero from "@/components/Hero"

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
        link: "/fursonas/2342349824",
        primaryColor: "#9F02FF",
        species: "Otter"
      }
    ])
  }, [])
  return (
    <Container>
      <Hero />
      <div className={styles["fursona-main-showcase"]}>
        <section aria-label="Popular Fursonas">
          <Carousel title="Popular Fursonas" type="popular" items={data} />
        </section>
        <section aria-label="New Fursonas" id={styles["card-previews"]}>
          <Carousel title={"New Fursonas"} type="new" />
        </section>
      </div>
    </Container>
  )
}
