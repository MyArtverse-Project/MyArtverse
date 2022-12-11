import { useEffect, useState } from "react";

export function useScrollScreen(value: number): boolean {
	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			window.scrollY > value ? setScroll(true) : setScroll(false)
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [value])

	return scroll
}