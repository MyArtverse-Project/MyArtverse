<script setup lang="ts">
import { Search } from "lucide-vue-next"

const searchValue = ref("")
const searchWrapperRef = ref<DefNullable<HTMLDivElement>>()
const isSuggestionsFocused = ref(false)

onMounted(() => {
	window.onmousedown = ({ target: targetElement }) => {
		const containerSiblings = searchWrapperRef.value?.nextSibling

		containerSiblings?.childNodes.forEach((childElements) => {
			if (
				targetElement === searchWrapperRef.value ||
				targetElement === containerSiblings ||
				targetElement === childElements
			) {
				isSuggestionsFocused.value = true
			} else {
				isSuggestionsFocused.value = false
			}
		})
	}
})
</script>

<template>
	<div class="relative search-input" :data-focused="isSuggestionsFocused">
		<Search
			class="absolute z-[100] pointer-events-none top-[25%] left-3"
			:size="20"
		/>
		<input
			ref="searchWrapperRef"
			type="search"
			aria-label="Search"
			placeholder="Search"
			title="Search"
			autocorrect="off"
			spellcheck="false"
			v-model="searchValue"
		/>
		<div class="search-suggestions" :aria-hidden="!isSuggestionsFocused">
			<span v-if="searchValue !== ''">
				Search results for "<strong>{{ searchValue }}</strong
				>"
			</span>
			<span v-else>Start typing for results</span>
		</div>
	</div>
</template>

<style lang="scss">
.nav-wrapper.scrolled input {
	@apply border-base-600;
}

.search-input {
	@apply ml-5 block relative text-sm;

	input {
		@apply pl-9 border-2 border-transparent relative z-[1] px-4 py-2.5 rounded-md bg-opacity-75 bg-base-800 focus:outline-base-600 w-full transition-colors;
	}

	&[data-focused="true"] input {
		@apply bg-opacity-100;
	}
}

.search-suggestions {
	@apply absolute -left-2 -right-2 -top-2 py-3 pt-14 px-4 bg-base-700 transition-all pointer-events-none opacity-0 rounded-md;

	&[aria-hidden="false"] {
		@apply opacity-100 pointer-events-auto;
	}
}
</style>
