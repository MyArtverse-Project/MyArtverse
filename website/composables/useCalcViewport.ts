/**
 * Inspired by basement.studio's way of calculating viewport height and width
 * This is the abridged version of it; originally written in React, re-written in Vue
 */
export function useCalcViewport() {
	function handleResize() {
		const Vw = (window.innerWidth / 100).toString()

		const htmlRoot = document.documentElement

		htmlRoot.style.setProperty("--vw", `${Vw}px`)
	}

	onBeforeMount(() => handleResize())

	onMounted(() => window.addEventListener("resize", handleResize))
	onUnmounted(() => window.removeEventListener("resize", handleResize))
}
