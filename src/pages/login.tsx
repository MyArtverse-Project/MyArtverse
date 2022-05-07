import Link from "next/link"
import Container from "../components/Container"
import styles from "../styles/Login.module.scss"

export default function login() {
  return (
    <Container>
      <div className={styles["login-form-wrapper"]}>
        <h1>Welcome Back!</h1>
        <form className={styles["login-form"]}>
          <div></div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Email" />
          <button type="submit">Login with Email</button>
        </form>
        <div id={styles["divider"]} />
        <span>or login with these...</span>
        <div className={styles["login-ext"]}>
          {/* TODO */}
          <button>Sign in with Google</button>
          <button>Sign in with Twitter</button>
        </div>
        <div className={styles["login-signup"]}>
          Don&#39;t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </Container>
  )
}
