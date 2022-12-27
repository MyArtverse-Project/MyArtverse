<script lang="ts" setup>
const props = defineProps<{ onClick?: () => void }>()
</script>

<template>
	<button @click="props.onClick" class="border-2 px-3.5 py-2">
		<slot />
	</button>
</template>