<script setup lang="ts">
const props = defineProps<{
	link?: string
	external?: boolean
	layout?: "default" | "ghost"
	disabled?: boolean
	type?: "button" | "submit" | "reset" | undefined
}>()
</script>

<template>
	<button
		biro-ui-button
		:bui-ghost="layout !== 'ghost' ? undefined : ''"
		:button-type="layout ?? 'default'"
		v-if="!props.link"
		:disabled="disabled"
		:type="type"
	>
		<slot />
	</button>
	<NuxtLink
		biro-ui-button
		:bui-ghost="layout !== 'ghost' ? undefined : ''"
		v-else
		:to="link"
		:disabled="disabled"
		role="button"
	>
		<slot />
	</NuxtLink>
</template>

<style scoped>
[biro-ui-button] {
	@apply px-5 py-2.5 rounded-md bg-[var(--button)] hover:bg-[var(--button-hover)] font-open-sans;
}
</style>
