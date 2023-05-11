<script setup lang="ts">
const props = defineProps<{
	link?: string
	external?: boolean
	layout?: "default" | "ghost" | "base"
	disabled?: boolean
	type?: "button" | "submit" | "reset" | undefined
}>()
</script>

<template>
	<component
		biro-ui-button
		:is="type === 'reset' || type === 'submit' ? 'input' : 'button'"
		:id="`bui-${layout ?? 'default'}`"
		:disabled="disabled"
		:type="type"
		v-if="!props.link"
	>
		<slot />
	</component>
	<NuxtLink biro-ui-button v-else :id="`bui-${layout ?? 'default'}`" :to="link">
		<slot />
	</NuxtLink>
</template>

<style lang="scss">
[biro-ui-button] {
	@apply cursor-pointer px-5 py-2.5 rounded-md transition-colors;
}

#bui {
	&-default {
		@apply bg-[var(--button)] hover:bg-[var(--button-hover)] border border-[var(--separator)];
	}

	&-ghost,
	&-base {
		@apply bg-transparent;
	}

	&-ghost:hover {
		@apply bg-[var(--button-hover)];
	}
}
</style>
