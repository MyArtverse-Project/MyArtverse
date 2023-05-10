<script setup lang="ts">
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
</script>

<template>
	<div class="contents">
		<TheBaseNavbar />
		<main class="min-h-screen">
			<NuxtPage />
		</main>
		<TheBaseFooter />
	</div>
</template>
