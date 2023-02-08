<script setup lang="ts">
import gsap from "gsap"

const ctx = ref()
const profileContainer = ref<HTMLDivElement>()
const tl = ref()

onMounted(() => {
	ctx.value = gsap.context((self) => {
		const item = self.selector!(".art-item")

		const ease: gsap.TweenVars = {
			ease: "elastic.out(1, 0.75)",
      duration: 0.65
		}

		tl.value = gsap
			.timeline()
			.from(item[0], { ...ease, opacity: 0, y: 60 })
			.from(item[1], { ...ease, opacity: 0, y: 90 })
			.from(item[2], { ...ease, opacity: 0, y: 50 })
			.to(item[0], { ...ease, opacity: 1, y: 0 })
			.to(item[1], { ...ease, opacity: 1, y: 0 }, "-=1.2")
			.to(item[2], { ...ease, opacity: 1, y: 0 }, "-=0.5")
	}, profileContainer.value)
})

onUnmounted(() => ctx.value.revert())
</script>

<template>
	<section class="flex items-center h-screen gradient-hero">
		<!-- <ClientOnly>
			<Lottie
				animationLink="/lottie-ae/myfursona-hero.json"
				:height="500"
				:width="500"
        :loop="false"
        :delay="800"
			/>
		</ClientOnly> -->
		<article class="px-8 ml-[7.5vw]  mr-auto max-w-[1640px] relative z-[2]">
			<IconMono class="w-[12rem] h-[12rem] -translate-x-5 text-white" />
			<h1 class="my-4 text-5xl font-bold font-inter">MyFursona</h1>
			<p class="w-2/4 text-xl 2xl:w-2/3">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, repellat
				nesciunt. Sed, maxime. Autem quo rem nostrum explicabo in quia
				exercitationem?
			</p>
		</article>
		<div class="profile-container" ref="profileContainer">
			<div class="relative">
				<NuxtImg
					class="art-item"
					style="top: 9rem; right: 29vw"
					src="/images/hero/vulpo.jpg"
					sizes="lg:375px"
          quality="75"
				/>
				<NuxtImg
					class="art-item"
					style="bottom: 12rem; right: 8vw"
					src="/images/hero/ivo.png"
					sizes="lg:330px"
          quality="75"
				/>
				<NuxtImg
					class="art-item"
					style="bottom: 15rem; right: 21vw"
					src="/images/hero/renzo.jpg"
					sizes="lg:330px"
          quality="75"
				/>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.gradient-hero {
	@apply relative;
}

.profile-container {
	@apply absolute top-0 right-0;
}

.art-item {
  @apply relative rounded-xl shadow-lg;
}
</style>
