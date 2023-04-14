<script setup lang="ts">
const isScrolled = ref(false)
const navLeftRef = ref<DefNullable<HTMLElement>>()
const searchValue = ref("")
const searchWrapperRef = ref<DefNullable<HTMLDivElement>>()
const isSuggestionsFocused = ref(false)

const handleScroll = () => {
	isScrolled.value = window.scrollY < 10 ? false : true
}

onBeforeMount(() => window.addEventListener("scroll", handleScroll))
onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))

onMounted(() => {
	window.onmousedown = ({ target: targetedElement }) => {
		const containerSiblings = searchWrapperRef.value?.nextSibling

		containerSiblings?.childNodes.forEach((childElements) => {
			if (
				targetedElement === searchWrapperRef.value ||
				targetedElement === containerSiblings ||
				targetedElement === childElements
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
	<header :class="['navbar-sticky', isScrolled ? 'scrolled' : '']">
		<nav class="flex items-center justify-between px-8 py-4">
			<div ref="navLeftRef" class="left-side">
				<NuxtLink to="/" class="logo" title="MyFursona Home" role="img">
					<div aria-label="MyFursona" class="flex items-center gap-x-2.5">
						<IconMono class="w-[3.25rem] h-[3.25rem] text-white" />
						<span>MyFursona</span>
					</div>
				</NuxtLink>
				<span
					class="px-1.5 py-1 ml-2 text-xs font-semibold bg-red-400 rounded-sm font-inter select-none"
					>ALPHA</span
				>
				<div class="search-input" :data-focused="isSuggestionsFocused">
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
							Search results for <strong>{{ searchValue }}</strong>
						</span>
						<span v-else>Start typing</span>
					</div>
				</div>
			</div>
			<ul class="actions">
				<button class="hidden"></button>
				<li class="font-inter">
					<NuxtLink to="/login" class="login-btn">Sign In</NuxtLink>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss" scoped>
.navbar-sticky {
	@apply fixed top-0 left-0 right-0 z-[9999] border-0 border-b border-transparent;
	transition-property: backdrop-filter, background, border;
	transition-duration: 300ms;

	&.scrolled {
		@apply backdrop-blur-md bg-opacity-50  border-base-500 bg-base-800;
	}
}

.left-side {
	@apply flex items-center;
}

.actions {
	@apply flex items-center gap-x-10;
}

.logo {
	@apply text-3xl font-bold text-white select-none font-inter;
}

.navbar-sticky.scrolled input {
	@apply border-base-600;
}

.search-input {
	@apply ml-5 w-[18.5vw] relative text-sm;

	input {
		@apply border-2 border-transparent relative z-[1] px-4 py-2.5 rounded-md bg-opacity-75 bg-base-800 focus:outline-base-600 w-full transition-colors;
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

.login-btn {
	@apply px-5 py-2.5 rounded-3xl hover:bg-purple-700 border-base-200 border font-bold transition-colors;
}
</style>
