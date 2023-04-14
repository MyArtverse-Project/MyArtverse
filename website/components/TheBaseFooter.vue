<script setup lang="ts">
const links = [
	{ link: "/about", text: "About" },
	{ link: "#", text: "Legal" },
	{ link: "#", text: "Privacy" },
	{ link: "#", text: "API" },
	{ link: "#", text: "Sitemap" },
	{ link: "#", text: "Feedback" },
]

const currentYear = new Date().getFullYear()
const copyrightText = `© 2022-${currentYear} The MyFursona Project - MIT License`
</script>

<template>
	<footer class="relative bui-gradient-mix">
		<div class="footer-branding">
			<NuxtLink to="/">
				<IconMono class="flex-shrink-0 w-12 h-12" />
			</NuxtLink>
		</div>
		<div
			class="flex items-center flex-shrink-0 gap-8 pt-10 pb-12 mx-auto mt-12 text-sm px-14 max-w-screen-2xl"
		>
			<ul
				class="grid w-full grid-flow-col text-center border-r border-base-500"
			>
				<li v-for="items in links">
					<NuxtLink
						:to="items.link"
						class="text-opacity-50 transition-colors whitespace-nowrap hover:text-opacity-100 text-base-50 hover:text-base-100"
					>
						{{ items.text }}
					</NuxtLink>
				</li>
			</ul>
			<div id="copyright">{{ copyrightText }}</div>
		</div>
	</footer>
</template>

<style lang="scss">
.bui-gradient-mix {
	background: linear-gradient(
		to bottom,
		rgba(116, 72, 209, 0) 0%,
		rgba(116, 72, 209, 0.1) 54%,
		rgba(116, 72, 209, 0.2) 100%
	);
}

.footer-branding {
	@apply absolute left-0 right-0 inline-flex items-center gap-5 -top-12;
	&::before,
	&::after {
		content: "";
		@apply h-[0.75px] bg-base-500 w-full;
	}
}

#copyright {
	@apply flex gap-2.5 items-center flex-shrink-0 text-opacity-50 text-base-50;
}
</style>
