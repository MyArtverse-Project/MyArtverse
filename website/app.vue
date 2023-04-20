<script setup lang="ts">
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

useCalcViewport()
</script>

<template>
	<div>
		<TheBaseNavbar />
		<NuxtPage />
		<TheBaseFooter />
	</div>
</template>

<style lang="scss">
body {
	@apply bg-base-900 text-base-50;
}

::selection {
	@apply bg-purple-500;
}
</style>
