<script setup lang="ts">
import gsap from "gsap"
import { heroImages } from "./Images"

const ctx = ref()
const profileContainer = ref<HTMLDivElement>()

onMounted(() => {
	ctx.value = gsap.context((self) => {
		const artItems = self.selector!(".art-item")
		const scrollWrapper = self.selector!(".profile-container #wrapper")

		const ease: gsap.TweenVars = {
			ease: "elastic.out(1, 0.75)",
			duration: 0.75,
		}

		// Trigger onload
		artItems.forEach((item: HTMLElement | any, i: number) => {
			gsap
				.timeline()
				.fromTo(item, { opacity: 0, y: -75 }, { ...ease, opacity: 1, y: 0 })
				.delay(i * 0.15)
		})

		// Trigger on-scroll
		gsap
			.timeline({
				scrollTrigger: {
					trigger: scrollWrapper,
					start: "top top",
					end: "bottom center",
					scrub: 0.75,
				},
			})
			.to(artItems[2], { y: -145 })
			.to(artItems[1], { y: -125 * 2 }, "<")
			.to(artItems[0], { y: -125 * 3 }, "<")
	}, profileContainer.value)
})

onUnmounted(() => ctx.value.revert())
</script>

<template>
	<section class="flex items-center h-screen gradient-hero">
		<article
			class="flex flex-col items-start gap-6 px-8 ml-[7.5vw] mr-auto max-w-[1640px] relative z-[2]"
		>
			<IconMono class="w-[12rem] h-[12rem] -translate-x-5 text-white" />
			<h1 class="text-5xl font-bold font-inter">MyFursona</h1>
			<p class="text-2xl">A place where everyone belongs!</p>
			<div>
				<NuxtLink to="/login" class="login-button"> Sign up </NuxtLink>
			</div>
		</article>
		<div class="profile-container" ref="profileContainer" aria-hidden="true">
			<div id="wrapper" class="relative top-5">
				<figure
					v-for="item in heroImages"
					class="art-item"
					:style="{
						top: item.top ?? undefined,
						bottom: item.bottom ?? undefined,
						right: item.right ?? undefined,
					}"
				>
					<NuxtImg
						:src="`/images/hero/${item.file}`"
						sizes="lg:400px"
						quality="75"
						preload
					/>
					<figcaption class="label">
						{{ item.characterName }} |
						<strong>{{ item.characterAuthor }}</strong>
					</figcaption>
				</figure>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.gradient-hero {
	@apply relative;
	background: linear-gradient(
		173.6deg,
		rgba(33, 218, 255, 0.65) 0%,
		rgba(154, 33, 255, 0.65) 10%,
		rgba(255, 33, 222, 0.1) 50%,
		rgba(225, 33, 255, 0) 80%
	);
	background-position: top top;
}

.login-button {
	@apply text-lg px-6 py-2 rounded-full border-2 border-zinc-300 duration-200;
	transition-property: border;

	&:hover {
		@apply border-purple-400;
	}
}

.profile-container {
	@apply absolute top-0 right-0;
}

.art-item {
	@apply relative;
	width: 400px !important;

	img {
		@apply rounded-2xl;
	}

	.label {
		@apply absolute text-sm top-0 px-5 py-2.5 bg-opacity-10 backdrop-blur-md bg-black rounded-tl-2xl rounded-tr-2xl w-full;
	}
}
</style>
