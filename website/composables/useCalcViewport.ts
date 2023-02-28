/**
 * Inspired by basement.studio's way of calculating viewport height and width
 * This is the abridged version of it; originally written in React, re-written in Vue
 */
export function useCalcViewport() {
	function handleResize() {
		const htmlRoot = document.documentElement
		const Vw = (window.innerWidth / 100).toString()
		const Vh = (window.innerHeight / 100).toString()

		htmlRoot.style.setProperty("--vw", `${Vw}px`)
		htmlRoot.style.setProperty("--vh", `${Vh}px`)
	}

	onBeforeMount(() => handleResize())

	onMounted(() => window.addEventListener("resize", handleResize))
	onUnmounted(() => window.removeEventListener("resize", handleResize))
}
