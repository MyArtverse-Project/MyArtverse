<script setup lang="ts">
import { Menu, Search, Ban, Contrast, AlertCircleIcon } from "lucide-vue-next"

const isScrolled = ref(false)

const handleScroll = () => {
	isScrolled.value = window.scrollY < 10 ? false : true
}

onBeforeMount(() => window.addEventListener("scroll", handleScroll))
onMounted(() => window.addEventListener("scroll", handleScroll))
onUnmounted(() => window.removeEventListener("scroll", handleScroll))
</script>

<template>
	<header
		:class="[
			'fixed top-0 left-0 right-0 z-[9999] border-0 border-b border-transparent transition-[backdrop-filter,background,border] duration-300',
			isScrolled
				? 'backdrop-blur-md !bg-opacity-50 !border-base-500 !bg-base-800'
				: '',
		]"
	>
		<nav class="flex items-center justify-between px-8 py-2.5">
			<div class="flex items-center">
				<NuxtLink
					to="/"
					class="text-3xl font-bold text-white select-none font-inter"
					aria-label="MyFursona"
					title="MyFursona"
					role="img"
				>
					<IconMono class="w-[3.25rem] h-[3.25rem] text-white" />
				</NuxtLink>
				<nav class="flex items-center pl-5">
					<button
						class="relative px-6 py-2 mr-2 font-bold bg-opacity-50 border rounded-lg font-inter border-base-500 bg-base-800"
						aria-label="Search"
					>
						<Search
							class="absolute z-[100] pointer-events-none top-[25%] left-3"
							:size="20"
						/>
						<span class="pl-3.5">Search</span>
					</button>
					<NuxtLink
						href="/browse"
						role="listitem"
						class="px-4 py-4 font-bold font-inter"
					>
						Browse</NuxtLink
					>
					<NuxtLink
						href="/plus"
						role="listitem"
						class="px-4 py-4 font-bold font-inter"
					>
						MyFursona+</NuxtLink
					>
				</nav>
			</div>
			<ul class="flex items-center gap-x-2.5 select-none">
				<li class="relative">
					<BaseButton class="!px-3" aria-label="Settings" title="Settings">
						<Menu :size="21" />
					</BaseButton>
					<div class="absolute p-2 -right-2 top-10">
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
				<li class="font-inter">
					<BaseButton link="/login">Sign In</BaseButton>
				</li>
			</ul>
		</nav>
	</header>
</template>