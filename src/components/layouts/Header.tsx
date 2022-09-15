import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faMagnifyingGlass,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import styles from "@/styles/Header.module.scss"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Header = () => {
  const { data, status } = useSession()

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
          {status === "authenticated" && data.user ? (
            <>
              <a onClick={() => signOut()}>
                <img src="/images/logout.svg" alt="Logout" />
              </a>
              <Link href="/profile">
                <a>
                  <img
                    src={data.user?.image ?? ""}
                    alt="User avatar"
                    id={styles["avatar"]}
                  />
                  <span>{data.user.name}</span>
                </a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a id={styles["login-button"]}>
                <img src="/images/login.svg" alt="Login" />
              </a>
            </Link>
          )}
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

export default Header
