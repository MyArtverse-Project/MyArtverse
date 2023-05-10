<script setup lang="ts">
defineProps<{
	inputName?: string
	placeholder?: string
	type?: "date" | "email" | "password" | "search" | "submit" | "checkbox"
	modelValue?: string
	required?: boolean
	fullWidth?: boolean
}>()

defineEmits<{ (e: "update:modelValue", value: string): void }>()
</script>

<template>
	<div biro-ui-field>
		<label :for="inputName" class="font-bold uppercase select-none font-inter"
			>{{ inputName }}
		</label>
		<input
			:name="inputName"
			:id="inputName"
			:type="type ?? 'text'"
			class="px-4 py-3 border rounded-md bg-[var(--global--background)] border-[var(--field-border)] outline-[var(--field-border-focus)] focus:border-[var(--field-border-focus)]"
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
div[biro-ui-field] {
	@apply flex flex-col gap-y-2;
}
</style>
