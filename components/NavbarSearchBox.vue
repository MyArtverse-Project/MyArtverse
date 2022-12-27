<script lang="ts" setup>
import { ref } from "vue"

const root = ref<HTMLDivElement | null>(null);

function test() {
	console.log("focused")
}

onMounted(() => {
	console.log(root.value?.outerHTML)
})
</script>

<template>
	<div ref="root" class="flex items-center gap-x-3 border-2 rounded-md">
		<input :onfocus="test" class="px-4 py-2" type="text" placeholder="Search fursonas" />
		<div>
			<i class="fa-solid fa-times fa-lg fa-fw"></i>
			<i class="fa-solid fa-magnifying-glass fa-fw"></i>
		</div>
	</div>
</template>

<style lang="scss">

</style>
