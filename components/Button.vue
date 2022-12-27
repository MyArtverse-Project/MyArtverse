<script lang="ts" setup>
const props = defineProps<{ onClick?: () => void }>()
</script>

<template>
	<button :on-click="props.onClick" class="border border-2 px-3.5 py-2">
		<slot />
	</button>
</template>