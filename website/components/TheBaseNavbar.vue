<script setup lang="ts">
import { Menu, Search } from "lucide-vue-next"

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
	<header :class="['navbar-sticky', isScrolled ? 'scrolled' : '']">
		<nav class="flex items-center justify-between px-8 py-4">
			<div ref="navLeftRef" class="left-side">
				<NuxtLink to="/" class="logo" title="MyFursona Home" role="img">
					<div aria-label="MyFursona" class="flex items-center gap-x-2.5">
						<IconMono class="w-[3.25rem] h-[3.25rem] text-white" />
						<span class="hidden md:block">MyFursona</span>
					</div>
				</NuxtLink>
				<span
					class="hidden md:block px-1.5 py-1 ml-2 text-xs font-semibold bg-red-400 rounded-sm font-inter select-none"
					>ALPHA</span
				>
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
				<nav class="pl-2">
					<NuxtLink
						href="/browse"
						role="listitem"
						class="px-4 font-bold font-inter"
						>Browse</NuxtLink
					>
					<NuxtLink
						href="/browse"
						role="listitem"
						class="px-4 font-bold font-inter"
						>Collections</NuxtLink
					>
				</nav>
			</div>
			<ul class="actions">
				<li class="relative">
					<BaseButton class="!px-3 !rounded-full">
						<Menu :size="21" />
					</BaseButton>
					<div class="absolute right-0 p-2 top-12">
						<ul class="flex flex-col p-4 rounded-md gap-y-3 w-max bg-base-800">
							<li>Toggle theme</li>
							<li>Mature content</li>
							<li>Report an Issue</li>
							<li>Copyright</li>
						</ul>
					</div>
				</li>
				<li class="font-inter">
					<BaseButton link="/login">Sign In</BaseButton>
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
		@apply backdrop-blur-md bg-opacity-50 border-base-500 bg-base-800;
	}
}

.left-side {
	@apply flex items-center;
}

.actions {
	@apply flex items-center gap-x-2.5;
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
