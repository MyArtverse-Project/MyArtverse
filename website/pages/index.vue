<script setup lang="ts">
const d = "MyFursona is a platform where you create and manage characters"

usePageMeta({
	title: "Welcome to MyFursona",
	description: d,
})
</script>

<template>
	<LandingHero />
	<LandingSecond />
	<LandingThird />
</template>
