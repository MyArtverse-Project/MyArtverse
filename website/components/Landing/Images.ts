interface Images {
	file: string
	top?: string
	bottom?: string
	left?: string
	right?: string
	scale?: number
}

export const heroImages: { left: Images[]; right: Images[] } = {
	left: [
		{
			file: "renzo.jpg",
			left: "25vw",
		},
		{
			file: "ivo.png",
			left: "8vw",
		},
		{
			file: "vulpo.jpg",
			left: "22vw",
		},
	],
	right: [
		{
			file: "renzo.jpg",
			right: "25vw",
		},
		{
			file: "ivo.png",
			right: "8vw",
		},
		{
			file: "vulpo.jpg",
			right: "22vw",
		},
	],
}

export const secondSectImages: Images[] = [
	{ file: "ozzy-sniff.png", bottom: "2rem", left: "12vw" },
	{ file: "ozzy-banner.png", top: "1.5rem", left: "11.4vw" },
	{ file: "ivo-ref.png", right: "12.4vw", bottom: "-1.65rem" },
	{ file: "renzo-snowglobe.jpg", right: "8.75vw", top: "-2rem" },
]
