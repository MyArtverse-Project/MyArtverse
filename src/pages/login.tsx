import { useState } from "react"
import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import Container from "@/components/Layouts/Container"
import styles from "@/styles/Login.module.scss"

export default function Login() {
  const [email, setEmail] = useState("")
  const { status } = useSession()
  const router = useRouter()

  if (status === "authenticated") return router.push("/")

  return (
    <Container>
      <div className={styles["login-form-wrapper"]}>
        <h1>Welcome back!</h1>
        <form className={styles["login-form"]} onSubmit={(e) => signIn(email)}>
          <div></div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            // disabled
            onChange={(e) => setEmail(e.currentTarget.value)}
            id="email"
            placeholder="Email only login coming soon"
          />
          <button type="submit">Continue with Email</button>
        </form>
        <div id={styles["divider"]}>
          <span>or continue with these...</span>
        </div>
        <div className={styles["login-ext"]}>
          <button
            onClick={() =>
              signIn("google", {
                callbackUrl: "/profile"
              })
            }
          >
            <img src="/images/google_g_logo.svg" alt="Google logo" width="15" />
            Continue with Google
          </button>
          <button
            onClick={() =>
              signIn("twitter", {
                callbackUrl: "/profile"
              })
            }
          >
            <FontAwesomeIcon icon={faTwitter} style={{ color: "#1d9bf0" }} />
            Continue with Twitter
          </button>
        </div>
      </div>
    </Container>
  )
}
