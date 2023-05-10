<script setup lang="ts">
import { Search } from "lucide-vue-next"
</script>

<template>
	<div class="flex items-center">
		<NuxtLink
			to="/"
			class="flex items-center text-[1.65rem] font-bold select-none font-inter gap-x-2.5 text-[var(--global--text)]"
			aria-label="MyFursona"
			title="MyFursona"
			role="img"
		>
			<IconMono class="w-[3.25rem] h-[3.25rem]" />
			<span class="hidden md:block">MyFursona</span>
		</NuxtLink>
		<nav class="flex items-center pl-5">
			<button
				class="relative hidden px-6 py-2 mr-2 font-bold bg-opacity-50 border rounded-lg font-inter border-base-500 bg-base-800 md:block"
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
				class="hidden px-4 py-3 font-bold font-inter md:block"
			>
				Browse</NuxtLink
			>
			<NuxtLink
				href="/plus"
				role="listitem"
				class="hidden px-4 py-3 font-bold font-inter md:block"
			>
				MyFursona+</NuxtLink
			>
		</nav>
	</div>
</template>
