<script setup lang="ts">
import { ChevronDownIcon } from "lucide-vue-next"

defineProps<{
	text: string
	icon?: Component
	contents?: boolean
}>()

const slots = useSlots()
</script>

<template>
	<div
		data-biroui-dropdown
		:data-accordion="!slots.default ? undefined : ''"
		:aria-label="text"
	>
		<component
			:is="!slots.default ? 'a' : 'button'"
			role="menuitem"
			class="block w-full px-4 py-3 font-medium cursor-pointer select-none hover:bg-base-500"
			tabindex="0"
		>
			<div class="flex justify-between">
				<div class="flex items-center gap-x-2.5">
					<component :is="icon" aria-hidden="true" />
					<span>{{ text }}</span>
				</div>
				<ChevronDownIcon id="chevron" />
			</div>
		</component>
		<div id="slot" class="empty:hidden">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
[biro-ui-menu-item] {
	display: block;

	&:not([data-accordion]) {
		display: contents;
	}

	&:not([data-accordion]) #chevron {
		display: none !important;
	}

	&[data-accordion] #chevron {
		display: block;
	}
}
</style>
