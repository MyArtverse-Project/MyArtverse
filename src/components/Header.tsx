import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/Header.module.scss"

export default function Header() {
  return (
    <header>
      <div id={styles["wrapper"]}>
        <strong id={styles["logo"]}>MyFursona</strong>
        <div id={styles["search-box-wrapper"]}>
          <div id={styles["search-box"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="search" placeholder="Search fursonas..." />
          </div>
        </div>
        <div id={styles["user-actions"]}>
          {/* SVG logos here for logged in users */}

          {/* Display somemthing here for logged out users */}
          <button>Login</button>
        </div>
      </div>
    </header>
  )
}
