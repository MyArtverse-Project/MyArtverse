import Container from '../../components/Container';
import styles from '../../styles/User.module.scss';

export default function User() {
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