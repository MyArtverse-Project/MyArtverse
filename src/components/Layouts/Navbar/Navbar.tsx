import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBars,
  faMagnifyingGlass,
  faSearch
} from "@fortawesome/free-solid-svg-icons"
import styles from "./Navbar.module.scss"
import Link from "next/link"
import { useSession, signOut, signIn } from "next-auth/react"
import { useState } from "react"
import { UserPopup } from "./UserPopup"
import { TransparentButton } from "@/components/UI/Buttons"

export default function Navbar() {
  const { data, status } = useSession()
  const [popup, setPopup] = useState(false)

  return (
    <header className={styles["wrapper"]}>
      <div className={styles["contents"]}>
        <Link href="/">
          <strong className={styles["logo"]}>MyFursona</strong>
        </Link>
        <div id={styles["user-actions"]}>
          {status === "authenticated" && data!.user ? (
            <>
              <a onClick={() => signOut()}>
                <img src="/images/logout.svg" alt="Logout" />
              </a>
              <div id={styles["user-options"]}>
                <img
                  src={data!.user?.image ?? ""}
                  alt="User avatar"
                  id={styles["avatar"]}
                  onClick={() => setPopup(!popup)}
                />
              </div>
            </>
          ) : (
            <TransparentButton href="/login">
              <img src="/images/login.svg" alt="Login" />
            </TransparentButton>
          )}
        </div>
      </div>
      {popup && <UserPopup data={data} setPopup={setPopup} />}
    </header>
  )
}
