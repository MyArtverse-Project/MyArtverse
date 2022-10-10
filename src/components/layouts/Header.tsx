import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
	faBars,
	faMagnifyingGlass,
	faSearch
} from "@fortawesome/free-solid-svg-icons"
import styles from "@/styles/Header.module.scss"
import Link from "next/link"
import {useSession, signOut, signIn} from "next-auth/react"
import {useState} from "react";
import {useRouter} from "next/router";

export default function Header() {
	const {data, status} = useSession()
	const [popup, setPopup] = useState(false)

	return (
			<header id={styles["page"]}>
				<div id={`wrapper-desktop`}>
					<div id={styles["heading"]}>
						<div id={styles["left-hand"]}>
							<Link href="/">
								<a>
									<strong id={styles["logo"]}>MyFursona</strong>
								</a>
							</Link>
							<div id={styles["search-box-wrapper"]}>
								<div id={styles["search-box"]}>
									<FontAwesomeIcon icon={faMagnifyingGlass}/>
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
												<img src="/images/logout.svg" alt="Logout"/>
											</a>
											<div id={styles["user-options"]}>
												<img
														src={data.user?.image ?? ""}
														alt="User avatar"
														id={styles["avatar"]}
														onClick={() => setPopup(!popup)}
												/>
											</div>
										</>
								) : (
										<Link href="/login">
											<a id={styles["login-button"]}>
												<img src="/images/login.svg" alt="Login"/>
											</a>
										</Link>
								)}
							</div>
						</div>
						{popup && <UserPopup data={data} setPopup={setPopup}/>}
					</div>
				</div>

				<div id="wrapper-mobile">
					<nav>
						<div id={styles["logo-nav"]}>
							<button>
								<FontAwesomeIcon icon={faBars} size="lg"/>
							</button>
							<Link href="/">
								<a>
									<strong id={styles["logo"]}>MyFursona</strong>
								</a>
							</Link>
						</div>
						<button>
							<FontAwesomeIcon icon={faSearch} size="lg"/>
						</button>
					</nav>
				</div>
			</header>
	)
}


const UserPopup = ({data, setPopup}) => {
	const router = useRouter()
	return (
			<div id={styles["user-menu"]} onClick={() => setPopup(false)}>
				<div id={styles["user-menu-header"]}>
					<div id={styles["user-menu-account"]}>
						<img src={data.user.image} alt="User avatar"/>
						<div id={styles["username"]}>
							<h5>Logged in as</h5>
							<h3>{data.user.name}</h3>
						</div>
					</div>
				</div>
				<div id={styles["user-menu-body"]}>
					<hr/>
					<button>
						NSFW Filter Toggle (ON)
					</button>
					<button>
						Theme Toggle (Dark)
					</button>
					<hr/>
					<button>
						Manage Gallery
					</button>
					<button>
						Manage Fursona
					</button>
					<button>
						Your Favorites
					</button>
					<button>
						Language
					</button>
					<hr/>
					<button onClick={() => router.push("/profile")}>
						View Profile
					</button>
					<button onClick={() => router.push("/settings")}>
						Settings
					</button>
					<button onClick={() => router.push("/login")}>
						Sign Out
					</button>
				</div>
			</div>
	)
}