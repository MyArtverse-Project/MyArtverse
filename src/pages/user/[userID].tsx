import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faGithub,
  faInstagram,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Container from "@/components/Layouts/Container"
import styles from "@/styles/User.module.scss"

export default function User() {
  const [loading, setLoading] = useState(true)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    setLoading(false)
    setVerified(true)
  }, [])

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
            <FontAwesomeIcon id={styles["social-icon"]} icon={faTwitter} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faGithub} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faTwitter} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faPatreon} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faInstagram} />
          </div>
        </div>
        <div id={styles["user-info"]}>
          <div>
            <h1 id={styles["name"]}>Ozzy</h1>
            {verified ?? (
              <FontAwesomeIcon
                id={styles["verified"]}
                icon={faCheck}
                size="2x"
              />
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
