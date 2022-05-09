import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useState } from "react"
import Container from "../components/Container"
import styles from "../styles/Login.module.scss"

export default function Login() {
  const [email, setEmail] = useState("")
  const session = useSession()
  if (session.data && session.status !== "loading") {
    return Router.push("/profile")
  }

  return (
    <Container>
      <div className={styles["login-form-wrapper"]}>
        <h1>Welcome Back!</h1>
        <form className={styles["login-form"]} onSubmit={(e) => signIn(email)}>
          <div></div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            disabled
            onChange={(e) => setEmail(e.currentTarget.value)}
            id="email"
            placeholder="Email only login coming soon"
          />
          <button type="submit" disabled>
            Continue with Email
          </button>
        </form>
        <div id={styles["divider"]} />
        <span>or continue with these...</span>
        <div className={styles["login-ext"]}>
          <button
            onClick={() =>
              signIn("google", {
                redirect: true
              })
            }
          >
            Continue with Google
          </button>
          <button
            onClick={() =>
              signIn("twitter", {
                redirect: true
              })
            }
          >
            Continue with Twitter
          </button>
        </div>
      </div>
    </Container>
  )
}
