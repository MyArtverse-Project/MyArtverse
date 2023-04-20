<script setup lang="ts">
const props = defineProps<{
	link?: string
	external?: boolean
  layout?: "default" | "headless"
}>()
</script>

<template>
	<button v-if="!props.link">
		<slot />
	</button>
	<NuxtLink v-else :to="link">
		<slot />
	</NuxtLink>
</template>

<style lang="scss" scoped>
button,
a {
	@apply px-5 py-2.5 rounded-3xl hover:bg-purple-700 border-base-200 border transition-colors;
}
</style>
