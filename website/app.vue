<script setup lang="ts">
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
</script>

<template>
	<div>
		<TheBaseNavbar />
		<main id="skip-to-main" class="min-h-screen">
			<NuxtPage />
		</main>
		<TheBaseFooter />
	</div>
</template>
