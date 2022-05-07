import { useEffect, useState } from "react"
import Container from "../../components/Container"
import styles from "../../styles/User.module.scss"

export default function User() {
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)
  useEffect(() => {
    setLoading(false)
    setVerified(true)
  }, [])
  console.log(verified)
  if (loading) {
    return (
      <Container>
        <div id={styles["user-container"]}>
          <div id={styles["user-profile"]}>
            <div id={styles["skeleton-avatar"]}></div>
            <div id={styles["skeleton-social"]}></div>
          </div>
          <div id={styles["user-info"]}>
            <div id={styles["skeleton-name"]}></div>
            <div id={styles["skeleton-species"]}></div>
            <div id={styles["skeleton-bio"]}></div>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div id={styles["user-container"]}>
        <div id={styles["user-profile"]}>
          <img src="/images/ozzy.png" alt="Ozzy Avatar" id={styles["avatar"]} />
          <div id={styles["user-social"]}>
            <i id={styles["social"]} className="fab fa-discord" />
            <i id={styles["social"]} className="fab fa-twitter" />
            <i id={styles["social"]} className="fab fa-instagram" />
            <i id={styles["social"]} className="fab fa-patreon" />
          </div>
        </div>
        <div id={styles["user-info"]}>
          <div>
            <h1 id={styles["name"]}>Ozzy</h1>
            {verified ??   (
              <i id={styles["verified"]} className="fas fa-check fa-2x" />
            )}
          </div>
          <h2 id={styles["species"]}>Species: Otter</h2>
          <p id={styles["bio"]}>
            About me:
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere vel,
            libero tempora accusamus dolorum debitis, minima ipsam totam
            excepturi voluptatem facilis iure esse. Harum dicta dolor rem
            pariatur soluta modi?
          </p>
        </div>
      </div>
    </Container>
  )
}
