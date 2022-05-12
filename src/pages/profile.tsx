import {
  faInstagram,
  faPatreon,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSession } from "next-auth/react"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import Container from "../components/Container"
import styles from "../styles/Profile.module.scss"

export default function Profile() {
  const [verified, setVerified] = useState(false)
  const session: { data; status } = useSession()
  const router = useRouter()
  console.log(verified)
  if (session.status === "unauthenticated") {
    return router.push("/login")
  }

  if (session.status === "loading") {
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
          <img
            src={session.data.user.image}
            alt={`${session.data.user.name} Avatar`}
            id={styles["avatar"]}
          />
          <div id={styles["user-social"]}>
            <FontAwesomeIcon id={styles["social-icon"]} icon={faTwitter} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faTwitter} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faPatreon} />
            <FontAwesomeIcon id={styles["social-icon"]} icon={faInstagram} />
          </div>
        </div>
        <div id={styles["user-info"]}>
          <div>
            <h1 id={styles["name"]}>{session.data.user.name}</h1>
            {verified ?? (
              <FontAwesomeIcon id={styles.social} icon={faCheck} size="2x" />
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
