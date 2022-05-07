import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faBarsProgress, faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons"
import styles from "../styles/Header.module.scss"
import Link from "next/link"

export default function Header() {
  return (
    <header>
      <div id="wrapper-desktop">
        <Link href="/">
          <a>
            <strong id={styles["logo"]}>MyFursona</strong>
          </a>
        </Link>
        <div id={styles["search-box-wrapper"]}>
          <div id={styles["search-box"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input
              type="search"
              placeholder="Search fursonas..."
              // TODO: Execute some function here
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            />
          </div>
        </div>
        <div id={styles["user-actions"]}>
          {/* Display a log in button for logged out users */}
          <Link href="/login">
            <a>
              <img src="/images/login.svg" alt="Login" />
            </a>
          </Link>
          {/* Otherwise, display SVG logos here for logged in users */}
        </div>
      </div>
      <div id="wrapper-mobile">
        <nav>
          <div id={styles["logo-nav"]}>
            <button>
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            <Link href="/">
              <a>
                <strong id={styles["logo"]}>MyFursona</strong>
              </a>
            </Link>
          </div>
          <button>
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
        </nav>
      </div>
    </header>
  )
}
