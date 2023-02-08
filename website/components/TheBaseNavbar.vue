<template>
	<header class="fixed top-0 left-0 right-0 z-[9999]">
		<nav class="flex items-center justify-between px-8 py-3">
			<div class="flex items-center gap-x-6">
				<NuxtLink to="/" class="logo">
					<div
						role="img"
						aria-label="MyFursona"
						class="flex items-center gap-x-2.5"
					>
						<IconMono class="w-[3.25rem] h-[3.25rem] text-white" />
						<span>MyFursona</span>
					</div>
				</NuxtLink>
			</div>
			<ul>
				<li class="font-inter">
					<button
						class="px-4 py-1.5 rounded-md hover:bg-purple-900 border-zinc-700 border"
					>
						Sign In
					</button>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style lang="scss">
.logo {
	@apply text-3xl font-bold text-white select-none font-inter;
}
</style>
