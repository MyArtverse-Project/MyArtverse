<script lang="ts" setup>
const route = useRoute()
const urlPath = `https://www.myfursona.art${route.fullPath}`

const props = defineProps<{
	title: string
	description?: string
	className?: string
	nowrap?: boolean
}>()

const detectWrap = !props.nowrap ? "wrap-contents" : ""
const detectClass = !props.className
	? detectWrap
	: `${detectWrap} ${props.className}`

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
	<main id="page-container" :class="detectClass">
		<slot />
	</main>
</template>

<style>
.wrap-contents {
	@apply mx-auto max-w-screen-2xl px-6;
}
</style>
