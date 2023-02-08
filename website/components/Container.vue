<script lang="ts" setup>
const route = useRoute()
const urlPath = `https://www.myfursona.art${route.fullPath}`

const props = defineProps<{
	title: string
	description?: string
	className?: string
	nowrap?: boolean
}>()

useHead({
	title: props.title,
	meta: [
		{ name: "description", content: props.description },
		{ property: "og:title", content: props.title },
		{ property: "og:description", content: props.description },
		{ property: "og:type", content: "website" },
		{ property: "og:url", content: urlPath },
		{ name: "twitter:title", content: props.title },
		{ name: "twitter:description", content: props.description },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:url", content: urlPath },
	],
	link: [{ rel: "canonical", href: urlPath }],
})
</script>

<template>
	<main>
		<slot />
	</main>
</template>

<style lang="scss"></style>
