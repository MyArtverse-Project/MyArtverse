<script setup lang="ts">
type HTMLInputAttributes = "date" | "email" | "password" | "search" | "submit"

defineProps<{
	inputName?: string
	placeholder?: string
	type?: HTMLInputAttributes
	modelValue?: string
	required?: boolean
	fullWidth?: boolean
}>()

defineEmits<{ (e: "update:modelValue", value: string): void }>()
</script>

<template>
	<div id="field-container">
		<label
			:for="inputName"
			class="font-bold uppercase select-none font-inter text-base-600"
			>{{ inputName }}</label
		>
		<input
			:name="inputName"
			:type="type ?? 'text'"
			class="px-4 py-3 text-white border rounded-md outline-none border-base-700 bg-base-800 focus:border-base-400"
			:class="[!fullWidth ? 'w-full' : '']"
			:placeholder="placeholder"
			:value="modelValue"
			:required="required ?? undefined"
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
		/>
	</div>
</template>

<style lang="scss">
#field-container {
	@apply flex flex-col gap-y-2;
}
</style>
