import {useEffect, useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
	faGithub,
	faInstagram,
	faPatreon,
	faTwitter
} from "@fortawesome/free-brands-svg-icons"
import {faCheck} from "@fortawesome/free-solid-svg-icons"
import Container from "@/components/Container"
import styles from "@/styles/User.module.scss"
import Carousel from "@/components/CarouselMenu"
import ArtCarousel from "@/components/ArtCarousel"
import GalleryCarousel from "@/components/GalleryCarousel"
import GalleryItem from "@/components/GalleryItem"

export default function User() {
	const [loading, setLoading] = useState(true)
	const [verified, setVerified] = useState(false)

	useEffect(() => {
		setLoading(false)
		setVerified(true)
	}, [])

	if (loading) {
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

	return (
			<Container>
				<div id={styles["user-container"]}>
					<div id={styles["user-profile"]}>
						{/* TODO: Base this on sona color */}
						<img
								style={{borderColor: `blue`}}
								src="/images/ozzy.png"
								alt="Ozzy Avatar"
								id={styles["avatar"]}
						/>
					</div>
					<div id={styles["user-info"]}>
						<div>
							<h1 id={styles["name"]}>Ozzy</h1>
							{verified ?? (
									<FontAwesomeIcon
											id={styles["verified"]}
											icon={faCheck}
											size="2x"
									/>
							)}
						</div>
						<h2 id={styles["species"]}>Species: Otter</h2>
						<p id={styles["bio"]}>
							About me:
							<br/>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere vel,
							libero tempora accusamus dolorum debitis, minima ipsam totam
							excepturi voluptatem facilis iure esse. Harum dicta dolor rem
							pariatur soluta modi?
						</p>
					</div>
				</div>
				<div id={styles["artworks-container"]}>
					<div id={styles["artworks"]}>
						<ArtCarousel title="Recent Artworks"/>
					</div>
					<div>
						<Carousel
								title={"Sonas Related"}
								type={"normal"}
								items={[
									{
										avatar: "/images/examples/ozzy/6.png",
										gradientCSS: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)",
										name: "Renzo",
										species: "Dragon/Fox Hybrid",
										primaryColor: "pink",
										link: "/fursonas/1"
									}
								]}
						/>
						<div></div>
					</div>
				</div>
			</Container>
	)
}
