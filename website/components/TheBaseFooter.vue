<script setup lang="ts">
const links = {
	Explore: ["Browse", "MyFursona+", "Developers", "Report an issue"],
	About: ["Team", "FAQ", "Open Source", "Changelog", "Design", "Contact us"],
	Legal: [
		"Community Guidelines",
		"Terms of Service",
		"Privacy Policy",
		"DMCA Policy",
		"Code of Conduct",
	],
}

const currentYear = new Date().getFullYear()
const copyrightText = `© 2022-${currentYear} The MyFursona Project`
</script>

<template>
	<footer class="bg-[var(--footer-bg)]">
		<div
			class="grid grid-cols-1 grid-rows-1 gap-6 px-12 py-10 mx-auto lg:grid-rows-2 lg:grid-cols-12 lg:grid-flow-col max-w-screen-2xl"
		>
			<NuxtLink
				to="/"
				class="flex items-center lg:text-4xl text-3xl font-bold select-none font-inter gap-x-2.5 w-fit place-self-start lg:col-span-4 text-[var(--global--text)]"
				aria-label="MyFursona"
				title="MyFursona"
				role="img"
			>
				<IconMono class="lg:w-[4.5rem] lg:h-[4.5rem] w-[3.25rem] h-[3.25rem]" />
				<span>MyFursona</span>
			</NuxtLink>
			<span
				class="order-last col-span-1 text-center lg:order-none lg:mr-auto lg:col-span-4 lg:place-self-end"
				>{{ copyrightText }}</span
			>
			<div
				class="grid w-full row-span-2 md:grid-flow-col gap-y-10 lg:col-span-8 gap-x-12"
			>
				<ul
					v-for="[heading, listItems] in Object.entries(links)"
					class="flex flex-col gap-y-3"
				>
					<h2 class="text-[var(--footer--list-header)]">{{ heading }}</h2>
					<NuxtLink
						v-for="item in listItems"
						to="#"
						class="hover:text-base-200 hover:underline"
					>
						{{ item }}
					</NuxtLink>
				</ul>
			</div>
		</div>
	</footer>
</template>
