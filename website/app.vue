<template>
	<a
		class="absolute z-[999] bg-[var(--selection)] py-3.5 px-5 -translate-y-full focus:translate-y-0 transition-transform"
		href="#skip-to-main"
	>
		Skip to main content
	</a>
  <TheBaseNavbar />
	<main id="skip-to-main" class="min-h-screen">
		<NuxtPage />
	</main>
	<TheBaseFooter />
</template>
