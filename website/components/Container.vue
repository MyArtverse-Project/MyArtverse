<script lang="ts" setup>
const route = useRoute()
const urlPath = `https://www.myfursona.art${route.fullPath}`

const props = defineProps<{
	title: string
	description?: string
}>()

const __SITE_NAME = "MyFursona"

const parseTitle =
	route.fullPath !== "/"
		? `${props.title} - ${__SITE_NAME}`
		: `${__SITE_NAME} - the place where every fur belongs!`

useHead({
	title: parseTitle,
	meta: [
		{ name: "description", content: props.description },
		{ property: "og:title", content: parseTitle },
		{ property: "og:description", content: props.description },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: urlPath },
		{ name: "twitter:title", content: parseTitle },
		{ name: "twitter:description", content: props.description },
		{ name: "twitter:card", content: "summary_large_image" },
	],
	link: [{ rel: "canonical", href: urlPath }],
})
</script>

<template>
	<main id="app-container">
		<slot />
	</main>
</template>

<style lang="scss"></style>
