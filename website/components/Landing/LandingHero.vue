<script setup lang="ts">
import gsap from "gsap"

const ctx = ref()
const profileContainer = ref<HTMLDivElement>()

onMounted(() => {
  let mm = gsap.matchMedia("(min-width: 1024px)")

	ctx.value = gsap.context((self) => {

	}, profileContainer.value)
})

onUnmounted(() => ctx.value.revert())
</script>

<template>
	<section class="flex items-center h-screen gradient-hero">
		<article
			class="flex flex-col items-center gap-6 px-8 mx-auto max-w-[1640px] relative z-[2]"
		>
			<IconMono class="w-[12rem] h-[12rem] text-white" />
			<h1 class="text-5xl font-bold font-inter">MyFursona</h1>
			<p class="text-2xl">A place where everyone belongs!</p>
			<div>
				<NuxtLink to="/login" class="login-button"> Sign up </NuxtLink>
			</div>
		</article>
	</section>
</template>

<style lang="scss">
.gradient-hero {
	@apply relative;
	background: linear-gradient(
		173.6deg,
		rgba(2, 237, 254, 0.65) 0%,
		rgba(154, 33, 255, 0.65) 10%,
		rgba(255, 33, 222, 0.1) 50%,
		rgba(225, 33, 255, 0) 80%
	);
	background-position: top top;
}

.login-button {
	@apply text-lg px-6 py-2 rounded-full border-2 border-base-300 duration-200;
	transition-property: border;

	&:hover {
		@apply border-purple-400;
	}
}

.profile-container {
	@apply absolute inset-0 scale-[0.9] top-5 select-none;
}

.art-item {
	&-left,
	&-right {
		@apply absolute;
		width: 400px !important;

		img {
			@apply rounded-2xl pointer-events-none;
		}
	}
}
</style>
