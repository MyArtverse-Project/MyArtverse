<script setup lang="ts">
const d = "MyFursona is a platform where you create and manage characters"
</script>

<template>
	<Container title="MyFursona | A place where every fur belongs!" :description="d">
		<LandingHero />
    <LandingSecond />
    <LandingThird />
	</Container>
</template>
