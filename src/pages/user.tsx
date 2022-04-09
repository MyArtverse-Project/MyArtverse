import Container from '../components/Container';
import styles from '../styles/User.module.scss';

export default function User() {
  return (
    <Container>
      <div id={styles["user-container"]}>
        <div id={styles["user-profile"]}>
          <div id={styles["avatar-skeleton"]}></div>
          <div id={styles["species-skeleton"]}></div>
          <div id={styles["social-skeleton"]}></div>
        </div>
        <div id={styles["user-info"]}>
          <div id={styles["name-skeleton"]}></div>
          <div id={styles["bio-skeleton"]}></div>
          <div id={styles["species-skeleton"]}></div>
        </div>
      </div>
    </Container>
  )
}