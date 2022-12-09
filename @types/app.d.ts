declare interface Fursona {
	avatar: string
	name: string
	species: string
	primaryColor: string
	link: string
	gradientCSS: string
}


declare type UIStates = "warning" | "error" | "info" | "default"

interface ButtonTypes {
	children?: React.ReactNode
	href?: string
	className?: string
	onClick?: () => void
	disabled?: boolean
	newTab?: boolean
}