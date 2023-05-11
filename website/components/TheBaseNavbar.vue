<script setup lang="ts">
import { Menu, Search, Ban, Contrast, AlertCircleIcon } from "lucide-vue-next"

const isScrolled = ref(false)

const handleScroll = () => {
	isScrolled.value = window.scrollY < 10 ? false : true
}

onBeforeMount(() => window.addEventListener("scroll", handleScroll))
onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))

const isDropdownOpen = ref(false)
const toggleDropdownBtn = ref()

onMounted(() => {
	const buttonElement: HTMLButtonElement = toggleDropdownBtn.value.$.ctx.$el

	buttonElement.onmousedown = () => {
		isDropdownOpen.value = !isDropdownOpen.value
	}
})
</script>

<template>
	<header
		:class="[
			'fixed top-0 left-0 right-0 z-[3] border-0 border-b border-transparent transition-[backdrop-filter,background,border] duration-300',
			isScrolled
				? 'backdrop-blur-md !bg-opacity-50 !border-base-500 !bg-base-800'
				: '',
		]"
	>
		<a
			class="absolute z-[999] bg-[var(--selection)] py-3.5 px-5 -translate-y-full focus:translate-y-0 transition-transform"
			href="#skip-to-main"
		>
			Skip to main content
		</a>
		<nav class="flex items-center justify-between px-8 py-2">
			<NavbarMenus />
			<ul class="flex gap-x-2.5 items-center">
				<li class="relative flex items-center gap-x-2.5">
					<BaseButton
						class="!px-3 !border-none md:hidden block"
						aria-label="Search"
						title="Search"
					>
						<Search :size="21" />
					</BaseButton>
					<BaseButton
						ref="toggleDropdownBtn"
						class="!px-3 !border-none block"
						aria-label="Settings"
						title="Settings"
					>
						<Menu :size="21" />
					</BaseButton>
					<div
						id="dropdown-contents"
						class="absolute hidden p-2 -right-2 top-10 md:block"
						:class="[
							!isDropdownOpen
								? 'opacity-0 pointer-events-none'
								: 'opacity-100 pointer-events-auto',
						]"
					>
						<ul
							class="flex flex-col overflow-hidden rounded-md w-max bg-base-800"
						>
							<li class="flex items-center gap-1.5 px-4 py-3">
								<Contrast :size="20" />
								<span>Toggle theme</span>
							</li>
							<li class="flex items-center gap-1.5 px-4 py-3">
								<Ban :size="20" />
								<span>Mature content</span>
								<input type="checkbox" />
							</li>
							<li class="flex items-center gap-1.5 px-4 py-3">
								<AlertCircleIcon :size="20" />
								<span>Report an Issue</span>
							</li>
						</ul>
					</div>
				</li>
				<li class="hidden font-inter md:block">
					<BaseButton link="/login">Sign In</BaseButton>
				</li>
			</ul>
		</nav>
	</header>
</template>
