<script setup lang="ts">
const props = defineProps<{
	link?: string
	external?: boolean
	layout?: "default" | "headless" | "clear"
	disabled?: boolean
}>()
</script>

<template>
	<button
		v-if="!props.link"
		:class="`bui-${layout ?? 'default'}`"
		:disabled="disabled"
	>
		<slot />
	</button>
	<NuxtLink v-else :to="link" :class="`bui-${layout ?? 'default'}`">
		<slot />
	</NuxtLink>
</template>

<style lang="scss">
.bui {
	&-default {
		@apply px-5 py-2.5 rounded-lg hover:bg-purple-700 border-base-200 border transition-colors;
	}
}
</style>
