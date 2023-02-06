<template>
	<div ref="searchBoxRef" class="search-box-container">
		<input
			type="text"
			v-model="inputVal"
			@focusin="focusInput"
			@focusout="focusInput"
			placeholder="Search"
		/>
		<div class="absolute top-0 bottom-0 right-0 flex items-center pr-4 gap-x-3">
			<button class="clear-btn" @click="clearInput">
				<i class="fa-solid fa-times fa-lg fa-fw"></i>
			</button>
			<button class="search-btn">
				<i class="fa-solid fa-magnifying-glass fa-fw"></i>
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
const searchBoxRef = ref<HTMLDivElement | null>(null)
const inputVal = ref("")

const focusInput = () => {
	searchBoxRef.value?.classList.toggle("toggled")
}

const clearInput = () => {
	inputVal.value = ""
}
</script>

<style lang="scss">
.search-box-container {
	@apply relative flex items-center gap-x-3 overflow-hidden rounded-md transition-all duration-300 w-[18rem];

	input[type="text"] {
		@apply cursor-pointer bg-slate-200 w-full px-4 py-2 focus:outline-none;

		&::placeholder {
			@apply text-slate-800;
		}

		&:focus-within {
			@apply cursor-text;

			.clear-btn {
				@apply pointer-events-auto opacity-100;
			}

			input {
				@apply cursor-text;
			}
		}
	}

	.clear-btn {
		// @apply pointer-events-none opacity-0;
	}
}
</style>
