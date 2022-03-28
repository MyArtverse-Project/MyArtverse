import Head from "next/head";
import Container from "../components/Container";
import GalleryItem from "../components/GalleryItem";
import styles from "../styles/Home.module.scss";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fetcher} from "../utils/fetcher";
import useSwr from 'swr'

export default function Home() {
  const { data, error } = useSwr(`/api/fursona/popular`, fetcher)
  console.log(data)
  return (
    <div>
      <Container>
        <header>
          <div id={styles.wrapper}>
            <div id={styles["search-box-wrapper"]}>
              <strong className={styles.logo}>MyFursona</strong>
              <div id={styles["search-box"]}>
                <input type="text" placeholder="Search for any fursonas..." />
              </div>
            </div>
            <div id={styles["user-actions"]}>
              {/* SVG logos here for logged in users */}

              {/* Display somemthing here for logged out users */}
              <button>Login</button>
            </div>
          </div>
        </header>

        <main>
          <div id={styles["fursona-main-showcase"]}>
            <section>
              <h2 id={styles["label-popular"]}>Popular Fursonas</h2>
              <div className="fursona-gallery-grid">
                {/*{data.map(sona => (*/}
                {/*    <GalleryItem*/}
                {/*        avatar={sona.artworksCDNLinks[0]}*/}
                {/*        gradientCSS="linear-gradient(200.64deg, #FF00F5 13.68%, rgba(255, 0, 245, 0.54375) 55.98%, #FF5C00 130.37%)"*/}
                {/*        name={sona.name}*/}
                {/*        species={sona.species}*/}
                {/*        primaryColor="black"*/}
                {/*    />*/}
                {/*))}*/}
                {/* TODO: Convert gallery items into components */}

                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
              </div>
            </section>
            <section>
              <h2 id={styles["label-new"]}>New Fursonas</h2>
              <div className="fursona-gallery-grid">
                {/* TODO: Convert gallery items into components */}
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
                <div className="fursona-gallery-item"></div>
              </div>
            </section>
          </div>
        </main>
        <footer></footer>
      </Container>
    </div>
  );
}
