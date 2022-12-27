<script setup></script>

<template>
	<header>
		<div class="flex items-center justify-between px-12 py-6">
			<NuxtLink to="/" class="logo-wordmark">MyFursona</NuxtLink>
			<NavbarSearchBox />
			<UserLoggedIn />
		</div>
	</header>
</template>

<style lang="scss">
.logo-wordmark {
	@apply text-3xl font-bold font-inter select-none
	bg-gradient-to-br from-orange-400 via-purple-500 to-pink-400 bg-clip-text text-transparent;
}
</style>