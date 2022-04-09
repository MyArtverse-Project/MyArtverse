import Container from "../components/Container";
import styles from "../styles/Login.module.scss";

export default function login() {
  return (
    <Container>
      <div className={styles["login-form-wrapper"]}>
        <h1>Login</h1>
        <form className={styles["login-form"]}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
          <button type="submit">Login</button>
        </form>
        <div className={styles["login-form-links"]}>
          <a href="#">Forgot password?</a>
        </div>
        <div className={styles["login-ext"]}>
          <a href="/auth/google">Sign in with Google</a>
          <a href="/auth/twitter">Sign in with Twitter</a>
        </div>
        <div className={styles["login-signup"]}>
          Don&#39;t have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </Container>
  )
}
