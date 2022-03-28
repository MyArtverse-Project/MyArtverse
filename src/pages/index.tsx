import Head from "next/head";
import Container from "../components/Container";
import styles from "../styles/Home.module.scss";

export default function Home() {
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
