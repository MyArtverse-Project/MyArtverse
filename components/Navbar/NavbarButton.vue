<script lang="ts" setup>
const props = defineProps<{ onClick?: () => void }>()
</script>

<template>
	<button @click="props.onClick" class="p-2.5">
		<slot />
	</button>
</template>