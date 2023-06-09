<script setup lang="ts">
const isScrolled = ref(false)
const scrollAnchorRef = ref()

onMounted(() => {
	const observer = new IntersectionObserver(([e]) => {
		isScrolled.value = e.isIntersecting
	})

	observer.observe(scrollAnchorRef.value)
})
</script>

<template>
	<div class="contents" data-mf-header>
		<header
			class="fixed top-0 left-0 right-0 z-[3] border-0 border-b border-transparent transition-[backdrop-filter,background] duration-300 bg-opacity-50"
			:class="{ 'bg-base-800 backdrop-blur-sm': !isScrolled }"
		>
			<nav class="flex items-center justify-between px-8 py-2">
				<NavbarMenus />
				<div id="user-actions">
					<Button link="/login">Sign In</Button>
				</div>
			</nav>
		</header>
		<div
			ref="scrollAnchorRef"
			class="absolute inset-0 h-24 bg-opacity-50 bottom-unset"
		></div>
	</div>
</template>
