import styles from "./Navbar.module.scss"
import { useRouter } from "next/router"

export function UserPopup({ data, setPopup }: any) {
  const router = useRouter()
  return (
    <div id={styles["user-menu"]} onClick={() => setPopup(false)}>
      <div id={styles["user-menu-header"]}>
        <div id={styles["user-menu-account"]}>
          <img src={data.user.image} alt="User avatar" />
          <div id={styles["username"]}>
            <h5>Logged in as</h5>
            <h3>{data.user.name}</h3>
          </div>
        </div>
      </div>
      <div id={styles["user-menu-body"]}>
        <hr />
        <button>NSFW Filter Toggle (ON)</button>
        <button>Theme Toggle (Dark)</button>
        <hr />
        <button>Manage Gallery</button>
        <button>Manage Fursona</button>
        <button>Your Favorites</button>
        <button>Language</button>
        <hr />
        <button onClick={() => router.push("/profile")}>View Profile</button>
        <button onClick={() => router.push("/settings")}>Settings</button>
        <button onClick={() => router.push("/login")}>Sign Out</button>
      </div>
    </div>
  )
}
