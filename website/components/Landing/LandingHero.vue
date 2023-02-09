<script setup lang="ts">
import gsap from "gsap"

const author = "@ozzydevs"

const ctx = ref()
const profileContainer = ref<HTMLDivElement>()

onMounted(() => {
	ctx.value = gsap.context((self) => {
		const artItems = self.selector!(".art-item")
		const relContainer = self.selector!(".profile-container #wrapper")

		const ease: gsap.TweenVars = {
			ease: "elastic.out(1, 0.75)",
			duration: 0.75,
		}

		artItems.forEach((item: HTMLElement | any, i: number) => {
			gsap
				.timeline()
				.fromTo(item, { opacity: 0, y: -75 }, { ...ease, opacity: 1, y: 0 })
				.delay(i * 0.15)
		})

		gsap
			.timeline({
				scrollTrigger: {
					trigger: relContainer,
					start: "top top",
					end: "bottom center",
					scrub: 0.75,
				},
			})
			.to(artItems[2], { y: -150 })
			.to(artItems[1], { y: -125 * 2 }, "<")
			.to(artItems[0], { y: -125 * 3 }, "<")
	}, profileContainer.value)
})

onUnmounted(() => ctx.value.revert())
</script>

<template>
	<section class="flex items-center h-screen gradient-hero">
		<article class="px-8 ml-[7.5vw] mr-auto max-w-[1640px] relative z-[2]">
			<IconMono class="w-[12rem] h-[12rem] -translate-x-5 text-white" />
			<h1 class="my-6 text-5xl font-bold font-inter">MyFursona</h1>
			<p class="w-2/4 text-xl">
				An open-source platform where you can manage and share your amazing,
				adorable, and fluffy characters and show them off to your friends and
				family!
			</p>
		</article>
		<div class="profile-container" ref="profileContainer">
			<div id="wrapper" class="relative top-5">
				<figure class="art-item" style="top: 5.5rem; right: 25vw">
					<NuxtImg src="/images/hero/vulpo.jpg" sizes="lg:375px" quality="75" />
					<figcaption class="label -bottom-7">
						Vulpo | <strong>{{ author }}</strong>
					</figcaption>
				</figure>
				<figure class="art-item" style="bottom: 10rem; right: 8vw">
					<NuxtImg src="/images/hero/ivo.png" sizes="lg:375px" quality="75" />
					<figcaption class="right-0 text-right label -bottom-7">
						Ivo | <strong>{{ author }}</strong>
					</figcaption>
				</figure>
				<figure class="art-item" style="bottom: 18rem; right: 21vw">
					<NuxtImg src="/images/hero/renzo.jpg" sizes="lg:375px" quality="75" />
					<figcaption class="text-left -right-[9.25rem] bottom-1 label">
						Renzo | <strong>{{ author }}</strong>
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

.profile-container {
	@apply absolute top-0 right-0;
}

.art-item {
	@apply relative;
	width: 350px !important;

	img {
		@apply rounded-2xl;
	}

	.label {
		@apply absolute text-sm opacity-50;
	}
}
</style>
