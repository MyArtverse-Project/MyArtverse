interface Images {
	file: string
	top?: string
	bottom?: string
	left?: string
	right?: string
	scale?: number
	characterName?: string
	characterAuthor?: string
}

export const heroImages: Images[] = [
	{
		file: "renzo.jpg",
		top: "5.5rem",
		right: "25vw",
		characterName: "Renzo",
		characterAuthor: "@ozzydevs",
	},
	{
		file: "ivo.png",
		bottom: "5rem",
		right: "8vw",
		characterName: "Ivo",
		characterAuthor: "@ozzydevs",
	},
	{
		file: "vulpo.jpg",
		bottom: "15rem",
		right: "22vw",
		characterName: "Vulpo",
		characterAuthor: "@ozzydevs",
	},
]

export const secondSectImages: Images[] = [
	{ file: "ozzy-sniff.png", bottom: "2rem", left: "12vw" },
	{ file: "ozzy-banner.png", top: "1.5rem", left: "11.4vw" },
	{ file: "ivo-ref.png", right: "12.4vw", bottom: "-1.65rem" },
	{ file: "renzo-snowglobe.jpg", right: "8.75vw", top: "-2rem" },
]
