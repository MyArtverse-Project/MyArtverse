<script setup lang="ts">
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

useCalcViewport()
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style lang="scss">
@import "vue3-lottie/dist/style.css";

body {
  @apply bg-zinc-900 text-zinc-50;
}
</style>
