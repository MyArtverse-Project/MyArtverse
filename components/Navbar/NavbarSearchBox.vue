<script lang="ts" setup>
import { ref } from "vue"
const root = ref<HTMLDivElement | null>(null);

const focusInput = () => {
	root.value?.classList.toggle("toggled")
}
</script>

<template>
	<div ref="root" class="search-box-container">
		<input type="text" @focus="focusInput" @focusout="focusInput" class="px-5 py-3 w-full focus:outline-none"
			placeholder="Search fursonas" />
		<div class="flex items-center gap-x-3 pr-4 absolute top-0 right-0 bottom-0">
			<button class="clear-btn">
				<i class="fa-solid fa-times fa-lg fa-fw"></i>
			</button>
			<button class="search-btn">
				<i class="fa-solid fa-magnifying-glass fa-fw"></i>
			</button>
		</div>
	</div>
</template>

<style lang="scss">
.search-box-container {
	@apply relative flex items-center gap-x-3 border-2 rounded-md transition-all duration-300 w-[20%];

	input {
		@apply cursor-pointer;
	}

	.clear-btn {
		@apply pointer-events-none opacity-0;
	}

	&.toggled {
		.clear-btn {
			@apply pointer-events-auto opacity-100;
		}

		input {
			@apply cursor-text;
		}
	}
}

.toggled {
	@apply w-[25%] border-red-200 cursor-text;
}
</style>
